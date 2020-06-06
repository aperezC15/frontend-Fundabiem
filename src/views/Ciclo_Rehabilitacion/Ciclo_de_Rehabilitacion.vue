<template>
  <v-container grid-list-lg >
    <v-layout row wrap>
      <v-flex xs12>

                <v-layout text-center wrap>
                <v-flex>
                    <h1  class="text-xs-center text-uppercase"> Ciclo de rehabilitación y herramientas cif</h1>
                </v-flex>
            </v-layout>
        <v-card>
          <v-toolbar flat dark color="#616161">
            <v-toolbar-title>REGISTROS</v-toolbar-title>
            <v-divider class="mx-4" vertical></v-divider>
            <div class="flex-grow-1"></div>

            <v-text-field
              v-model="search"
              label="BUSCAR "
              append-icon="search"
              single-line
              hide-details
            ></v-text-field>
            <v-tooltip bottom color="#0277BD">
              <template v-slot:activator="{ on }">
                <v-btn
                  fab
                  v-on="on"
                  color="#039BE5"
                  class="mx-2"
                  @click="openDialogRehabilitation"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <span>NUEVO CICLO DE REHABILITACIÓN</span>
            </v-tooltip>
          </v-toolbar>

          <v-data-table hide-default-footer :headers="headers" :items="cicloRehabilitacionCIF" :search="search" class="elevation-1">
            <template v-slot:no-data v-if="cicloRehabilitacionCIF.length === 0">
              <v-alert dark
                class="text-xs-center"
                :value="true"
                color="#FF0000"
                icon="warning"
              >No existen registros en la tabla</v-alert>
            </template>
<!-- 
            <template v-slot:item.action="{item}">
              <v-btn
                title="EDITAR REGISTRO DE ESTUDIO SOCIOECONOMICO"
                fab
                color="success"
                dark
                @click="editItem(item)"
              >
                <v-icon>edit</v-icon>
              </v-btn>
            </template> -->
            <template v-slot:no-results>
              <v-alert type="error">EL REGISTRO "{{search}}" NO SE ENCUENTRA EN LA BASE DE DATOS</v-alert>
            </template>
          </v-data-table>
          <div class="text-center">
            <v-pagination
              v-model="paginationPage"
              :length="paginationLenght"
            ></v-pagination>
          </div>
        </v-card>
      </v-flex>
    </v-layout>

    <ciclo-rehabilitacion 
      :dialogRehabilitacion="dialogRehabilitacion"
      @closeModalRehabilitation="closeModalRehabilitation"
      @saveRehabilitacion="saveRehabilitacion"
    />

    <edit-ciclo-rehabilitacion 
      :showEditCiclo="showEditCiclo"
      :cicloEdit="cicloEdit"
      @closeEditModalRehabilitation="closeEditModalRehabilitation"
      @saveEditRehabilitacion="saveEditRehabilitacion"
    />

    <v-dialog v-model="loading" width="300px">
      <v-card height="100px" class="d-flex justify-center align-center">
      <v-card-text>
        <span class="title  font-weight-bold">Cargando...</span>
        <div class="text-center">
            <v-progress-linear
              height="8"
          indeterminate
          color="green"
        ></v-progress-linear>
        </div>
      </v-card-text>
        </v-card> 
    </v-dialog>

  </v-container>
</template>

<script>
import CicloRehabilitacion from '../../components/ciclo-rehabilitacion/CicloRehabilitacion.vue'
import EditCicloRehabilitacion from '../../components/ciclo-rehabilitacion/EditCicloRehabilitacion.vue'
import moment from 'moment'
export default {
  components: { 
    CicloRehabilitacion,
    EditCicloRehabilitacion
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "Nombre completo", align: "left", sortable: false, value: "nombre" },
        { text: "CIE-10", value: "cie_10" },
        { text: "Sexo", value: "_sexo" },
        { text: "Origen", value: "origen" },
        { text: "Diagnóstico", value: "dignostico" },
        { text: "fecha", value: "_fecha" },
        { text: "Acciones", value: "action" }
      ],
      cicloRehabilitacionCIF: [],
      dialogRehabilitacion: false,
      loading: false,
      cicloEdit: {},
      showEditCiclo: false,
       paginationPage: 1,
      paginationLenght: 0,
      pagination: {
        pagina: 1,
        rowsPerPage: 5
      },

    }
  },
  watch: {
    paginationPage: function() {
      this.cicloRehabilitacionCIF = [];
      this.getDataCicloRehabilitacion();
    }
  },
  methods: {
    async getDataCicloRehabilitacion() {
      this.cicloRehabilitacionCIF = [];
      this.loading = true;
      var pagination = { pagina: this.paginationPage, rowsPerPage: 5 }
      const response = await this.$store.dispatch("getAllCicloRehabilitacion", { pagination })
      this.loading = false;
      if (response.status === 200 && response.data.registrosFundabiem.length >= 0) {
        this.paginationLenght = response.data.pages;
        response.data.registrosFundabiem.map(register => {
          const { dignostico, fecha,origen,cie_10 } = register;
          const {historialClinico  } = register.paciente.historialClinico
          const { primerApellido, primerNombre, segundoApellido, segundoNombre, grupoEtnico, dpi, sexo} = register.paciente.persona;
          const nombre = `${primerNombre} ${segundoNombre} ${primerApellido} ${segundoApellido}`;
          var _fecha = moment(fecha).format("L");
          var _sexo
          if(sexo)
            _sexo='Masculino'
          else
            _sexo='Femenino'
          this.cicloRehabilitacionCIF.push({ nombre, cie_10, _sexo, origen, dignostico, _fecha});
        });
      }
    },
    openDialogRehabilitation() {
      this.dialogRehabilitacion = true;
    },
    async saveRehabilitacion(data) {
      this.cargando = true;
      this.dialogRehabilitacion = false;
      const response = await this.$store.dispatch('CicloRehabilitacion', data);
      this.cargando = false
      if(response.status === 201) {
        this.getDataCicloRehabilitacion()
        const title = "Nuevo ciclo de rehabilitación con éxito!"
        const message = "Nuevo ciclo de rehabilitación exitosamente"
        this.showAlert(title, message, "success")
      } else {
        const title = "Nuevo ciclo de rehabilitación sin éxito!"
        const message = "No se creó el nuevo ciclo de rehabilitación "
        this.showAlert(title, message, "error")
      }
    },
    showAlert(title, message, type) {
      this.$swal.fire(
        title,
        message,
        type
      );
    },
    closeModalRehabilitation() {
      this.dialogRehabilitacion= false
    },
    editItem(item) {
      this.showEditCiclo = true

       this.cicloEdit = this.cicloRehabilitacionCIF.find( ciclo => ciclo.id === item.id)

    },
    saveEditRehabilitacion(data) {
      const { id, nombre,  edad , sexo , origen, diagnostico, fecha } = data 
      const editCiclo = {id, nombre, edad, sexo, origen, diagnostico, fecha}
      this.cicloRehabilitacionCIF = this.cicloRehabilitacionCIF.map( ciclo => ciclo.id === data.id ? editCiclo : ciclo )
      this.showEditCiclo = false
      this.loading = true
      setTimeout( () => {
        this.loading = false
        this.$swal.fire(
        'Ciclo de rehabilitación editado con éxito!',
        'Ciclo editado exitosamente',
        'success'
        );
      },2000)
    },
    closeEditModalRehabilitation() {
      this.showEditCiclo = false
    }
  },
  mounted() {
    this.getDataCicloRehabilitacion()
  },
};
</script>
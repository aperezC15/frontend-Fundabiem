<template>
  <v-container grid-list-lg >
    <v-layout row wrap>
      <v-flex xs12>

                <v-layout text-center wrap>
                <v-flex>
                    <h1  class="text-xs-center text-uppercase"> Evolución técnica</h1>
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
                  color="#039BE5"
                  fab
                  class="mx-2"
                  @click="openDialogRehabilitation"
                  v-on="on">
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <span>Nueva evolución técnica</span>
            </v-tooltip>
          </v-toolbar>

          <v-data-table hide-default-footer :headers="headers" :items="evolucionMedica" :search="search" class="elevation-1">
            <template v-slot:no-data v-if="evolucionMedica.length === 0">
              <v-alert dark
                class="text-xs-center"
                :value="true"
                color="#FF0000"
                icon="warning"
              >No existen registros en la tabla</v-alert>
            </template>

            <!-- <template v-slot:item.action="{item}">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    color="success"
                    dark
                    @click="editItem(item)"
                    v-on="on">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </template>
                <span>Editar evolución médica</span>
              </v-tooltip>
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

    <evolucion-medica
      ruta="tecnica"
      :dialogEvolucionMedica="dialogEvolucionMedica"
      @closeModalEvolucion="closeModalEvolucion"
      @closeDialog="closeDialog"
      @saveEvolucionMedica="saveEvolucionMedica"
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

import EvolucionMedica from '../../components/evolucion-medica/EvolucionMedica.vue'
import moment from 'moment'
export default {
  components: { 
    EvolucionMedica,
  },
  data() {
    return {
      search: "",
       paginationPage: 1,
      paginationLenght: 0,
      pagination: {
        pagina: 1,
        rowsPerPage: 5
      },
      headers: [
        { text: "Nombre completo", align: "left", sortable: false, value: "nombre" },
        { text: "Sexo", value: "_sexo" },
        { text: "Diagnóstico", value: "diagnostico" },
        { text: "fecha", value: "_fecha" },
        { text: "Acciones", value: "action" }
      ],
      evolucionMedica: [
        {id: 1, nombre: "Juan Gómez", edad: 62, sexo: "masculino", origen: "Guatemala", diagnostico: "Su diagnostico", fecha: "2019-08-12" },
        { id: 2, nombre: "Benito Juarez", edad: 32, sexo: "masculino", origen: "Guatemala", diagnostico: "El diagnostico", fecha: "2016-02-10" },
      ],
      dialogEvolucionMedica: false,
      loading: false,

    }
  },
  watch: {
    paginationPage: function() {
      this.evolucionMedica = [];
      this.getAllTechnicalEvolution();
    }
  },
  methods: {
    //obtiene todos los registros de evolucion medica, paginados.
    async getAllTechnicalEvolution(){
      this.evolucionMedica=[]
      this.loading=true
      //control de paginacion
      var pagination = {
        pagina: this.paginationPage,
        rowsPerPage: 5
      };
      const response = await this.$store.dispatch("getAllTechnicalEvolution",{pagination})

      this.loading =false
      //verica que se encuentren registros para mostrar
      if(response.data.registrosFundabiem.length >= 0){
        this.paginationLenght = response.data.pages
        response.data.registrosFundabiem.map(register => {
          const {diagnostico,fecha} = register
          const { primerApellido,primerNombre, segundoApellido, segundoNombre, grupoEtnico, dpi,sexo} = register.paciente.persona;
          const nombre = `${primerNombre} ${segundoNombre} ${primerApellido} ${segundoApellido}`;
          //agrega los datos a la tabla de regisros
          if(sexo)
            var _sexo = 'Masculino'
          else 
            var _sexo = 'Feminio'
          var _fecha = moment(fecha).format("L")
          this.evolucionMedica.push({nombre,diagnostico,_fecha,_sexo})
        });
      }
    },

    openDialogRehabilitation() {
      this.dialogEvolucionMedica = true
    },
    closeModalEvolucion() {
      this.dialogEvolucionMedica= false
    },

    closeDialog() {
        this.dialogEvolucionMedica = false
    },

    async saveEvolucionMedica(data) {

        const { idPaciente, diagnostico} = data
        const newData = {
          idPaciente,
          diagnostico
        }

      this.cargando = true
      this.dialogEvolucionMedica = false
      
        const response = await this.$store.dispatch('newTechnicalEvolution', newData)


      this.cargando = false
        if(response.status === 201) {
            const title = "Nueva evolución médica con éxito!"
            const message = "Nueva evolución médica exitosamente"
            this.showAlert(title, message, "success")
            this.getAllTechnicalEvolution();
        } else {
            const title = "Nueva evolución médica sin éxito!"
            const message = "No se creó la nueva evolución médica "
            this.showAlert(title, message, "error")
        }
    },
    showAlert(title, message, type) {
      this.$swal.fire(
        title,
        message,
        type
      );
    }
  },
  mounted(){
    this.getAllTechnicalEvolution();
  }
};
</script>
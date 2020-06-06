<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout text-center wrap>
          <v-flex>
            <h1 class="text-xs-center text-uppercase">Historias Clínicas</h1>
          </v-flex>
        </v-layout>
        <v-card>
          <v-toolbar flat dark color="#616161">
            <v-toolbar-title>Historias Clínicas</v-toolbar-title>
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
                  v-on ="on"
                  color="#039BE5"
                  class="mx-2"
                  @click="openDialogRegistroMedico"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <span>Nueva Historia Clinica</span>
            </v-tooltip>
          </v-toolbar>

          <v-data-table
            hide-default-footer
            :headers="headers"
            :items="dataRegistersMedicals"
            :search="search"
            class="elevation-1"
          >
            <template v-slot:no-data v-if="dataRegistersMedicals.length === 0">
              <v-alert dark
                class="text-xs-center"
                :value="true"
                color="#FF0000"
                icon="warning"
              >No existen registros en la tabla</v-alert>
            </template>

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

    <historial-clinica
      :dialogHistorialMedico="dialogHistorialMedico"
      @closeModalAnamnesis="closeModalAnamnesis"
      @newHistory="newHistory"
    />

    <v-dialog v-model="loading" width="300px">
      <v-card height="100px" class="d-flex justify-center align-center">
        <v-card-text>
          <span class="title font-weight-bold">Cargando...</span>
          <div class="text-center">
            <v-progress-linear height="8" indeterminate color="green"></v-progress-linear>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import HistorialClinica from '../../components/historia-clinica/HistoriaClinicaComponent.vue'
import moment from "moment";
export default {
  components: {
    HistorialClinica
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Nombre completo",
          align: "left",
          sortable: false,
          value: "nombreCompleto"
        },
        { text: "DPI", value: "dpi" },
        { text: "Grupo Étnico", value: "grupoEtnico" },
        { text: "Motivo de Consulta", value: "motivoDeConsulta" },
        { text: "Diagnóstico Final", value: "diagnosticoFinal" },
        { text: "Fecha Admision", value: "dateAdmision" },
        // { text: "Acciones", value: "action" }
      ],
      dataRegistersMedicals: [],
      dialogHistorialMedico: false,
      dialogRehabilitacion: false,
      loading: false,

        paginationPage: 1,
      paginationLenght: 0,
      pagination: {
        pagina: 1,
        rowsPerPage: 5
      },
    };
  },
  watch: {
    paginationPage: function() {
      this.dataRegistersMedicals = [];
      this.getHistoriaClinica();
    }
  },
  methods: {

    openDialogRegistroMedico() {
      this.dialogHistorialMedico = true;
 
    },
    closeModalAnamnesis() {
      this.dialogHistorialMedico = false;
      this.$store.commit("clearStore");
    },
 
    async newHistory(data) {
      this.dialogHistorialMedico = false;
      this.loading = true;

      const response = await this.$store.dispatch("newClinicHistory", data);

      this.loading = false;
      if (response.status === 200) {
        const title = "Nueva historia clínica creada con éxito!";
        const message = "Nueva historia clínica exitosamente";
        this.showAlert(title, message, "success");
        this.getHistoriaClinica()
      } else {
        const title = "Nueva historia clínica creada sin éxito!";
        const message = "Nueva historia clínica  no se ha creado";
        this.showAlert(title, message, "error");
      }
    },

    showAlert(title, message, type) {
      this.$swal.fire(title, message, type);
    },
 
    async getHistoriaClinica() {
      this.dataRegistersMedicals = [];
      this.loading = true;
      
      var pagination = {
        pagina: this.paginationPage,
        rowsPerPage: 5
      };

      const response = await this.$store.dispatch("getAllHistory", {
        pagination
      });

      this.loading = false;
      if (response.status === 200 ) {
        this.paginationLenght=response.data.pages
        response.data.registrosFundabiem.map(register => {
          
          const { fechaDeRegistro, motivoDeConsulta, diagnosticoFinal,} = register;
          const dateAdmision = moment(fechaDeRegistro).format("L");

          const {
            idPaciente,
            primerApellido,
            primerNombre,
            segundoApellido,
            segundoNombre,
            grupoEtnico,
            dpi
          } = register.paciente.persona;

          const nombreCompleto = `${primerNombre} ${segundoNombre} ${primerApellido} ${segundoApellido}`;

          this.dataRegistersMedicals.push({
            motivoDeConsulta,
            diagnosticoFinal,
            idPaciente,
            dateAdmision,
            nombreCompleto,
            grupoEtnico,
            dpi
          });

        });
      }

    }
  },
  mounted() {
    this.getHistoriaClinica();
  }
};
</script>
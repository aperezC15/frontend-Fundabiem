<template>
  <v-container grid-list-lg class="mb-5">
    <v-layout row wrap class="mb-5">
      <v-flex xs12>
        <v-layout text-center wrap>
          <v-flex>
            <h1 class="text-xs-center text-uppercase">Registros Médicos</h1>
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
                  class="ma-2"
                  fab
                  text-color="#000000"                  
                  v-on="on"
                  color="#039BE5"
                  @click="openDialogRegistroMedico"
                >
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <span>Nuevo registro Médico</span>
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

            <template v-slot:item.action="{item}">
              <v-row>
                 <v-col cols="12" md="6">
                <v-tooltip bottom color="#FF6600">
                  <template v-slot:activator="{ on }">
                    <v-btn
                      fab
                      color="#FF6600"
                      dark
                      v-if="!item.diagnostico"
                      @click="openDetailRegister(item)"
                      v-on="on"
                    >
                      <v-icon>how_to_reg</v-icon>
                    </v-btn>
                  </template>
                  <span>COMPLETAR EL REGISTRO MÉDICO</span>
                </v-tooltip>
                     </v-col>
                <v-col cols="12" md="6">
                  <v-tooltip bottom color="#009933">
                    <template  v-slot:activator="{ on }">
                      <v-btn
                        fab
                        dark
                        v-if="item.diagnostico"
                        color="#009933"
                        @click="programarCitas(item)"
                        v-on="on"
                      >
                        <v-icon>notes</v-icon>
                      </v-btn>
                    </template>
                    <span>PROGRAMACIÓN DE CITAS</span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </template>
            <template v-slot:no-results>
              <v-alert type="error">EL REGISTRO "{{search}}" NO SE ENCUENTRA EN LA BASE DE DATOS</v-alert>
            </template>
          </v-data-table>
          <div class="text-center">
            <v-pagination color="#3949AB"
              v-model="paginationPage"
              :length="paginationLenght"
            ></v-pagination>
          </div>
        </v-card>
      </v-flex>
    </v-layout>

    <registro-medico
      :dialogRegistroMedico="dialogRegistroMedico"
      @closeModalRehabilitation="closeModalRehabilitation"
      @saveRehabilitacion="saveRehabilitacion"
    />

    <registro-medico-detalle
      :dialogRegistroMedicoDetalle="dialogRegistroMedicoDetalle"
      :paciente="paciente"
      :historialClinico="historialClinico"
      :showAlertDetalle="showAlertDetalle"
      @closeModalDetalle="closeModalDetalle"
      @completarRegistro="completarRegistro"
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

    <new-cites-component
      :terapias="terapias"
      :showEstados="false"
      :closeModalCitesC="closeModalCitesC"
      @closeModalCites="closeModalCites"
      @newCite="newCite"
    />
  </v-container>
</template>

<script>
import RegistroMedico from "../../components/registro-medico/RegistroMedicoComponent.vue";
import RegistroMedicoDetalle from "../../components/registro-medico/RegistroMedicoDetalle.vue";
import NewCitesComponent from "../../components/citas/NewCites.vue";
const namespace = "oidcStore/";

import moment from "moment";
export default {
  components: {
    RegistroMedico,
    RegistroMedicoDetalle,
    NewCitesComponent
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
        { text: "historial Clinico", value: "historialClinico" },
        {
          text: "Nombre completo",
          align: "left",
          sortable: false,
          value: "nombreCompleto"
        },
        { text: "DPI", value: "dpi" },
        { text: "Grupo Étnico", value: "grupoEtnico" },
        { text: "Fecha Admision", value: "dateAdmision" },
        { text: "Acciones", value: "action" }
      ],
      dataRegistersMedicals: [],
      dialogRegistroMedico: false,
      dialogRehabilitacion: false,
      loading: false,
      dialogRegistroMedicoDetalle: false,
      historialClinico: {},
      paciente: {},
      idRegistroMedico: "",
      showAlertDetalle: false,
      closeModalCitesC: false,
      user: {},
      terapias: [],
      idPaciente: ""
    };
  },
  watch: {
    paginationPage: function() {
      this.dataRegistersMedicals = [];
      this.getMedicalsRegisters();
    }
  },
  methods: {
    openDialogRegistroMedico() {
      this.dialogRegistroMedico = true;
      this.$store.dispatch("getPaises");
    },

    async saveRehabilitacion(data) {
      this.dialogRegistroMedico = false;
      this.loading = true;

      const response = await this.$store.dispatch("newMedicalRegister", data);

      this.loading = false;
      if (response.status === 200) {
        this.getMedicalsRegisters();
        const title = "Registro médico creado exitosamente!";
        const message = "Registro médico creado exitosamente";
        this.showAlert(title, message, "success");
      } else {
        const title = "El registro medico no fue registrado";
        const message = "Intente de nuevo";
        this.showAlert(title, message, "error");
      }
    },

    showAlert(title, message, type) {
      this.$swal.fire(title, message, type);
    },
    closeModalRehabilitation() {
      this.dialogRegistroMedico = false;
      this.$store.commit("clearStore");
    },

    async completarRegistro(data) {
      this.dialogRegistroMedicoDetalle = false;
      this.loading = true;

      const newData = {
        idRegistroMedico: this.idRegistroMedico,
        ...data
      };

      const response = await this.$store.dispatch("completeRegister", newData);

      this.loading = false;
      if (response.status === 200) {
        this.getMedicalsRegisters();
        const title = "Se completo el registro médico con éxito!";
        const message = "Se completo el registro médico  exitosamente";
        this.showAlert(title, message, "success");
      } else {
        const title = "No se completo el registro médico!";
        const message = "No se ha completado el registro médico";
        this.showAlert(title, message, "error");
      }
    },

    async openDetailRegister(item) {
      this.showAlertDetalle = false;
      this.idRegistroMedico = "";
      const idRegistro = item.idRegistroMedico;
      this.idRegistroMedico = idRegistro;

      const response = await this.$store.dispatch("getOneMedicalsRegisters", {
        idRegistro
      });
      this.dialogRegistroMedicoDetalle = true;

      if (response.status === 200) {
        const { persona, historialClinico } = response.data[0].paciente;

        this.paciente = {
          ...persona,
          sexo: persona.sexo ? 1 : 2
        };

        this.historialClinico = {
          nombre: historialClinico
        };
      } else {
        this.showAlertDetalle = true;
      }
    },
    closeModalDetalle() {
      this.dialogRegistroMedicoDetalle = false;
    },
    async getMedicalsRegisters() {
      this.dataRegistersMedicals = [];
      this.loading = true;

      var pagination = {
        pagina: this.paginationPage,
        rowsPerPage: 5
      };
      const response = await this.$store.dispatch("getMedicalsRegistros", {
        pagination
      });

      this.loading = false;
      if (
        response.status === 200 &&
        response.data.registrosFundabiem.length >= 0
      ) {
        this.paginationLenght = response.data.pages;
        response.data.registrosFundabiem.map(register => {
          const { fechaAdmision, idRegistroMedico } = register;
          const {
            estaActivo,
            historialClinico,
            idPaciente
          } = register.paciente;
          const {
            primerApellido,
            primerNombre,
            segundoApellido,
            segundoNombre,
            grupoEtnico,
            dpi
          } = register.paciente.persona;
          const diagnostico = register.diagnostico;
          const nombreCompleto = `${primerNombre} ${segundoNombre} ${primerApellido} ${segundoApellido}`;
          var dateAdmision = moment(fechaAdmision).format("L");
          this.dataRegistersMedicals.push({
            estaActivo,
            historialClinico,
            idPaciente,
            dateAdmision,
            nombreCompleto,
            grupoEtnico,
            dpi,
            idRegistroMedico,
            diagnostico
          });

          //modificar aca
        });
      }
    },
    async programarCitas(item) {
      this.idPaciente = item.idPaciente
      this.closeModalCitesC = true
      const response = await this.$store.dispatch("getTerapias");
      if(response.status === 200) {
        const terapias = response.data.map( ({idTerapia, descripcion}) => ({idTerapia, descripcion}))

        this.terapias = terapias
      }
    },
    closeModalCites() {
      this.closeModalCitesC = false;
    },
    async newCite(data) {
      this.loading = true;
      this.closeModalCitesC = false;

      const nuevaCita = {
        idPaciente: this.idPaciente,
        ...data,
        asignadoPor: this.user.sub
      };

      const response = await this.$store.dispatch("newCites", nuevaCita);

      this.loading = false;
      if (response.status === 201) {
        this.getMedicalsRegisters();
        const title = "Se completo la programación de cita con éxito!";
        const message = "Se completo la programación de cita  exitosamente";
        this.showAlert(title, message, "success");
      } else {
        const title = "No se completo la programación de cita!";
        const message = "No se ha completado la programación de citas";
        this.showAlert(title, message, "error");
      }
    },
    getSub() {
      const user = this.$store.getters[namespace + "oidcUser"];
      return user;
    }
  },
  mounted() {
    this.getMedicalsRegisters();
    this.user = this.getSub();
  }
};
</script>
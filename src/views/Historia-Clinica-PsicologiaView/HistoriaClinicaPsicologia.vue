<template>
  <v-container >
    <template v-if="user.role === 'psicologia' ">
      <!-- AQUI MANDAMOS LOS PARAMETROS PARA ABRIR Y CERRAR EL MODAL -->
      <!--variables de datos del formulario @variables = "editedItem" -->
      <ModalHistoriaClinicaPsicologia
        @close-modal-historia-psicologica="CerrarDialogoHistoriaPsicologica"
        @Save_Historia_Psicologica="SaveHistoriaPsicologica"
        :ModalHistoriaPsicologica="DialogoHistoriaPsicologicaHP"
        :ModalTitle="FormTitle"
      />

      <!-- TITULO DE LA PAGINA DE HISTORIA CLINICA PSICOLOGIA -->
      <v-layout text-center wrap>
        <v-flex>
          <h1>HISTORIA CLINICA PSICOLOGIA</h1>
        </v-flex>
      </v-layout>

      <!-- ENCABEZADO DE LA TABLA Y LOS COMPONENTES DEL BOTON REGISTRO NUEVO Y BUSCAR REGISTRO -->
      <v-toolbar flat dark color="#2c2e3f">
        <v-toolbar-title>REGISTROS</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <div class="flex-grow-1"></div>

        <v-text-field
          class="mx-2"
          color="white"
          v-model="Search_Historia_Psicologica"
          label="BUSCAR REGISTRO DE HISTORIA CLINICA PSICOLOGIA"
          append-icon="search"
          single-line
          hide-details
        ></v-text-field>
        <v-btn
          color="indigo"
          title="NUEVO REGISTRO HISTORIA CLINICA PSICOLOGICA"
          @click="OpenDialogoHistoriaPsicologica()"
          fab
          dark
          class="mx-2"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
      <!-- FIN DEL ENCABEZADO DE LA TABLA -->

      <!-- INICIO DE LA TABLA PRINCIPAL -->
      <v-data-table
        hide-default-footer
        :headers="HeaderTablePsicologia"
        :items="DataTablePsicologia"
        :search="Search_Historia_Psicologica"
        class="elevation-1"
      >
        <template v-slot:no-data v-if="DataTablePsicologia.length === 0">
          <v-alert
            class="text-xs-center"
            :value="true"
            color="warning"
            icon="warning"
          >No existen registros en la tabla</v-alert>
        </template>

        <template v-slot:no-results>
          <v-alert type="error">EL REGISTRO "{{search}}" NO SE ENCUENTRA EN LA BASE DE DATOS</v-alert>
        </template>
      </v-data-table>
      <v-pagination v-model="paginationPage" :length="paginationLenght"></v-pagination>
      <!-- FIN DE LA TABLA PRINCIPAL -->
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
    </template>

    <no-access v-else />
  </v-container>
</template>

<script>
import { __values } from "tslib";
import ModalHistoriaClinicaPsicologia from "../../components/Historia-Clinica-Psicologia/ModalHistoriaClinicaPsicologia.vue";
import NoAccess from "../../components/alertas/NoAccess.vue";

import moment from "moment";
const namespace = "oidcStore/";
export default {
  components: {
    ModalHistoriaClinicaPsicologia,
    NoAccess
  },

  data: () => ({
    nameRules: [
      v => !!v || "Este campo es requerido"
      //v => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    paginationPage: 1,
    paginationLenght: 0,
    loading: false,
    DialogoHistoriaPsicologicaHP: false,

    // VARIABLE PARA LA BUSQUEDA DE UN REGISTRO DE HISTORIA CLINICA PSICOLOGICA
    Search_Historia_Psicologica: "",

    // ENCABEZADO DEL CUERPO DE LA TABLA DE HISTORIA CLINICA PSICOLOGICA
    HeaderTablePsicologia: [
      { text: "NOMBRE", value: "nombreCompleto", align: "center" },
      { text: "SEXO", value: "_sexo", align: "center" },
      { text: "ESTUDIOS", value: "escolaridad", align: "center" },
      {
        text: "ORIGEN Y PROCEDENCIA",
        value: "origenProcedencia",
        align: "center"
      },
      { text: "OCUPACION", value: "ocupacion", align: "center" },
      { text: "Fecha", value: "_fechaDeRegistro", align: "center" },
      { text: "ACCION", value: "action", align: "center", sortable: false }
    ],
    // DECLARAMOS EL ARRAY QUE CONTENDRA LA INFORMACION DE LOS REGISTROS
    DataTablePsicologia: [],
    editedIndex: -1,
    user: {}
  }),

  computed: {
    FormTitle() {
      return this.editedIndex === -1
        ? "NUEVO REGISTRO DE HISTORIA CLINICA PSICOLOGICA"
        : " EDITAR REGISTRO DE HISTORIA CLINICA PSICOLOGICA";
    }
  },

  watch: {
    paginationPage: function() {
      this.DataTablePsicologia = [];
      this.getAllHistoriasPsicologicas();
    }
  },

  // metodos de la pagina
  methods: {
    async getAllHistoriasPsicologicas() {
      this.DataTablePsicologia = [];
      this.loading = true;
      var pagination = {
        pagina: this.paginationPage,
        rowsPerPage: 5
      };

      const response = await this.$store.dispatch(
        "getAllHisotirasPsicologicas",
        { pagination }
      );
      this.loading = false;
      if (response.data.registrosFundabiem.length > 0) {
        this.paginationLenght = response.data.pages;
        response.data.registrosFundabiem.map(register => {
          const { origenProcedencia, ocupacion, fechaDeRegistro } = register;
          const {
            idPaciente,
            primerApellido,
            primerNombre,
            segundoApellido,
            segundoNombre,
            grupoEtnico,
            dpi,
            sexo,
            escolaridad
          } = register.paciente.persona;
          const nombreCompleto = `${primerNombre} ${segundoNombre} ${primerApellido} ${segundoApellido}`;

          if (sexo) var _sexo = "Masculino";
          else var _sexo = "Feminio";

          var _fechaDeRegistro = moment(fechaDeRegistro).format("L");
          this.DataTablePsicologia.push({
            nombreCompleto,
            _sexo,
            escolaridad,
            origenProcedencia,
            ocupacion,
            _fechaDeRegistro
          });
          this.loading = false;
        });
      }
    },

    OpenDialogoHistoriaPsicologica() {
      this.DialogoHistoriaPsicologicaHP = true;
    },

    CerrarDialogoHistoriaPsicologica() {
      this.DialogoHistoriaPsicologicaHP = false;
    },

    SaveHistoriaPsicologica(data) {
      console.log("recibi la info ==> ", data);
      this.newHistoriaclinicaPsicologica(data);
    },
    async newHistoriaclinicaPsicologica(data) {
      this.loading = true;
      const response = await this.$store.dispatch(
        "newHistoriaClinicaPsicologica",
        data
      );
      if (response.status === 201) {
        const title = "Nueva historia clínica psicologica creada con éxito!";
        const message = "Nueva historia clínica  psicologica";
        this.showAlert(title, message, "success");
        this.getAllHistoriasPsicologicas();
        this.DialogoHistoriaPsicologicaHP = false;
      } else {
        const title = "No fue posible crear la historia clinica psicologica";
        const message = "Intente de nuevo";
        this.showAlert(title, message, "error");
        this.loading = false;
      }
    },
    showAlert(title, message, type) {
      this.$swal.fire(title, message, type);
    },
    getSub() {
      const user = this.$store.getters[namespace + "oidcUser"];
      return user;
    }
  },
  mounted() {
    this.getAllHistoriasPsicologicas();
    this.user = this.getSub();
  }
};
</script>
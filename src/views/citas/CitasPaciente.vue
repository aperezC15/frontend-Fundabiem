<template>
  <v-container grid-list-lg>
    <v-layout text-center wrap>
      <v-flex>
        <h1 class="text-xs-center text-uppercase">Citas del paciente</h1>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs="12">
        <v-btn
          block
          large
          color="info"
          title="PROGRAMAR NUEVA CITA"
          class="mx-2"
          @click="programmingNewCite"
        >
          Programar nueva cita
          <v-icon>add</v-icon>
        </v-btn>
      </v-flex>

      <v-flex xs="12">
        <v-btn
          block
          large
          color="success"
          title="VER CITAS PROGRAMADAS"
          class="mx-2"
          @click="showAllCites"
        >
          Ver citas programadas
          <v-icon>add</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <show-all-cites
      :showCitesModal="showCitesModal"
      :terapias="terapias"
      :estados="estados"
      :errorDB="errorDB"
      @closeModal="closeModal"
    />

    <programar-cita
      :dialogProgramarCita="dialogProgramarCita"
      @CloseProgrammingNewCiteModal="CloseProgrammingNewCiteModal"
    />
  </v-container>
</template>

<script>
import ShowAllCites from "../../components/citas/ShowAllCites.vue";
import ProgramarCita from "../../components/citas/ProgramarCita.vue";
export default {
  components: {
    ShowAllCites,
    ProgramarCita
  },
  data() {
    return {
      showCitesModal: false,
      terapias: [],
      estados: [],
      errorDB: false,
      dialogProgramarCita: false
    };
  },
  methods: {
    async showAllCites() {
      this.showCitesModal = true;
      this.errorDB = false;
      const dataTerapias = await this.$store.dispatch("getTerapias");
      const dataEstados = await this.$store.dispatch("getEstados");

      if (dataTerapias.status !== 200 || dataEstados !== 200) {
        const terapias = dataTerapias.data.map(
          ({ idTerapia, descripcion }) => ({ idTerapia, descripcion })
        );
        const estados = dataEstados.data.map(({ idEstado, nombre }) => ({
          idEstado,
          nombre
        }));
        this.terapias = terapias;
        this.estados = estados;
      } else {
        this.errorDB = true;
      }
    },
    closeModal() {
      this.showCitesModal = false;
    },
    // nueva cita
    programmingNewCite() {
      this.dialogProgramarCita = true;
    },
    CloseProgrammingNewCiteModal() {
      this.dialogProgramarCita = false;
    }
  }
};
</script>
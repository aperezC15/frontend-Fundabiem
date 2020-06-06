<template>
  <v-container grid-list-lg>
    <pacientereporte :terapias="terapias" />
  </v-container>
</template>
 
<script>
import ReportePaciente from "../../components/Reportes/Reporte-paciente.vue";

export default {
  components: {
    pacientereporte: ReportePaciente
  },
  data() {
    return {
      terapias: []
    };
  },
  created() {
    this.listarTerapias();
  },

  methods: {
    async listarTerapias() {
      this.errorDB = false;
      const dataTerapias = await this.$store.dispatch("getTerapias");
      //console.log(dataTerapias);
      if (dataTerapias.status == 200) {
        const terapias = dataTerapias.data.map(
          ({ idTerapia, descripcion }) => ({ idTerapia, descripcion })
        );
        this.terapias = terapias;

        this.errorDB = true;
      } //fin listar terapias

      await this.$store.dispatch("getPaises");
    }
  }
};
</script>
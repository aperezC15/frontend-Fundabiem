<template>
  <v-container grid-list-lg>
    <citareporte :terapias="terapias" :estados="estados" />
  </v-container>
</template>

<script>
import ReporteCita from "../../components/Reportes/Reporte-t-Cita.vue";

export default {
  components: {
    citareporte: ReporteCita
  },
  data() {
    return {
      terapias: [],
      estados: []
    };
  },
  created() {
    this.listarTerapias_Estados();
  },
  methods: {
    async listarTerapias_Estados() {
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
    }
  }
};
</script>
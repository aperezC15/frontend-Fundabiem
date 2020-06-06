<template>
  <div>
    <h1>Servicios</h1>
    <v-row align="center">
      <v-col 
        :key="s" 
        class="d-flex" 
        cols="6" 
        sm="3" 
        v-for="(servicio, s) in servicios"
      >
        <v-checkbox
          :label="servicio.nombre"
          data-vv-name="checkbox"
          type="checkbox"
          required
          :key="`chk_${s}`"
        ></v-checkbox>
      </v-col>
    </v-row>
    
  </div>
</template>

<script>
export default {
  data: () => ({
    servicios: []
  }),
  methods: {
    async obtenerServicios() {
      const respuesta = await this.axios.get('/Fundabiem/Terapias')
      this.servicios = respuesta.data
    }
  }, 
  async created() {
    await this.obtenerServicios()
  }
}
</script>
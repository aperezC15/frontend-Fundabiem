<template>
  <div>
    <template v-for="(seccion, i) in secciones"> 
      <h1 :key="`seccion_${i}`" class="mb-4">{{seccion.nombre}}</h1>
      <v-row align="center" :key="`row_${i}`">
        <v-col :key="j" class="d-flex" cols="12" sm="3" v-for="(item, j) in seccion.items">
          <v-select
            :items="item.opciones"
            :label="item.nombre"
            item-text="nombre"
            item-value="id"
            no-data-text="No contiene opciones."
          ></v-select>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
export default {
  data: () => ({
    secciones: []
  }),
  methods: {
    async obtenerSecciones() {
      try {
        const respuesta = await this.axios.get('/EstudioSocioeconomico/secciones')
        
        if (respuesta.status !== 200) {
          return
        }

        this.secciones = respuesta.data
      } catch {

      }
      
    }
  },
  async created() {
    await this.obtenerSecciones()
  }
}
</script>
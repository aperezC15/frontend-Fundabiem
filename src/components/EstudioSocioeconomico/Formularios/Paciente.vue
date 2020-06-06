<template>
  <div>
    <Buscador @buscador="buscador" @cleanData="cleanData" />

    <v-container>
      <v-row v-if="showDataTables" class="pa-5">

      <data-tables :btnEliminar="false" :showEditTable="true" @editLista="editLista" title="Listado de familiares" :headers="headers" :data="data"/>
      </v-row>

    </v-container>

  </div>
</template>

<script>
import Buscador from '@/components/buscador/Buscador'
import DataTables from '../../../components/data-tables/DataTables.vue' 

export default {
  components: {
    Buscador,
    DataTables
  },
  data() {
    return {
      headers: [
        { text: "Primer Nombre", align: "left", sortable: false, value: "primerNombre" },
        { text: "Segundo Nombre", align: "left", sortable: false, value: "segundoNombre" },
        { text: "Primer Apellido", align: "left", sortable: false, value: "primerApellido" },
        { text: "Segundo Apellido", align: "left", sortable: false, value: "segundoApellido" },
        { text: "Parentesco", value: "parentezco" },
        { text: "Acciones", value: "action" }
      ],
      data: [],
      showDataTables: false
    }
  },
  methods: {
     async buscador(search) {
       this.data = []
       this.showDataTables = true
      const data = {
        criterio : search.buscarPor,
        valor : search.valorDeBusqueda
      }

      this.searchPatient = false
      this.showAlertError = false
      this.searchPatient = false

      const response = await this.$store.dispatch('getPacient', data)

      if(response.status === 200) {
        // this.searchPatient =true
        const paciente = response.data

        this.data = response.data.map( ({ persona }) => {
             const { primerNombre, segundoNombre, primerApellido, segundoApellido,  idPersona } = persona
             return {
               primerNombre, segundoNombre, primerApellido, segundoApellido, idPersona
             }
        })


      } else {
         this.showDataTables = false

        this.showAlertError = true
        setTimeout( () => {
          this.showAlertError = false
        },3000)
      }
    },

    cleanData() {
      this.searchPatient = false
      this.showDataTables = false
    },
    editLista(id) {
      console.log(id)
    },
  },
}
</script>
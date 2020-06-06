<template>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar flat dark color="#2c2e3f">
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-divider class="mx-4" vertical></v-divider>
            <div class="flex-grow-1"></div>

            <v-text-field
              v-model="search"
              label="BUSCAR "
              append-icon="search"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>

          <v-data-table :headers="headers" :items="data" :search="search" class="elevation-1">
            <template v-slot:no-data v-if="data.length === 0">
              <v-alert dark
                class="text-xs-center"
                :value="true"
                color="#FF605C"
                icon="warning"
              >No existen registros en la tabla</v-alert>
            </template>

            <template v-slot:item.action="{item}">
              <v-btn
                v-if="btnEliminar"
                title="ElIMINAR REGISTRO"
                fab
                color="error"
                dark
                @click="eliminarDelListado(item.id)"
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </template>
            <template v-slot:item.action="{item}" >
              <v-btn
                v-if="showEditTable"
                title="REGISTRO"
                fab
                color="warning"
                dark
                @click="editLista(item)"
              >
                <v-icon>edit</v-icon>
              </v-btn>
            </template>
            <template v-slot:no-results>
              <v-alert type="error">EL REGISTRO "{{search}}" NO SE ENCUENTRA EN LA BASE DE DATOS</v-alert>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>


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
    </v-layout>
</template>

<script>

export default {
 props: {
     headers: Array,
     data: Array,
     title: String,
     btnEliminar: Boolean,
     showEditTable: Boolean
 },

  data() {
    return {
      search: "",
      loading: false,
    }
  },
  methods: {
    eliminarDelListado(item) {
      this.$emit('eliminarDelListado', item)
    },
    editLista(item) {
      this.$emit('editLista', item)
    }
  },

};
</script>
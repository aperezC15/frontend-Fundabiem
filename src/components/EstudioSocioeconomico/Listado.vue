<template>
  <div>
    <v-toolbar flat dark color="#2c2e3f">
      <v-toolbar-title>REGISTROS</v-toolbar-title>

      <v-divider class="mx-4" vertical></v-divider>
      <div class="flex-grow-1"></div>
      
      <v-text-field 
        color="white" 
        v-model="search" 
        label="BUSCAR REGISTRO ESTUDIO SOCIOECONOMICO" 
        append-icon="search" 
        single-line 
        hide-details
      ></v-text-field>                        
                  
      <v-btn 
        fab
        color="indigo"  
        title="NUEVO ESTUDIO SOCIOECONOMICO" 
        class="mx-2" 
        dark 
        @click="$emit('abrir-dialogo')"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>    

    <v-data-table
      :headers="headers"
      :items="datos"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:item.action="{item}">
          <v-icon small class="mr-2" title="EDITAR REGISTRO DE ESTUDIO SOCIOECONOMICO" @click="editItem(item)">edit</v-icon>
      </template>
      <template v-slot:no-results>
          <v-alert type="error">EL REGISTRO "{{search}}" NO SE ENCUENTRA EN LA BASE DE DATOS</v-alert>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ['headers', 'datos'],
  data: () => ({
    search: ''
  })
}
</script>
<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="familiar.nombre"
              :rules="regla.nombre"
              label="Nombre"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="familiar.estadoCivil"
              label="Estado civil"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="familiar.parentezco"
              label="Parentezco"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="2">
            <v-text-field
              v-model="familiar.edad"
              label="Edad"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="familiar.escolaridad"
              label="Escolaridad"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="familiar.ocupacion"
              label="Ocupación"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="2">
            <v-text-field
              v-model="familiar.salario"
              label="Salario"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <div class="text-center ">
      <v-btn rounded color="primary" dark
        @click="agregarFamiliar"
      >
        <v-icon class="mr-4">person_add</v-icon>
      Agregar familiar</v-btn>
    </div>

    <v-data-table
      :headers="header"
      :items="grupoFamiliar"
      class="elevation-1 my-4"
      no-data-text="Aún no se han registrado familiares del paciente."
    >
      <template v-slot:item.action="{ item }">
        <v-icon
            small
            class="mr-2"
            @click="eliminar(item)" >
            delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: ['grupoFamiliar'],
  data: () => ({
    valid: true,
    header: [
      { text: 'Nombre', value: 'nombre' },
      { text: 'Estado civil', value: 'estadoCivil' },
      { text: 'Parentezco', value: 'parentezco' },
      { text: 'Edad', value: 'edad' },
      { text: 'Escolaridad', value: 'escolaridad' },
      { text: 'Ocupación', value: 'ocupacion' },
      { text: 'Salario', value: 'salario' },
      { text: 'Acciones', value: 'action' },
    ],
    familiar: {
      nombre: '',
      estadoCivil: '',
      parentezco: '',
      edad: '',
      escolaridad: '',
      ocupacion: '',
      salario: ''
    },
    familiarDefault: {
      nombre: '',
      estadoCivil: '',
      parentezco: '',
      edad: '',
      escolaridad: '',
      ocupacion: '',
      salario: ''
    },
    regla: {
      nombre: [
        v => !!v || 'El campo "nombre" es requerido.',
        v => v.length <= 100 || 'El nombre no debe exceder de 100 caracteres.'
      ]
    }
  }),
  methods: {
    agregarFamiliar() {
      this.$emit('agregar-grupo-familiar', this.familiar)
      Object.assign(this.familiar, this.familiarDefault)
    }
  }
}
</script>
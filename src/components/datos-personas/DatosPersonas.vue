<template>
    <v-form v-model="formDatosPersonales" ref="formPersonas">
  <v-row>
      <v-col cols="12" sm="4" md="3">
        <v-text-field :readonly="readonly" v-model="paciente.primerNombre" :rules="rulesInput" label="1er. Nombre" hint="El campo es requerido" ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <v-text-field :readonly="readonly" v-model="paciente.segundoNombre" label="2do. Nombre" hint="El campo es opcional" ></v-text-field>
      </v-col>

      <v-col cols="12" sm="4" md="3">
        <v-text-field :readonly="readonly" v-model="paciente.primerApellido" :rules="rulesInput" label="1er Apellido" hint="El campo es requerido" ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <v-text-field :readonly="readonly" v-model="paciente.segundoApellido"  label="2do. Apellido" hint="El campo es opcional" ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4" md="3" v-if="familiar === 1">
        <v-text-field :readonly="readonly" v-model="historialClinico.nombre" :rules="rulesInput" label="His. Clínica" hint="El campo es requerido" ></v-text-field>
      </v-col>
    
      <v-col cols="12" sm="4" md="3">
        <v-select :readonly="readonly" v-model="paciente.sexo" :items="sexosArray" :rules="rulesInput" item-value="id" item-text="valor" label="Sexo" hint="El campo es requerido"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="4" md="3"  v-if=" familiar === 1 && !readonly">
          <v-menu offset-y ref="paciente.menu2" v-model="paciente.menu2" :close-on-content-click="false"  transition="scale-transition"   min-width="290px" >
              <template v-slot:activator="{ on }">
                <v-text-field :readonly="readonly" v-model="paciente.fechaNacimiento" label="Fecha de nacimiento" :rules="rulesInput" prepend-icon="event"  v-on="on" ></v-text-field>
              </template>
              <v-date-picker v-if=" familiar === 1" v-model="paciente.fechaNacimiento" no-title >
              </v-date-picker>
            </v-menu>
          </v-col>

      <v-col cols="12" sm="4" md="3"  v-if="familiar === 2 && !readonly">
          <v-menu  ref="menu" v-model="paciente.menu2" :close-on-content-click="false"   min-width="290px" >
              <template v-slot:activator="{ on }">
                <v-text-field :readonly="readonly" v-model="paciente.fechaNacimiento" label="Fecha de nacimiento" :rules="rulesInput" prepend-icon="event"  v-on="on" ></v-text-field>
              </template>
              <v-date-picker v-if="familiar === 2" v-model="paciente.fechaNacimiento" no-title >
              </v-date-picker>
            </v-menu>
      </v-col>

      <v-col cols="12" sm="4" md="3" v-if="readonly" >
        <v-text-field :readonly="readonly" v-model="paciente.fechaNacimiento" :rules="rulesInput" type="text" label="Fecha de nacimiento" hint="El campo es requerido"
        ></v-text-field>
      </v-col>


      <v-col cols="12" sm="4" md="3" >
        <v-text-field :readonly="readonly" v-model="paciente.dpi" :counter="13" :rules="rulesInputDpi" type="text" label="DPI" hint="El campo es requerido"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="4" md="3">
        <v-select :readonly="readonly" v-model="paciente.grupoEtnico" :items="grupoEtnicos" :rules="rulesInput" item-value="valor" item-text="valor" label="Grupo Étnico" hint="El campo es requerido"
        ></v-select>
      </v-col>

      <v-col cols="12" sm="4" md="3" >
           <v-select
           :readonly="readonly"
           :rules="rulesInput"
            :items="escolaridad"
            :menu-props="{ top: true, offsetY: true }"
           label="Seleccione la escolaridad" hint="El campo es requerido"
            v-model="paciente.escolaridad"
          ></v-select>
      </v-col>

      <v-col cols="12" sm="4" md="3" >
          <v-select
          :readonly="readonly"
           :rules="rulesInput"
            :items="religion"
            :menu-props="{ top: true, offsetY: true }"
           label="Religión" hint="El campo es requerido"
            v-model="paciente.religion"
          ></v-select>

      </v-col>

      <v-col cols="12" sm="4" md="3" v-if="familiar === 2">
           <v-select
           :rules="rulesInput"
            :items="items"
            :menu-props="{ top: true, offsetY: true }"
           label="Parentesco familiar" hint="El campo es requerido"
            v-model="paciente.parentezco"
          ></v-select>

      </v-col>


      <v-col cols="12" sm="4" md="3" v-if="familiar === 2">
        
       <v-btn color="primary mt-3" :disabled="!formDatosPersonales"  @click="agregarAlListado">Agregar al listado</v-btn>
      </v-col>

  </v-row>
    </v-form>
</template>

<script>
export default {
  props: {
    paciente: Object,
    familiar: Number,
    historialClinico: Object,
    readonly: Boolean
  },
  data() {
    return {
      rulesInput: [
          v => !! v || "El campo es obligatorio"
        ],
      rulesInputDpi: [
        v => !! v || "El campo es obligatorio",
        // v => v.length <= 13 || 'El DPI debe contener 13 digitos',
      ],
    formDatosPersonales: false,
    id: 0,
      grupoEtnicos: [
          { id: 1, valor: "Ladino", },
          { id: 2, valor: "Maya"},
          { id: 3, valor: "Garifuna"},
          { id: 4, valor: "Xinca"}
        ],
      sexosArray: [
          { id: 1, valor: "Masculino", },
          { id: 2, valor: "Femenino"}
      ],
      items: ['Papá', 'Mamá', 'Encargada', 'Hermano', 'Hermana', 'Tío', 'Tía', 'Primo', 'Prima', 'Abuelo', 'Abuela'],
      religion: ['Cristiana', 'Mormon', 'Católico', 'Ateo', 'Testigo de Jehová'],
      escolaridad: ['Ninguno','Pre-primaria', 'Kinder', 'Parvulos','Primaria', 'Básico', 'Diversificado', 'Universidad'],
    };
  },
  methods: {
    agregarAlListado() {
      this.id = this.id + 1
      const data = {
        ...this.paciente,
        id: this.id,
      }

      this.$emit("agregarAlListado", data)
      this.$refs.formPersonas.reset()
    }
  },
};
</script>
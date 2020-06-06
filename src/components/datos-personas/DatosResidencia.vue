<template>
  <v-form v-model="formDatosResidencia" >
   <alert-error-global v-if="showError" message="Ocurrió un inconveniente intente más tarde!" />
    <v-row>
      <v-col cols="12" sm="4">
          <v-autocomplete v-model="datosResidencia.pais" :rules="rulesInput" :items="getPaises" item-value="idPais" item-text="nombre" dense label="Seleccione el país"
          @change="getDepartamento"
            ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="4" >
        <v-autocomplete :disabled="!disabledDepartamento" v-model="datosResidencia.departamento" :rules="rulesInput" :items="getDepartamentos" item-value="idDepartamento" item-text="nombre" dense label="Seleccione el departamento"
        @change="getMunicipio"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="4">
      <v-autocomplete :disabled="!disabledMunicipio"  v-model="datosResidencia.idMunicipio" :rules="rulesInput" :items="getMunicipios" item-value="idMunicipio" item-text="nombre" dense label="Seleccione el municipio"
        ></v-autocomplete>
      </v-col>
      <v-col cols="12" sm="4" md="8">
        <v-text-field v-model="datosResidencia.descripcion" :rules="rulesInput" label="Dirección exacta" hint="El campo es requerido" ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
      <v-autocomplete v-model="datosResidencia.idTipoDireccion" :rules="rulesInput" :items="tipoDireccion" item-value="id" item-text="valor" dense label="Seleccione el tipo de dirección"
        ></v-autocomplete>
      </v-col>

      <!-- <v-col cols="12" sm="4" v-if="encargado">
        <v-text-field type="number" v-model="cantid adTelefono" :rules="rulesInput" label="Número de telefono" hint="El campo es requerido" ></v-text-field>
      </v-col>

      <v-col cols="12" sm="4" v-if="encargado" v-for="(telefono, index) in Number(cantidadTelefono)">
        <v-text-field :key="telefono" :v-model="datosResidencia.telefono" :rules="rulesInput" label="Número de telefono" hint="El campo es requerido" ></v-text-field>
      </v-col> -->
   
    </v-row>
  </v-form> 
</template>

<script>
import { mapGetters } from 'vuex'
import AlertErrorGlobal from '../alertas/alertErrorGlobal.vue'

export default {
  components: {
    AlertErrorGlobal
  },
  props: {
    datosResidencia: Object,
    encargado:Boolean
  },
  computed: {
    ...mapGetters(['getPaises', 'getDepartamentos','getMunicipios', 'showError'])
  },
  data() {
    return {
        rulesInput: [
          v => !! v || "El campo es obligatorio"
        ],
        formDatosResidencia: true,
        cantidadTelefono: 0,
        pais: "",
        departamento: "",
        disabledDepartamento: false,
        disabledMunicipio: false,
        tipoDireccion:[
          { id: 1, valor: "Residencia habitual", },
          { id: 2, valor: "Domicilio"},
        ],
    };
  },
  methods: {
    continueE1() {
      this.$emit('continueE1')
    },
    getDepartamento() {
      this.$store.dispatch('getDepartamento', this.datosResidencia.pais)
      this.disabledDepartamento = true
    },
    getMunicipio() {
      this.$store.dispatch('getMunicipio', this.datosResidencia.departamento)
      this.disabledMunicipio = true
    }
  },
};
</script>
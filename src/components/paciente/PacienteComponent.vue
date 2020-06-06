
<template>
  <v-row>
    <v-dialog
      v-model="dialogDetallesPaciente"
      persistent
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="#2c2e3f">
          <span class="headline text-uppercase">Detalles del paciente</span>
          <div class="flex-grow-1"></div>
          <v-btn color="indigo" rounded @click="closeModalPaciente" class="mx-4">CERRAR</v-btn>
        </v-toolbar>

        <v-card-text>
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step color="indigo" editable :complete="e1 > 1" step="1">Datos del paciente</v-stepper-step>

              <v-divider></v-divider>
              

              <v-stepper-step color="indigo" editable :complete="e1 > 2" step="2">Ciclo De Rehabilitaciones</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step color="indigo" editable :complete="e1 > 3" step="3">Evoluciones Medicas</v-stepper-step>

              <v-divider></v-divider>
              <v-stepper-step color="indigo" editable :complete="e1 > 4" step="4">Registros Medicos</v-stepper-step>

              <v-divider></v-divider>

            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card class="mb-12" >
                    <v-col  md="12">
                      <h2 class="text-uppercase text-center font-weight-bold">Datos personales</h2>
                     <datos-persona    
                      v-if="Object.keys(paciente).length > 0"  
                      :readonly="true"
                        :familiar="1"
                        :historialClinico="historialClinico"
                        :paciente="Object.keys(paciente).length > 0 ? paciente : null" 
                    />
                    </v-col>

                </v-card>

              </v-stepper-content>
 
              <v-stepper-content step="2">
                <v-card class="mb-12" >
                   <h2 class="text-uppercase text-center font-weight-bold">Ciclo de rehabilitaciones</h2>
                   
                       <data-tables :btnEliminar="false" title="Listado de ciclo de rehabilitación" :headers="headerCiclo" :data="cicloDeRehabilitaciones"/>
                     
                </v-card>
            
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card class="mb-12" >
                   <v-col cols="12" sm="12" md="12">
                     <h2 class="text-uppercase text-center font-weight-bold">Evoluciones médicas</h2>

                       <data-tables :btnEliminar="false" title="Listado de evoluciones médicas" :headers="headersEvolucion" :data="evolucionesMedicas"/>

                  </v-col>
                </v-card>

              </v-stepper-content>

              <v-stepper-content step="4">
                <v-card class="mb-12" >
                   <v-col cols="12" sm="12" md="12">
                     <h2 class="text-uppercase text-center font-weight-bold">Registros médicos</h2>

                       <data-tables :btnEliminar="false" title="Listado de registros médicos" :headers="headerMedicos" :data="registrosMedicos"/>
                    
                  </v-col>
                </v-card>

              </v-stepper-content>

      
            </v-stepper-items>

          </v-stepper>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
    
<script>



import DatosPersona from  '../datos-personas/DatosPersonas.vue'
import DataTables from '../data-tables/DataTables.vue' 
import AlertErrorGlobal from '../alertas/alertErrorGlobal.vue'

export default {
 components: {
     DatosPersona,
     DataTables,
     AlertErrorGlobal
 },
  props: {
    dialogDetallesPaciente: Boolean,
    paciente: Object,
    historialClinico: Object,
    cicloDeRehabilitaciones: Array,
    evolucionesMedicas: Array,
    registrosMedicos: Array
  },
  data() {
    return {
      formValid: false,
      e1: 0,

      headerCiclo: [
        { text: "Id ciclo", align: "left", sortable: false, value: "idcicloRehabilitacion" },
        { text: "Diagnóstico", align: "left", sortable: false, value: "dignostico" },
        { text: "Origen", align: "left", sortable: false, value: "origen" },
        { text: "CIE 10", align: "left", sortable: false, value: "cie_10" },
        { text: "fecha", value: "fecha" },
      ],

      headersEvolucion: [
        { text: "Id evolución", align: "left", sortable: false, value: "idEvolucionMedica" },
        { text: "diagnostico", align: "left", sortable: false, value: "diagnostico" },
        { text: "Fecha", align: "left", sortable: false, value: "fecha" },
      ],
      headerMedicos: [
        { text: "Id RegistroMedico", align: "left", sortable: false, value: "idRegistroMedico" },
        { text: "diagnostico", align: "left", sortable: false, value: "diagnostico.diagnosticoFinal" },
        { text: "Recomendación", align: "left", sortable: false, value: "diagnostico.recomendaciones" },
      ],
      data: [],
      arrayFamiliares: [],
      familiares: "",
      rulesInput: [
          v => !! v || "El campo es obligatorio"
      ],
      disabledNextStepper: false,
      disabledEncargada:false,
      disabledEncargadaDireccion: false
    }
  },
  methods: {
    closeModalPaciente() {
      this.e1 = 1
      this.$emit("closeModalPaciente");
    },
    stepper2() {

      const { primerNombre, primerApellido, historialClinico,
      fechaNacimiento, edad, grupoEtnico, escolaridad, religion, dpi, sexo } = this.paciente


      if(primerNombre === "" || primerApellido === "" || historialClinico === "" || fechaNacimiento === "" || edad === "" || grupoEtnico === "" || escolaridad === "" || religion === "" || dpi === "" || sexo === "" ) {
        this.disabledNextStepper = true

        setTimeout(() => {
          this.disabledNextStepper = false
        }, 2000);
        return
      } else {
        this.disabledNextStepper = false
        this.e1 = 2 
      }

    },

    // eventos en datos de familiares
    agregarAlListado(datosFamiliares) {

      const { id, primerNombre, segundoNombre, primerApellido, segundoApellido, fechaNacimiento, sexo, grupoEtnico, religion, parentezco, escolaridad, dpi, isManager } = datosFamiliares

      const dataAgregar = { id, primerNombre, segundoNombre, primerApellido, segundoApellido, fechaNacimiento, sexo, grupoEtnico, religion, parentezco, escolaridad, dpi, isManager }

      this.data.push(dataAgregar)

    },
    eliminarDelListado(id) {
      this.data = this.data.filter( item => item.id !== id)
    },
    // continue step 3
    continueStep3() {

      if(this.data.length <= 0) {
        this.disabledEncargada = true
        setTimeout( () => {
          this.disabledEncargada = false
        }, 2000)
        return
      } 
      this.data.map( item => {
        this.arrayFamiliares.push({
          id: item.id,
          valor: item.parentezco
        })
      })
     this.disabledEncargada = false
      this.e1 = 3
    },



  },


}
</script>


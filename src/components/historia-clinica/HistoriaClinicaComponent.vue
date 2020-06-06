
<template>
  <v-row>
    <v-dialog
      v-model="dialogHistorialMedico"
      persistent
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="#2c2e3f">
          <span class="headline text-uppercase">Historia Clínica</span>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <v-card-text>
                <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step color="indigo" :complete="e1 > 1" step="1">Datos del paciente</v-stepper-step>

              <v-divider></v-divider>
              

              <v-stepper-step color="indigo" :complete="e1 > 2" step="2">Datos de ANAMNESIS</v-stepper-step>


              <v-divider></v-divider>

            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card class="mb-12" >
                    <buscador @buscador="buscador" @cleanData="cleanData" />

                    <alert-error-global v-if="showAlertError" message="No se encontraron resultados para el filtro ingresado" />
                    <alert-error-global v-if="showBusquedaEmpty" message="Debe realizar una búsqueda para poder continuar " />

                    <v-container v-if="searchPatient">
                        <datos-persona :readonly="true" :familiar="1" :historialClinico="historialClinico" :paciente="paciente" />
                    </v-container>

                </v-card>

                  <v-btn class="mx-2" dark color="#1A237E" @click="continuarStepper" >Continuar</v-btn>
                  <v-btn class="mx-2" dark color="#FF6F00"  @click="closeModalAnamnesis">Cerrar</v-btn>
            
              </v-stepper-content>
 
              <v-stepper-content step="2">
                <v-card class="mb-12" >
                   <h2 class="text-uppercase text-center font-weight-bold">ANAMNESIS</h2>
                    <anamnesis @newHistory="newHistory" @goBack="goBack" @closeModalAnamnesis="closeModalAnamnesis" />
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
import Buscador from '../buscador/Buscador.vue'
import DatosPersona from "../datos-personas/DatosPersonas.vue";
import Anamnesis from '../historia-clinica/AnamnesisComponent.vue'
import AlertErrorGlobal from '../alertas/alertErrorGlobal.vue'

export default {
  components: {
    Buscador,
    DatosPersona,
    Anamnesis,
    AlertErrorGlobal
  },
  props: {
    dialogHistorialMedico: Boolean
  },
  data() {
    return {
      e1: 1,
      paciente: {},
      idPaciente: "1",
      searchPatient: false,
       historialClinico : { nombre: "" },
      showAlertError: false,
      showBusquedaEmpty: false

    };
  },
  methods: {
    closeModalAnamnesis() {
      this.$emit("closeModalAnamnesis");
      this.regresarStep1()
    },

    regresarStep1() {
      this.e1 = 1
      this.showAlertError = false
      this.searchPatient = false
      this.paciente = {}
 
    },
 
    continuarStepper() {
      if( Object.keys(this.paciente).length === 0 ) {
        this.showBusquedaEmpty = true

        setTimeout( () => {
          this.showBusquedaEmpty = false
        },3000)
        return
      }
      this.e1 = 2
    },
    goBack() {
      this.e1 = 1
    },
    newHistory(data) {

      const newData = {
        idPaciente: this.paciente.idPaciente,
        ...data
      }

      this.$emit('newHistory',newData)
      this.regresarStep1()
    },
    async buscador(search) {
      const data = {
        criterio : search.buscarPor,
        valor : search.valorDeBusqueda
      }

      this.searchPatient = false
      this.showAlertError = false
      this.searchPatient = false

      const response = await this.$store.dispatch('getPacient', data)

      if(response.status === 200) {
        this.searchPatient =true
        const paciente = response.data[0]

        const { persona} = paciente

        this.paciente = {
          idPaciente: paciente.idPaciente,
          primerNombre: persona.primerNombre,
          segundoNombre: persona.segundoNombre,
          primerApellido: persona.primerApellido,
          segundoApellido: persona.segundoApellido,
          sexo: (persona.sexo) ? 1: 2,
          fechaNacimiento: persona.fechaNacimiento,
          menu2: false,
          grupoEtnico: persona.grupoEtnico,
          escolaridad: persona.escolaridad,
          religion: persona.religion,
          dpi: persona.dpi
        }
        this.historialClinico.nombre = paciente.historialClinico

      } else {
        this.searchPatient = false
        this.showAlertError = true
        setTimeout( () => {
          this.showAlertError = false
        },3000)
      }
    },
    cleanData() {
      this.searchPatient = false
    },
  }
};
</script>



<template>
  <v-row>
    <v-dialog
      v-model="dialogProgramarCita"
      persistent
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="#2c2e3f">
          <span class="headline text-uppercase"></span>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <v-card-text>
                <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step color="indigo" :complete="e1 > 1" step="1">Datos del paciente</v-stepper-step>

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
                  <v-btn dark color="#FF6F00"  @click="CloseProgrammingNewCiteModal">Cerrar</v-btn>
            
              </v-stepper-content>
 
            </v-stepper-items>

          </v-stepper>
           
        </v-card-text>
      </v-card>
    </v-dialog>
     <new-cites 
        :closeModalCitesC="closeModalCitesC" 
        :terapias="terapias" 
          :showEstados="false"
        @closeModalCites="closeModalCites" 
        @newCite="newCite"
    />
  <v-dialog v-model="loading" width="300px">
      <v-card height="100px" class="d-flex justify-center align-center">
        <v-card-text>
          <span class="title font-weight-bold">Cargando...</span>
          <div class="text-center">
            <v-progress-linear height="8" indeterminate color="green"></v-progress-linear>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
    
<script>
import Buscador from '../buscador/Buscador.vue'
import DatosPersona from "../datos-personas/DatosPersonas.vue";
import AlertErrorGlobal from '../alertas/alertErrorGlobal.vue'
import NewCites from './NewCites.vue'
const namespace = "oidcStore/";

export default {
  components: {
    Buscador,
    DatosPersona,
    AlertErrorGlobal,
    NewCites
  },
  props: {
    dialogProgramarCita: Boolean
  },
  data() {
    return {
      e1: 1,
      paciente: {},
      idPaciente: "1",
      searchPatient: false,
       historialClinico : { nombre: "" },
      showAlertError: false,
      showBusquedaEmpty: false,
       closeModalCitesC:false,
       terapias: [],
       user: {},
       loading: false
    };
  },
  methods: {
    CloseProgrammingNewCiteModal() {
      this.$emit("CloseProgrammingNewCiteModal");
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
      this.closeModalCitesC = true
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
        this.getTerapias()
            

      } else {
        this.searchPatient = false
        this.showAlertError = true
        setTimeout( () => {
          this.showAlertError = false
        },3000)
      }
    },

   async getTerapias() {
           const response = await this.$store.dispatch("getTerapias");
        if(response.status === 200) {
            const terapias = response.data.map( ({idTerapia, descripcion}) => ({idTerapia, descripcion}))
            this.terapias = terapias
        }
    },
    cleanData() {
      this.searchPatient = false
    },
    // modal cites
    closeModalCites() {
        this.closeModalCitesC = false
    },
    async newCite(data) {
        this.loading = true
        this.closeModalCitesC = false;
        const newData = {
            idPaciente: this.paciente.idPaciente,
            asignadoPor: this.user.sub,
            ...data
        }
         const response = await this.$store.dispatch("newCites", newData);

        this.regresarStep1()
        this.loading = false;
      if (response.status === 201) {
        const title = "Se completo la programación de cita con éxito!";
        const message = "Se completo la programación de cita  exitosamente";
        this.showAlert(title, message, "success");
      } else {
        const title = "No se completo la programación de cita!";
        const message = "No se ha completado la programación de citas";
        this.showAlert(title, message, "error");
      }
      
    },
    showAlert(title, message, type) {
      this.$swal.fire(title, message, type);
    },
      getSub() {
      const user = this.$store.getters[namespace + "oidcUser"];
      return user;
    }
  },
   mounted() {
    this.user = this.getSub();
  }
};
</script>



<template>
  <v-row>
    <v-dialog
      v-model="dialogRegistroMedico"
      persistent
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="#2c2e3f">
          <span class="headline text-uppercase">Registro Médico</span>
          <div class="flex-grow-1"></div>
          <v-btn color="indigo" rounded @click="closeModalRehabilitation" class="mx-4">CERRAR</v-btn>
        </v-toolbar>

        <v-card-text>
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">Datos del paciente</v-stepper-step>

              <v-divider></v-divider>
              

              <v-stepper-step :complete="e1 > 2" step="2">Datos de los familiares</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 3" step="3">Persona Encargada</v-stepper-step>

              <v-divider></v-divider>

            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card class="mb-12" >
                    <v-col  md="12">
                      <h2 class="text-uppercase text-center font-weight-bold">Datos personales</h2>
                    
                    </v-col>

                </v-card>

                  <v-btn color="primary" @click="stepper2" >Continuar</v-btn>
            
              </v-stepper-content>
 
              <v-stepper-content step="2">
                <v-card class="mb-12" >
                   <h2 class="text-uppercase text-center font-weight-bold">Datos de los familiares</h2>
                  
                </v-card>

                <v-btn color="primary" @click="continueStep3">Continuar</v-btn>

                <v-btn text  @click="e1 = 1">Regresar</v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card class="mb-12" >
                   <v-col cols="12" sm="12" md="12">
                     <h2 class="text-uppercase text-center font-weight-bold">Datos de dirección de la persona encargada</h2>

              
                  </v-col>
                </v-card>

                <v-btn color="primary" @click="saveRehabilitacion">Guardar registro médico</v-btn>

                <v-btn text  @click="e1 = 2">Regresar</v-btn>
              </v-stepper-content>

      
            </v-stepper-items>

          </v-stepper>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
    
<script>

export default {

  props: {
    dialogRegistroMedico: Boolean
  },
  data() {
    return {
    }
  },
  methods: {
  }

}
</script>


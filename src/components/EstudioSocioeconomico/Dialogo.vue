<template>
  <div>
    <v-dialog 
      v-model="dialog" 
      fullscreen 
      hide-overlay 
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="#2c2e3f">
          <v-toolbar-title>Formulario de Estudio Socioeconómico</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="$emit('cerrar-dialogo')">Cerrar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        
        <StepperEstudio 
          :stepper="stepper"
          :estudioSocioeconomico="estudioSocioeconomico"
          @agregar-grupo-familiar="agregarGrupoFamiliar"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import StepperEstudio from './StepperEstudioSocioeconomico'

export default {
  props: ['dialog', 'estudioSocioeconomico'],
  components: {
    StepperEstudio
  },
  data: () => ({
    stepper: {
      paso: '1'
    }
  }),
  methods: {
    agregarGrupoFamiliar(data) {
      this.$emit('agregar-grupo-familiar', data)
    }
  }
}
</script>
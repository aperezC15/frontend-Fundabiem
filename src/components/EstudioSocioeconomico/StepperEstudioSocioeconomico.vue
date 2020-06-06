<template>
  <div>
    <v-stepper 
      v-model="stepper.paso"
    >
        <v-stepper-header >
          <v-stepper-step :complete="stepper.paso > 1" editable step="1" color="#2c2e3f">EVALUADORES</v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step :complete="stepper.paso > 2" editable step="2" color="#2c2e3f">PACIENTE</v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step :complete="stepper.paso > 3" editable step="3" color="#2c2e3f">SERVICIOS</v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step :complete="stepper.paso > 4" editable step="4" color="#2c2e3f">GRUPO FAMILIAR</v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step :complete="stepper.paso > 5" editable step="5" color="#2c2e3f">RECOPILACIÓN DE DATOS</v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step :complete="stepper.paso > 6" editable step="6" color="#2c2e3f">OBSERVACIONES</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <!-- evaluadores -->
          <v-stepper-content step="1">
            <FormularioEvaluadores />
            <v-btn rounded color="#01579B"  dark>SIGUIENTE</v-btn>
          </v-stepper-content>
          <!-- paciente -->
          <v-stepper-content step="2">
            <FormularioPaciente />
          </v-stepper-content>
          <!-- servicios -->
          <v-stepper-content step="3">
            <FormularioServicios />
          </v-stepper-content>
          <!-- grupo familiar -->
          <v-stepper-content step="4">
            <FormularioGrupoFamiliar 
              :grupoFamiliar="estudioSocioeconomico.grupoFamiliar"
              @agregar-grupo-familiar="agregarGrupoFamiliar"
            />
          </v-stepper-content>
          <!-- recopilación de datos -->
          <v-stepper-content step="5">
            <FormularioRecopilacionDeDatos />
          </v-stepper-content>
          <!-- apuntes finales -->
          <v-stepper-content step="6">
            <FormularioObservaciones />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
  </div>
</template>

<script>
import FormularioEvaluadores from './Formularios/Evaluadores'
import FormularioPaciente from './Formularios/Paciente'
import FormularioServicios from './Formularios/Servicios'
import FormularioGrupoFamiliar from './Formularios/GrupoFamiliar'
import FormularioRecopilacionDeDatos from './Formularios/RecopilacionDeDatos'
import FormularioObservaciones from './Formularios/Observaciones'
import Buscador from '@/components/buscador/Buscador'

export default {
  components: {
    Buscador,
    FormularioEvaluadores,
    FormularioPaciente,
    FormularioServicios,
    FormularioGrupoFamiliar,
    FormularioRecopilacionDeDatos,
    FormularioObservaciones
  },
  props: ['stepper', 'estudioSocioeconomico'],
  methods: {
    agregarGrupoFamiliar(data) {
      this.$emit('agregar-grupo-familiar', data)
    }
  }
}
</script>
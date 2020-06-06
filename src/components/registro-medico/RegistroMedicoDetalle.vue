
<template>
  <v-row>
    <v-dialog
      v-model="dialogRegistroMedicoDetalle"
      persistent
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="#2c2e3f">
          <span class="headline text-uppercase">Detalle del registro médico</span>
          <div class="flex-grow-1"></div>
        </v-toolbar>

        <v-card-text>
          <v-card>
            <v-col md="12">
              <h2 class="text-uppercase text-center font-weight-bold mt-3">Datos personales</h2>
              <datos-persona
                :historialClinico="historialClinico"
                :familiar="1"
                :paciente="paciente"
                :readonly="true"
              />

              <alert-error-global
                v-show="showAlertDetalle"
                message="Ocurrió un error al obtener datos del paciente. Intente de nuevo"
              />
            </v-col>

            <h2 class="text-uppercase text-center font-weight-bold">Completar el registro</h2>
            <v-form ref="formRef" v-model="formValid">
              <v-row class="pa-3">
                <v-col cols="12" sm="6">
                  <v-textarea
                    :rules="rulesInput"
                    v-model="diagnosticoFinal"
                    solo
                    label="Diagnóstico Final"
                    auto-grow
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-textarea
                    :rules="rulesInput"
                    v-model="recomendaciones"
                    solo
                    label="Recomendaciones"
                    auto-grow
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>

            <v-card-actions class="pa-3">
              <v-btn dark :disabled="!formValid" color="#1A237E" @click="completarRegistro">Continuar</v-btn>
              <v-btn dark color="#FF6F00" @click="closeModalDetalle" class="mx-4">CERRAR</v-btn>
            </v-card-actions>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>


  </v-row>
</template>
    
<script>
import DatosPersona from "../datos-personas/DatosPersonas.vue";
import AlertErrorGlobal from "../alertas/alertErrorGlobal.vue";

export default {
  components: {
    DatosPersona,
    AlertErrorGlobal,
  },
  props: {
    dialogRegistroMedicoDetalle: Boolean,
    historialClinico: Object,
    paciente: Object,
    showAlertDetalle: Boolean,
  },
  data() {
    return {
      formValid: false,
      rulesInput: [v => !!v || "El campo es obligatorio"],
      diagnosticoFinal: "",
      recomendaciones: "",
      formValid: false,
    };
  },
  methods: {
    closeModalDetalle() {
      this.$emit("closeModalDetalle");
      this.$refs.formRef.reset();
    },
    completarRegistro() {
      const data = {
        diagnosticoFinal: this.diagnosticoFinal,
        recomendaciones: this.recomendaciones
      };

      this.$emit("completarRegistro", data);
      this.$refs.formRef.reset();
    },
  },

};
</script>


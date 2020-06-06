
<template>
  <v-row>
    <v-dialog
      v-model="dialogEvolucionMedica"
      persistent
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="#2c2e3f">
          <span class="headline text-uppercase">NUEVA EVOLUCIÓN {{ ruta === 'tecnica' ? "TÉCNICA": "MÉDICA"}}  </span>
          <div class="flex-grow-1"></div>
          <v-btn color="indigo" rounded class="mx-4" @click="closeDialog">CERRAR</v-btn>
        </v-toolbar>

        <v-card-text>
          <v-card class="mb-12">
            <buscador @buscador="buscador" @cleanData="cleanData" />

            <v-container>
              <alert-error-global
                v-if="showAlertError"
                message="No se encontraron resultados para el filtro ingresado"
              />
            </v-container>

            <v-container v-if="searchPatient">
              <datos-persona
                :readonly="true"
                :familiar="1"
                :historialClinico="historialClinico"
                :paciente="paciente"
              />
            </v-container>
            <v-container v-if="searchPatient">
              <v-form v-model="formValidEvolucion" ref="refEvolucion">
                <v-row>
                  <v-col cols="12" sm="4" >
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="fecha"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="fecha"
                          label="Seleccione la fecha"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker :rules="rulesInput" v-model="fecha" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(fecha)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="8">
                    <v-textarea
                      :rules="rulesInput"
                      v-model="diagnostico"
                      solo
                      label="Diagnóstico"
                      auto-grow
                    ></v-textarea>
                  </v-col>
                </v-row>
              <v-card-actions>
                <v-btn
                  color="primary ma-2"
                  :disabled="!formValidEvolucion"
                  @click="saveEvolucionMedica"
                >nueva evolución {{ ruta === 'tecnica' ? "TÉCNICA": "MÉDICA"}}  </v-btn>
                <v-btn color="error" @click="closeModalEvolucion">Cerrar</v-btn>
              </v-card-actions>
              </v-form>
            </v-container>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
    
<script>
import Buscador from "../buscador/Buscador.vue";
import DatosPersona from "../datos-personas/DatosPersonas.vue";
import AlertErrorGlobal from "../alertas/alertErrorGlobal.vue";

export default {
  components: {
    Buscador,
    DatosPersona,
    AlertErrorGlobal
  },
  props: {
    dialogEvolucionMedica: Boolean,
    ruta: String
  },
  data() {
    return {
      paciente: {},
      searchPatient: false,
      historialClinico: { nombre: "" },
      showAlertError: false,
      objetivosIdentificacion: {},
      diagnostico: "",
      menu: false,
      fecha: new Date().toISOString().substr(0, 10),
      rulesInput: [v => !!v || "El campo es requerido"],
      formValidEvolucion: false
    };
  },
  methods: {
    closeModalEvolucion() {
      this.$emit("closeModalEvolucion");
      this.$refs.refEvolucion.reset();
      this.searchPatient = false;
    },

    closeDialog() {
        this.$emit('closeDialog')
          this.searchPatient = false;
    },

    saveEvolucionMedica() {

      const data = {
        idPaciente: this.paciente.idPaciente,
        diagnostico: this.diagnostico,
        fecha: this.fecha
      };

      this.$emit("saveEvolucionMedica", data);
      this.$refs.refEvolucion.reset()
      this.searchPatient = false
    },

    async buscador(search) {
      const data = {
        criterio: search.buscarPor,
        valor: search.valorDeBusqueda
      };

      this.searchPatient = false;
      this.showAlertError = false;
      this.searchPatient = false;

      const response = await this.$store.dispatch("getPacient", data);

      if (response.status === 200) {
        this.searchPatient = true;
        const paciente = response.data[0];

        const { persona } = paciente;

        this.paciente = {
          idPaciente: paciente.idPaciente,
          primerNombre: persona.primerNombre,
          segundoNombre: persona.segundoNombre,
          primerApellido: persona.primerApellido,
          segundoApellido: persona.segundoApellido,
          sexo: persona.sexo ? 1 : 2,
          fechaNacimiento: persona.fechaNacimiento,
          menu2: false,
          grupoEtnico: persona.grupoEtnico,
          escolaridad: persona.escolaridad,
          religion: persona.religion,
          dpi: persona.dpi
        };
        this.historialClinico.nombre = paciente.historialClinico;
      } else {
        this.searchPatient = false;
        this.showAlertError = true;
        setTimeout(() => {
          this.showAlertError = false;
        }, 3000);
      }
    },
    cleanData() {
      this.searchPatient = false;
    }
  }
};
</script>


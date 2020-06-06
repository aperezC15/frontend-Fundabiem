<template>
  <v-container grid-list-lg>
    <v-form ref="refFormCiclo" v-model="formValidCiclo">
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto pa-5" max-width="100%" tile>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="origen"
                  :rules="rulesInput"
                  type="text"
                  label="Origen"
                  hint="El campo es requerido"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="cie_10"
                  :rules="rulesInput"
                  type="text"
                  label="cie_10"
                  hint="El campo es requerido"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
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
              <v-col cols="12" sm="6">
                <v-textarea
                  :rules="rulesInput"
                  v-model="dignostico"
                  solo
                  label="Diagnóstico"
                  auto-grow
                ></v-textarea>
              </v-col>

              <v-col cols="12" sm="6">
                <v-textarea :rules="rulesInput" v-model="otros" solo label="Otros" auto-grow></v-textarea>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-textarea
                :rules="rulesInput" 
                  v-model="funcionEstrucCorporales"
                  solo
                  label="Funciones-Estructuras Corporales"
                  auto-grow
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-textarea :rules="rulesInput"  v-model="actividad" solo label="Actividad" auto-grow></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-textarea  :rules="rulesInput"  v-model="participacion" solo label="Participación" auto-grow></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" >
                <v-textarea
                :rules="rulesInput" 
                  v-model="factoresAmbientales"
                  solo
                  label="Factores Ambientales"
                  auto-grow
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" >
                <v-textarea :rules="rulesInput"  v-model="factoresPersonales" solo label="Factores Personales" auto-grow></v-textarea>
              </v-col>
            </v-row>

            <v-card-actions>
              <v-btn
                color="primary"
                :disabled="!formValidCiclo"
                @click="continueStep3"
              >Continuar</v-btn>
              <v-btn text @click="goBack">Regresar</v-btn>
              <v-btn color="error" @click="closeModalRehabilitation">Cerrar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      formValidCiclo: false,
      menu: false,
      fecha: new Date().toISOString().substr(0, 10),
      rulesInput: [v => !!v || "El campo es requerido"],
      funcionEstrucCorporales: "",
      actividad: "",
      participacion: "",
      factoresAmbientales: "",
      factoresPersonales: "",
      dignostico: "",
      origen: "",
      cie_10: "",
      otros: ""
    };
  },
  methods: {

    continueStep3() {

      const data ={
        fecha: this.fecha, 
        funcionEstrucCorporales: this.funcionEstrucCorporales,
        actividad: this.actividad,
        participacion: this.participacion,
        factoresAmbientales: this.factoresAmbientales,
        factoresPersonales: this.factoresPersonales,
        dignostico: this.dignostico,
        origen: this.origen,
        cie_10: this.cie_10,
        otros: this.otros,
      }
      this.$emit("continueStep3", data);
    },
    closeModalRehabilitation() {
      this.$emit("closeModalRehabilitation");
      this.$refs.refFormCiclo.reset();
    },
    goBack() {
      this.$emit("goBack");
    }
  },

};
</script>
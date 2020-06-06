<template>
  <div class="text-center">
    <v-dialog v-model="closeModalCitesC" width="800" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Datos de la cita</v-card-title>

        <v-card-text>
          <v-form v-model="formValid" ref="formCites">
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="idTerapia"
                  :items="terapias"
                  item-value="idTerapia"
                  item-text="descripcion"
                  label="Seleccione la terapia"
                  :rules="rulesInput"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4" v-if="showEstados">
                <v-select
                  v-model="estado"
                  :items="estados"
                  item-value="idEstado"
                  item-text="nombre"
                  label="Seleccione el estado"
                  :rules="rulesInput"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="noOrden" label="Ingrese el no. de orden" :rules="rulesInput"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="fechaCita"
                      label="Seleccione la fecha de cita"
                      prepend-icon="event"
                      readonly
                      :rules="rulesInput"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker locale="es" v-model="fechaCita" @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#FF6F00"
            dark
            rounded
            :disabled="!formValid"
            @click="newCite"
          >Programar citas</v-btn>
          <v-btn color="indigo" dark rounded @click="closeModalCites">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    closeModalCitesC: Boolean,
    terapias: Array,
    showEstados: Boolean
  },
  data() {
    return {
      idTerapia: "",
      estado: "",
      noOrden: "",
      fechaCita: new Date().toISOString().substr(0, 10),
      menu2: false,
      formValid: false,
      rulesInput: [v => !!v || "El campo es obligatorio"]
    };
  },
  methods: {
    newCite() {
      const data = {
        idTerapia: this.idTerapia,
        noOrden: this.noOrden,
        fechaCita: this.fechaCita
      };

      this.$emit("newCite", data);
      this.$refs.formCites.reset();
    },
    closeModalCites() {
      this.$emit("closeModalCites");
      this.$refs.formCites.reset();
    }
  }
};
</script>
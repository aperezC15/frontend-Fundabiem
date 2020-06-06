<template>
  <v-container grid-list-lg>
    <v-form ref="formAnamnesis" v-model="formValid">
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto pa-5" max-width="100%" tile>
            <v-col cols="12">
              <v-textarea
                :rules="rulesInput"
                v-model="motivoConsulta"
                solo
                hint="El campo es requerido"
                label="Motivo de consulta"
              ></v-textarea>
            </v-col>

            <v-row v-for="item in arrayAnamnesis" :key="item.idSeccionAnamnesis">
              <v-col cols="12">
                <h2 class="text-uppercase">{{item.nombre}}</h2>
                <v-row>
                  <v-col
                    cols="12"
                    sm="4"
                    md="3"
                    v-for="itemAnamnesis in item.itemsAnamnesis"
                    :key="itemAnamnesis.idItemAnamnesis"
                  >
                    <v-text-field
                      :label="itemAnamnesis.nombre"
                      @change="changeState(itemAnamnesis.idItemAnamnesis,$event)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <v-col cols="12" >
              <v-textarea
                :rules="rulesInput"
                v-model="diagnosticoFinal"
                solo
                hint="El campo es requerido"
                label="Diagnóstico final"
              ></v-textarea>
            </v-col>

            <v-card-actions>
              <v-btn
                color="primary"
                :disabled="!formValid"
                @click="newHistory"
              >Nueva Historia Clínica</v-btn>
              <v-btn text @click="goBack">Regresar</v-btn>
              <v-btn color="error" @click="closeModalAnamnesis">Cerrar</v-btn>
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
      arrayAnamnesis: [],
      anamnesis: [],
      diagnosticoFinal: "",
      motivoConsulta: "",
      rulesInput: [v => !!v || "El campo es requerido"],
      formValid: false
    };
  },
  methods: {
    async getAnamnesis() {
      const response = await this.$store.dispatch("getAnamnesis");
      if (response.status === 200 && response.data.length >= 0) {
        this.arrayAnamnesis = response.data;
      }
    },
    changeState(idItem, diagnostico) {
      this.anamnesis = this.anamnesis.filter(
        item => item.idItemAnamnesis !== idItem
      );

      this.arrayAnamnesis.map(item => {
        item.itemsAnamnesis.filter(item => {
          if (item.idItemAnamnesis === idItem) {
            this.anamnesis.push({
              idItemAnamnesis: item.idItemAnamnesis,
              diagnostico
            });
          }
        });
      });
    },
    newHistory() {
      const data = {
        motivoConsulta: this.motivoConsulta,
        diagnosticoFinal: this.diagnosticoFinal,
        anamnesis: this.anamnesis
      }

      this.$emit('newHistory', data)
      this.anamnesis = [];
      this.$refs.formAnamnesis.reset()
    },
    closeModalAnamnesis() {
      this.$emit("closeModalAnamnesis");
      this.$refs.formAnamnesis.reset();
    },
    goBack() {
      this.$emit("goBack");
    }
  },
  mounted() {
    this.getAnamnesis();
  }
};
</script>
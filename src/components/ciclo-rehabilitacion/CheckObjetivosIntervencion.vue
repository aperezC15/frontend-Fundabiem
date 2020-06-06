<template>
  <v-container grid-list-lg>
    <v-form ref="formCheck" v-model="formValidCiclo">
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto pa-5" max-width="100%" tile>
            <v-row>
              <v-col cols="12" >
                <h2 class="text-uppercase pb-4">Funciones y Estructuras Corporales</h2>
                 <alert-error-global v-if="showAlertCheck" message="Debe seleccionar al menos un opción de cada select " />

                <v-autocomplete
                    v-model="values"
                    :items="funcionesEC"
                    item-value="id"
                    item-text="valor"
                    dense
                    chips
                    small-chips
                    label="Seleccione las funciones y estructuras corporales"
                    multiple
                ></v-autocomplete>

              </v-col>
              <v-col cols="12" >
                <h2 class="text-uppercase pb-4">Actividad y Participación</h2>

                    <v-autocomplete
                        v-model="values1"
                        :items="ActividadParticipación"
                        item-value="id"
                        item-text="valor"
                        dense
                        chips
                        small-chips
                        label="Seleccione las Actividades y Participaciones"
                        multiple
                    ></v-autocomplete>
                  
              </v-col>
              <v-col cols="12" >
                <h2 class="text-uppercase pb-4">Factores Ambientales</h2>
                <v-autocomplete
                :rules="rulesInput"
                        v-model="values2"
                        :items="FactoresAmbientales"
                        item-value="id"
                        item-text="valor"
                        dense
                        chips
                        small-chips
                        label="Seleccione los Factores Ambientales"
                        multiple
                ></v-autocomplete>
              </v-col>

            </v-row>

            <v-card-actions>
              <v-btn
                color="primary"
                :disabled="!formValidCiclo"
                @click="saveCicloRehabilitacion"
              >Nuevo ciclo Rehabilitación</v-btn>
              <v-btn text @click="goBackStep2">Regresar</v-btn>
              <v-btn color="error" @click="closeModalRehabilitation">Cerrar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import AlertErrorGlobal from '../alertas/alertErrorGlobal.vue'

const modeloCheck = [ 
    { id: 1, valor: 'intervencion' },
    { id: 2, valor: 'tf' }, 
    { id: 3, valor: 'to'}, 
    { id: 4, valor: 'TL'},
    { id: 5, valor: 'MT'},
    { id: 6, valor: 'ET'},
    { id: 7, valor: 'CEMS'},
    { id: 8, valor: 'IREX'},
    { id: 9, valor: 'ps'},
    { id: 10, valor: 'ts'},
    { id: 11, valor: 'ee'},
    { id: 12, valor: 'valoracionInicial'},
    { id: 13, valor: 'valoracionObjetivo'},
    { id: 14, valor: 'valoracionFinal'}
]

export default {
    components: {
        AlertErrorGlobal
    },
  data() {
    return {

      rulesInput: [
        v => !! v || "El campo es obligatorio",
      ],
      formValidCiclo: false,
      funcionesEC: [...modeloCheck],
      ActividadParticipación: [...modeloCheck],
      FactoresAmbientales: [...modeloCheck],
      values: [],
      values1: [],
      values2: [],
      myObjeto: {},
      myObjetoActi: {},
      myObjetoFacto: {},
      showAlertCheck: false

    };
  },
  methods: {
 
    saveCicloRehabilitacion() {
        
        if (this.values.length <=0 || this.values1.length <=0 || this.values2.length <=0 ) {
            this.showAlertCheck = true
            setTimeout(() => {
                this.showAlertCheck = false
            }, 2500);
            return
        }

        this.myObjeto= {}
        this.myObjetoActi= {}
        this.myObjetoFacto= {}

    modeloCheck.filter( modelo => {
          this.values.map( valor => {

              if(valor === modelo.id) {
                 
                 this.myObjeto = {
                     idObjetivo: 1,
                     ...this.myObjeto,
                      [modelo.valor]: true
                 }

              } 
          })
      } )

    modeloCheck.filter( modelo => {
          this.values1.map( valor => {

              if(valor === modelo.id) {
                 
                 this.myObjetoActi = {
                     idObjetivo: 2,
                     ...this.myObjetoActi,
                      [modelo.valor]: true
                 }

              } 
          })
      } )

    modeloCheck.filter( modelo => {
          this.values2.map( valor => {

              if(valor === modelo.id) {
                 
                 this.myObjetoFacto = {
                     idObjetivo: 3,
                     ...this.myObjetoFacto,
                      [modelo.valor]: true
                 }

              } 
          })
      } )

      const detalleCicloRehabilitacion = [
          this.myObjeto,
          this.myObjetoActi,
          this.myObjetoFacto
      ]

      this.$emit("saveCicloRehabilitacion", detalleCicloRehabilitacion);
      this.$refs.formCheck.reset();
      this.values = []
      this.values1= []
      this.values2= []
    },
    closeModalRehabilitation() {
      this.$emit("closeModalRehabilitation");
      this.$refs.formCheck.reset();
    },
    goBackStep2() {
      this.$emit("goBackStep2");
    }
  },

};
</script>
<template>
  <v-container grid-list-lg >
    <v-layout row wrap>
      <v-flex xs12>
                <v-layout text-center wrap>
                <v-flex>
                    <h1  class="text-xs-center text-uppercase"> Consulta general de pacientes</h1>
                </v-flex>
            </v-layout>

        <v-card>
            <buscador 
                @cleanData="cleanData"
                @buscador="buscador"
            />

          <v-toolbar flat dark color="#616161" v-if="!showAlertError" >
            <v-toolbar-title>REGISTROS</v-toolbar-title>
            <v-divider class="mx-4" vertical></v-divider>
            <div class="flex-grow-1"></div>
            
          </v-toolbar>

          <alert-error 
            message="NO EXISTEN REGISTROS PARA EL FILTRO DE BÚSQUEDA"
            v-if="showAlertError"
          />

          <v-data-table v-if="!showAlertError" hide-default-footer :headers="headers" :items="pacientes" :search="search" class="elevation-1">
            <template v-slot:no-data v-if="pacientes.length === 0">
              <v-alert dark
                class="text-xs-center"
                :value="true"
                color="orange lighten-1"
                icon="warning"
              > {{ noData ? "NO EXISTEN REGISTROS PARA EL FILTRO DE BÚSQUEDA" : "REALICE UNA BÚSQUEDA PARA VER LOS REGISTROS" }}</v-alert>
            </template>

            <template v-slot:item.action="{item}">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    fab
                    color="success"
                    dark
                    @click="verDetallesPaciente(item.historialClinico)"
                    v-on="on">
                    <v-icon>edit</v-icon>
                  </v-btn>
                </template>
                <span>Editar evolución médica</span>
              </v-tooltip>
            </template>
       
          </v-data-table>
      
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog v-model="loading" width="300px">
      <v-card height="100px" class="d-flex justify-center align-center">
      <v-card-text>
        <span class="title  font-weight-bold">Cargando...</span>
        <div class="text-center">
            <v-progress-linear
              height="8"
          indeterminate
          color="green"
        ></v-progress-linear>
        </div>
      </v-card-text>
        </v-card> 
    </v-dialog>

    <paciente-component 
        :dialogDetallesPaciente="dialogDetallesPaciente"
        @closeModalPaciente="closeModalPaciente"
        :paciente="paciente"
        :historialClinico="historialClinico"
        :cicloDeRehabilitaciones="cicloDeRehabilitaciones"
        :evolucionesMedicas="evolucionesMedicas"
        :registrosMedicos="registrosMedicos"
    />

  </v-container>
</template>

<script>

let pacienteObject = {
  primerNombre : "",
  segundoNombre : "",
  primerApellido : "",
  segundoApellido : "",
  sexo: "",
  fechaNacimiento: "",
  grupoEtnico: "",
  escolaridad: "",
  religion: "",
  dpi: "",
}

import Buscador from '../../components/buscador/Buscador.vue'
import PacienteComponent from '../../components/paciente/PacienteComponent.vue'
import AlertError from '../../components/alertas/alertErrorGlobal.vue'

import moment from 'moment'
export default {
  components: { 
    Buscador,
    PacienteComponent,
    AlertError
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "Historial clínico", align: "left", sortable: false, value: "historialClinico" },
        { text: "Nombre completo", align: "left", sortable: false, value: "nombreCompleto" },
        { text: "Sexo", value: "_sexo" },
        { text: "DPI", value: "dpi" },
        { text: "Fecha de nacimiento", value: "fecha" },
        { text: "Acciones", value: "action" }

      ],
      pacientes: [ ],
      loading: false,
        noData: false,
        dialogDetallesPaciente: false,
        cicloDeRehabilitaciones: [],
        evolucionesMedicas: [],
        paciente: {
          ...pacienteObject
        },
        registrosMedicos: [],
        historialClinico: { nombre: "" },
        showAlertError : false

    }
  },

  methods: {
      async buscador(data) {

          this.cleanData()

          const newData = {
              criterio: data.buscarPor,
              valor: data.valorDeBusqueda
          }

          const response = await this.$store.dispatch('getPacient', newData)
           this.loading =false

          if(response.status === 200 && response.data.length > 0) {

              const pacientes = response.data.map(({historialClinico, persona}) => {
                  const {dpi , fechaNacimiento, primerNombre, segundoNombre, primerApellido, segundoApellido, sexo} = persona

                  var fecha = moment(fechaNacimiento).format("L")

                  return {
                      nombreCompleto: `${primerNombre} ${segundoNombre} ${primerApellido} ${segundoApellido}`,
                      dpi,
                      fecha,
                      historialClinico,
                      _sexo: sexo ? "Hombre" : "Mujer" 
                  }
              })

              this.pacientes = pacientes

          } else {
              this.showAlertError = true
              this.pacientes = []
              this.noData = true
          }
      },    

    cleanData() {
        this.pacientes = []
        this.loading=false
        this.noData = false
        this.cicloDeRehabilitaciones = []
        this.evolucionesMedicas= []
        this.registrosMedicos = []
        this.historialClinico = {}  
        this.showAlertError = false
    },
    async verDetallesPaciente(historyClinic) {
        this.dialogDetallesPaciente = true

        const response = await this.$store.dispatch('getPacientHistoryClinic', historyClinic)

        if(response.status === 200) {
            const data = response.data[0]

            const {historialClinico, cicloDeRehabilitaciones, evolucionesMedicas, persona, registrosMedicos } = data

            this.historialClinico = {
                nombre: historialClinico
            }

            this.cicloDeRehabilitaciones = cicloDeRehabilitaciones ? cicloDeRehabilitaciones : []
            this.evolucionesMedicas=evolucionesMedicas ? evolucionesMedicas : []

            this.paciente = {
                ...persona,
                 sexo: persona.sexo ? {id: 1} : {id: 2} ,
            }
            this.registrosMedicos = registrosMedicos ?  registrosMedicos : []
        }

    },

    closeModalPaciente() {
        this.dialogDetallesPaciente  = false
        this.cleanData()
    }
 
  },

};
</script>
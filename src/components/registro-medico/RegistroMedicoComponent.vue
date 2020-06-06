
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
              <v-stepper-step color="indigo" :complete="e1 > 1" step="1">Datos del paciente</v-stepper-step>

              <v-divider></v-divider>
              

              <v-stepper-step color="indigo" :complete="e1 > 2" step="2">Datos de los familiares</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step color="indigo" :complete="e1 > 3" step="3">Persona Encargada</v-stepper-step>

              <v-divider></v-divider>

            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card class="mb-12" >
                    <v-col  md="12">
                      <h2 class="text-uppercase text-center font-weight-bold">Datos personales</h2>
                      <datos-persona :historialClinico="historialClinico" :familiar="1"  :paciente="paciente" />

                      <alert-error-global v-if="disabledNextStepper" message="Por favor ingrese todos los campos requeridos del formulario" />

                      <h2 class="text-uppercase text-center font-weight-bold">Datos de residencia</h2>
                      <datos-residencia :datosResidencia="datosResidencia" />
                    </v-col>

                </v-card>

                  <v-btn dark color="#1A237E" @click="stepper2" >Continuar</v-btn>
            
              </v-stepper-content>
 
              <v-stepper-content step="2">
                <v-card class="mb-12" >
                   <h2 class="text-uppercase text-center font-weight-bold">Datos de los familiares</h2>
                      <datos-persona  @agregarAlListado="agregarAlListado" :familiar="2"  :paciente="datosDeFamiliares" />
                      
                      <alert-error-global v-if="disabledEncargada" message="Listado de familiares no puede ir vacio" />

                      <data-tables :btnEliminar="true" @eliminarDelListado="eliminarDelListado" title="Listado de familiares" :headers="headers" :data="data"/>
                </v-card>

                <v-btn class="mx-2"  dark color="#1A237E" @click="continueStep3">Continuar</v-btn>

                <v-btn dark color="#FF6F00"  @click="e1 = 1">Regresar</v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card class="mb-12" >
                   <v-col cols="12" sm="12" md="12">
                     <h2 class="text-uppercase text-center font-weight-bold">Datos de dirección de la persona encargada</h2>

                   <alert-error-global v-if="disabledEncargadaDireccion" message="La dirección de la persona encargada no puede ir vacia" />

                    <v-select v-model="familiares" :items="arrayFamiliares" :rules="rulesInput" item-value="id" item-text="valor" label="Seleccione a persona encargado" hint="El campo es requerido"
                    ></v-select>
                     <datos-residencia :encargado="true" :datosResidencia="direccionEncargado" />
                  </v-col>
                </v-card>

                <v-btn class="mx-2" dark color="#1A237E" @click="saveRehabilitacion">Guardar registro médico</v-btn>

                <v-btn dark color="#FF6F00"  @click="e1 = 2">Regresar</v-btn>
              </v-stepper-content>

      
            </v-stepper-items>

          </v-stepper>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
    
<script>

let pacienteObject = {
  primerNombre : "",
  segundoNombre : "",
  primerApellido : "",
  segundoApellido : "",
  sexo: "",
  fechaNacimiento: new Date().toISOString().substr(0, 10),
  menu2: false,
  grupoEtnico: "",
  escolaridad: "",
  religion: "",
  dpi: "",
}

let historialClinico = { nombre: ""}
let datosResidencia = {
  pais: "",
  departamento: "",
  idMunicipio: "",
  descripcion : "",
  idTipoDireccion: "",
}

import DatosPersona from  '../datos-personas/DatosPersonas.vue'
import DatosResidencia from  '../datos-personas/DatosResidencia.vue'
import DataTables from '../data-tables/DataTables.vue' 
import AlertErrorGlobal from '../alertas/alertErrorGlobal.vue'

export default {
 components: {
     DatosPersona,
     DatosResidencia,
     DataTables,
     AlertErrorGlobal
 },
  props: {
    dialogRegistroMedico: Boolean
  },
  data() {
    return {
      formValid: false,
      mostrarDatosResidencia: true,
      e1: 0,
      paciente: {
       ...pacienteObject
      },
      historialClinico: {...historialClinico} ,
      datosResidencia: {...datosResidencia},
      datosDeFamiliares: {
        ...pacienteObject,
        isManager: false,
        parentezco:""
      },
      direccionEncargado :{ ...datosResidencia },
      headers: [
        { text: "Primer Nombre", align: "left", sortable: false, value: "primerNombre" },
        { text: "Segundo Nombre", align: "left", sortable: false, value: "segundoNombre" },
        { text: "Primer Apellido", align: "left", sortable: false, value: "primerApellido" },
        { text: "Segundo Apellido", align: "left", sortable: false, value: "segundoApellido" },
        { text: "Parentesco", value: "parentezco" },
        { text: "Acciones", value: "action" }
      ],
      data: [],
      arrayFamiliares: [],
      familiares: "",
      rulesInput: [
          v => !! v || "El campo es obligatorio"
      ],
      disabledNextStepper: false,
      disabledEncargada:false,
      disabledEncargadaDireccion: false
    }
  },
  methods: {
    closeModalRehabilitation() {
      this.getCopyData()
      this.e1 = 1
      this.$emit("closeModalRehabilitation");
    },
    stepper2() {

      const { primerNombre, primerApellido, historialClinico,
      fechaNacimiento, edad, grupoEtnico, escolaridad, religion, dpi, sexo } = this.paciente

      const  { idMunicipio, descripcion , idTipoDireccion } = this.datosResidencia

      if(primerNombre === "" || primerApellido === "" || historialClinico === "" || fechaNacimiento === "" || edad === "" || grupoEtnico === "" || escolaridad === "" || religion === "" || dpi === "" || sexo === "" || idMunicipio === "" || descripcion  === "" || idTipoDireccion === "") {
        this.disabledNextStepper = true

        setTimeout(() => {
          this.disabledNextStepper = false
        }, 2000);
        return
      } else {
        this.disabledNextStepper = false
        this.e1 = 2 
      }

    },
    saveRehabilitacion() {
      
      const { idMunicipio, descripcion , idTipoDireccion }  = this.direccionEncargado

      if( idMunicipio === "" || descripcion  === "" || idTipoDireccion === "" ) {
        this.disabledEncargadaDireccion = true
        setTimeout(() => {
          this.disabledEncargadaDireccion = false
        }, 2000);
        return
      }

      const familiaresPaciente = this.data.map( familiar => {

        const { dpi, escolaridad, fechaNacimiento, grupoEtnico, parentezco ,primerApellido ,primerNombre, religion ,segundoApellido, segundoNombre} = familiar

        let isManager;
        let sexo;

        if(familiar.id === this.familiares) {
          isManager = true
        } else {
          isManager = false
        }

        if(familiar.sexo === 1) {
          sexo = true
        } else {
          sexo = false
        }
        return {
         dpi, escolaridad, fechaNacimiento, grupoEtnico, 
         parentezco ,primerApellido ,primerNombre, 
         religion ,segundoApellido, segundoNombre, sexo,
          isManager
        }

      })

      let sexoValida;

      if(this.paciente.sexo === 1) {
        sexoValida = true
      } else {
        sexoValida =false
      }


      const { dpi, escolaridad, fechaNacimiento, grupoEtnico, primerApellido, primerNombre, 
              religion, segundoApellido, segundoNombre } = this.paciente

      const paciente = {  
        dpi,  escolaridad,  
        fechaNacimiento,  
        grupoEtnico,  primerApellido,  primerNombre,  
        religion,  segundoApellido,  segundoNombre,  
        sexo: sexoValida
      }

      const direccionPaciente = { 
        idMunicipio: this.datosResidencia.idMunicipio, 
        descripcion: this.datosResidencia.descripcion, 
        idTipoDireccion: this.datosResidencia.idTipoDireccion 
      } 

      const direccionEncargado = {  idMunicipio,  descripcion,  idTipoDireccion  } 

      const data = {
        paciente,
        historialClinico: this.historialClinico.nombre,
        direccionPaciente,
        familiaresPaciente,
        direccionEncargado
      }
      
      this.getCopyData()
      this.e1 = 1
      this.$emit("saveRehabilitacion", data);
    },
    // eventos en datos de familiares
    agregarAlListado(datosFamiliares) {

      const { id, primerNombre, segundoNombre, primerApellido, segundoApellido, fechaNacimiento, sexo, grupoEtnico, religion, parentezco, escolaridad, dpi, isManager } = datosFamiliares

      const dataAgregar = { id, primerNombre, segundoNombre, primerApellido, segundoApellido, fechaNacimiento, sexo, grupoEtnico, religion, parentezco, escolaridad, dpi, isManager }

      this.data.push(dataAgregar)

    },
    eliminarDelListado(id) {
      this.data = this.data.filter( item => item.id !== id)
    },
    // continue step 3
    continueStep3() {

      if(this.data.length <= 0) {
        this.disabledEncargada = true
        setTimeout( () => {
          this.disabledEncargada = false
        }, 2000)
        return
      } 
      this.data.map( item => {
        this.arrayFamiliares.push({
          id: item.id,
          valor: item.parentezco
        })
      })
     this.disabledEncargada = false
      this.e1 = 3
    },

    getCopyData() {
      this.paciente = {...pacienteObject}
      this.historialClinico = {...historialClinico}
      this.datosResidencia = {...datosResidencia}
      this.direccionEncargado = {...datosResidencia}
      this.data = []
      this.arrayFamiliares = []
    }

  },

}
</script>


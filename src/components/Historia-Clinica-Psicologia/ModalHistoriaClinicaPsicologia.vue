<template>
    <div>
        <!-- INICIO DE LA ESTRUCTURA DEL DIALOGO DEL FORMULARIO DE HISTORIA CLINICA PSICOLOGICA -->
        <v-dialog v-model="ModalHistoriaPsicologica" fullscreen hide-overlay transition="dialog-bottom-transition" >
            <v-card>
                <!-- ENCABEZADO DEL MODAL DE HISTORIA PSICOLOGICA -->
                <v-toolbar dark color="#2c2e3f">
                    <span class="headline">{{ModalTitle}}</span>
                    <div class="flex-grow-1"></div>

                    <v-btn color="indigo" rounded class="mx-4" @click="CloseModalHistoriaPsicologica()">CERRAR</v-btn>
                    <v-btn color="indigo" rounded @click="SaveHistoriaPsicologica()" >GUARDAR DIAGNOSTICO</v-btn>
                </v-toolbar>
                <!-- CUERPO DEL FORMULARIO  -->
                <v-stepper v-model="PasoAPaso">
                    <!-- ENCABEZADO DEL STEPPERS -->
                    <v-stepper-header>
                        <v-stepper-step :complete="PasoAPaso > 1" editable edit-icon="check" step="1" title="DATOS GENERALES">DATOS GENERALES</v-stepper-step>
                        <v-divider></v-divider>

                        <v-stepper-step :complete="PasoAPaso > 2" editable edit-icon="check" step="2"  title="MOTIVO DE LA CONSULTA Y ANTECEDENTES DEL PACIENTE">CONSULTA - ANTECEDENTES</v-stepper-step>
                        <v-divider></v-divider>

                        <v-stepper-step :complete="PasoAPaso > 3" editable edit-icon="check" step="3" title="PERFIL SOCIAL Y PERSONALIDAD">PERFIL - PERSONALIDAD</v-stepper-step>
                        <v-divider></v-divider>

                        <v-stepper-step :complete="PasoAPaso > 4" editable edit-icon="check" step="4" title="EXAMEN MENTAL">EXAMEN MENTAL</v-stepper-step>
                        <v-divider></v-divider>

                        <v-stepper-step :complete="PasoAPaso > 5" editable edit-icon="check" step="5"  title="DATOS SOBRE LA FAMILIA, DIAGNOSTICO DEL PACIENTE Y PLAN PSICOLOGICO">FAMILIA - DIAGNOSTICO - PLAN PSICOLOGICO</v-stepper-step>                            

                    </v-stepper-header>
                    <!-- CUERPO DE CADA STEPPERS -->
                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-form>
                               <buscador @buscador="buscador" @cleanData="cleanData" />
                               <alert-error-global v-if="showAlertError" message="No se encontraron resultados para el filtro ingresado" />
                                <alert-error-global v-if="showBusquedaEmpty" message="Debe realizar una búsqueda para poder continuar " />
                                <v-container v-if="searchPatient">
                                    <datos-persona :readonly="true" :familiar="1" :historialClinico="historialClinico" :paciente="paciente" />
                                </v-container>
                                <v-btn color="primary ma-2" @click="IrPaso2" >Continuar</v-btn>
                                <v-btn color="error"   @click="CloseModalHistoriaPsicologica()">Cerrar</v-btn>
                            </v-form>
                            
                        </v-stepper-content>
                        <v-stepper-content step="2">
                            <v-form>
                                <v-row>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" md="4" >
                                                <v-text-field v-model="objetoGuardar.ocupacion" :rules="nameRules"  label="Ocupacion" required></v-text-field>
                                            </v-col>

                                            <v-col cols="12" md="4">
                                                <v-text-field v-model="objetoGuardar.origenProcedencia" :rules="nameRules"  label="Origen o Procedencia" required></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-textarea v-model="objetoGuardar.motivoDeConsulta" label="MOTIVO DE LA CONSULTA" auto-grow outlined ></v-textarea>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col s2>
                                        <v-textarea v-model="antecedente" label="ANTECEDENTE DEL PACIENTE" auto-grow outlined></v-textarea>
                                        <v-btn color="primary mt-3" :disabled="!antecedente"  @click="agregarAlListado">Agregar al listado</v-btn>
                                        <!--para los antecedentes-->
                                        <v-data-table hide-default-footer dense :headers="headers" :items="objetoGuardar.antecedentesDelPaciente"  class="elevation-1"></v-data-table>
                                        <!--para los antecedentes-->
                                    </v-col>
                                </v-row>
                            </v-form>
                            <v-btn color="indigo" rounded dark @click="IrPaso3()">SIGUIENTE</v-btn>
                        </v-stepper-content>
                        <v-stepper-content step="3">
                            <v-form>
                                <v-row>
                                    <v-col>
                                        <v-textarea v-model="objetoGuardar.perfilSocial" label="PERFIL SOCIAL" auto-grow outlined></v-textarea>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-textarea v-model="objetoGuardar.personalidad" label="PERSONALIDAD" auto-grow outlined></v-textarea>
                                    </v-col>
                                </v-row>
                            </v-form>
                            <v-btn color="indigo" rounded dark @click="IrPaso4()">SIGUIENTE</v-btn>
                        </v-stepper-content>
                        <v-stepper-content step="4">
                            <v-form>
                                <v-row>
                                    <v-col md="4">
                                        <v-textarea v-model="objetoGuardar.examenMental.aparecienciaGeneral" label="APARIENCIA GENERAL Y ACTITUD" auto-grow outlined></v-textarea>
                                    </v-col>
                                    <v-col md="4">
                                        <v-textarea v-model="objetoGuardar.examenMental.estadoConciencia" label="ESTADO DE CONCIENCIA" auto-grow outlined></v-textarea>
                                    </v-col>
                                    <v-col md="4">
                                        <v-textarea v-model="objetoGuardar.examenMental.estadoAnimo" label="ESTADO DE ANIMO" auto-grow outlined></v-textarea>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col md="4">
                                        <v-textarea v-model="objetoGuardar.examenMental.activiadMotora" label="ACTIVIDAD MOTORA" auto-grow outlined></v-textarea>
                                    </v-col>
                                    <v-col md="4">
                                        <v-textarea v-model="objetoGuardar.examenMental.asociacionIdeasYLenguaje" label="ASOCIACION Y FLUJO DE IDEAS" hint="ASOCIACION Y FLUJO DE IDEAS Y CARACTERISTICAS DEL LENGUAJE" auto-grow outlined></v-textarea>
                                    </v-col>
                                    <v-col md="4">
                                        <v-textarea v-model="objetoGuardar.examenMental.contenidoDeIdeas" label="CONTENIDO DE IDEAS" auto-grow outlined></v-textarea>
                                    </v-col>                                        
                                </v-row>
                                <v-row>
                                    <v-col md="3">
                                        <v-textarea v-model="objetoGuardar.examenMental.sensorium" label="SENSORIUM" auto-grow outlined></v-textarea>
                                    </v-col>
                                    <v-col md="3">
                                        <v-textarea v-model="objetoGuardar.examenMental.memoria" label="MEMORIA" auto-grow outlined></v-textarea>
                                    </v-col>
                                    <v-col md="3">
                                        <v-textarea v-model="objetoGuardar.examenMental.pensamiento" label="PENSAMIENTO" auto-grow outlined></v-textarea>
                                    </v-col>
                                    <v-col md="3">
                                        <v-textarea v-model="objetoGuardar.examenMental.resultadoExamen" label="RESULTADO DEL EXAMEN" auto-grow outlined></v-textarea>
                                    </v-col>
                                </v-row>
                                <v-btn color="indigo" rounded dark @click="IrPaso5">SIGUIENTE</v-btn>
                            </v-form>
                        </v-stepper-content>
                        <v-stepper-content step="5">
                            <v-form>
                                <v-row>
                                    <v-col md="12">
                                        <v-textarea v-model="objetoGuardar.datosRelevantesFamiliaPaciente" label="DATOS RELEVANTES SOBRE LA FAMILIA DEL PACIENTE" auto-grow outlined></v-textarea>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col md="12">
                                        <v-textarea v-model="objetoGuardar.diagnostico" label="DIAGNOSTICO" auto-grow outlined></v-textarea>
                                    </v-col>
                                </v-row> 
                                <v-row>
                                    <v-col md="12">
                                        <v-textarea v-model="objetoGuardar.planOrientacionPsicologica" label="PLAN DE ORIENTACION PSICOLOGICA" auto-grow outlined></v-textarea>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-card>
        </v-dialog>
        <!-- FIN DEL FORMULARIO   -->        
    </div>
</template>

<script>
import Buscador from '../buscador/Buscador.vue'
import DatosPersona from "../datos-personas/DatosPersonas.vue";
import AlertErrorGlobal from '../alertas/alertErrorGlobal.vue'
import DataTables from '../data-tables/DataTables.vue' 
import moment from 'moment'
export default {
    components: {
        DatosPersona,
        Buscador,
        AlertErrorGlobal
    },
    props: {
        ModalHistoriaPsicologica: Boolean,
        ModalTitle: String
    },    

    data: () => ({
        nameRules: [
            v => !!v || 'Este campo es requerido',
            //v => v.length <= 10 || 'Name must be less than 10 characters',
        ],
        antecedente:'',
        paciente: {},
        dataAntecedentes: [],
        headers: [
        { text: "Descripcion del antecedente", align: "left", sortable: false, value: "descripcion" },
        //{ text: "Segundo Nombre", align: "left", sortable: false, value: "segundoNombre" }
      ],
        searchPatient: false,
        showAlertError: false,
        showBusquedaEmpty: false,
        PasoAPaso: 0,
        itemsexo: ['MASCULINO', 'FEMENINO'],
        itemEstadoCivil: ['Soltero/a','Comprometido/a', 'En Relacion', 'Casado/a', 'Separado/a', 'Divorciado/a', 'Viudo/a'],
        historialClinico : { nombre: "" },  
        objetoGuardar: {
                        "idPaciente": 0,
                        "motivoDeConsulta": "",
                        "ocupacion": "",
                        "origenProcedencia": "",
                        "antecedentesDelPaciente": [],
                        "examenMental": {
                            "aparecienciaGeneral": "",
                            "estadoConciencia": "",
                            "estadoAnimo": "",
                            "activiadMotora": "",
                            "asociacionIdeasYLenguaje": "",
                            "contenidoDeIdeas":"",
                            "sensorium": "",
                            "memoria": "",
                            "pensamiento": "",
                            "resultadoExamen": ""
                        },
                        "perfilSocial": "",
                        "personalidad": "",
                        "datosRelevantesFamiliaPaciente": "",
                        "diagnostico": "",
                        "planOrientacionPsicologica": ""
                        }  
    }),

    methods: {
        agregarAlListado(){
            this.objetoGuardar.antecedentesDelPaciente.push({"descripcion":this.antecedente})
            this.antecedente=''
        },
        eliminarDelListado(id) {
            this.data = this.data.filter( item => item.id !== id)
        },
        IrPaso2 (){
            if( Object.keys(this.paciente).length === 0 ) {
                this.showBusquedaEmpty = true

                setTimeout( () => {
                this.showBusquedaEmpty = false
                },3000)
                return
            }
            this.PasoAPaso = 2
        },

        IrPaso3 (){
            this.PasoAPaso = 3
        },

        IrPaso4 (){
            this.PasoAPaso = 4
        },

        IrPaso5 (){
            this.PasoAPaso = 5
        },

        CloseModalHistoriaPsicologica(){
            this.$emit('close-modal-historia-psicologica')
        },        

        // llamamos las varialbes que se usaran en el modal del formulario y se guardaran en la tabla
        async buscador(search) {
            const data = {
                criterio : search.buscarPor,
                valor : search.valorDeBusqueda
            }

            this.searchPatient = false
            this.showAlertError = false
            this.searchPatient = false

            const response = await this.$store.dispatch('getPacient', data)

            if(response.status === 200) {
                this.searchPatient =true
                const paciente = response.data[0]

                const { persona} = paciente
                this.paciente = {
                idPaciente: paciente.idPaciente,
                primerNombre: persona.primerNombre,
                segundoNombre: persona.segundoNombre,
                primerApellido: persona.primerApellido,
                segundoApellido: persona.segundoApellido,
                sexo: (persona.sexo) ? 1: 2,
                fechaNacimiento: moment(persona.fechaNacimiento).format("L"),
                menu2: false,
                grupoEtnico: persona.grupoEtnico,
                escolaridad: persona.escolaridad,
                religion: persona.religion,
                dpi: persona.dpi
                }
                this.historialClinico.nombre = paciente.historialClinico

            } else {
                this.searchPatient = false
                this.showAlertError = true
                setTimeout( () => {
                this.showAlertError = false
                },3000)
            }
        },
        cleanData() {
            this.searchPatient = false
        },
        SaveHistoriaPsicologica(){
            this.objetoGuardar.idPaciente= this.paciente.idPaciente
            this.$emit('Save_Historia_Psicologica',this.objetoGuardar)
        },

    },
}
</script>
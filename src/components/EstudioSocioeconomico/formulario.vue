<template>
  <div>
    
  </div>
</template>

<v-stepper v-model="PasosDeFormulario">
                <br>
                <v-layout text-center>
                    <v-flex>
                        <span class="headline"> {{formtitle}} fff</span>
                    </v-flex>
                </v-layout>
                <br>
                <!-- INICIO DEL ENCABEZADO DE LOS PASOS DE REGISTROS -->
                <v-stepper-header >
                    <v-stepper-step :complete="PasosDeFormulario > 1" step="1" color="#2c2e3f">PASO 1</v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step :complete="PasosDeFormulario > 2" step="2" color="#2c2e3f">DATOS GENERALES</v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step :complete="PasosDeFormulario > 3" step="3" color="#2c2e3f">GRUPO FAMILIAR</v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step :complete="PasosDeFormulario > 4" step="4" color="#2c2e3f">VIVIENDA</v-stepper-step>
                    <v-divider></v-divider>

                    <v-stepper-step :complete="PasosDeFormulario > 5" step="5" color="#2c2e3f">OBSERVACIONES</v-stepper-step>
                </v-stepper-header>
                <!-- FIN DEL ENCABEZADO DE LOS PASOS DE REGISTROS -->
                <!-- INICIO DE LOS ESPACIOS DE REGISTROS DE CADA PASO  -->
                <v-stepper-items>
                    <!-- PRIMER PASO PARA EL REGISTRO DE DATOS -->
                    <v-stepper-content step="1">
                        <v-form v-model="valid">
                            <v-container>
                                <v-row>
                                    <v-col cols="12" ms="6" md="6">                                                    
                                        <v-text-field v-model="editedItem.RegMedicoNo" label="REG. MEDICO NO." :rules="nameRules" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" ms="6" md="6">
                                        <v-text-field v-model="editedItem.RegSocialNo" label="REG. SOCIAL. NO." :rules="nameRules" required></v-text-field>
                                    </v-col>
                                    <!-- fecha de ingreso -->
                                    <v-col cols="12" ms="6" md="6"> 
                                        <v-dialog
                                            ref="dialog"
                                            v-model="modaldatefechaingreso"
                                            return-value.sync="datefechaingreso"
                                            persistent
                                            width="290px"
                                        >
                                            <template v-slot:activator="{ on }">
                                            <v-text-field
                                                v-model="editedItem.datefechaingreso"
                                                label="Fecha de Ingreso"
                                                prepend-icon="event"
                                                readonly
                                                v-on="on"
                                            ></v-text-field>
                                            </template>
                                            <v-date-picker locale="es-ES" v-model="editedItem.datefechaingreso" color="#2c2e3f" scrollable>
                                            <div class="flex-grow-1"></div>
                                            <v-btn text color="primary" @click="modaldatefechaingreso = false">CANCELAR</v-btn>
                                            <v-btn text color="primary" @click="$refs.dialog.save(editedItem.datefechaingreso)">OK</v-btn>
                                            </v-date-picker>
                                        </v-dialog>
                                    </v-col>
                                    <!-- fecha de entrevista -->
                                    <v-col cols="12" ms="6" md="6">
                                        <v-dialog
                                            ref="dialog2"
                                            v-model="modaldatefechaentrevista"
                                            return-value.sync="datefechaentrevista"
                                            persistent
                                            width="290px"
                                        >
                                            <template v-slot:activator="{ on }">
                                            <v-text-field
                                                v-model="editedItem.datefechaentrevista"
                                                label="FECHA DE ENTREVISTA"
                                                prepend-icon="event"
                                                readonly
                                                v-on="on"
                                            ></v-text-field>
                                            </template>
                                            <v-date-picker locale="es-ES" v-model="editedItem.datefechaentrevista" color="#2c2e3f" scrollable>
                                            <div class="flex-grow-1"></div>
                                            <v-btn text color="primary" @click="modaldatefechaentrevista = false">CANCELAR</v-btn>
                                            <v-btn text color="primary" @click="$refs.dialog2.save(editedItem.datefechaentrevista)">OK</v-btn>
                                            </v-date-picker>
                                        </v-dialog>
                                    </v-col>
                                    <v-col cols="12" ms="6" md="12">                                                        
                                        <v-text-field v-model="editedItem.TSEntrevisto" label="T.S. ENTREVISTO" :rules="nameRules" required></v-text-field>
                                    </v-col> 
                                    <v-col cols="12" ms="6" md="12">
                                        <v-text-field v-model="editedItem.evaluo" label="EVALUO" :rules="nameRules" required></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-form>
                        <v-btn rounded color="#01579B" @click="PasosDeFormulario = 2" dark>SIGUIENTE</v-btn>
                    </v-stepper-content>
                    <!-- FIN DEL PRIMER PASO -->
                    <!-- INICIO DEL SEGUNDO PASO DE DATOS GENERALES-->
                    <v-stepper-content step="2">
                        <v-form v-model="valid">
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="editedItem.NombreUsuario" label="NOMBRE DE USUARIO" :rules="nameRules" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="editedItem.escolaridad" label="ESCOLARIDAD" :rules="nameRules" required></v-text-field>
                                    </v-col>    
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="editedItem.direccion" label="DIRECCION" :rules="nameRules" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model="editedItem.telefono" label="TELEFONO" :rules="nameRules" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12">
                                        <v-text-field v-model="editedItem.permanente" label="PERMANENTE" :rules="nameRules" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12">
                                        <v-text-field v-model="editedItem.temporal" label="TEMPORAL" :rules="nameRules" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="3">
                                        <v-text-field v-model="editedItem.edad" label="EDAD" :rules="nameRules" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="3">
                                        <v-select v-model="editedItem.sexo" :items="itemsexo" label="SEXO" :rules="nameRules" required></v-select>
                                    </v-col>
                                    <v-col cols="12" md="3">
                                        <v-text-field v-model="editedItem.lugarnacimiento" label="LUGAR NACIMIENTO" :rules="nameRules" required></v-text-field>
                                    </v-col>
                                    <!-- fecha de nacimiento -->
                                    <v-col cols="12" md="3"> 
                                        <v-dialog
                                            ref="dialog3"
                                            v-model="modaldatefechanacimiento"
                                            return-value.sync="datefechanacimiento"
                                            persistent
                                            width="290px"
                                        >
                                            <template v-slot:activator="{ on }">
                                            <v-text-field
                                                v-model="editedItem.datefechanacimiento"
                                                label="FECHA DE NACIMIENTO"
                                                prepend-icon="event"
                                                readonly
                                                v-on="on"
                                            ></v-text-field>
                                            </template>
                                            <v-date-picker locale="es-Es" v-model="editedItem.datefechanacimiento" color="#2c2e3f" scrollable>
                                            <div class="flex-grow-1"></div>
                                            <v-btn text color="primary" @click="modaldatefechanacimiento = false">CANCELAR</v-btn>
                                            <v-btn text color="primary" @click="$refs.dialog3.save(editedItem.datefechanacimiento)">OK</v-btn>
                                            </v-date-picker>
                                        </v-dialog>
                                    </v-col>
                                    <v-col cols="12" md="8">
                                        <v-text-field v-model="editedItem.atendidopor" label="ATENDIDO POR" :rules="nameRules" required></v-text-field>
                                    </v-col> 
                                    <v-col cols="12" md="4">
                                        <v-text-field v-model="editedItem.religion" label="RELIGION" :rules="nameRules" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12">
                                        <v-text-field v-model="editedItem.medico" label="DR. MEDICO" :rules="nameRules" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12">
                                        <v-text-field v-model="editedItem.servicio" label="SERVICIO" :rules="nameRules" required></v-text-field>
                                    </v-col>
                                    <!-- GRUPO DE CHECKBOX -->
                                    <v-col cols="12" md="1">
                                        <v-checkbox v-model="editedItem.ft" label="FT"></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" md="2">
                                        <v-checkbox v-model="editedItem.piscina" label="PISCINA"></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" md="1"> 
                                        <v-checkbox v-model="editedItem.to" label="T.O"></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" md="1">
                                        <v-checkbox v-model="editedItem.ti" label="T.I"></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" md="1">
                                        <v-checkbox v-model="editedItem.ee" label="E.E"></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" md="2">
                                        <v-checkbox v-model="editedItem.escuela" label="ESCUELA"></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" md="2">
                                        <v-checkbox v-model="editedItem.psicol" label="PSICOL"></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" md="2">
                                        <v-checkbox v-model="editedItem.indcasa" label="IND. CASA"></v-checkbox>
                                    </v-col>
                                    <!-- fin del grupo de checkbox -->
                                    <v-col cols="12" md="12">
                                        <v-text-field v-model="editedItem.motivosolicitud" label="MOTIVO DE SOLICITUD" :rules="nameRules" required></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-form>
                        <v-btn class="ma-2" rounded dark color="#01579B" @click="IrPaso1()">PASO 1</v-btn>
                        <v-btn class="ma-2" rounded dark color="#01579B" @click="IrPaso3()">SIGUIENTE</v-btn>                        
                    </v-stepper-content>
                    <!-- FIN DEL SEGUNDO PASO DE DATOS GENERALES-->
                    <!-- INICIO DEL TERCER PASO DE DATOS DE GRUPO FAMILIAR -->
                    <v-stepper-content step="3">
                        <v-data-table
                        :headers="headersgrupofamiliar"
                        :items="datagrupofamiliar"
                        class="elevation-1"
                        >

                        </v-data-table>
                        <v-btn class="ma-2" rounded dark color="#01579B" @click="IrPaso1()">PASO 1</v-btn>
                        <v-btn class="ma-2" rounded dark color="#01579B" @click="IrPaso2()">2. DATOS GENERALES</v-btn>
                        <v-btn class="ma-2" rounded dark color="#01579B" @click="IrPaso4()">SIGUIENTE</v-btn>
                    </v-stepper-content>
                    <!-- FIN DEL TERCER PASO DE DATOS DE GRUPO FAMILIAR -->
                    <!-- INICIO DEL CUARTO PASO DATOS DE VIVIENDA -->
                    <v-stepper-content step="4">
                        <v-form v-model="valid">
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="3">
                                        <v-checkbox v-model="editedItem.paredes" label="PAREDES"></v-checkbox>                                        
                                    </v-col>
                                    <v-col cols="12" md="3">
                                        <v-checkbox v-model="editedItem.techo" label="TECHO"></v-checkbox>                                        
                                    </v-col>
                                    <v-col cols="12" md="3">
                                        <v-checkbox v-model="editedItem.pisos" label="PISOS"></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" md="3"> 
                                        <v-checkbox v-model="editedItem.habitaciones" label="NO. DE HABITACIONES"></v-checkbox>
                                    </v-col>

                                    <v-col cols="12" md="3">
                                        <v-checkbox v-model="editedItem.agua" label="AGUA"></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" md="3">
                                        <v-checkbox v-model="editedItem.luz" label="LUZ ELECTRICA"></v-checkbox>
                                    </v-col>
                                    <v-col>
                                        <v-checkbox v-model="editedItem.serviciosanitario" label="SERVICIO SANITARIO"></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" md="3">
                                        <v-checkbox v-model="editedItem.letrina" label="LETRINA"></v-checkbox>
                                    </v-col>

                                    <v-col cols="12" md="3">
                                        <v-checkbox v-model="editedItem.otros" label="OTROS"></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        <v-checkbox v-model="editedItem.cocina" label="LA COCINA ESTA FUERA DEL DOMITORIO"></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" md="3">
                                        <v-checkbox v-model="editedItem.espropia" label="ES PROPIA"></v-checkbox>
                                    </v-col>

                                    <v-col cols="12" md="3">
                                        <v-checkbox v-model="editedItem.prestado" label="PRESTADO"></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" md="3">
                                        <v-checkbox v-model="editedItem.alquila" label="ALQUILA"></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" md="3">
                                        <v-checkbox v-model="editedItem.otros2" label="OTROS"></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" md="3">
                                        <v-checkbox v-model="editedItem.pagomensual" label="PAGO MENSUAL"></v-checkbox>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-form>
                        <v-btn class="ma-2" rounded dark color="#01579B" @click="IrPaso1()">PASO 1</v-btn>
                        <v-btn class="ma-2" rounded dark color="#01579B" @click="IrPaso2">2. DATOS GENERALES</v-btn>
                        <v-btn class="ma-2" rounded dark color="#01579B" @click="IrPaso3()">3. GRUPO FAMILIAR</v-btn>
                        <v-btn class="ma-2" rounded dark color="#01579B" @click="IrPaso5">SIGUIENTE</v-btn>
                    </v-stepper-content>
                    <!-- FIN DEL CUARTO PASO DATOS DE VIVIENDA -->
                    <!-- INICIO DEL QUINTO PASO DE OBSERVACIONES  -->
                    <v-stepper-content step="5">
                        <v-form v-model="valid">
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="12">
                                        <v-textarea v-model="editedItem.diagnostiosocial" label="DIAGNOSTICO SOCIAL"></v-textarea>
                                    </v-col>
                                    <v-col cols="12" md="12">
                                        <v-textarea v-model="editedItem.opinionts" label="OPINION T.S."></v-textarea>
                                    </v-col>
                                    <v-col cols="12" md="12">
                                        <v-textarea v-model="editedItem.observaciones" label="OBSERVACIONES"></v-textarea>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-form>
                        <v-btn class="ma-2" rounded dark color="#01579B" @click="IrPaso1()">1. PASO 1</v-btn>
                        <v-btn class="ma-2" rounded dark color="#01579B" @click="IrPaso2()">2. DATOS GENERALES</v-btn>
                        <v-btn class="ma-2" rounded dark color="#01579B" @click="IrPaso3()">3. GRUPO FAMILIAR</v-btn>
                        <v-btn class="ma-2" rounded dark color="#01579B" @click="IrPaso4()">4. VIVIENDA</v-btn>  
                        <v-divider class="mx-4" vertical></v-divider>
                        <v-btn class="ma-2" rounded dark color="#01579B" @click="CancelarDialogoRegistro()">CERRAR</v-btn>
                        <v-btn class="ma-2" rounded dark color="#01579B" @click="guardarNuevoES">GUARDAR REGISTRO</v-btn>
                                       
                    </v-stepper-content>
                    <!-- FIN DEL QUINTO PASO DE OBSERVACIONES -->
                </v-stepper-items>
                <!-- FIN DE LOS ESPACIOS DE REGISTROS DE CADA PASO -->
            </v-stepper>
<template>
    <div>
        <!-- INICIO DE LA ESTRUCTURA DEL DIALOGO DE LA EVOLUCION MEDICA DE DIAGNOSTICO -->
        <v-dialog v-model="DialogoDiagnostico" fullscreen hide-overlay transition="dialog-bottom-transition" >
            <v-card>
                <!-- ENCABEZADO DE LA TABLA DE LA EVOLUCION MEDICA, DIAGNOSTICO -->
                <v-toolbar dark color="#2c2e3f">
                    <span class="headline">EVOLUCION MEDICA</span>
                    <div class="flex-grow-1"></div>

                    <v-btn color="indigo" rounded class="mx-4" @click="CerrarModalDiagnostico()">CERRAR</v-btn>
                    <v-btn color="indigo" rounded @click="CerrarModalDiagnostico()">GUARDAR DIAGNOSTICO</v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-form>
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-textarea  label="DIAGNOSTICO MEDICO"></v-textarea>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>

            </v-card>
        </v-dialog>
        <!-- FIN DEL FORMULARIO DE EVOLUCION MEDICA  -->        
    </div>
</template>

<script>
export default {
    props: ['DialogoDiagnosticoRM'],
    data: () => ({

    }),

    computed: {
        DialogoDiagnostico: {
            get:  function(){
                return this.DialogoDiagnosticoRM
            },
        }
    },

    methods: {
        CerrarModalDiagnostico(){
            // this.DialogoDiagnostico = false
            this.$emit('cerrar-modal-diagnostico')
        },        
    },
}
</script>
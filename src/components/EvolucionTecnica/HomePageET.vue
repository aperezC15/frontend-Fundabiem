<template>
    <div>
        <!-- AQUI INICIAMOS EL EL MODAL QUE MOSTRARA EL FORMULARIO DE DATOS -->
        <v-dialog v-model="DialogoNuevo"  max-width="1200px">
            <!-- ENCABEZADO DEL MODAL -->
            <v-card>
                <v-card-title>
                    <v-layout text-center>
                        <v-flex>
                            <span class="headline">{{FormTitle}}</span>
                        </v-flex>
                    </v-layout>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <!-- ESTRUCTURA DEL FORMULARIO DE DATOS -->
                    <v-form>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="editedItem.Apellidos" ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="indigo">CERRAR</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- FIN DEL DIALOGO PARA REGISTRAR UN NUEVO ESTUDIO SOCIOECONOMICO -->

        <v-container>
            <!-- TITULO DE LA PAGINA  -->
            <v-layout text-center wrap>
                <v-flex>
                    <h1 text-center>EVOLUCION TECNICA</h1>
                </v-flex>
            </v-layout>
            <!-- AQUI MOSTRAMOS EL ENCABEZADO DE LA TABLA QUE CONTENDRA EL BOTON NUEVO Y EL BUSCADOR DE REGISTROS -->
            <v-toolbar flat dark color="#2c2e3f">
                <v-toolbar-title>REGISTROS</v-toolbar-title>
                <v-divider class="mx-4" vertical></v-divider>
                <div class="flex-grow-1"></div>
                
                <v-text-field v-model="search" label="BUSCAR REGISTRO DE EVOLUCION TECNICA" append-icon="search" single-line hide-details></v-text-field>
                <v-btn color="indigo" fab title="NUEVA HOJA DE EVOLUCION TECNICA" class="mx-2" @click="AbrirDialogoNuevo()">
                    <v-icon>add</v-icon>
                </v-btn>
            </v-toolbar>
            <!-- AQUI MOSTRAMOS LA TABLA EN LA PAGINA -->
            <v-data-table
            :headers="HeadersTable"
            :items="DataTable"
            :search="search"
            class="elevation-10"
            >
                <template v-slot:item.action="{item}">        
                    <v-icon class="mr-2" title="EDITAR REGISTRO" @click="editItem(item)">edit</v-icon>            
                </template>
                <template v-slot:no-results>
                    <v-alert type="error"> EL REGISTRO "{{search}}" NO SE ENCUENTRA EN LA BASE DE DATOS</v-alert>
                </template>
            </v-data-table>
        </v-container>
    </div>
</template>

<script>

export default({
    
    data: () => ({
        //variable del buscador de registros
        search: '',
        //declaramos la variable del dialogo nuevo
        DialogoNuevo: false,

        //encabezado de la tabla 
        HeadersTable: [
            { text: 'HOJA NO.', value: 'HojaNo'},
            { text: 'APELLIDOS', value: 'Apellidos'},
            { text: 'NOMBRES', value: 'Nombres'},
            { text: 'HISTORIA CLINICA NO.', value: 'HistoriaClinicaNo'},
            { text: 'EDAD', value: 'Edad'},
            { text: 'SEXO', value: 'Sexo'},
            { text: 'ACCION', value: 'action', sortable: false},
        ],

        //CUERPO DE LA TABLA
        DataTable: [],

        editedIndex: -1,
        editedItem: {
            HojaNo: '',
            Apellidos: '',
            Nombres: '',
            HistoriaClinicaNo: '',
            Edad: '',
            Sexo: '',
        },

        defaultItem: {
            HojaNo: '',
            Apellidos: '',
            Nombres: '',
            HistoriaClinicaNo: '',
            Edad: '',
            Sexo: '',            
        }
    }),
        computed: {
            FormTitle(){
                return this.editedIndex === -1 ? 'NUEVA HOJA DE EVOLUCION TECNICA' : 'EDITAR HOJA DE EVOLUCION TECNICA'
            },        
        },

        created() {
            this.initialize()
        },


    // aqui declaramos todos los metodos
    methods: {
        //iniciamos los datos en la tabla 
        initialize()
        {
            this.DataTable =
            [
                {
                    HojaNo: '1',
                    Apellidos: 'Herrera Vasquez',
                    Nombres: 'Mario David',
                    HistoriaClinicaNo: '101',
                    Edad: '23',
                    Sexo: 'Masculino'
                }
            ]
        },

        //AQUI ABRIMOS EL DIALOGO PARA UN NUEVO REGISTRO
        AbrirDialogoNuevo(){
            this.DialogoNuevo = true
        },

        //editamos la informacion registrada en la tabla
        editItem (item) {
            this.editedIndex = this.DataTable.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.DialogoNuevo = true
        },        
    },
});
</script>
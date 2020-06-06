<template>
    <div>
        <!-- AQUI INICIAMOS EL DIALOGO QUE CONTENDRA EL FORMULARIO DEL ESTUDIO SOCIOECONOMICO -->
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <!-- INICIO DE LA ESTRUCTURA DE PASOS STEPPER PARA EL REGISTROS DE DATOS -->
            
        </v-dialog>
        <!-- FIN DEL DIALOGO PARA REGISTRAR UN NUEVO ESTUDIO SOCIOECONOMICO -->

        
    </div>
</template>

<script>
export default ({
    data: () => ({    
        //declaracin de la variable para realizar los pasos para el llenado de formulario de nuevos registros de estudios socioeconomicos
        PasosDeFormulario: 0,
        //dialogo del nuevo registros socioeconomicos
        DialogoNuevoES: false,
        // REGLAS PARA VALIDAR LOS CAMPOS DE TEXTOS
        valid: false,
        nameRules: [
            v => !!v || 'Dato Requerido',
        ],
        // DECLARAMSO LA VARIABLE QUE HARA LA BUSQUEDA EN LA TABLA
        search: '',
        //SEXO
        itemsexo: ['MASCULINO', 'FEMENINO'],

        // AQUI DECLARAMOS LAS VARIABLES PARA OBTENER LA FECHA DE FECHA DE INGRESO
        modaldatefechaingreso: false,
        // AQUI DECLARAMOS LAS VARIABLES PARA OBTENER LA FECHA DE FECHA DE ENTREVISTA
        modaldatefechaentrevista: false,
        // AQUI DECLARAMOS LAS VARIABLES PARA OBTENER LA FECHA DE FECHA DE NACIMIENTO
        modaldatefechanacimiento: false,

        // AQUI SE DEFINEN LOS DATOS DEL ENCABEZADO DE LA TABLA DE REGISTROS MEDICOS
        TableHeaderES:[
            { text: 'REG. MEDICO NO.', value: 'RegMedicoNo'},
            { text: 'REG. SOCIAL NO.', value: 'RegSocialNo'},
            { text: 'FECHA DE INGRESO', value: 'datefechaingreso'},
            { text: 'FECHA DE ENTREVISTA', value: 'datefechaentrevista'},
            { text: 'T.S. ENTREVISTO', value: 'TSEntrevisto'},
            { text: 'Accion', value: 'action', sortable: false}
        ],

        // AQUI SE DEFINEN LOS DATOS DEL ENCABEZADO DE LA TABLA DE GRUPO FAMILIAR
        headersgrupofamiliar:[
            { text: 'NOMBRE', value: 'NombreGrupoFamiliar'},
            { text: 'E. CIVIL', value: 'ECivilGrupoFamiliar'},
            { text: 'RELACION', value: 'RelacionGrupoFamiliar'},
            { text: 'EDAD', value: 'EdadGrupoFamiliar'},
            { text: 'ESCOLARIDAD', value: 'EscolaridadGrupoFamiliar'},
            { text: 'OCUPACION', value: 'OcupacionGrupoFamiliar'},
            { text: 'SALARIO', value: 'SalarioGrupoFamiliar'},
        ],
        // EL ARREGLO DEL CUERPO DE LA TABLA ESTUDIO SOCIOECONOMICO
        DataTableES: [],
        // EL ARREGLO DEL CUERPO DE LA TABLA DE GRUPO FAMILIAR
        datagrupofamiliar: [],

        editedIndex: -1,
        editedItem: {
            RegMedicoNo: '',
            RegSocialNo: '',
            datefechaingreso: new Date().toISOString().substr(0, 10),
            datefechaentrevista: new Date().toISOString().substr(0, 10),
            TSEntrevisto: '',
            evaluo: '',
            NombreUsuario: '',
            escolaridad: '',
            direccion: '',
            telefono: '',
            permanente: '',
            temporal: '',
            edad: '',
            sexo: '',
            lugarnacimiento: '',
            datefechanacimiento: new Date().toISOString().substr(0, 10),
            atendidopor: '',
            religion: '',
            medico: '',
            servicio: '',
            ft: '',
            piscina: '',
            to: '',
            ti: '',
            ee: '',
            escuela: '',
            psicol: '',
            indcasa: '',
            motivosolicitud: '',
        },

        defaultItem: {
            RegMedicoNo: '',
            RegSocialNo: '',
            datefechaingreso: new Date().toISOString().substr(0, 10),
            datefechaentrevista: new Date().toISOString().substr(0, 10),
            TSEntrevisto: '',
            evaluo: '',
        },

}),

    computed: {
        formtitle(){
            return this.editedIndex === -1 ? 'NUEVO REGISTRO ESTUDIO SOCIOECONOMICO':'EDITAR REGISTRO ESTUDIO SOCIOECONOMICO'
        }
    },

    watch: {
        DialogoNuevoES (val){
            val || this.cerrarModalNuevoES()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        //cerramos el dialogo de nuevo registro de estudio socioeconomico
        CancelarDialogoRegistro(){
            this.DialogoNuevoES = false
        },

        //abrimos el dialogo para un nuevo registro de estudio socioeconomico
        AbrirModalNuevoEstudio(){
            this.DialogoNuevoES=true
        },

        //realizamos el primer paso para el registro de estudio socioeconomico
        IrPaso1(){
            this.PasosDeFormulario = 1
        },

        //realizamos el segundo paso para el registro de estudio socioeconomico
        IrPaso2 (){
            this.PasosDeFormulario = 2
        },
        //realizamos el tercer paso para el registro de estudio socioeconomico
        IrPaso3 (){
            this.PasosDeFormulario = 3
        },
        //realizamos el cuarto paso para el registro de estudio socioeconomico
        IrPaso4 (){
            this.PasosDeFormulario = 4
        },
        //realizamos el quinto paso para el registro de estudio socioeconomico
        IrPaso5 (){
            this.PasosDeFormulario = 5
        },

        initialize (){
            this.DataTableES = [
                {
                    RegMedicoNo: '101',
                    RegSocialNo: '109',
                    datefechaingreso: '2019-09-13',
                    datefechaentrevista: '2019-09-14',
                    TSEntrevisto: 'CHINO'
                }
            ],
            this.datagrupofamiliar = [
                {
                    NombreGrupoFamiliar: 'Daniel Estupe',
                    ECivilGrupoFamiliar: 'Soltero',
                    RelacionGrupoFamiliar: 'Hermano',
                    EdadGrupoFamiliar: '23',
                    EscolaridadGrupoFamiliar: 'Universitario',
                    OcupacionGrupoFamiliar: 'Analista y Desarrollador de Software',
                    SalarioGrupoFamiliar: 'Q. 10,000'
                }
            ]
        },

        editItem (item) {
            this.editedIndex = this.DataTableES.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.DialogoNuevoES = true
        },

        cerrarModalNuevoES () {
            this.DialogoNuevoES = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            },
            300
            )
        },

        guardarNuevoES () {
            if (this.editedIndex > -1){
                Object.assign(this.DataTableES[this.editedIndex], this.editedItem)
            }
            else
            {
                this.DataTableES.push(this.editedItem)
            }
            this.cerrarModalNuevoES()
        },        
    },
})
</script>
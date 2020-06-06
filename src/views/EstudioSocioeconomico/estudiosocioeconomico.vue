<template>
  <v-container>                 
    <h1 class="text-center my-4">ESTUDIO SOCIOECONÓMICO</h1>
    
    <Listado 
      @abrir-dialogo="abrirDialogo"
      :headers="headers"
      :datos="datos"
    />
    
    <Dialogo 
      :dialog="dialog"
      :estudioSocioeconomico="estudioSocioeconomico"
      @cerrar-dialogo="cerrarDialogo"
      @agregar-grupo-familiar="agregarGrupoFamiliar"
    />
  </v-container>
</template>

<script>
import Listado from '@/components/EstudioSocioeconomico/Listado'
import Dialogo from '@/components/EstudioSocioeconomico/Dialogo'

export default {
  components: {
    Listado,
    Dialogo
  },
  data: () => ({
    headers:[
        { text: 'REG. MEDICO NO.', value: 'RegMedicoNo'},
        { text: 'REG. SOCIAL NO.', value: 'RegSocialNo'},
        { text: 'FECHA DE INGRESO', value: 'datefechaingreso'},
        { text: 'FECHA DE ENTREVISTA', value: 'datefechaentrevista'},
        { text: 'T.S. ENTREVISTO', value: 'TSEntrevisto'},
        { text: 'Accion', value: 'action', sortable: false}
    ],

    datos: [],
    dialog: false,

    estudioSocioeconomico: {
      grupoFamiliar: []
    }
  }),
  methods: {
    obtenerEstudiosSocioeconomicos() {
      this.datos = [
          {
            RegMedicoNo: '101',
            RegSocialNo: '109',
            datefechaingreso: '2019-09-13',
            datefechaentrevista: '2019-09-14',
            TSEntrevisto: 'Guillermo Pisqui'
          }
      ]
    },
    abrirDialogo() {
      this.dialog = true
    },
    cerrarDialogo() {
      this.dialog = false
    },
    agregarGrupoFamiliar({nombre, estadoCivil, parentezco, edad, escolaridad, ocupacion, salario}) {
      this.estudioSocioeconomico.grupoFamiliar.push({
        nombre,
        estadoCivil,
        parentezco,
        edad,
        escolaridad,
        ocupacion,
        salario
      })
    }
  },
  created() {
    this.obtenerEstudiosSocioeconomicos()
  }, 
}
</script>
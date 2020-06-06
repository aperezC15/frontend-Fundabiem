<template>
  <div class="text-center">
    <v-card>
      <!--------------------------------------------------------------------------------->
      <v-toolbar>
        <v-tooltip bottom color="#BDBDBD">
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="#757575" fab dark :to="{name: 'ReportesHome'}">
              <v-icon>fas fa-arrow-alt-circle-left</v-icon>
            </v-btn>
          </template>
          <span>Regresar</span>
        </v-tooltip>
        <v-flex>
          <h1 class="text-xs-center text-uppercase">Nuevo Reporte de Citas</h1>
        </v-flex>
      </v-toolbar>

      <v-alert border="bottom" type="info">Selecciona todos los parámetros</v-alert>
      <v-row justify="space-around">
        <v-avatar color="amber darken-3" size="62">
          <v-icon dark>far fa-calendar-alt</v-icon>
        </v-avatar>
        <v-avatar color="amber darken-3" size="62">
          <v-icon dark>far fa-calendar-alt</v-icon>
        </v-avatar>
      </v-row>
      <v-row justify="space-around">
        <v-col cols="5" sm="5">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                class="mx-2"
                v-model="dateStart"
                v-on="on"
                color="amber darken-3"
                label="Selecciona Fecha de Inicio"
                outlined
                rounded
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker"
              v-model="dateStart"
              color="amber darken-3"
              :max="new Date().toISOString().substr(0, 10)"
              @change="save"
              locale="gt"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="5" sm="5">
          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dateEnd"
                class="mx-2"
                v-on="on"
                color="amber darken-3"
                label="Selecciona Fecha Fin"
                outlined
                rounded
              ></v-text-field>
            </template>
            <v-date-picker
              ref="picker2"
              v-model="dateEnd"
              color="amber darken-3"
              :max="new Date().toISOString().substr(0, 10)"
              @change="save2"
              locale="gt"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row justify="space-around">
        <v-col class="ml-2" cols="5" sm="5">
          <v-select
            color="blue-grey darken-1"
            v-model="idTerpia"
            :items="terapias"
            item-value="idTerapia"
            item-text="descripcion"
            label="Tipo de terapia"
            no-data-text="No hay terapias ingresadas"
            prepend-inner-icon="fas fa-first-aid"
            rounded
            outlined
          ></v-select>
        </v-col>
        <v-col class="ml-2" cols="5" sm="5">
          <v-select
            color="blue-grey darken-1"
            v-model="idEstado"
            :items="estados"
            item-value="idEstado"
            item-text="nombre"
            label="Estado de la Cita"
            no-data-text="No hay estados de citas ingresados"
            prepend-inner-icon="fas fa-clipboard-check"
            rounded
            outlined
          ></v-select>
        </v-col>
        <v-col class="ml-2" cols="5" sm="5">
          <v-select
            color="blue-grey darken-1"
            v-model="DateType"
            :items="tipos"
            label="Tipo Cita"
            no-data-text="No hay citas ingresadas"
            prepend-inner-icon="fas fa-clipboard-check"
            rounded
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <!--Parte final-->
      <v-divider></v-divider>
      <div class="text-center">
        <v-btn class="mt-5 mb-3" rounded color="light-green darken-2" dark @click="searchFilter">
          <v-icon left>fas fa-file-alt</v-icon>Generar Reporte
        </v-btn>
      </div>
    </v-card>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="reportes"
        :page.sync="pagina"
        :items-per-page="elementosPagina"
        @page-count="cantidadPagina = $event"
        sort-by="codigo"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-flex>
              <h2 class="text-xs-center text-uppercase">Reporte obtenido</h2>
            </v-flex>
          </v-toolbar>
        </template>
        <template v-slot:no-data>
          <alert-error-global v-if="showAlertError" message="No se encontraron resultados" />
          <v-alert type="warning" v-if="showAlertEmpty">No ha generado ningún reporte</v-alert>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="pagina" :length="cantidadPagina"></v-pagination>
      </div>
    </v-card>
  </div>
</template>

<script>
import AlertErrorGlobal from "../alertas/alertErrorGlobal.vue";
import moment from "moment";

export default {
  props: { terapias: Array, estados: Array },
  components: {
    AlertErrorGlobal
  },
  data() {
    return {
      dateStart: null,
      dateEnd: null,
      menu: false,
      menu2: false,
      showAlertError: false,
      showAlertEmpty: true,
      pagina: 1,
      cantidadPagina: 0,
      elementosPagina: 10,
      idEstado: "",
      idTerpia: "",
      DateType: "",
      headers: [
        { text: "Paciente", value: "name" },
        { text: "Fecha de Nacimiento", value: "fechaNc", sortable: false },
        { text: "No. de DPI", value: "dpi", sortable: false },
        { text: "No. de Orden", value: "details", sortable: false },
        { text: "Fecha de Cita", value: "fechaCita", sortable: false }
      ],
      reportes: [],
      tipos: ["fechaCita", "fechaAsignacion"]
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    menu2(val) {
      val && setTimeout(() => (this.$refs.picker2.activePicker = "YEAR"));
    }
  },
  created() {
    this.obtenerTerapias_Estados();
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    save2(date2) {
      this.$refs.menu2.save(date2);
    },

    obtenerTerapias_Estados() {
      const data = {
        idTerpia: this.idTerpia,
        terapias: this.terapias,
        idEstado: this.idEstado,
        estados: this.estados,
        DateType: this.DateType
      };
    },
    //generar reporte
    async searchFilter() {
      const data = {
        DateType: this.DateType,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        range: this.range === 1 ? false : true,
        idTerpia: this.idTerpia,
        idEstado: this.idEstado
      };

      this.dataEnviar = data;

      console.log(this.dataEnviar);

      const response = await this.$store.dispatch(
        "getAllCites",
        this.dataEnviar
      );

      if (response.status === 200) {
        this.reportes = [];

        response.data.map(cita => {
          const {
            idTerapia,
            dPaciente,
            fechaCita,
            noOrden,
            idCita,
            paciente
          } = cita;
          const {
            primerNombre,
            segundoNombre,
            primerApellido,
            segundoApellido,
            dpi,
            fechaNacimiento
          } = paciente.persona;

          var fechaNc = moment(fechaNacimiento).format("L");

          const nombreCompleto = `${primerNombre} ${segundoNombre} ${primerApellido} ${segundoApellido}`;
          const fechaC = fechaCita.split("T")[0];
          const fecha = moment(fechaC).format("L");

          this.reportes.push({
            name: nombreCompleto,
            details: noOrden,
            fechaNc,
            dpi,
            fechaCita: fecha
          });
        });
      } else {
        this.reportes = [];
        this.showAlertEmpty = false;
        this.showAlertError = true;
        setTimeout(() => {
          this.showAlertError = false;
        }, 3000);
      }
    } //termina searchFilter
  }
};
</script>
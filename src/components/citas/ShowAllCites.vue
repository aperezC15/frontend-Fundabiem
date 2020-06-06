<template>
  <v-row justify="center">
    <v-dialog
      v-model="showCitesModal"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card class="mx-auto">
        <v-toolbar dark color="#2c2e3f">
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark rounded color="indigo" @click="closeModal">Cerrar</v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-card class="pl-5 pr-5">
          <v-card-text>
            <alert-error-global
              v-if="errorDB"
              message="Ocurrio un inconveniente intente más tarde!"
            />
            <v-form v-model="formCitesValue" ref="citeRef">
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-select
                    v-model="DateType"
                    :items="tipos"
                    :rules="rulesInput"
                    label="Seleccione tipo"
                    hint="El campo es requerido"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-select
                    v-model="range"
                    :items="ranges"
                    item-value="id"
                    item-text="valor"
                    :rules="rulesInput"
                    label="Seleccione filtro de búsqueda"
                    hint="El campo es requerido"
                    @change="filtroBusqueda"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="3" v-if="showInput">
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateStart"
                        label="Fecha de inicio"
                        prepend-icon="event"
                        v-on="on"
                        :rules="rulesInput"
                        readonly
                        hint="El campo es requerido"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dateStart" @input="menu2 = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="3" v-if="showInput && range !== 1">
                  <v-menu
                    v-model="menu3"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :rules="rulesInput"
                        v-model="dateEnd"
                        label="Fecha final"
                        prepend-icon="event"
                        readonly
                        hint="El campo es requerido"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dateEnd" @input="menu3 = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    v-model="idTerpia"
                    :items="terapias"
                    item-value="idTerapia"
                    item-text="descripcion"
                    label="Seleccione la terapia"
                    hint="El campo es requerido"
                    :rules="rulesInput"
                    :disabled="!showInput"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    v-model="idEstado"
                    :items="estados"
                    item-value="idEstado"
                    item-text="nombre"
                    label="Seleccione el estado"
                    hint="El campo es requerido"
                    :rules="rulesInput"
                    :disabled="!showInput"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-btn
                    :disabled="!formCitesValue"
                    color="success"
                    block
                    large
                    @click="searchFilter"
                  >Buscar citas</v-btn>
                </v-col>
              </v-row>
            </v-form>
            <template>
              <alert-error-global
                v-if="showAlertError"
                message="No se econtraron citas de la fecha buscada"
              />

              <v-row class="fill-height" v-if="showCalendar">
                <v-col>
                  <v-sheet height="64">
                    <v-toolbar flat color="white">
                      <v-btn fab text small @click="prev">
                        <v-icon small>keyboard_arrow_left</v-icon>
                      </v-btn>
                      <v-btn fab text small @click="next">
                        <v-icon small>keyboard_arrow_right</v-icon>
                      </v-btn>
                      <v-toolbar-title>{{ title }}</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-menu bottom right>
                        <template v-slot:activator="{ on }">
                          <v-btn outlined v-on="on">
                            <span>{{ typeToLabel[type] }}</span>
                            <v-icon right>mdi-menu-down</v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item @click="type = 'day'">
                            <v-list-item-title>Day</v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="type = 'week'">
                            <v-list-item-title>Week</v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="type = 'month'">
                            <v-list-item-title>Month</v-list-item-title>
                          </v-list-item>
                          <v-list-item @click="type = '4day'">
                            <v-list-item-title>4 days</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-toolbar>
                  </v-sheet>
                  <v-sheet height="600">
                    <v-calendar
                      ref="calendar"
                      v-model="mesIr"
                      color="primary"
                      :events="events"
                      :event-color="getEventColor"
                      :event-margin-bottom="3"
                      :now="today"
                      :type="type"
                      locale="es"
                      @click:event="showEvent"
                      @click:more="viewDay"
                      @click:date="viewDay"
                      @change="updateRange"
                    ></v-calendar>
                    <v-menu
                      v-model="selectedOpen"
                      :close-on-content-click="false"
                      :activator="selectedElement"
                      offset-x
                    >
                      <v-card color="grey lighten-4" max-width="330px" flat>
                        <v-toolbar :color="selectedEvent.color" dark>
                          <v-btn icon>
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                          <v-toolbar-title v-html="selectedEvent.details"></v-toolbar-title>
                          <v-spacer></v-spacer>
                          <v-btn icon>
                            <v-icon>mdi-heart</v-icon>
                          </v-btn>
                          <v-btn icon>
                            <v-icon>mdi-dots-vertical</v-icon>
                          </v-btn>
                        </v-toolbar>
                        <v-card-text>
                          <p class="text-uppercase font-weight-bold">
                            Nombre:
                            <span v-html="selectedEvent.name"></span>
                          </p>
                          <p class="text-uppercase font-weight-bold">
                            No de Orden:
                            <span v-html="selectedEvent.details"></span>
                          </p>
                          <p class="text-uppercase font-weight-bold">
                            Fecha de Nacimiento:
                            <span v-html="selectedEvent.fechaNc"></span>
                          </p>
                          <p class="text-uppercase font-weight-bold">
                            DPI:
                            <span v-html="selectedEvent.dpi"></span>
                          </p>

                          <v-col cols="12">
                            <v-select
                              v-model="idConfirmacionCita"
                              :items="estadosConfirmacion"
                              item-value="idEstado"
                              item-text="nombre"
                              label="Seleccione el estado"
                              hint="El campo es requerido"
                              :rules="rulesInputConfirm"
                            ></v-select>
                          </v-col>
                        </v-card-text>
                        <v-card-actions>
                          <v-btn
                            :disabled="!rulesInputConfirm"
                            color="success"
                            @click="confirmCitaFinally(selectedEvent.idCita)"
                          >Finalizar cita</v-btn>
                          <v-btn text color="secondary" @click="selectedOpen = false">Cancel</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-menu>
                  </v-sheet>
                </v-col>
              </v-row>
            </template>
          </v-card-text>
        </v-card>
      </v-card>
    </v-dialog>

    <v-dialog v-model="loading" width="300px">
      <v-card height="100px" class="d-flex justify-center align-center">
        <v-card-text>
          <span class="title font-weight-bold">Cargando...</span>
          <div class="text-center">
            <v-progress-linear height="8" indeterminate color="green"></v-progress-linear>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import AlertErrorGlobal from "../alertas/alertErrorGlobal.vue";

import moment from "moment";
export default {
  components: {
    AlertErrorGlobal
  },
  props: {
    showCitesModal: Boolean,
    errorDB: Boolean,
    terapias: Array,
    estados: Array
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      DateType: "",
      dateStart: new Date().toISOString().substr(0, 10),
      dateEnd: new Date().toISOString().substr(0, 10),
      tipos: ["fechaCita", "fechaAsignacion"],
      range: "",
      ranges: [
        { id: 1, valor: "Fecha inicial" },
        { id: 2, valor: "Rango de fechas" }
      ],
      menu2: false,
      menu3: false,
      idTerpia: "",
      idEstado: "",
      rulesInput: [V => !!V || "El campo es requerido"],
      rulesInputConfirm: [V => !!V || "El campo es requerido"],
      showInput: false,
      formCitesValue: false,

      // data nueva
      today: "2019-01-01",
      focus: "2019-01-01",
      type: "month",
      typeToLabel: {
        month: "Month",
        week: "Week",
        day: "Day",
        "4day": "4 Days"
      },
      start: null,
      end: null,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      mesIr: "",
      showCalendar: false,
      loading: false,
      showAlertError: false,
      dialogFinalizar: false,
      estadosConfirmacion: [],
      idConfirmacionCita: "",
      dataEnviar: {}
    };
  },

  computed: {
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }
      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;
      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;
      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);
      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "4day":
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  methods: {
    async searchFilter() {
      this.loading = true;
      this.showAlertError = false;
      this.mesIr = "";

      const data = {
        DateType: this.DateType,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd ? this.dateEnd : null,
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

      this.loading = false;

      if (response.status === 200) {
        this.events = [];
        this.mesIr = this.dateStart;
        this.showCalendar = true;
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
          const fecha = fechaCita.split("T")[0];

          this.events.push({
            idTerapia,
            dPaciente,
            start: fecha,
            end: this.dateEnd ? this.fecha : null,
            name: nombreCompleto,
            fechaNc,
            details: noOrden,
            idCita,
            dpi,
            color: "#4285F4"
          });
        });
        // { "idTerapia": 1, "dPaciente": 2, "start": "2019-11-07", "name": "1111", "idCita": 20, "color": "#000" }
        //  { name: 'Hackathon', details: 'Code like there is no tommorrow', start: '2019-01-30 23:00',   color: 'black', },
      } else {
        this.loading = false;
        this.showAlertError = true;
        this.events = [];
        this.mesIr = "";
        this.showCalendar = false;
      }

      // this.$refs.citeRef.reset();
      // this.dataEnviar = data
      this.showInput = false;
    },
    closeModal() {
      this.$emit("closeModal");
      this.$refs.citeRef.reset();
      this.showInput = false;
      this.loading = false;
      this.showAlertError = false;
      this.events = [];
      this.mesIr = "";
      this.showCalendar = false;
    },
    filtroBusqueda() {
      this.showInput = true;
    },

    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      this.idConfirmacionCita = "";
      const open = () => {
        this.estadosConfirmacion = this.estados.filter(
          ({ nombre }) => nombre !== "Activa"
        );

        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      this.start = start;
      this.end = end;
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },

    async confirmCitaFinally(idCita) {
      if (this.idConfirmacionCita === "") {
        return;
      }

      const data = {
        state: this.idConfirmacionCita,
        idCita: idCita
      };

      const response = await this.$store.dispatch("changeCite", data);

      this.searchFilter();
      this.selectedOpen = false;

      this.events = this.events.filter(item => item.idCita !== idCita);
      this.idConfirmacionCita = "";
    }
  }
};
</script>
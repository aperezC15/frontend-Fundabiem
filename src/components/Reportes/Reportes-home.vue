<template>
  <v-container align-center>
    <v-row justify="center">
      <!--
        <v-col cols="12">
          <v-card color="#385F73" dark>
            <v-card-title class="headline">Unlimited music now</v-card-title>

            <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>

            <v-card-actions>
              <v-btn text>Listen Now</v-btn>
            </v-card-actions>
          </v-card>
      </v-col>-->

      <v-col v-for="(item, i) in items" :key="i" cols="6">
        <v-card :color="item.color" dark>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" v-text="item.title"></v-card-title>

              <v-card-text v-text="item.description"></v-card-text>
            </div>

            <v-avatar class="ma-3" size="100" tile>
              <v-img :src="item.src"></v-img>
            </v-avatar>
          </div>
          <v-card-actions>
            <v-btn :to="{name: item.componente}" class="mt-8" color="blue darken-1">
              Ir a reporte
              <v-icon class="ml-2" dark>launch</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        color: "#546E7A",
        src: "/img/citamedica.png",
        title: "Reporte de Citas",
        description:
          "Este módulo de reportes es de las citas de un paciente en un rango de fechas, tipo de terapia, estado de la cita y tipo de cita",
        componente: "ReporteCitas"
      },
      {
        color: "#546E7A",
        src: "/img/paciente.png",
        title: "Reporte de Pacientes",
        description: "Este módulo de reportes es de pacientes",
        componente: "ReportePacientes"
      }
    ]
  }),
  methods: {}
};
</script>
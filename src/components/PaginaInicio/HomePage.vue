<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6" align="right" justify="right">
        <v-img src="img/teleton.jpg" max-width="100" max-height="100"></v-img>
      </v-col>
      <v-col cols="6">
        <v-img
          src="https://get.mw.cr/c/aurens/content/images/colleges/logos/211.png"
          max-width="100"
          max-height="100"
        ></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card class="border-card-carousel">
          <v-carousel cycle hide-delimiter-background show-arrows-on-hover height="430">
            <v-carousel-item
              v-for="(images, i) in imagefunda"
              :key="i"
              :src="images.src"
              transition="scale-transition"
              reverse-transition="scale-transition"
              origin="center center"
            ></v-carousel-item>
          </v-carousel>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-container class="text-justify">
          <v-row class="fill-height" align="center" justify="center">
            <template v-for="(datos, i) in infofunda">
              <v-col :key="i" cols="12" md="6">
                <v-hover v-slot:default="{hover}">
                  <v-card
                    class="border-card"
                    :height="datos.tamaño"
                    :elevation="hover ? 12 : 2"
                    :class="{'on-hover': hover}"
                  >
                    <v-card-title class="headline">{{datos.title}}</v-card-title>
                    <v-card-text>{{datos.informacion}}</v-card-text>
                  </v-card>
                </v-hover>
              </v-col>
            </template>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.border-card {
  border-top: 8px solid #a6a6a6 !important;
  border-radius: 10px;
}

.border-card-carousel {
  border-bottom: 8px solid #a6a6a6 !important;
  border-radius: 10px;
}
</style>
<script>
export default {
  data() {
    return {
      showArrows: false,
      infofunda: [
        {
          title: "MISION",
          informacion:
            "Brindar de forma accesible y eficiente, servicios integrales de habilitación y rehabilitación a nivel nacional a personas con discapacidad física neuromusculoesquelética, para volverlas parte activa de una sociedad inclusiva, con una operación honesta y una administración responsable.",
          tamaño: "220"
        },
        {
          title: "VISION",
          informacion:
            "Ser referente a nivel mundial en el campo de emprendimiento social, siendo reconocidos por aplicar las mejores prácticas de gestión en el área médica, psicológica, financiera, administrativa, operativa y de recaudación.",
          tamaño: "220"
        },
        {
          title: "VALORES",
          informacion:
            "1. Equidad - 2. Unión - 3. Coherencia - 4. Tolerancia - 5. Empatía - 6. Transparencia - 7. Vocación de Servicio y Compromiso al usuario - 8. Solidaridad - 9. Respeto",
          tamaño: "150"
        },
        {
          title: "OBJETIVO",
          informacion:
            "Proporcionar servicios de habilitación y rehabilitación integral a personas con discapacidad física.",
          tamaño: "150"
        }
      ],
      imagefunda: [
        {
          src: "img/fundabiem1.jpeg"
        },
        {
          src: "img/fundabiem2.jpeg"
        }
      ]
    };
  },
  created() {
    console.log("hola desde el homepage");
  }
};
</script>
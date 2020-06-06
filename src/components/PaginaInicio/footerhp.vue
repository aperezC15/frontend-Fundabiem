<template>
  <v-footer color="#2c2e3f" dark
    absolute
    class="font-weight-medium"
    style="position:fixed;"
  >
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>FUNDABIEM</strong>
    </v-col>
  </v-footer>
</template>

<script lang="ts">
import Vue from 'vue';

export default({
    name: 'App',
    data: () => ({
    }),

});
</script>

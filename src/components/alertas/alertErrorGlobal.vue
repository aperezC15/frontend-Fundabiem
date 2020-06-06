<template>
  <v-row>
    <v-col cols="12" >
      <v-alert class="text-uppercase text-center" type="error">{{message}}</v-alert>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    message: String
  }
};
</script>
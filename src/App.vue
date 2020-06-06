<template>
  <v-app>
    <v-content>
        <toolbarhp/>
        <footerhp/>
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
//import { Component, Vue } from 'vue-property-decorator'

import Vue from 'vue';
import toolbarhp from './components/PaginaInicio/toolbarhp.vue';
import HomePage from './components/PaginaInicio/HomePage.vue';
import footerhp from './components/PaginaInicio/footerhp.vue';
import HomePageRM from './components/PaginaRegistroMedico/HomePageRM.vue';
import HomePageES from './components/EstudioSocioeconomico/HomePageES.vue';
import HomePageHC from './components/HistoriaClinica/PageHistoryClinic.vue';

export default({
  name: 'App',
  data: () => ({
    //
  }),
    components: {
      toolbarhp,
      HomePage,
      footerhp,
      HomePageRM,
      HomePageES,
      HomePageHC
  },
  computed: {
    ...mapGetters('oidcStore', [
                'oidcIsAuthenticated'
            ])
  }
});
</script>
run 
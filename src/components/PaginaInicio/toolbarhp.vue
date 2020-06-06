<template>
  <div id="app">
    <!-- start  of the toolbar -->
    <v-app-bar color="#2c2e3f" dark clipped-left app>
      <v-tooltip bottom color="indigo">
        <template v-slot:activator="{ on }">
          <v-app-bar-nav-icon v-on="on" @click="drawer = !drawer" />
        </template>
        <span>MENU</span>
      </v-tooltip>
      <div>
        <v-avatar>
          <v-img src="http://www.fundabiem.org.gt/wp-content/uploads/2017/08/favcon.jpg"></v-img>
        </v-avatar>
      </div>
      <v-toolbar-title class="headline text-uppercase">
        <span>FUNDABIEM RETALHULEU</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-tooltip bottom color="indigo">
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            class="mx-2"
            fab
            color="indigo"
            @click="signOutOidc"
            v-if="oidcIsAuthenticated"
          >
            <v-icon>fas fa-power-off</v-icon>
          </v-btn>
        </template>
        <span>Cerrar Sesión</span>
      </v-tooltip>

      <v-btn
        class="mx-2"
        title="Iniciar Sesion"
        fab
        color="indigo"
        to="/dashboard"
        v-if="!oidcIsAuthenticated"
      >
        <v-icon>fas fa-sign-in-alt</v-icon>
      </v-btn>
    </v-app-bar>
    <!-- end of the toolbar -->

    <v-navigation-drawer
      expand-on-hover
      app
      clipped
      hide-overlay
      width="300px"
      v-if="oidcIsAuthenticated"
      v-model="drawer"
      :mini-variant.sync="mini"
    >
      <v-card>
        <v-list shaped>
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="img/user.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-title>{{userName}}</v-list-item-title>
          </v-list-item>

          <v-list-item-group v-model="item" color="blue darken-1">
            <v-list-item v-for="(item, i) in Administrador" :key="i" :to="item.path">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>

          <v-list-item-group v-model="item" color="blue darken-1" v-if="hasRole('psicologia')">
            <v-list-item v-for="(item, i) in psicologiaItem" :key="i" :to="item.path">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts" >
import { mapGetters, mapActions } from "vuex";
import { Component, Vue } from "vue-property-decorator";
const namespace: string = "oidcStore/";

@Component({
  computed: {
    ...mapGetters("oidcStore", ["oidcIsAuthenticated", "oidcUser"])
  },
  methods: {
    ...mapActions("oidcStore", [
      "authenticateOidcSilent",
      "signOutOidc",
      "authenticateOidc"
    ])
  }
})
export default class tool extends Vue {
  drawer: boolean = true;
  mini: boolean = true;
  userName: string = "";
  item: number = 1;

  filterMenuItems(role: string) {
    if (this.$store.getters[namespace + "oidcIsAuthenticated"]) {
      return this.items.filter(
        (x: any) => x.roles && x.roles.some((y: any) => y === role)
      );
    }
    return [];
  }

  get psicologiaItem() {
    return this.filterMenuItems("psicologia");
  }
  get Administrador() {
    return this.filterMenuItems("Administrador");
  }

  hasRole(role: string): boolean {
    const user = this.$store.getters[namespace + "oidcUser"];
    var roles = user.role;

    if (Array.isArray(roles)) {
      return roles.some(
        (x: any) => x === role || roles.some((x: any) => x === "psicologia")
      );
    } else {
      return roles === role;
    }
  }

  items: any = [
    {
      title: "Consulta general",
      icon: "fas fa-hospital",
      path: "/consulta-general",
      roles: ["Administrador"]
    },
    {
      title: "Registros Médicos",
      icon: "fas fa-user-plus",
      path: "/registro-medico",
      roles: ["Administrador"]
    },
    {
      title: "Historia Clínica",
      icon: "fas fa-address-card",
      path: "/historia-clinica",
      roles: ["Administrador"]
    },
    {
      title: "Ciclo de Rehabilitacion",
      icon: "fas fa-address-card",
      path: "/ciclo-rehabilitacion",
      roles: ["Administrador"]
    },
    {
      title: "Evolución médica",
      icon: "fas fa-user-md",
      path: "/evolucion-medica",
      roles: ["Administrador"]
    },
    {
      title: "Estudio Socioeconómico",
      icon: "far fa-address-card",
      path: "/estudio-socioeconomico",
      roles: ["Administrador"]
    },
    {
      title: "Evolución técnica",
      icon: "far fa-address-card",
      path: "/evolucion-tecnica"
    },
    {
      title: "Citas",
      icon: "far fa-folder",
      path: "/citas",
      roles: ["Administrador"]
    },
    {
      title: "Reportes",
      icon: "fad fa-address-book",
      path: "/reportes",
      roles: ["Administrador"]
    },
    {
      title: "Historia Clínica Psicologia",
      icon: "far fa-address-card",
      path: "/Psicologia-clinica",
      roles: ["psicologia"]
    }
  ];
}
</script>

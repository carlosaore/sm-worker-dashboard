<script setup lang="ts">
import { computed, ref } from "vue";
import router from "@/router";
import { useAuthStore } from "@/store/auth.store";

const { logout } = useAuthStore();

const drawerActive = ref(false);

const toggleDrawer = () => {
  drawerActive.value = !drawerActive.value;
};

const currentRoute = router.currentRoute;

const title = computed(() => {
  switch (currentRoute.value.name) {
    case "Home":
      return "Inicio";
    case "Salidas":
      return "Reservas salientes";
    case "Entradas":
      return "Reservas entrantes";
    case "Amarres":
      return "Amarres libres";
    default:
      return "";
  }
});

const activeRoute = computed(() => {
  switch (currentRoute.value.name) {
    case "Home":
      return "home";
    case "Salidas":
      return "incoming";
    case "Entradas":
      return "outgoing";
    case "Amarres":
      return "free";
    default:
      return "";
  }
});
</script>

<template>
  <v-app-bar color="#002b5a" density="compact">
    <v-app-bar-nav-icon color="white" @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="text-white">{{ title }}</v-toolbar-title>
  </v-app-bar>
  <v-navigation-drawer v-model="drawerActive" location="top" id="nav_drawer">
    <v-list>
      <v-list-item
        prepend-icon="mdi-export"
        title="Salidas"
        value="incoming"
        :active="activeRoute === 'incoming'"
        @click="router.push('/salidas')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-import"
        title="Entradas"
        value="outgoing"
        :active="activeRoute === 'outgoing'"
        @click="router.push('/entradas')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-border-none-variant"
        title="Amarres libres"
        value="free"
        :active="activeRoute === 'free'"
        @click="router.push('/amarres')"
      ></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item prepend-icon="mdi-logout" title="Cerrar sesión" value="logout" @click="logout"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style>
#nav_drawer {
  height: max-content !important;
}
</style>

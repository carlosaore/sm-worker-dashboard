<script setup lang="ts">
import { computed, ref } from "vue";
import router from "@/router";
import { useAuthStore } from "@/store";
const { logout } = useAuthStore();

const drawerActive = ref(false);

const toggleDrawer = () => {
  drawerActive.value = !drawerActive.value;
};

const currentRoute = router.currentRoute;

const handleNavigation = (route: string) => {
  router.push(route);
  drawerActive.value = false;
};

// TODO: How will we retrieve the notifications? An endpoint? From User in auth store?
const dummyNotificationsCount = 1;

const title = computed(() => {
  switch (currentRoute.value.name) {
    case "home":
      return "Inicio";
    case "departuresAll":
      return "Salidas";
    case "departuresOne":
      return "Salida";
    case "arrivalsAll":
      return "Entradas";
    case "arrivalsOne":
      return "Entrada";
    case "berthsAll":
      return "Amarres";
    case "berthsOne":
      return "Amarre";
    case "notifications":
      return "Notificaciones";
    case "profile":
      return "Perfil";
    default:
      return "";
  }
});
</script>

<template>
  <v-app-bar color="primary" density="compact">
    <v-app-bar-nav-icon color="white" @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="text-white">{{ title }}</v-toolbar-title>
    <v-btn variant="text" icon="mdi-arrow-left" @click="router.go(-1)" color="white"></v-btn>
    <v-btn variant="text" @click="router.push('/notificaciones')" color="white">
      <v-badge dot :model-value="dummyNotificationsCount > 0" color="error">
        <v-icon>mdi-bell</v-icon>
      </v-badge>
    </v-btn>
    <v-btn variant="text" icon="mdi-home" @click="router.push('/home')" color="white"></v-btn>
  </v-app-bar>
  <v-navigation-drawer v-model="drawerActive" location="top" id="nav_drawer">
    <v-list>
      <v-list-item
        prepend-icon="mdi-import"
        title="Entradas"
        value="arrivals"
        :active="currentRoute.name === 'arrivalsAll'"
        @click="handleNavigation('/entradas')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-export"
        title="Salidas"
        value="departures"
        :active="currentRoute.name === 'departuresAll'"
        @click="handleNavigation('/salidas')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-pier"
        title="Amarres libres"
        value="berths"
        :active="currentRoute.name === 'berthsAll'"
        @click="handleNavigation('/amarres')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-bell"
        title="Notificaciones"
        value="notifications"
        :active="currentRoute.name === 'notifications'"
        @click="handleNavigation('/notificaciones')"
      ></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item
        prepend-icon="mdi-account"
        title="Perfil"
        value="profile"
        @click="handleNavigation('/perfil')"
        :active="currentRoute.name === 'profile'"
      ></v-list-item>
      <v-list-item prepend-icon="mdi-logout" title="Cerrar sesión" value="logout" @click="logout"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style>
#nav_drawer {
  height: max-content !important;
}
</style>

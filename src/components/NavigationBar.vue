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
    case "home":
      return "Inicio";
    case "outgoingAll":
      return "Reservas salientes";
    case "outgoingOne":
      return "Detalles de la reserva saliente";
    case "incomingAll":
      return "Reservas entrantes";
    case "incomingOne":
      return "Detalles de la reserva entrante";
    case "berthsAll":
      return "Amarres libres";
    case "berthsOne":
      return "Detalles del amarre";
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
  <v-app-bar color="#002b5a" density="compact">
    <v-app-bar-nav-icon color="white" @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="text-white">{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn variant="text" icon="mdi-arrow-left" @click="router.go(-1)" color="white"></v-btn>
    <v-btn variant="text" icon="mdi-bell" @click="router.push('/notificaciones')" color="white"></v-btn>
    <v-btn variant="text" icon="mdi-home" @click="router.push('/home')" color="white"></v-btn>
  </v-app-bar>
  <v-navigation-drawer v-model="drawerActive" location="top" id="nav_drawer">
    <v-list>
      <v-list-item
        prepend-icon="mdi-import"
        title="Entradas"
        value="incoming"
        :active="currentRoute.name === 'incomingAll'"
        @click="router.push('/entradas')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-export"
        title="Salidas"
        value="outgoing"
        :active="currentRoute.name === 'outgoingAll'"
        @click="router.push('/salidas')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-pier"
        title="Amarres libres"
        value="berths"
        :active="currentRoute.name === 'berthsAll'"
        @click="router.push('/amarres')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-bell"
        title="Notificaciones"
        value="notifications"
        :active="currentRoute.name === 'notifications'"
        @click="router.push('/notificaciones')"
      ></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item
        prepend-icon="mdi-account"
        title="Perfil"
        value="profile"
        @click="router.push('/perfil')"
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

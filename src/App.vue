<script lang="ts" setup>
import { useAuthStore } from "@/store/auth.store";
import { onMounted } from "vue";
import NavigationBar from "@/components/NavigationBar.vue";
import Footer from "@/components/Footer.vue";

const authStore = useAuthStore();

// on mount, check if user is logged in
onMounted(() => {
  authStore.checkAuth();
});

</script>

<template>
  <v-app>
    <NavigationBar v-if="authStore.workerIsLoggedIn"/>
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer v-if="authStore.workerIsLoggedIn"/>
  </v-app>
</template>

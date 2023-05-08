<script lang="ts" setup>
import { useAuthStore } from "@/store/auth.store";
import { onMounted } from "vue";
import NavigationBar from "@/components/NavigationBar.vue";

const authStore = useAuthStore();

// on mount, check if user is logged in
onMounted(() => {
  authStore.checkAuth();
});

</script>

<template>
  <v-app>
    <NavigationBar v-if="authStore.userIsLoggedIn"/>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

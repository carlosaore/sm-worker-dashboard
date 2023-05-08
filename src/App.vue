<script lang="ts" setup>
import { useAuthStore } from "@/store/auth.store";
import { onMounted } from "vue";

const authStore = useAuthStore();

// on mount, check if user is logged in
onMounted(() => {
  authStore.checkAuth();
});

</script>

<template>
  <v-app>
    <v-main>
      <router-link to="/login">Go to login</router-link>
      <router-link to="/home">Go to Home</router-link>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

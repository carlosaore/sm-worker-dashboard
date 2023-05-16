<script lang="ts" setup>
import { useAuthStore } from "@/store";
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
    <NavigationBar v-if="authStore.workerIsLoggedIn" />
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer v-if="authStore.workerIsLoggedIn" />
  </v-app>
</template>

<style>
html {
  overflow-y: auto;
  --sm-blue: #023161;
  --sm-indigo: #298097;
  --sm-blue-dark: #00274C;
  --sm-blue-light: #E6F1F8;
  --sm-accent: #FCBA2D;
  --sm-bg-grey: #EEEEEE;
  --sm-grey: #768396
}

.text-sm-indigo {
  color: var(--sm-indigo);
}

.text-sm-blue {
  color: var(--sm-blue);
}

.text-sm-blue-dark {
  color: var(--sm-blue-dark);
}

.text-sm-blue-light {
  color: var(--sm-blue-light);
}

.text-sm-accent {
  color: var(--sm-accent);
}

.text-sm-grey {
  color: var(--sm-grey);
}
</style>

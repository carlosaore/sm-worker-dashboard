<script setup lang="ts">
import { useAuthStore } from "@/store";
import { computed } from "vue";

const { worker } = useAuthStore();

const workerString = computed(() => {
  if (worker) {
    return `${worker.profile.name} ${worker.profile.lastname}`;
  }
  return "";
});
</script>

<template>
  <v-footer id="footer">
    <p class="text-footer text-sm-indigo">Logueado como: {{ workerString }}</p>
  </v-footer>
</template>

<style scoped>
#footer {
  max-height: 30px;
}

.text-footer {
  font-size: 0.7rem;
  text-align: center;
  width: 100%;
}
</style>

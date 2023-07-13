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
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: var(--sm-blue);
  box-shadow: 0 -2px 2px 0 rgba(0, 0, 0, 0.14), 0 -3px 1px -2px rgba(0, 0, 0, 0.12), 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
}

.text-footer {
  font-size: 0.7rem;
  color: white;
  text-align: center;
  width: 100%;
}
</style>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth.store";
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
  <v-footer class="bg-grey" id="footer">
    <v-responsive class="pa-3">
      <v-row align="center" justify="center">
        <v-col class="text-center pa-0">
          <span class="text-caption text-white">
            Logueado como: {{ workerString }}
          </span>
        </v-col>
      </v-row>
    </v-responsive>
  </v-footer>
</template>

<style scoped>
#footer {
  max-height: 40px;
}
</style>

<script setup lang="ts">
import { useAuthStore } from "@/store/auth.store";
import { computed } from "vue";

const { user } = useAuthStore();

const userString = computed(() => {
  if (user) {
    return `${user.profile.name} ${user.profile.lastname}`;
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
            Logueado como: {{ userString }}
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

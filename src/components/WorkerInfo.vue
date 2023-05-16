<script setup lang="ts">
import { Worker } from "@/types";
import { useAuthStore } from "@/store";

const worker = useAuthStore().worker as Worker

</script>

<template>
  <v-card class="wrapper--full-height-min" title="Datos de trabajador" append-icon="mdi-account-hard-hat">
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-chip variant="text" class="text-body-1">{{ worker.profile.name }} {{ worker.profile.lastname }}</v-chip>
        </v-col>
        <v-col cols="12">
          <v-chip variant="text" prepend-icon="mdi-email">{{ worker.profile.email }}</v-chip>
        </v-col>
        <v-col v-if="worker.profile.phone" cols="12">
          <v-chip variant="text" prepend-icon="mdi-phone">{{ worker.profile.phone }}</v-chip>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

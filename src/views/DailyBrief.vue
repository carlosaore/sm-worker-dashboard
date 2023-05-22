<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";

const departuresCount = ref(3);
const arrivalsCount = ref(12);
const berthsCount = ref(5);

const today = new Date()
  .toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  .replace(/^\w/, (c) => c.toUpperCase());
</script>

<template>
  <v-container>
    <div class="text-overline text-sm-grey text-right">
      {{ today }}
    </div>
    <v-row>
      <v-col cols="12" sm="4">
        <v-card
          title="Entradas hoy"
          @click="router.push('/entradas')"
          elevation="6"
          color="primary"
        >
          <template v-slot:append>
            <v-icon size="x-large">mdi-import</v-icon>
          </template>
          <v-card-text>
            <div class="text-h2 text-center text-sm-accent">{{ arrivalsCount }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card
          title="Salidas hoy"
          @click="router.push('/salidas')"
          elevation="6"
          color="primary"
        >
          <template v-slot:append>
              <v-icon size="x-large">mdi-export</v-icon>
          </template>
          <v-card-text>
            <div class="text-h2 text-center text-sm-accent">{{ departuresCount }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card
          title="Amarres libres hoy"
          @click="router.push('/amarres')"
          elevation="6"
          color="primary"
        >
          <template v-slot:append>
            <v-icon size="x-large">mdi-pier</v-icon>
          </template>
          <v-card-text>
            <div class="text-h2 text-center text-sm-accent">{{ berthsCount }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

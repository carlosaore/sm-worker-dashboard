<script setup lang="ts">
import { getLanguageString } from "@/utils";
import { SM_BLUE } from "@/config";

interface Props {
  name: string;
  lastname: string;
  email: string;
  phone: string | null;
  language: string;
  country_phone_iso2: string | null;
}
defineProps<Props>();
</script>

<template>
  <v-card class="wrapper--full-height-min">
    <template v-slot:title>
      <span class="text-primary">Navegante</span>
    </template>
    <template v-slot:append>
      <v-icon :color="SM_BLUE">mdi-account-tie-hat</v-icon>
    </template>
    <v-card-text>
      <p class="my-6" data-content="Nombre y apellidos">{{ name }} {{ lastname }}</p>
      <p class="mb-6" data-content="Email">{{ email }}</p>
      <p v-if="phone" class="mb-6" data-content="Teléfono">{{ phone }}</p>
      <p data-content="Idioma">{{ getLanguageString(language) }}</p>
    </v-card-text>
  </v-card>
</template>

<style scoped>
p {
  position: relative;
}

p:before {
  content: attr(data-content);
  position: absolute;
  top: -1.25rem;
  left: 0;
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--sm-indigo);
}
</style>

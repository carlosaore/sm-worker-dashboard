<script setup lang="ts">
import { getLanguageString } from "@/utils";

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
  <v-card title="Navegante" class="wrapper--full-height-min" append-icon="mdi-account-tie-hat">
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
  color: #1976D2;
}
</style>

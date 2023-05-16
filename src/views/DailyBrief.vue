<script setup lang="ts">


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
  <v-card :title="today"></v-card>
</template>

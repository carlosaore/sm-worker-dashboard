<script setup lang="ts">

import { SM_INDIGO } from "@/config";
</script>

<template>
<v-card title="Documentos" append-icon="mdi-file-document-multiple">
  <v-card-text>
    <v-row no-gutters justify="space-between" align="center">
      <v-col cols="auto">
        <span>Documento de identidad</span>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto">
        <v-btn-group>
          <v-btn prepend-icon="mdi-download" size="x-small" :color="SM_INDIGO" variant="text">Descargar</v-btn>
          <v-btn prepend-icon="mdi-eye" size="x-small" color="blue-darken-2" variant="text">Ver</v-btn>
        </v-btn-group>
      </v-col>
    </v-row>
    <v-row no-gutters justify="space-between" align="center">
      <v-col cols="auto">
        <span>Documento del barco</span>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto">
        <v-btn-group>
          <v-btn prepend-icon="mdi-download" size="x-small" :color="SM_INDIGO" variant="text">Descargar</v-btn>
          <v-btn prepend-icon="mdi-eye" size="x-small" color="blue-darken-2" variant="text">Ver</v-btn>
        </v-btn-group>
      </v-col>
    </v-row>
    <v-row no-gutters justify="space-between" align="center">
      <v-col cols="auto">
        <span>Seguro del barco</span>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto">
        <v-btn-group>
          <v-btn prepend-icon="mdi-download" size="x-small" :color="SM_INDIGO" variant="text">Descargar</v-btn>
          <v-btn prepend-icon="mdi-eye" size="x-small" color="blue-darken-2" variant="text">Ver</v-btn>
        </v-btn-group>
      </v-col>
    </v-row>
    <v-row no-gutters justify="space-between" align="center">
      <v-col cols="auto">
        <span>Hoja de entrada</span>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto">
        <v-btn-group>
          <v-btn prepend-icon="mdi-download" size="x-small" :color="SM_INDIGO" variant="text">Descargar</v-btn>
          <v-btn prepend-icon="mdi-eye" size="x-small" color="blue-darken-2" variant="text">Ver</v-btn>
        </v-btn-group>
      </v-col>
    </v-row>
    <v-row no-gutters justify="space-between" align="center">
      <v-col cols="auto">
        <span>Lista de tripulación</span>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto">
        <v-btn-group>
          <v-btn prepend-icon="mdi-download" size="x-small" :color="SM_INDIGO" variant="text">Descargar</v-btn>
          <v-btn prepend-icon="mdi-eye" size="x-small" color="blue-darken-2" variant="text">Ver</v-btn>
        </v-btn-group>
      </v-col>
    </v-row>
  </v-card-text>
</v-card>
</template>

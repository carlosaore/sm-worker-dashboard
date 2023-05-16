<script setup lang="ts">
import { SM_INDIGO } from "@/config";
</script>

<template>
  <v-card>
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
      <v-row justify="space-between">
        <v-col cols="6">
          <v-btn block size="small"> Acción 1 </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn block size="small"> Acción 2 </v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn color="warning" block prepend-icon="mdi-alert-circle"> Reportar problema </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style>
#booking-actions-wrapper {
  min-height: 100%;
}
</style>

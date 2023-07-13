<script setup lang="ts">
import { SM_BLUE, SM_GREY, SM_INDIGO } from "@/config";

const documents = [
  {
    name: "Documento de identidad",
    key: "id_document",
  },
  {
    name: "Documento del barco",
    key: "boat_document",
  },
  {
    name: "Seguro del barco",
    key: "boat_insurance",
  },
  {
    name: "Hoja de entrada",
    key: "entry_sheet",
  },
  {
    name: "Lista de tripulantes",
    key: "crew_list",
  },
];

const onDownload = (key: string) => {
  console.log("download", key);
};

const onPreview = (key: string) => {
  console.log("preview", key);
};
</script>

<template>
  <v-card variant="text">
    <template v-slot:title>
      <span class="text-primary">Documentos</span>
    </template>
    <template v-slot:append>
      <v-icon :color="SM_BLUE">mdi-file-document-multiple</v-icon>
    </template>
    <v-card-text>
      <v-row v-for="document of documents" no-gutters justify="space-between" align="center" :key="document.key">
        <v-col cols="auto">
          <span>{{ document.name }}</span>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-btn-group>
            <v-btn
              prepend-icon="mdi-download"
              size="x-small"
              :color="SM_GREY"
              variant="text"
              @click="onDownload(document.key)"
              >Descargar</v-btn
            >
            <v-btn
              prepend-icon="mdi-eye"
              size="x-small"
              :color="SM_INDIGO"
              variant="text"
              @click="onPreview(document.key)"
              >Ver</v-btn
            >
          </v-btn-group>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

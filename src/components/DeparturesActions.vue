<script setup lang="ts">
import { SM_GREY, SM_INDIGO } from "@/config";
import ButtonDialog from "@/components/ButtonDialog.vue";
import ReportProblem from "@/components/ReportProblem.vue";
import ConfirmDeparture from "@/components/ConfirmDeparture.vue";

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
  <v-card>
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
      <v-row justify="space-between">
        <v-col cols="12">
          <ButtonDialog
            buttonText="Confirmar salida"
            buttonColor="secondary"
            buttonVariant="elevated"
            :allowFullscreen="false"
          >
            <ConfirmDeparture />
          </ButtonDialog>
        </v-col>
        <v-col cols="12">
          <ButtonDialog
            buttonText="Reportar problema"
            buttonVariant="text"
            buttonColor="warning"
            title="Reportar problema"
            allowFullscreen
          >
            <ReportProblem />
          </ButtonDialog>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

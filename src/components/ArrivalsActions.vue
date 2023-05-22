<script setup lang="ts">
import ButtonDialog from "@/components/ButtonDialog.vue";
import ReportProblem from "@/components/ReportProblem.vue";
import ConfirmArrival from "@/components/ConfirmArrival.vue";
import ConfirmDocuments from "@/components/ConfirmDocuments.vue";
</script>

<template>
  <v-card>
    <v-card-text>
      <v-row justify="space-between">
        <v-col cols="12">
          <ButtonDialog
            buttonText="Confirmar documentos"
            buttonColor="secondary"
            buttonVariant="elevated"
            title="Confirmar documentos"
            :allowFullscreen="false"
          >
            <ConfirmDocuments />
          </ButtonDialog>
        </v-col>
        <v-col cols="12">
          <ButtonDialog
            buttonText="Confirmar entrada"
            buttonColor="secondary"
            buttonVariant="elevated"
            title="Confirmar entrada"
            :allowFullscreen="false"
          >
            <ConfirmArrival />
          </ButtonDialog>
        </v-col>
        <v-col cols="12">
          <ButtonDialog
            buttonText="Reportar problema"
            buttonVariant="text"
            buttonColor="warning"
            buttonIcon="warning"
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

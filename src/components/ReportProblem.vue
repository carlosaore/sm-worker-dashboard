<script setup lang="ts">
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { getBookingById } from "@/services";
import { ref } from "vue";

const params = useRoute().params;

const problemDescription = ref("");

const { data } = useQuery({
  queryKey: ["getBookingById", params.id],
  queryFn: ({ queryKey }) => getBookingById(queryKey[1]),
  onSuccess: (data) => {
    hintText.value = `Problema con la reserva de ${data.data.data.user.name} ${data.data.data.user.lastname}, embarcación ${data.data.data.ship.name} y amarre ${data.data.data.berth.name}`;
  },
});

const hintText = ref("");
const reportSent = ref(false);

// TODO: add mutation to send report to API (and update the loading prop of the button and anything else you need to do)

const onFinish = () => {
  const relevantData = {
    message: "Report problem form submitted",
    problemDescription: problemDescription.value,
    bookingId: data.value.data.data.id,
    paramId: params.id, // should be the same as bookingId (once API is real)
    shipName: data.value.data.data.ship.name,
    berthName: data.value.data.data.berth.name,
    userId: data.value.data.data.user.id,
  };
  console.log(relevantData); // here you can see the data that would be sent to the API
  hintText.value = "Gracias por reportar el problema"; // move this to the onSuccess callback of the mutation
  reportSent.value = true; // move this to the onSuccess callback of the mutation
};
</script>

<template>
  <v-form @submit.prevent="onFinish">
    <v-textarea
      v-model="problemDescription"
      variant="filled"
      label="Descripción del problema"
      auto-grow
      :hint="hintText"
      persistent-hint
      :disabled="reportSent"
    ></v-textarea>
    <v-btn :loading="false" type="submit" block class="mt-4" color="primary" :disabled="reportSent">Enviar</v-btn>
  </v-form>
</template>

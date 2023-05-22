<script setup lang="ts">
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { getBookingById } from "@/services";
import { computed, ref } from "vue";

const params = useRoute().params;

const { isSuccess, data, refetch } = useQuery({
  queryKey: ["getBookingById", params.id],
  queryFn: ({ queryKey }) => getBookingById(queryKey[1]),
  onSuccess: (data) => {
    if (data.data.data.departured_at) {
      // If you want to display the arrived_at date, you can add it here (after converting it to a readable format)
      hintText.value = `Salida de ${data.data.data.user.name} ${data.data.data.user.lastname} embarcación ${data.data.data.ship.name} al amarre ${data.data.data.berth.name} confirmada`;
      return;
    }
    hintText.value = `Confirmar salida de ${data.data.data.user.name} ${data.data.data.user.lastname}, embarcación ${data.data.data.ship.name} del amarre ${data.data.data.berth.name}?`;
  },
});

const hintText = ref("");

const departureConfirmed = computed(() => !!(isSuccess.value && data.value.data.data.departured_at));

// TODO: add mutation to confirm arrival to API (and update the loading prop of the button and anything else you need to do)
const onConfirm = () => {
  console.log("Confirm departure", data.value.data.data); // here send the mutation
  refetch(); // the refetch will update the hintText and departureConfirmed computed properties
};
</script>

<template>
  <p>{{ hintText }}</p>
  <v-btn block class="mt-4" color="primary" :disabled="departureConfirmed" @click="onConfirm">Confirmar</v-btn>
</template>

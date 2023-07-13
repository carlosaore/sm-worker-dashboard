<script setup lang="ts">
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { getBookingById } from "@/services";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import { computed, ref } from "vue";

const params = useRoute().params;

const { isSuccess, data, refetch } = useQuery({
  queryKey: ["getBookingById", params.id as string],
  queryFn: ({ queryKey }) => getBookingById(queryKey[1]),
  onSuccess: (data) => {
    if (data.data.data.arrived_at) {
      // If you want to display the arrived_at date, you can add it here (after converting it to a readable format)
      hintText.value = `Entrada de ${data.data.data.user.name} ${data.data.data.user.lastname} embarcación ${data.data.data.ship.name} al amarre ${data.data.data.berth.name} confirmada`;
      return;
    }
    hintText.value = `Confirmar entrada de ${data.data.data.user.name} ${data.data.data.user.lastname}, embarcación ${data.data.data.ship.name} al amarre ${data.data.data.berth.name}?`;
  },
});

const hintText = ref("");

const arrivalConfirmed = computed(() => !!(isSuccess.value && data.value?.data.data.arrived_at));

// TODO: add mutation to confirm arrival to API (and update the loading prop of the button and anything else you need to do)
const onConfirm = async () => {
  console.log("Confirm arrival"); // here send the mutation
  await refetch(); // the refetch will update the hintText and arrivalConfirmed computed properties
  // close modal
};
</script>

<template>
  <SkeletonLoader v-if="hintText.length === 0" height="100" />
  <p>{{ hintText }}</p>
  <v-btn block class="mt-4" color="primary" :disabled="arrivalConfirmed" @click="onConfirm">Confirmar</v-btn>
</template>

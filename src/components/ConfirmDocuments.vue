<script setup lang="ts">
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { getBookingById } from "@/services";
import { ref } from "vue";

const params = useRoute().params;

const { data } = useQuery({
  queryKey: ["getBookingById", params.id],
  queryFn: ({ queryKey }) => getBookingById(queryKey[1]),
});

const documents = ref([
  {
    name: "Documento de identidad",
    key: "id_document",
    checked: false,
  },
  {
    name: "Documento del barco",
    key: "boat_document",
    checked: false,
  },
  {
    name: "Seguro del barco",
    key: "boat_insurance",
    checked: false,
  },
  {
    name: "Hoja de entrada",
    key: "entry_sheet",
    checked: false,
  },
  {
    name: "Lista de tripulantes",
    key: "crew_list",
    checked: false,
  },
]);

const onFinish = () => {
  const relevantData = {
    message: "Confirm documents form submitted",
    bookingId: data.value.data.data.id,
    paramId: params.id, // should be the same as bookingId (once API is real)
    shipName: data.value.data.data.ship.name,
    berthName: data.value.data.data.berth.name,
    userId: data.value.data.data.user.id,
  };
  console.log(relevantData); // here you can see the data that would be sent to the API
};

</script>

<template>
  <v-form @submit.prevent="onFinish">
    <p class="text-caption">
      Seleccione los documentos que ha revisado y confirme que están en regla.
    </p>
    <v-chip-group column multiple active-class="chip-selected">
      <v-chip
        v-for="document in documents"
        :key="document.key"
        label
        @click="document.checked = !document.checked"
      >
        {{ document.name }}
      </v-chip>
    </v-chip-group>
    <v-btn type="submit" block class="mt-4" color="primary">Confirmar</v-btn>
  </v-form>
</template>

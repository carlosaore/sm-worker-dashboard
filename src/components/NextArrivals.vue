<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { getBookings } from "@/services";
import ReadOnlyBookingsTable from "@/components/ReadOnlyBookingsTable.vue";
import { ref } from "vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";

const updatedAt = ref("Actualizando...");

const {
  isSuccess,
  data: getBookingsData,
  isLoading,
} = useQuery({
  queryKey: ["next5IncomingBookings"],
  queryFn: () =>
    getBookings({
      type: "arrivals",
      page: 1,
      limit: 5,
    }),
  refetchInterval: 60000, // 1 minute in milliseconds (modify to your needs)
  keepPreviousData: true,
  onSuccess: () => {
    updatedAt.value = new Date().toLocaleString("es-ES", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  },
});
</script>

<template>
  <v-card
    title="Próximas reservas"
    :loading="isLoading"
    :subtitle="`Hora de la última actualización: ${updatedAt}`"
    prepend-icon="mdi-import"
  >
    <v-card-text>
      <ReadOnlyBookingsTable v-if="isSuccess" :bookings="getBookingsData.data.data" path-prefix="/entradas" />
      <SkeletonLoader v-else height="150" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { getBookings } from "@/services";
import ReadOnlyBookingsTable from "@/components/ReadOnlyBookingsTable.vue";
import { ref } from "vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import router from "@/router";

const updatedAt = ref("Actualizando...");

const {
  isSuccess,
  data: getBookingsData,
  isLoading,
  refetch,
} = useQuery({
  queryKey: ["next5Arrivals"],
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
    <v-card-actions>
      <v-spacer />
      <v-btn
        variant="text"
        size="small"
        prepend-icon="mdi-refresh"
        color="grey"
        @click="refetch"
      >
        Refrescar
      </v-btn>
      <v-btn
        variant="text"
        size="small"
        prepend-icon="mdi-refresh"
        color="primary"
        @click="router.push('/entradas')"
      >
        Ver todas
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

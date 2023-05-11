<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { getBookings } from "@/services";
import { ref } from "vue";
import ReadOnlyBookingsTable from "@/components/ReadOnlyBookingsTable.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import router from "@/router";

const updatedAt = ref("Actualizando...");

const {
  isSuccess,
  data: getBookingsData,
  isLoading,
  refetch,
} = useQuery({
  queryKey: ["next5Departures"],
  queryFn: () =>
    getBookings({
      type: "departures",
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
    title="Próximas salidas"
    :loading="isLoading"
    :subtitle="`Hora de la última actualización: ${updatedAt}`"
    prepend-icon="mdi-export"
  >
    <v-card-text>
      <ReadOnlyBookingsTable v-if="isSuccess" :bookings="getBookingsData.data.data" path-prefix="/salidas" />
      <SkeletonLoader v-else height="150" />
    </v-card-text>
    <v-card-actions>
      <v-btn
        variant="text"
        size="small"
        prepend-icon="mdi-refresh"
        color="grey"
        @click="refetch"
      >
        Refrescar
      </v-btn>
      <v-spacer />
      <v-btn
        variant="text"
        size="small"
        prepend-icon="mdi-refresh"
        color="primary"
        @click="router.push('/salidas')"
      >
        Ver todas
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

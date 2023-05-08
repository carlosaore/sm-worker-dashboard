<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { ref } from "vue";
import { getBookings } from "@/services";

const currentPage = ref(0);

const { isSuccess, data: getBookingsData } = useQuery({
  queryKey: ["bookings", currentPage],
  queryFn: ({ queryKey }) => getBookings({ page: queryKey[1] }),
});
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <p>Home</p>
      <div v-if="isSuccess" >
        <pre>
          {{ getBookingsData.data }}
        </pre>
      </div>
    </v-responsive>
  </v-container>
</template>

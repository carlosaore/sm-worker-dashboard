<script setup lang="ts">
import router from "@/router";

interface Props {
  bookingId: number;
  pathPrefix: string;
}
const props = defineProps<Props>();

const handleGoToBooking = () => {
  router.push(`${props.pathPrefix}/${props.bookingId}`);
};
</script>

<template>
  <v-btn-group>
    <v-btn icon="mdi-eye" @click="handleGoToBooking" color="blue-darken-2" variant="text"></v-btn>
  </v-btn-group>
</template>

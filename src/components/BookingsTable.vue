<script setup lang="ts">
import { Booking } from "@/types";
import { SM_INDIGO } from "@/config";
import router from "@/router";

interface Props {
  bookings: Booking[];
  pathPrefix: string;
  type: "arrivals" | "departures";
}

const props = defineProps<Props>();

type Headers = {
  text: string;
  icon?: string;
}[];

const parseDateIntoCompactDate = (date: string): string => {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString("es-ES", {
    month: "short",
    day: "2-digit",
    year: (parsedDate.getFullYear() !== new Date().getFullYear()) ? "numeric" : undefined,
  });
};

const headers: Headers = [
  {
    text: "Amarre",
    icon: "mdi-pier",
  },
  {
    text: "Embarcación",
    icon: "mdi-sail-boat",
  },
  props.type === "arrivals"
    ? {
      text: "Inicio",
      icon: "mdi-clock-start",
    }
    : {
      text: "Fin",
      icon: "mdi-clock-end",
    },
];

const handleRowClick = (id: number) => {
  const url = `${props.pathPrefix}/${id}`;
  router.push(url);
};
</script>

<template>
  <v-table density="comfortable" hover>
    <thead>
    <tr>
      <template v-for="header in headers" :key="header.text">
        <th class="px-0">
          <div class="d-flex flex-column align-center justify-center">
            <v-icon :color="SM_INDIGO" v-if="header.icon">{{ header.icon }}</v-icon>
            <span class="text-overline text-sm-indigo">{{ header.text }}</span>
          </div>
        </th>
      </template>
    </tr>
    </thead>
    <tbody>
    <tr v-for="booking in props.bookings" :key="booking.id" @click="handleRowClick(booking.id)">
      <td class="text-center px-0">
        <v-chip color="orange" size="small" label>
          {{ booking.berth.name }}
        </v-chip>
      </td>
      <td class="d-flex flex-column align-center px-0">
        <v-chip variant="text" size="small">
          {{ booking.ship.name }}
        </v-chip>
        <v-chip variant="text" size="small">
          {{ booking.ship.target }}
        </v-chip>
      </td>
      <td v-if="type === 'arrivals'" class="text-center px-0">
        <v-chip variant="text" size="small">
          {{ parseDateIntoCompactDate(booking.date_ini) }}
        </v-chip>
      </td>
      <td v-else class="text-center px-0">
        <v-chip variant="text" size="small">
          {{ parseDateIntoCompactDate(booking.date_end) }}
        </v-chip>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<style scoped>
/* last column is always visible, and it has a left drop shadow
.last-column {
  position: sticky;
  right: 0;
  background-color: white;
  min-width: 100px;
}*/
</style>

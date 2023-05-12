<script setup lang="ts">
import { Booking } from "@/types";
import router from "@/router";

interface Props {
  bookings: Booking[];
  pathPrefix: string;
}

const props = defineProps<Props>();

type Headers = {
  text: string;
  icon?: string;
}[];

const parseDateIntoCompactDate = (date: string): string => {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
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
  {
    text: "Navegante",
    icon: "mdi-account-tie-hat",
  },
  {
    text: "Inicio",
    icon: "mdi-clock-start",
  },
  {
    text: "Fin",
    icon: "mdi-clock-end",
  },
  {
    text: "Arribo",
    icon: "mdi-clock-in",
  },
  {
    text: "Partida",
    icon: "mdi-clock-out",
  },
];

const handleRowClick = (id: number) => {
  const url = `${props.pathPrefix}/${id}`;
  router.push(url);
};
</script>

<template>
  <v-table class="overflow-x-auto">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.text">
          <div class="d-flex flex-column align-center justify-center">
            <v-icon color="blue-darken-2" v-if="header.icon">{{ header.icon }}</v-icon>
            <span class="text-caption">{{ header.text }}</span>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="booking in props.bookings" :key="booking.id" @click="handleRowClick(booking.id)" class="clickable-row">
        <td class="text-center">
          <v-chip color="orange" size="small">
            {{ booking.berth.name }}
          </v-chip>
        </td>
        <td class="text-center">
          <v-chip variant="text" size="small">
            {{ booking.ship.name }}
          </v-chip>
        </td>
        <td class="text-center">
          <v-chip variant="text" size="small">
            {{ booking.user.name }} {{ booking.user.lastname }}
          </v-chip>
        </td>
        <td class="text-center">
          <v-chip variant="text" size="small">
            {{ parseDateIntoCompactDate(booking.date_ini) }}
          </v-chip>
        </td>
        <td class="text-center">
          <v-chip variant="text" size="small">
            {{ parseDateIntoCompactDate(booking.date_end) }}
          </v-chip>
        </td>
        <td class="text-center">
          <v-chip variant="text" size="small">
            {{ booking.arrived_at || "-" }}
          </v-chip>
        </td>
        <td class="text-center">
          <v-chip variant="text" size="small">
            {{ booking.departured_at || "-" }}
          </v-chip>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped>
.clickable-row {
  cursor: pointer;
}
.clickable-row:hover {
  background-color: #f5f5f5;
}
</style>

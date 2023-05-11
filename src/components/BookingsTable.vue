<script setup lang="ts">
import { Booking } from "@/types";
import { getLanguageString } from "@/utils";
import BookingRowAction from "@/components/BookingRowAction.vue";

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
    text: "Dimensiones",
    icon: "mdi-ruler",
  },
  {
    text: "Matrícula",
    icon: "mdi-alphabetical-variant",
  },
  {
    text: "Navegante",
    icon: "mdi-account-tie-hat",
  },
  {
    text: "email",
    icon: "mdi-email",
  },
  {
    text: "Teléfono",
    icon: "mdi-phone",
  },
  {
    text: "Idioma",
    icon: "mdi-translate",
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
  {
    text: "",
    icon: "mdi-dots-horizontal",
  }
];
</script>

<template>
  <v-table class="overflow-x-auto">
    <thead>
    <tr>
      <template v-for="(header, index) in headers" :key="header.text">
        <th :class="index === headers.length - 1 ? 'last-column' : ''">
          <div class="d-flex flex-column align-center justify-center">
            <v-icon color="blue-darken-4" v-if="header.icon">{{ header.icon }}</v-icon>
            <span class="text-caption">{{ header.text }}</span>
          </div>
        </th>
      </template>
    </tr>
    </thead>
    <tbody>
    <tr v-for="booking in props.bookings" :key="booking.id">
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
          E {{ booking.ship.length }} - M {{ booking.ship.beam }} - C {{ booking.ship.draft }}
        </v-chip>
      </td>
      <td class="text-center">
        <v-chip variant="text" size="small">
          {{ booking.ship.target }}
        </v-chip>
      </td>
      <td class="text-center">
        <v-chip variant="text" size="small">
          {{ booking.user.name }} {{ booking.user.lastname }}
        </v-chip>
      </td>
      <td class="text-center">
        <a :href="`mailto:${booking.user.email}`" class="text-caption text-decoration-none">
          {{ booking.user.email }}
        </a>
      </td>
      <td class="text-center">
        <a
          v-if="booking.user.phone"
          :href="`tel:${booking.user.phone}`"
          class="text-caption text-decoration-none">
          {{ booking.user.phone }}
        </a>
        <v-chip v-else variant="text" size="small">
          -
        </v-chip>
      </td>
      <td class="text-center">
        <v-chip variant="text" size="small">
          {{ getLanguageString(booking.user.language) }}
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
      <td>
        <v-chip variant="text" size="small">
          {{ booking.departured_at || "-" }}
        </v-chip>
      </td>
      <td class="text-center last-column">
        <BookingRowAction :pathPrefix="props.pathPrefix" :bookingId="booking.id" />
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<style scoped>
/* last column is always visible, and it has a left drop shadow */
.last-column {
  position: sticky;
  right: 0;
  background-color: white;
  min-width: 100px;
}
</style>

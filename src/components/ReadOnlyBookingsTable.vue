<script setup lang="ts">
import { Booking } from "@/types";
import { onMounted, onUnmounted, ref } from "vue";
import router from "@/router";

interface Props {
  bookings: Booking[];
  pathPrefix: string;
}

const props = defineProps<Props>();

/**
 * Table height is 30% of the window height
 */
const tableHeight = ref(window.innerHeight * 0.3);
const updateTableHeight = () => {
  tableHeight.value = window.innerHeight * 0.3;
};
onMounted(() => {
  window.addEventListener("resize", updateTableHeight);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateTableHeight);
});

type Headers = {
  text: string;
  icon?: string;
  ref: keyof Booking | Array<keyof Booking>;
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
    text: "",
    icon: "mdi-identifier",
    ref: "id",
  },
  {
    text: "Embarcación", // Boat name, currently not returned by API
    icon: "mdi-sail-boat",
    ref: "ship_id",
  },
  {
    text: "Cliente?",
    icon: "mdi-account-tie-hat",
    ref: ["user_id", "is_subscription", "is_subscription_active"], // We will add a badge or something to signal sub status
  },
  {
    text: "Inicio",
    icon: "mdi-clock-start",
    ref: "date_ini",
  },
  {
    text: "Fin",
    icon: "mdi-clock-end",
    ref: "date_end",
  },
  {
    text: "Amarre",
    icon: "mdi-pier",
    ref: ["berth_id", "berth_id_2"],
  },
  {
    text: "Arribo",
    icon: "mdi-clock-in",
    ref: "arrived_at",
  },
  {
    text: "Partida",
    icon: "mdi-clock-out",
    ref: "departured_at",
  },
  {
    text: "Creado",
    ref: "created_at",
  },
  {
    text: "Actualizado",
    ref: "updated_at",
  },
];

const handleRowClick = (id: number) => {
  const url = `${props.pathPrefix}/${id}`;
  router.push(url);
};
</script>

<template>
  <v-table density="compact" :height="`${tableHeight}px`" fixed-header class="overflow-x-auto">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.text">
          <div class="d-flex flex-column align-center justify-center">
            <v-icon color="blue-darken-4" v-if="header.icon">{{ header.icon }}</v-icon>
            <span class="text-caption">{{ header.text }}</span>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="booking in props.bookings" :key="booking.id" @click="handleRowClick(booking.id)" class="clickable-row">
        <td class="text-center">
          <v-chip color="grey" size="x-small">
            {{ booking.id }}
          </v-chip>
        </td>
        <td class="text-center">
          <v-chip variant="text" size="small">
            {{ booking.ship_id }}
          </v-chip>
        </td>
        <td class="text-center">
          <v-chip variant="text" size="small">
            {{ booking.user_id }}
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
            {{ booking.berth_id }}
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
        <td class="text-center">
          <v-chip variant="plain" size="small">
            {{ parseDateIntoCompactDate(booking.created_at) }}
          </v-chip>
        </td>
        <td class="text-center">
          <v-chip variant="plain" size="small">
            {{ parseDateIntoCompactDate(booking.updated_at) }}
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

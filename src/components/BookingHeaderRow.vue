<script setup lang="ts">
interface Props {
  date_ini: string;
  date_end: string;
  light: boolean;
  water: boolean;
  ship_name: string;
  user_name: string;
  user_lastname: string;
  validated: boolean;
  berth_name: string;
}
const props = defineProps<Props>();

const getDateProps = (dateString: string): {
  weekday: string;
  month: string;
  day: string;
  year: string;
} => {
  const date = new Date(dateString);
  return {
    weekday: date.toLocaleDateString("es-ES", { weekday: "long" }),
    month: date.toLocaleDateString("es-ES", { month: "long" }),
    day: date.toLocaleDateString("es-ES", { day: "numeric" }),
    year: date.toLocaleDateString("es-ES", { year: "numeric" }),
  };
};

</script>

<template>
  <v-card
    title="Reserva"
  >
    <v-card-text>
      <v-col sm="6" md="12" lg="12" xl="12" xxl="12">
        <pre>
          {{ getDateProps(props.date_ini) }}
        </pre>
      </v-col>
      <v-col sm="6" md="12" lg="12" xl="12" xxl="12">

      </v-col>
    </v-card-text>
  </v-card>
  <v-row>

  </v-row>
</template>

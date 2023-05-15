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
    month: date.toLocaleDateString("es-ES", { month: "short" }),
    day: date.toLocaleDateString("es-ES", { day: "numeric" }),
    year: date.toLocaleDateString("es-ES", { year: "2-digit" }),
  };
};

const dateIni = getDateProps(props.date_ini);
const dateEnd = getDateProps(props.date_end);

</script>

<template>
  <v-card title="Detalles de la reserva">
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="12" md="6" lg="6" xl="6" xxl="6">
          <div id="booking-dates">
            <span class="text-h4 text-blue">{{ dateIni.day }}</span>
            <span class="text-overline day" :data-content="`${dateIni.month} ${dateIni.year}`">
              {{ dateIni.weekday }}
            </span>
            <v-icon
              icon="mdi-arrow-right"
              color="blue-darken-2"
            />
            <span class="text-h4 text-blue">{{ dateEnd.day }}</span>
            <span class="text-overline day" :data-content="`${dateEnd.month} ${dateEnd.year}`">
              {{ dateIni.weekday }}
            </span>
          </div>
          <span></span>
        </v-col>
        <v-col cols="6" sm="6" md="3" lg="3" xl="3" xxl="3">
          <div id="booking-details">
            <p class="text-caption">
              <v-icon
                icon="mdi-account-tie-hat"
                color="blue-darken-2"
              />
              {{ user_name }} {{ user_lastname }}</p>
            <p class="text-caption">
              <v-icon
                icon="mdi-sail-boat"
                color="blue-darken-2"
              />
              {{ ship_name }}
            </p>
          </div>
        </v-col>
        <v-col cols="6" sm="6" md="3" lg="3" xl="3" xxl="3">
          <div id="booking-details">
            <p class="text-caption">
              <v-icon
                :icon="validated ? 'mdi-flag' : 'mdi-flag-off'"
                :color="validated? 'blue-darken-2' : 'red'"
              />
              {{ validated ? "Validado" : "No validado" }}
            </p>
            <p class="text-caption">
              <v-icon
                :icon="light ? 'mdi-lightbulb-on' : 'mdi-lightbulb-off'"
                :color="light? 'blue-darken-2' : 'red'"
              />
              Electricidad
            </p>
            <p class="text-caption">
              <v-icon
                :icon="light ? 'mdi-water-check' : 'mdi-water-off'"
                :color="light? 'blue-darken-2' : 'red'"
              />
              Agua
            </p>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
#booking-dates {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 0.5rem;
}

.day {
  position: relative;
  translate: 0 25%;
}

.day:after {
  content: attr(data-content);
  position: absolute;
  top: -50%;
  left: 0;
  min-width: 100%;
  width: max-content;
  color: gray;
}

#booking-details {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 0.5rem;
}

</style>

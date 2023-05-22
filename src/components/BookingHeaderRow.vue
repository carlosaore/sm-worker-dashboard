<script setup lang="ts">
import { getDaysBetweenDates } from "@/utils";
import { SM_BLUE, SM_GREY, SM_INDIGO } from "@/config";

interface Props {
  date_ini: string;
  date_end: string;
  light: boolean;
  water: boolean;
  ship_name: string;
  target: string;
  user_name: string;
  user_lastname: string;
  validated: boolean;
  berth_name: string;
  length: string;
  beam: string;
  draft: string;
}
const props = defineProps<Props>();

const getDateProps = (
  dateString: string
): {
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
  <v-card>
    <template v-slot:title>
      <span class="text-primary">Detalles de la reserva</span>
    </template>
    <template v-slot:append>
      <v-icon :color="SM_BLUE">mdi-calendar-star</v-icon>
    </template>
    <v-card-text>
      <v-container fluid class="pl-0">
        <v-row align="start">
          <v-col cols="12" md="6" class="mb-4">
            <div id="booking-dates" class="mb-2">
              <span class="text-h4 text-secondary">{{ dateIni.day }}</span>
              <span class="text-overline text-secondary day" :data-content="`${dateIni.month} ${dateIni.year}`">
                {{ dateIni.weekday }}
              </span>
              <v-icon icon="mdi-arrow-right" size="x-large" :color="SM_GREY" />
              <span class="text-h4 text-secondary">{{ dateEnd.day }}</span>
              <span class="text-overline day text-secondary" :data-content="`${dateEnd.month} ${dateEnd.year}`">
                {{ dateIni.weekday }}
              </span>
            </div>
            <v-chip class="mr-2" color="orange" size="small" prepend-icon="mdi-pier" label>{{ berth_name }}</v-chip>
            <v-chip :color="SM_GREY" size="small" prepend-icon="mdi-calendar" label>{{
              getDaysBetweenDates(date_ini, date_end, true)
            }}</v-chip>
          </v-col>
          <v-col cols="12" md="3" class="py-0" id="add-bottom-margin">
            <div class="booking-details">
              <p class="text-caption">
                <v-icon icon="mdi-account-tie-hat" :color="SM_INDIGO" />
                {{ user_name }} {{ user_lastname }}
              </p>
              <p class="text-caption">
                <v-icon icon="mdi-sail-boat" :color="SM_INDIGO" />
                {{ ship_name }} - {{ target }}
              </p>
              <p class="text-caption">
                <v-icon icon="mdi-ruler" :color="SM_INDIGO" />
                E {{ length }} - M {{ beam }} - C {{ draft }}
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="3" class="py-0">
            <div class="booking-details">
              <p class="text-caption">
                <v-icon :icon="validated ? 'mdi-flag' : 'mdi-flag-off'" :color="validated ? 'blue-darken-2' : 'red'" />
                {{ validated ? "Validado" : "No validado" }}
              </p>
              <p class="text-caption">
                <v-icon
                  :icon="light ? 'mdi-lightbulb-on' : 'mdi-lightbulb-off'"
                  :color="light ? SM_INDIGO : 'red'"
                />
                Electricidad
              </p>
              <p class="text-caption">
                <v-icon :icon="light ? 'mdi-water-check' : 'mdi-water-off'" :color="light ? SM_INDIGO : 'red'" />
                Agua
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
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
  margin-bottom: 0.5rem;
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
  color: var(--sm-grey);
}

.booking-details {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 0.5rem;
}

@media screen and (max-width: 960px) {
  #add-bottom-margin {
    margin-bottom: 0.5rem;
  }
}
</style>

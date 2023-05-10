<script setup lang="ts">
import { Filter, GetBookingsQueryParams } from "@/types";
import { ref } from "vue";

interface Props {
  appliedFilters: Filter[];
  title: string;
}
const props = defineProps<Props>();

const emits = defineEmits<{
  (event: "remove-filter", key: keyof GetBookingsQueryParams): void;
  (event: "add-filter", filter: Filter): void;
  (event: "update-filters", filters: Filter[]): void;
  (event: "clear-filters"): void;
  (event: "close-dialog"): void;
}>();

const formValid = ref(true); // starts as true because there are no required fields

const formValues = ref<GetBookingsQueryParams>({});

const onFinish = () => {
  if (formValid.value) {
    // console log the form values
    console.log({
      berth_type: formValues.value.berth_type,
    });
    return;
  }
  console.log("invalid form");
};

const handleClearFilters = () => {
  emits("clear-filters");
  emits("close-dialog");
};

const handleCloseDialog = () => {
  emits("close-dialog");
};
</script>

<template>
  <v-card :title="props.title" prepend-icon="mdi-filter">
    <v-card-text>
      <v-form v-model="formValid" @submit.prevent="onFinish">
        <span class="subheading">Tipo de amarre</span>
        <v-chip-group v-model="formValues.berth_type" selected-class="text-blue-darken-4">
          <v-chip prepend-icon="mdi-calendar-range" value="short">Corta estancia</v-chip>
          <v-chip prepend-icon="mdi-calendar-month" value="long">Larga estancia</v-chip>
        </v-chip-group>
        <v-divider class="my-3"></v-divider>
        <div class="subheading">Tipo de embarcación</div>
        <v-chip-group v-model="formValues.ship_type" selected-class="text-blue-darken-4">
          <v-chip value="catamaran">Catamaran</v-chip>
          <v-chip value="sailboat">Velero</v-chip>
          <v-chip value="motorboat">Motor</v-chip>
        </v-chip-group>
        <v-btn color="primary" type="submit" variant="tonal" prepend-icon="mdi-filter-check" block class="mt-4"
          >Guardar</v-btn
        >
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="handleClearFilters" prepend-icon="mdi-filter-off" size="small">Limpiar</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="error" @click="handleCloseDialog" prepend-icon="mdi-close" size="small">Cerrar</v-btn>
    </v-card-actions>
  </v-card>
</template>

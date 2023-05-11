<script setup lang="ts">
import { Filter, GetBookingsQueryParams } from "@/types";
import { onMounted, ref } from "vue";

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

const getFilterValue = (key: keyof GetBookingsQueryParams) => {
  const filter = props.appliedFilters.find((f) => f.key === key);
  if (filter) {
    return filter.value;
  }
  return "";
};

/**
 * On mount, we populate the formValues with appliedFilters values
 */
onMounted(() => {
  formValues.value = {
    user_name: getFilterValue("user_name"),
    ship_name: getFilterValue("ship_name"),
    target: getFilterValue("target"),
    berth_name: getFilterValue("berth_name"),
  };
});

const formValid = ref(true); // starts as true because there are no required fields

const formValues = ref<GetBookingsQueryParams>({});

const onFinish = () => {
  if (formValid.value) {
    const filtersToEmit: Filter[] = [];
    if (formValues.value.user_name) {
      filtersToEmit.push({
        key: "user_name",
        value: formValues.value.user_name,
        displayedValue: `Navegante: ${formValues.value.user_name}...`,
        icon: "mdi-account-tie-hat",
      });
    }
    if (formValues.value.ship_name) {
      filtersToEmit.push({
        key: "ship_name",
        value: formValues.value.ship_name,
        displayedValue: `Embarcación: ${formValues.value.ship_name}...`,
        icon: "mdi-sail-boat",
      });
    }
    if (formValues.value.target) {
      filtersToEmit.push({
        key: "target",
        value: formValues.value.target,
        displayedValue: `Matricula: ${formValues.value.target}`,
        icon: "mdi-alphabetical-variant",
      });
    }
    if (formValues.value.berth_name) {
      filtersToEmit.push({
        key: "berth_name",
        value: formValues.value.berth_name,
        displayedValue: `Amarre: ${formValues.value.berth_name}`,
        icon: "mdi-pier",
      });
    }
    emits("update-filters", filtersToEmit);
    emits("close-dialog");
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
        <v-text-field
          label="Navegante"
          v-model="formValues.user_name"
          hint="Todo o parte del nombre"
          clearable
          persistent-hint
          prepend-inner-icon="mdi-account-tie-hat"
          class="mb-4"
        ></v-text-field>
        <v-text-field
          label="Embarcación"
          v-model="formValues.ship_name"
          hint="Todo o parte del nombre"
          clearable
          persistent-hint
          prepend-inner-icon="mdi-sail-boat"
          class="mb-4"
        ></v-text-field>
        <v-text-field
          label="Matrícula"
          v-model="formValues.target"
          hint="Matrícula de la embarcación"
          clearable
          persistent-hint
          prepend-inner-icon="mdi-alphabetical-variant"
          class="mb-4"
        ></v-text-field>
        <v-text-field
          label="Amarre"
          v-model="formValues.berth_name"
          hint="Todo o parte del nombre"
          clearable
          persistent-hint
          prepend-inner-icon="mdi-pier"
          class="mb-4"
        ></v-text-field>
        <v-btn color="primary" type="submit" variant="tonal" prepend-icon="mdi-filter-check" block class="mt-4">
          Aplicar filtros
        </v-btn>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="handleClearFilters" prepend-icon="mdi-filter-off" size="x-small"> Limpiar filtros </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="error" @click="handleCloseDialog" prepend-icon="mdi-close" size="x-small">
        Cerrar sin aplicar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

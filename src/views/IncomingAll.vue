<script lang="ts" setup>
import CommonViewWrapper from "@/components/CommonViewWrapper.vue";
import { GetBookingsQueryParams } from "@/types";
import { computed, ref } from "vue";
import { Filter } from "@/types";
import FilterChips from "@/components/FilterChips.vue";
import FilterDialogContent from "@/components/FilterDialogContent.vue";

/**
 * This is the list of filters that are currently applied to the bookings list
 * It is used to display the chips and to generate the query string
 */
const appliedFilters = ref<Filter[]>([
  {
    key: "sort_by",
    value: "date_ini",
    icon: "mdi-clock-start",
    displayedValue: "Desde 10 may",
  },
  {
    key: "sort_by",
    value: "date_end",
    icon: "mdi-clock-end",
    displayedValue: "Hasta 11 may",
  },
]);

/**
 * Computed GetBookingsQueryParams object from the appliedFilters list
 * Used by useQuery to fetch the bookings
 */
const getBookingsQueryParams = computed<GetBookingsQueryParams>(() => {
  const params: GetBookingsQueryParams = {};
  appliedFilters.value.forEach((filter) => {
    params[filter.key] = filter.value;
  });
  return params;
});

/**
 * Adds a filter to the appliedFilters list
 * Needs to comply with the Filter interface which comes from GetBookingsQueryParams
 */
const addFilter = (filter: Filter) => {
  const index = appliedFilters.value.findIndex((f) => f.key === filter.key);
  if (index === -1) {
    appliedFilters.value.push(filter);
  }
};

/**
 * updates multiple filters at once and clears the previous ones
 */
const updateFilters = (filters: Filter[]) => {
  appliedFilters.value = filters;
};

const removeFilter = (key: keyof GetBookingsQueryParams) => {
  const index = appliedFilters.value.findIndex((filter) => filter.key === key);
  if (index !== -1) {
    appliedFilters.value.splice(index, 1);
  }
};

const clearFilters = () => {
  appliedFilters.value = [];
};

const filterDialogActive = ref(false);
const closeFilterDialog = () => {
  filterDialogActive.value = false;
};
</script>

<template>
  <CommonViewWrapper>
    <v-sheet rounded elevation="2" class="pa-4">
      <v-row>
        <v-col>
          <FilterChips :appliedFilters="appliedFilters" @remove-filter="removeFilter" />
        </v-col>
        <v-col cols="auto">
          <v-btn color="primary" variant="text" prepend-icon="mdi-filter">
            Filtrar
            <v-dialog v-model="filterDialogActive" activator="parent" width="auto">
              <FilterDialogContent
                title="Filtrar reservas"
                :appliedFilters="appliedFilters"
                @add-filter="addFilter"
                @update-filters="updateFilters"
                @close-dialog="closeFilterDialog"
                @clear-filters="clearFilters"
              />
            </v-dialog>
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </CommonViewWrapper>
</template>

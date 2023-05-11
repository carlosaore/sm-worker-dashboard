<script lang="ts" setup>
import CommonViewWrapper from "@/components/CommonViewWrapper.vue";
import { GetBookingsQueryParams } from "@/types";
import { computed, ref } from "vue";
import { Filter } from "@/types";
import FilterChips from "@/components/FilterChips.vue";
import FilterDialogContent from "@/components/FilterDialogContent.vue";
import { useQuery } from "@tanstack/vue-query";
import { getBookings } from "@/services";
import BookingsTable from "@/components/BookingsTable.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";

/**
 * This is the list of filters that are currently applied to the bookings list
 * It is used to display the chips and to generate the query string
 */
const appliedFilters = ref<Filter[]>([]);

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

const { isSuccess, data } = useQuery({
  queryKey: ["getBookings", getBookingsQueryParams],
  queryFn: ({queryKey}) => getBookings(queryKey[1]),
  refetchInterval: 60000, // 1 minute in milliseconds (modify to your needs)
  keepPreviousData: true,
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
    <v-card>
      <v-card-title>
        <v-row>
          <v-col>
            <FilterChips :appliedFilters="appliedFilters" @remove-filter="removeFilter" />
          </v-col>
          <v-col cols="auto">
            <v-btn color="primary" size="small" variant="text" prepend-icon="mdi-filter">
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
      </v-card-title>
      <v-card-text>
        <BookingsTable v-if="isSuccess" :bookings="data.data.data" path-prefix="/entradas" />
        <SkeletonLoader v-else height="150" />
      </v-card-text>
    </v-card>
  </CommonViewWrapper>
</template>

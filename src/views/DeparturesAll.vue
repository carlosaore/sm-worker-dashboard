<script lang="ts" setup>
import CommonViewWrapper from "@/components/CommonViewWrapper.vue";
import { ref } from "vue";
import { Filter } from "@/types";
import FilterChips from "@/components/FilterChips.vue";
import FilterDialogContent from "@/components/FilterDialogContent.vue";
import { useQuery } from "@tanstack/vue-query";
import { getDepartures } from "@/services";
import BookingsTable from "@/components/BookingsTable.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import ErrorModal from "@/components/ErrorModal.vue";
import { SM_INDIGO } from "@/config";

const loginError = ref({
  isActive: false,
  title: "",
  message: "",
});
const closeErrorModal = () => {
  loginError.value.isActive = false;
};

/**
 * This is the list of filters that are currently applied to the bookings list
 * It is used to display the chips and to generate the query string
 */
const appliedFilters = ref<Filter[]>([]);

const { isSuccess, data, isLoading } = useQuery({
  queryKey: ["getDepartures"],
  queryFn: getDepartures,
  refetchInterval: 60000, // 1 minute in milliseconds (modify to your needs)
  refetchOnWindowFocus: true,
  keepPreviousData: true,
  onError: (error) => {
    console.error(error);
    loginError.value = {
      isActive: true,
      title: "Error",
      message: error instanceof Error ? error.message : "Unknown error",
    };
  },
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

const removeFilter = (key: Filter["key"]) => {
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
    <v-card min-width="100%" :loading="isLoading" variant="text">
      <v-card-title>
        <v-row>
          <v-col>
            <FilterChips :appliedFilters="appliedFilters" @remove-filter="removeFilter" />
          </v-col>
          <v-col cols="auto">
            <v-btn :color="SM_INDIGO" size="small" variant="text" prepend-icon="mdi-filter">
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
      <v-card-text class="px-2">
        <BookingsTable v-if="isSuccess && data" :bookings="data?.data" path-prefix="/salidas" type="departures" />
        <SkeletonLoader v-else height="600" />
      </v-card-text>
    </v-card>
    <ErrorModal
      :isActive="loginError.isActive"
      :title="loginError.title"
      :message="loginError.message"
      @close-error-modal="closeErrorModal"
    />
  </CommonViewWrapper>
</template>

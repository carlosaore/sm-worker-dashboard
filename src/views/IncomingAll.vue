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
import ErrorModal from "@/components/ErrorModal.vue";

const loginError = ref({
  isActive: false,
  title: "",
  message: "",
});
const closeErrorModal = () => {
  loginError.value.isActive = false;
};

/**
 * This is the limit of bookings per page
 * Hardcoded for now, but as anything, you can add Sriracha to it to make it dynamic
 */
const limit = 10;

/**
 * This is the list of filters that are currently applied to the bookings list
 * It is used to display the chips and to generate the query string
 */
const appliedFilters = ref<Filter[]>([]);

const page = ref(1);

/**
 * Computed GetBookingsQueryParams object from the appliedFilters list
 * Used by useQuery to fetch the bookings
 */
const getBookingsQueryParams = computed<GetBookingsQueryParams>(() => {
  const params: GetBookingsQueryParams = {
    type: "arrivals",
    page: page.value,
    limit: limit,
  };
  appliedFilters.value.forEach((filter) => {
    params[filter.key] = filter.value;
  });
  return params;
});

const { isSuccess, data } = useQuery({
  queryKey: ["getBookings", getBookingsQueryParams],
  queryFn: ({ queryKey }) => getBookings(queryKey[1]),
  refetchInterval: 60000, // 1 minute in milliseconds (modify to your needs)
  keepPreviousData: true,
  onError: (error) => {
    loginError.value = {
      isActive: true,
      title: "Error",
      message: error.message,
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
        <SkeletonLoader v-else height="600" />
      </v-card-text>
      <v-card-actions v-if="isSuccess && data.data.items">
        <v-spacer></v-spacer>
        <v-pagination
          v-model="page"
          density="compact"
          rounded="circle"
          total-visible="6"
          :length="Math.ceil(data.data.items / limit)"
        >
        </v-pagination>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
    <ErrorModal
      :isActive="loginError.isActive"
      :title="loginError.title"
      :message="loginError.message"
      @close-error-modal="closeErrorModal"
    />
  </CommonViewWrapper>
</template>

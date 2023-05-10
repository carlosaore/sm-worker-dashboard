<script setup lang="ts">
import { Filter, GetBookingsQueryParams } from "@/types";

interface Props {
  appliedFilters: Filter[];
}
const props = defineProps<Props>();

const emits = defineEmits<{
  (event: "remove-filter", key: keyof GetBookingsQueryParams): void;
}>();
</script>

<template>
  <v-chip-group>
    <v-chip
      size="small"
      v-for="filter in props.appliedFilters"
      :key="filter.value"
      closable
      :prepend-icon="filter.icon"
      @click:close="emits('remove-filter', filter.key)"
    >
      {{ filter.displayedValue }}
    </v-chip>
  </v-chip-group>
</template>

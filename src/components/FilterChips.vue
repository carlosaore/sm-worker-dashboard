<script setup lang="ts">
import { Filter } from "@/types";

interface Props {
  appliedFilters: Filter[];
}
const props = defineProps<Props>();

const emits = defineEmits<{
  (event: "remove-filter", key: Filter["key"]): void;
}>();
</script>

<template>
  <v-chip-group class="py-0">
    <v-chip
      size="small"
      class="text-blue-darken-2"
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

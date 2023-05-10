<script setup lang="ts">
import { computed } from "vue";

interface Props {
  width?: string; // in pixels
  height?: string; // in pixels
}

const props = defineProps<Props>();

const style = computed(() => ({
  width: props.width ? `${props.width}px` : "100%",
  height: props.height ? `${props.height}px` : "100%",
}));
</script>

<template>
  <div class="skeleton" :style="style"></div>
</template>

<style>
.skeleton {
  background-color: #e0e0e0;
  border-radius: 4px;
  animation: skeleton-loading 1s ease-in-out infinite;
}

@keyframes skeleton-loading {
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #f5f5f5;
  }
  100% {
    background-color: #e0e0e0;
  }
}
</style>

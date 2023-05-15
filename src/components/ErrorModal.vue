<script setup lang="ts">
import { ref, watch } from "vue";
import { useQueryClient } from "@tanstack/vue-query";

interface Props {
  isActive: boolean;
  title: string;
  message: string;
}
const props = defineProps<Props>();

const emits = defineEmits<{
  (event: "close-error-modal"): void;
}>();

const localModalIsActive = ref(false);

const queryClient = useQueryClient();

watch(
  () => props.isActive,
  (newValue) => {
    console.log(queryClient);
    localModalIsActive.value = newValue;
  }
);


const closeModal = () => {
  localModalIsActive.value = false;
  emits("close-error-modal");
};
</script>

<template>
  <div class="text-center">
    <v-dialog
      v-model="localModalIsActive"
      width="auto"
    >
      <v-alert
        :title="props.title"
        :text="props.message"
        type="error"
        closable
        @click:close="closeModal"
      >
      </v-alert>
    </v-dialog>
  </div>
</template>

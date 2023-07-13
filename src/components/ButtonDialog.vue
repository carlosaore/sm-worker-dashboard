<script setup lang="ts">
import { ref } from "vue";
interface Props {
  buttonText: string;
  buttonColor?: "primary" | "secondary" | "success" | "info" | "warning" | "error";
  buttonVariant: "text" | "flat" | "elevated" | "tonal" | "outlined" | "plain";
  title?: string;
  allowFullscreen: boolean;
}

const props = defineProps<Props>();

const dialogActive = ref(false);

/**
 * Non-reactive isFullscreen variable
 * I don't expect the user to change the window size while having the dialog open
 * If you do want to make it more better, you are welcome to do so
 */
const isFullscreen = props.allowFullscreen && window.innerWidth < 600;

const closeDialog = () => {
  dialogActive.value = false;
};
</script>

<template>
  <v-btn
    block
    :color="props.buttonColor ? props.buttonColor : ''"
    :variant="props.buttonVariant"
    prepend-icon="mdi-alert-circle"
  >
    {{ props.buttonText }}
    <v-dialog
      :fullscreen="isFullscreen"
      transition="dialog-bottom-transition"
      v-model="dialogActive"
      activator="parent"
      max-width="600px"
    >
      <v-card>
        <v-card-title v-if="props.title">
          {{ props.title }}
        </v-card-title>
        <v-card-text>
          <slot></slot>
          <v-btn class="mt-6" color="red" variant="text" block @click="closeDialog">Cerrar</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const formValid = ref(false);

const user = ref({
  current_password: "",
  password: "",
  password_confirmation: "",
});

const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);

const errorMessages = computed(() => {
  if (user.value.password !== user.value.password_confirmation) {
    return "La nueva contraseña y su confirmación no coinciden";
  }
  return "";
});

const onFinish = () => {
  if (formValid.value) {
    console.log("onFinish valid");
    return;
  }
  console.log("onFinish invalid");
};
</script>

<template>
  <v-card title="Cambiar contraseña" append-icon="mdi-lock-question">
    <v-card-text>
      <v-form v-model="formValid" @submit.prevent="onFinish">
        <v-text-field
          outlined
          color="primary"
          v-model="user.current_password"
          prepend-inner-icon="mdi-lock"
          :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          label="Tu contraseña actual"
          hint="Al menos 8 caracteres"
          counter
          @click:append-inner="show1 = !show1"
          :rules="[
            (v) => !!v || 'La contraseña es requerida',
            (v) => v.length >= 8 || 'La contraseña debe tener al menos 8 caracteres',
            (v) => v.length <= 40 || 'La contraseña debe tener máximo 40 caracteres',
          ]"
        ></v-text-field>
        <v-text-field
          outlined
          color="primary"
          v-model="user.password"
          prepend-inner-icon="mdi-lock"
          :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          label="Nueva contraseña"
          hint="Al menos 8 caracteres"
          counter
          @click:append-inner="show2 = !show2"
          :rules="[
            (v) => !!v || 'La contraseña es requerida',
            (v) => v.length >= 8 || 'La contraseña debe tener al menos 8 caracteres',
            (v) => v.length <= 40 || 'La contraseña debe tener máximo 40 caracteres',
          ]"
        ></v-text-field>
        <v-text-field
          outlined
          color="primary"
          v-model="user.password_confirmation"
          prepend-inner-icon="mdi-lock"
          :append-inner-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show3 ? 'text' : 'password'"
          label="Repite nueva contraseña"
          hint="Al menos 8 caracteres"
          counter
          @click:append-inner="show3 = !show3"
          :rules="[
            (v) => !!v || 'La contraseña es requerida',
            (v) => v.length >= 8 || 'La contraseña debe tener al menos 8 caracteres',
            (v) => v.length <= 40 || 'La contraseña debe tener máximo 40 caracteres',
          ]"
          :error-messages="errorMessages"
        ></v-text-field>
        <v-btn type="submit" block color="primary" :loading="false" class="mt-6" prepend-icon="mdi-content-save">
          Guardar
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

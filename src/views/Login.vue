<script lang="ts" setup>
import { useAuthStore } from "@/store/auth.store";
import { ref } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { login } from "@/services";
import { AxiosResponse } from "axios";
import { LoginResponse } from "@/types";
import router from "@/router";

const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const valid = ref(false);
const showPassword = ref(false);

const { isLoading, mutateAsync } = useMutation({
  mutationKey: ["loginMutation"],
  mutationFn: login,
  onSuccess: (loginResponse: AxiosResponse<LoginResponse>) => {
    authStore.login(loginResponse.data.data, rememberMe.value);
  },
  onError: (error) => {
    console.log(error);
  },
});

const onFinish = async () => {
  if (valid.value) {
    await mutateAsync({
      email: email.value,
      password: password.value,
    });
  }
};

const onPasswordForgot = () => {
  router.push("/reset-password");
};
</script>

<template>
  <v-container fluid class="fill-height bg-blue-darken-4">
    <v-responsive class="">
      <v-sheet elevation="5" rounded id="login_wrapper">
        <v-card class="pa-6">
          <v-img class="mx-auto mb-6" height="100px" src="/src/assets/full-logo-blue.png"></v-img>
          <v-form @submit.prevent="onFinish" v-model="valid">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              :rules="[(v) => !!v || 'Email es requerido', (v) => /.+@.+\..+/.test(v) || 'Email debe ser válido']"
              prepend-inner-icon="mdi-email-outline"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Contraseña"
              :rules="[(v) => !!v || 'Password es requerido']"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append-inner="showPassword = !showPassword"
            ></v-text-field>
            <v-checkbox label="Recuérdame" v-model="rememberMe"></v-checkbox>
            <v-btn block class="mb-6" color="primary" type="submit" :loading="isLoading.value || false"> Login </v-btn>
            <v-btn block variant="text" type="button" @click="onPasswordForgot">Olvidé mi contraseña</v-btn>
          </v-form>
        </v-card>
      </v-sheet>
    </v-responsive>
  </v-container>
</template>

<style scoped>
#login_wrapper {
  max-width: 400px;
  margin: 0 auto;
}
</style>

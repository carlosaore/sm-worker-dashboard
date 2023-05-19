<script lang="ts" setup>
// import { useAuthStore } from "@/store";
import { ref } from "vue";
// import { useMutation } from "@tanstack/vue-query";
// import { login } from "@/services";
// import { AxiosResponse } from "axios";
// import { LoginResponse } from "@/types";

// const authStore = useAuthStore();

const valid = ref(false);
const email = ref("");

// TODO: implement mutation for forgot password and connect the success to the text below

// const { isLoading, mutateAsync } = useMutation({
//   mutationKey: ["forgotPassword"],
//   mutationFn: requestNewPassword,
//   onSuccess: (loginResponse: AxiosResponse<LoginResponse>) => {
//     authStore.resetPassword()
//   },
//   onError: (error) => {
//     console.log(error);
//   },
// });

const onFinish = async () => {
  if (valid.value) {
    // await mutateAsync({
    //   email: email.value,
    // });
  }
};
</script>

<template>
  <v-container fluid class="fill-height bg-blue-darken-4">
    <v-responsive class="">
      <v-sheet elevation="5" rounded id="login_wrapper">
        <v-card class="pa-6">
          <v-img class="mx-auto mb-6" height="100px" src="/src/assets/full-logo-blue.png"></v-img>
          <p v-if="true" class="text-body-1 mb-6 text-center">
            Ingresa tu correo electrónico para recibir instrucciones para recuperar tu contraseña.
          </p>
          <p v-else class="text-body-1 mb-6 text-green text-center">
            Recibirás un correo electrónico con instrucciones para recuperar tu contraseña.
          </p>
          <v-form @submit.prevent="onFinish" v-model="valid">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              :rules="[(v) => !!v || 'Email es requerido', (v) => /.+@.+\..+/.test(v) || 'Email debe ser válido']"
              prepend-inner-icon="mdi-email-outline"
              class="mb-6"
            ></v-text-field>
            <v-btn block class="mb-6" color="primary" type="submit" :loading="false">
              Recuperar contraseña
            </v-btn>
            <v-btn type="button" block variant="text" href="/login">
              Regresar al login
            </v-btn>
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

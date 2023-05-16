<script lang="ts" setup>
import CommonViewWrapper from "@/components/CommonViewWrapper.vue";
import WorkerInfo from "@/components/WorkerInfo.vue";
import ResetPassword from "@/components/ResetPassword.vue";
</script>

<template>
  <CommonViewWrapper>
    <v-row align-content="start">
      <v-col cols="12" sm="6" md="6" lg="6" xl="6" xxl="6">
        <WorkerInfo />
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="6" xl="6" xxl="6">
        <ResetPassword />
      </v-col>
    </v-row>
  </CommonViewWrapper>
</template>

<script lang="ts" setup>
import CommonViewWrapper from "@/components/CommonViewWrapper.vue";
import { useRoute } from "vue-router";

const params = useRoute().params;
</script>

<template>
  <CommonViewWrapper>
    <h1>Reserva entrante {{ params.id }}</h1>
  </CommonViewWrapper>
</template>

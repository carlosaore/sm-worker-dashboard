<script lang="ts" setup>
import NextArrivals from "@/components/NextArrivals.vue";
import CommonViewWrapper from "@/components/CommonViewWrapper.vue";
import NextDepartures from "@/components/NextDepartures.vue";
</script>

<template>
  <CommonViewWrapper>
    <NextArrivals class="mb-6" />
    <NextDepartures />
  </CommonViewWrapper>
</template>

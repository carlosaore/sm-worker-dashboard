<script lang="ts" setup>
// import NextArrivals from "@/components/NextArrivals.vue";
// import NextDepartures from "@/components/NextDepartures.vue";
import CommonViewWrapper from "@/components/CommonViewWrapper.vue";
import DailyBrief from "@/views/DailyBrief.vue";
</script>

<template>
  <CommonViewWrapper>
    <v-row>
      <v-col cols="12">
        <DailyBrief />
      </v-col>
      <!--      <v-col cols="12" md="6">
        <NextArrivals class="mb-6" />
      </v-col>
      <v-col cols="12" md="6">
        <NextDepartures />
      </v-col>-->
    </v-row>
  </CommonViewWrapper>
</template>

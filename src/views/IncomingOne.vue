<script lang="ts" setup>
import CommonViewWrapper from "@/components/CommonViewWrapper.vue";
import { useRoute } from "vue-router";
import BookingHeaderRow from "@/components/BookingHeaderRow.vue";
import { useQuery } from "@tanstack/vue-query";
import { getBookingById } from "@/services/getBookingById";
import SkeletonLoader from "@/components/SkeletonLoader.vue";

const params = useRoute().params;

const { isSuccess, data } = useQuery({
  queryKey: ["getBookingById", params.id],
  queryFn: ({ queryKey }) => getBookingById(queryKey[1]),
});

</script>

<template>
  <CommonViewWrapper>
    <BookingHeaderRow
      v-if="isSuccess"
      :berth_name="data.data.data.berth.name"
      :date_end="data.data.data.date_end"
      :date_ini="data.data.data.date_ini"
      :light="Boolean(data.data.data.berth.light)"
      :water="Boolean(data.data.data.berth.water)"
      :ship_name="data.data.data.ship.name"
      :user_name="data.data.data.user.name"
      :user_lastname="data.data.data.user.lastname"
      :validated="Boolean(data.data.data.validated)"
    />
    <SkeletonLoader v-else height="100"/>
    <v-row align-content="start">
      <v-col sm="12" md="6" lg="6" xl="3" xxl="3"> </v-col>
      <v-col sm="12" md="6" lg="6" xl="3" xxl="3"> </v-col>
      <v-col sm="12" md="6" lg="6" xl="3" xxl="3"> </v-col>
      <v-col sm="12" md="6" lg="6" xl="3" xxl="3"> </v-col>
    </v-row>
  </CommonViewWrapper>
</template>

<script lang="ts" setup>
import CommonViewWrapper from "@/components/CommonViewWrapper.vue";
import { useRoute } from "vue-router";
import BookingHeaderRow from "@/components/BookingHeaderRow.vue";
import { useQuery } from "@tanstack/vue-query";
import { getBookingById } from "@/services";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import BookingCaptain from "@/components/BookingCaptain.vue";
import DeparturesActions from "@/components/DeparturesActions.vue";

const params = useRoute().params;

const { isSuccess, data } = useQuery({
  queryKey: ["getBookingById", params.id],
  queryFn: ({ queryKey }) => getBookingById(queryKey[1]),
});

</script>

<template>
  <CommonViewWrapper>
    <template v-if="isSuccess">
      <v-row align-content="start">
        <v-col cols="12">
          <BookingHeaderRow
            :berth_name="data.data.data.berth.name"
            :date_end="data.data.data.date_end"
            :date_ini="data.data.data.date_ini"
            :light="Boolean(data.data.data.berth.light)"
            :water="Boolean(data.data.data.berth.water)"
            :ship_name="data.data.data.ship.name"
            :user_name="data.data.data.user.name"
            :user_lastname="data.data.data.user.lastname"
            :validated="Boolean(data.data.data.validated)"
            :length="data.data.data.ship.length"
            :beam="data.data.data.ship.beam"
            :draft="data.data.data.ship.draft"
          />
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="6" xl="3" xxl="3">
          <BookingCaptain
            :name="data.data.data.user.name"
            :lastname="data.data.data.user.lastname"
            :phone="data.data.data.user.phone"
            :email="data.data.data.user.email"
            :country_phone_iso2="data.data.data.user.country_phone_iso2"
            :language="data.data.data.user.language"
          />
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="6" xl="3" xxl="3">
          <DeparturesActions />
        </v-col>
      </v-row>
    </template>
    <SkeletonLoader v-else height="100"/>
  </CommonViewWrapper>
</template>

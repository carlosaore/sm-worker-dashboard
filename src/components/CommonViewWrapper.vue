<script setup lang="ts"></script>

<template>
  <v-container id="common-view-wrapper" fluid class="fill-height d-flex align-start">
    <slot></slot>
  </v-container>
</template>

<style>
#common-view-wrapper {
  padding-bottom: 30px;
}

@media screen and (max-width: 600px) {
  #common-view-wrapper {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>

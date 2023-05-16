<script setup lang="ts"></script>

<template>
  <v-container id="common-view-wrapper" fluid class="fill-height bg-grey-lighten-2 d-flex align-start">
    <slot></slot>
  </v-container>
</template>

<style>
@media screen and (max-width: 600px) {
  #common-view-wrapper {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

}
</style>

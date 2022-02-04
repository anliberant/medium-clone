<template>
  <div>
    <app-top-bar></app-top-bar>
  </div>
  <router-view />
</template>

<script>
import AppTopBar from "./components/TopBar.vue";
import { actionTypes } from "./store/modules/auth";

export default {
  name: "App",

  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser);
  },
  components: {
    AppTopBar,
  },
};
</script>

<style>
</style>

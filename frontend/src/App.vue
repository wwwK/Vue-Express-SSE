<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import "@/assets/fonts.scss";
@import "@/assets/basic.scss";
@import "@/assets/dataTable.scss";
@import "@/assets/defaultForm.scss";

#app {
  background-color: #f9f9f9;
  font-family: "appleSD", sans-serif;

}
</style>

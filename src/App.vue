<template>
  <div id="app">
    <VuePdfMobile />
  </div>
</template>

<script>
// import VuePdfMobile from "../package/vue-pdf-mobile/index";
// import VuePdfMobile from "../dist/VuePdfMobile.umd";

export default {
  name: "App",
  components: {
    VuePdfMobile,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

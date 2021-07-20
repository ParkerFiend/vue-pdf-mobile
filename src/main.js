import Vue from "vue";
import App from "./App.vue";

// import VuePdfMobile from "../package/index";

// Vue.use(VuePdfMobile);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

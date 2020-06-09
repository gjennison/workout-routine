import Vue from "vue";
import App from "./App.vue";
import FormBox from "./components/FormBox.vue";

Vue.config.productionTip = false;

Vue.component("FormBox", FormBox);

new Vue({
  render: (h) => h(App),
}).$mount("#app");

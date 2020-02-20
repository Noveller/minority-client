import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import { i18n } from "./plugins/i18n";
import FlagIcon from "vue-flag-icon";

import "./main.css";
import ApiService from "./api/api.service";
Vue.config.productionTip = false;

if (process.env.NODE_ENV === 'production') {
  ApiService.init('https://api.minority.md/wp-json/wp/v2/')
} else {
  ApiService.init('http://127.0.0.1/wp-json/wp/v2/')
}

Vue.use(FlagIcon);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');

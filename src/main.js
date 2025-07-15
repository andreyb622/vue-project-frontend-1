import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import SettingAxios from "./plugins/axios";
import router from "./router/index";

const pinia = createPinia();
SettingAxios(pinia);

createApp(App)
  .use(pinia)
  .use(router)
  .mount("#app");

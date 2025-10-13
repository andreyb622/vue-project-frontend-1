import { createApp } from "vue"
import App from "./App.vue"
import SettingAxios from "./plugins/axios"
import router from "./router/index"
import VuexStore from "./store/index"
import "./assets/tailwind.css"

SettingAxios(VuexStore)

createApp(App)
  .use(VuexStore)
  .use(router)
  .mount("#app")

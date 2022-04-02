import { createApp } from 'vue'
import App from './App.vue'
import { globalCookiesConfig } from "vue3-cookies";

globalCookiesConfig({
    expireTimes: "30d",
    domain: "",
    secure: false,
    sameSite: "lax",
  });

createApp(App)
.mount('#app')

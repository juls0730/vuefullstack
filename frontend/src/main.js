import { createSSRApp  } from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import { globalCookiesConfig } from "vue3-cookies";


globalCookiesConfig({
  expireTimes: "30d",
  domain: "",
  secure: false,
  sameSite: "lax",
});

// create a vuejs SSR app with a router and app root component
const app = createSSRApp(App)
app.use(router);
app.use(store);

app.mount('#app')

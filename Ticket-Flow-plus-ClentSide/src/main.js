import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import Toaster from '@meforma/vue-toaster';
import router from "./router";
import axios from 'axios'; // Import Axios
import BaseBlock from "@/components/BaseBlock.vue";
import BaseBackground from "@/components/BaseBackground.vue";
import BasePageHeading from "@/components/BasePageHeading.vue";
import clickRipple from "@/directives/clickRipple";
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;

const app = createApp(App);
// creating vue app instance


// Register global components
app.component("BaseBlock", BaseBlock);
app.component("BaseBackground", BaseBackground);
app.component("BasePageHeading", BasePageHeading);
app.use(Toaster);

// Register global directives
app.directive("click-ripple", clickRipple);

// Use Pinia and Vue Router
app.use(createPinia());
app.use(router);

// Set up Axios interceptor to handle 401 responses
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      router.push({ name: '401' }); // Redirect to the 401 error page
    }
    return Promise.reject(error);
  }
);
import SmartTable from 'vuejs-smart-table'

app.use(SmartTable)


app.mount("#app");

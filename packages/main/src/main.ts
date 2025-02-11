import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

let app = createApp(App)
app.use(router)
app.mount('#app')


import { registerMicroApps, start } from 'qiankun';
import {microApps} from "./common/micro-app";
registerMicroApps(microApps,{
  beforeLoad: (app) => {
    console.log('before load', app.name);
  },
  beforeMount: (app) => {
    console.log('before mount', app.name);
  },
  afterUnmount: (app) => {
    console.log('after unmount', app.name);
  },
})
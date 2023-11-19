import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/reset.css';
import { ConfigProvider } from 'ant-design-vue';



createApp(App).use(router).use(ConfigProvider).mount('#app');

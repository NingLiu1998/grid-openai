import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/reset.css';
import { ConfigProvider } from 'ant-design-vue';

// import dayjs from 'dayjs'
// import 'dayjs/locale/zh-cn'
// import relativeTime from 'dayjs/plugin/relativeTime'

// dayjs.extend(relativeTime) 

// dayjs.locale('zh-cn') 


createApp(App).use(router).use(ConfigProvider).mount('#app');

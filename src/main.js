import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入自己封装ui插件
import ui from '@/components/library'


import 'normalize.css'

import '@/assets/styles/common.less'


createApp(App).use(store).use(router).use(ui).use(ElementPlus).mount('#app')

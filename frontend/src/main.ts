import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import persistedstate from 'pinia-plugin-persistedstate';

//createApp(App).mount('#app')
const pinia = createPinia()
pinia.use(persistedstate);
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(pinia);
app.use(router);
app.use(ElementPlus);
app.mount('#app');
import './assets/main.css'
import ElementuiPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { usePermissStore } from './store/permiss'

import { createPinia } from 'pinia'
import router from './router'

import { createApp } from 'vue'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册一个v-hello 指令  达到和v-show 一样的效果
// app.directive('hello', (element, { value }) => {
//   value ? (element.style.display = 'block') : (element.style.display = 'none')
// })

app.use(ElementuiPlus)
app.use(router)
app.use(pinia)
app.mount('#app')

// 自定义权限指令
const permiss = usePermissStore()
app.directive('permiss', {
  mounted(el, binding) {
    if (binding.value && !permiss.key.includes(String(binding.value))) {
      el['hidden'] = true
    }
  }
})

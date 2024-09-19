import { createRouter, createWebHistory } from 'vue-router'
import routes from './components/routes'

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router

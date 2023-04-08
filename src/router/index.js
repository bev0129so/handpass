import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/Home.vue')
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../views/login/LoginPage.vue'),
    meta: {
        title: 'gdut-gofor | 登录'
      }
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})
export default router

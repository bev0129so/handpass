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

// 全局后置守卫，修改页面title
router.afterEach((to) => {
    if (to.meta.title) {
      document.title = to.meta.title;
    } else {
      document.title = 'gdut-gofor | 广工人的跑腿系统';
    }
  })
export default router

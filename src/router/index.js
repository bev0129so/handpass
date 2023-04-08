import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store/index.js'

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
  },
  {
    path: '/publish',
    name: 'PublishOrder',
    component: () => import('../views/PublishOrder.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/center',
    name: 'user-center',
    component: () => import('../views/user-center/UserCenter.vue'),
    meata: {
      requiresAuth: false,
      title: 'gdut-gofor | 个人中心页'
    },
    children:[
      {
        path: '/my-published',
        name: 'MyPublished',
        component: () => import('../views/user-center/MyPublished.vue'),
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.isLogin) {
    next({ name: 'LoginPage' })
  } else {
    next()
  }
})

// 全局后置守卫，修改页面title
router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = 'gdut-gofor | 广工人的跑腿系统'
  }
})
export default router

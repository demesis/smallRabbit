import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout'
import Home from '@/views/home'
import TopCategory from '@/views/category'
import SubCategory from '@/views/category/sub'

const Goods = () => import('@/views/goods/index')
const Login = () => import('@/views/login/index')
const Cart = () => import('@/views/cart/index')

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component:  TopCategory},
      { path: '/category/sub/:id', component:  SubCategory},
      { path: '/product/:id', component: Goods },
      { path: '/cart', component: Cart }
    ]
  },
  { path: '/login', component: Login }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior () {
        return { left: 0, top: 0 }
  }
})

import store from '@/store'
// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 用户信息
  const { token } = store.state.user.profile
  // 跳转去member开头的地址却没有登录
  if (to.path.startsWith('/member') && !token) {
    next({ path: '/login' })
  }
  next()
})


export default router

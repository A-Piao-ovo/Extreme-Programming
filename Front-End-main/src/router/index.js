import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/user',
    component: () => import('@/views/User')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // if (to.path === '/404') return next()
  const user = store.state.user
  if (!user && to.path !== '/login') return next('/login')
  next()
})

export default router

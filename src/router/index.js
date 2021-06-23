import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home.vue'
import { firebaseAuth } from '@/.firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    async beforeEnter(to, from, next) {
      try {
        await firebaseAuth.onAuthStateChanged(user => {
          user ? next() : next({ name: 'SignIn' })
        })
      } catch (error) {
        console.error(error)
      }
    }
  },
  {
    path: '/temas',
    name: 'Themes',
    component: () => import('@/pages/Themes.vue'),
    async beforeEnter(to, from, next) {
      try {
        await firebaseAuth.onAuthStateChanged(user => {
          user ? next() : next({ name: 'SignIn' })
        })
      } catch (error) {
        console.error(error)
      }
    }
  },
  {
    path: '/iniciar-sesion',
    name: 'SignIn',
    component: () => import('@/pages/SignIn.vue'),
    async beforeEnter(to, from, next) {
      try {
        await firebaseAuth.onAuthStateChanged(user => {
          user ? next({ name: 'Home' }) : next()
        })
      } catch (error) {
        console.error(error)
      }
    }
  },
  {
    path: '/registrarse',
    name: 'SignUp',
    component: () => import('@/pages/SignUp.vue'),
    async beforeEnter(to, from, next) {
      try {
        await firebaseAuth.onAuthStateChanged(user => {
          user ? next({ name: 'Home' }) : next()
        })
      } catch (error) {
        console.error(error)
      }
    }
  },
  {
    props: true,
    name: 'Board',
    path: '/tablero/:id',
    component: () => import('@/pages/Board.vue'),
    async beforeEnter(to, from, next) {
      try {
        await firebaseAuth.onAuthStateChanged(user => {
          user ? next() : next({ name: 'SignIn' })
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL
})

export default router

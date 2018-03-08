import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})

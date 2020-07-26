import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/Anchor'
// import Anchor from '@/components/Anchor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Anchor',
      component: HelloWorld
    }
  ]
})

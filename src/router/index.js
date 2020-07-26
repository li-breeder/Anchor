import Vue from 'vue'
import Router from 'vue-router'
import Anchor from '@/components/Anchor'
import Helloworld from '@/components/Helloworld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Anchor',
      component: Anchor
    },
    {
      path: '/helloworld',
      name: 'Helloworld',
      component: Helloworld
    }
  ]
})

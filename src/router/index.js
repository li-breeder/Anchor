import Vue from 'vue'
import Router from 'vue-router'
import Anchor2 from '@/components/Anchor2'
// import Helloworld from '@/components/Helloworld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Anchor2',
      component: Anchor2
    }
    // {
    //   path: '/helloworld',
    //   name: 'Helloworld',
    //   component: Helloworld
    // }
  ]
})

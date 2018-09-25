import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Settings from '@/components/Setting/Settings.vue'
import ManegePeople from '@/components/Setting/ManegePeople.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/manegePeople',
      name: 'manegePeople',
      component: ManegePeople
    }
  ],
  mode: 'history',
  scrollBehavior (to, from, savePosition) {
    if (to.hash) {
      return { selector: to.hash }
    }
    return {
      x: 0,
      y: 0 
    }
  }
})

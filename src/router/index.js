import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import UserList from '../views/UserList.vue'
import ChatBoard from '../views/ChatBoard.vue'

const routes = [
  {
    path: '/inbox',
    name: 'UserList',
    component: UserList
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/chat',
    name: 'ChatBoard',
    component: ChatBoard
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

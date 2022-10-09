import { createRouter, createWebHistory } from 'vue-router'
import PageHome from '@/views/HomeView'
import sourceData from '@/data.json'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PageHome
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    props: true,
    component: () => import('@/views/ThreadShowView'),
    beforeEnter (routeTo, routeFrom, next) {
      const threadExists = sourceData.threads.find(thread => thread.id === routeTo.params.id)
      if (threadExists) {
        next()
      } else {
        next({
          name: 'NotFound',
          params: { pathMatch: routeTo.path.substring(1).split('/') },
          query: routeTo.query,
          hash: routeTo.hash
        })
      }
    }
  },
  {
    path: '/category/:id',
    name: 'Category',
    props: true,
    component: () => import('@/views/CategoryView')
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    props: true,
    component: () => import('@/views/ForumView')
  },
  {
    path: '/me',
    name: 'Profile',
    component: () => import('@/views/ProfileView')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

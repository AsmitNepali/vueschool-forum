import { createRouter, createWebHistory } from 'vue-router'
import PageHome from '@/components/PageHome'
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
    component: () => import('@/components/PageThreadShow'),
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
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/components/PageNotFound')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

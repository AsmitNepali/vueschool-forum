import { createRouter, createWebHistory } from 'vue-router'
import PageHome from '@/views/HomeView'

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
    // beforeEnter (routeTo, routeFrom, next) {
    //   const threadExists = this.$store.state.threads.find(thread => thread.id === routeTo.params.id)
    //   if (threadExists) {
    //     next()
    //   } else {
    //     next({
    //       name: 'NotFound',
    //       params: { pathMatch: routeTo.path.substring(1).split('/') },
    //       query: routeTo.query,
    //       hash: routeTo.hash
    //     })
    //   }
    // }
  },
  {
    path: '/forum/:forumId/thread/create',
    name: 'ThreadCreate',
    props: true,
    component: () => import('@/views/ThreadCreateView')
  },
  {
    path: '/thread/:id/edit',
    name: 'ThreadEdit',
    props: true,
    component: () => import('@/views/ThreadEditView')
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
    component: () => import('@/views/ProfileView'),
    meta: {
      toTop: true,
      smoothScroll: true
    }
  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    props: {
      edit: true
    },
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
  routes,
  scrollBehavior (to) {
    const scroll = {}
    if(to.meta.toTop) scroll.top = 0
    if(to.meta.smoothScroll) scroll.behavior = 'smooth'
    return scroll
  }
})

export default router

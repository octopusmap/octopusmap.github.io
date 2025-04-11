import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      title: 'OctopusMap'
    }
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('../views/GameView.vue'),
    meta: {
      title: 'OctopusMap'
    }
  },
  {
    path: '/Corpus',
    name: 'dataset',
    component: () => import('../views/DatasetView.vue'),
    meta: {
      title: 'OctopusMap'
    }
  },
  {
    path: '/DesignAnalysis',
    name: 'DesignAnalysis',
    component: () => import('../views/VisualizationView.vue'),
    meta: {
      title: 'OctopusMap'
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta:{
      title: 'About'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

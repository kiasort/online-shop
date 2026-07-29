import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import ('../views/HomeView.vue')
  },

  {
    path: '/catalog',
    name: 'Catalog',
    component: () => import ('../views/CatalogView.vue')
  },

  {
    path: '/product/:id',
    name: 'Product',
    component: () => import ('../views/ProductView.vue')
  },

  {
    path: '/cart',
    name: 'Cart',
    component: () => import ('../views/CartView.vue')
  },

  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import ('../views/CheckoutView.vue')
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import ('../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
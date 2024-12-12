import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddBook from '../components/AddBook.vue'
import AppCart from '../components/AppCart.vue'
import BooksLists from '../components/BooksLists.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/list'
  },
  {
    path: '/list',
    name: 'list',
    component: BooksLists,
  },
  {
    path: '/form',
    name: 'form',
    component: AddBook,
  },
  {
    path: '/cart',
    name: 'cart',
    component: AppCart,
  },
  {
    path: '/add',
    name: 'add',
    component: AddBook,
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: AddBook,
    props: true
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router


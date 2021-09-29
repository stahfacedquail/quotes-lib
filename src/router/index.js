import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../views/Home.vue';
import AddQuote from "../views/AddQuote.vue";

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/add-quote',
    name: 'AddQuote',
    component: AddQuote
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

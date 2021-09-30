import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../views/Home.vue';
import AddQuote from "../views/AddQuote.vue";
import AllQuotes from '../views/AllQuotes.vue';
import FavouriteQuotes from "../views/FavouriteQuotes.vue";

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
  },
  {
    path: '/all-quotes',
    name: 'AllQuotes',
    component: AllQuotes
  },
  {
    path: '/favourite-quotes',
    name: 'FavouriteQuotes',
    component: FavouriteQuotes
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

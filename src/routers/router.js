import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Health from '../views/Health.vue';
import Login from '../views/Login.vue';
import Posts from '../views/Posts.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/health',
    name: 'health',
    component: Health,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/posts',
    name: 'posts',
    component: Posts,
  },
];

const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
});

export default router;

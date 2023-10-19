import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Health from '../views/Health.vue';
import Login from '../views/Login.vue';

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
];

const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
});

export default router;

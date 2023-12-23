import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import Home from '../home-views/Home.vue';
import Health from '../views/Health.vue';
import Login from '../views/Login.vue';
import Posts from '../views/Posts.vue';
import Detail from '../views/Detail.vue';
import NotFound from '../views/NotFound.vue';
import AboutUs from '../views/AboutUs.vue';
import Dog from '../home-views/Dog.vue';
import Cat from '../home-views/Cat.vue';

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
    path: '/about-us',
    name: 'about-us',
    component: AboutUs,
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
  {
    path: '/posts/:id',
    name: 'posts-detail',
    component: Posts,
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: Detail,
  },
  {
    path: '/cat',
    name: 'cat',
    component: Cat,
  },
  {
    path: '/dog',
    name: 'dog',
    component: Dog,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  // history: createWebHashHistory()('/'),
  routes,
});

export default router;

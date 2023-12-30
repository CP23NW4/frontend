import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import Home from '../home/Home.vue';
import Health from '../views/Health.vue';
import Login from '../authen/Login.vue';
import SignUp from '../authen/Register.vue';
import Posts from '../views/Posts.vue';
import Detail from '../views/Detail.vue';
import NotFound from '../views/NotFound.vue';
import AboutUs from '../views/AboutUs.vue';
import Dog from '../home/Dog.vue';
import Cat from '../home/Cat.vue';
import Profile from '../views/Profile.vue';

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
    path: '/sign-in',
    name: 'login',
    component: Login,
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp,
  },
  // {
  //   path: '/posts',
  //   name: 'posts',
  //   component: Posts,
  // },
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
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFound,
  },
];

const router = createRouter({
  // history: createWebHistory('/'),
  history: createWebHashHistory('/'),
  routes,
});

export default router;

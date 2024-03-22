import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from "vue-router";
const user = ref({});

import Home from '../home/Home.vue';
import Adopted from '../home/Adopted.vue';
import Health from '../views/Health.vue';
import Login from '../authen/Login.vue';
import SignUp from '../authen/Register.vue';
import Posts from '../views/Posts.vue';
import Detail from '../views/Detail.vue';
import NotFound from '../views/NotFound.vue';
import AboutUs from '../views/AboutUs.vue';
import Dog from '../home/Dog.vue';
import Cat from '../home/Cat.vue';
import Profile from '../profile/YourPosts.vue';
import EditProfile from '../profile/EditProfile.vue';
import AdoptHistory from '../profile/AdoptHistory.vue';
import ReqHistory from '../profile/ReqHistory.vue';
import ReqDeatil from '../profile/ReqDeatil.vue';
import ReqForm from '../views/reqForm.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/adopted',
    name: 'adopted',
    component: Adopted,
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
  {
    path: '/posts/:id',
    name: 'posts-detail',
    component: Posts,
    meta: { requiresAuth: true }
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
    path: '/request-history',
    name: 'req-his',
    component: ReqHistory,
    meta: { requiresAuth: true }
  },
  {
    path: '/request-history/:id',
    name: 'req-detail',
    component: ReqDeatil,
    meta: { requiresAuth: true }
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
    meta: { requiresAuth: true }
  },
  {
    path: '/adoption-his',
    name: 'adopt-his',
    component: AdoptHistory,
    meta: { requiresAuth: true }
  },
  // {
  //   path: '/history',
  //   name: 'history',
  //   component: History,
  //   meta: { requiresAuth: true }
  // },
  {
    path: '/edit-profile',
    name: 'edit-profile',
    component: EditProfile,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFound,
  },
  {
    path: '/detail/:id/request-form',
    name: 'reqform',
    component: ReqForm,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  // history: createWebHistory('/'),
  history: createWebHashHistory('/'),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      next();
    } else {
      localStorage.removeItem(token)
      next({ name: 'login' });
    }
  } else {
    next();
  }
});

export default router;






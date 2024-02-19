import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from "vue-router";
const user = ref({});

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
import EditProfile from '../views/EditProfile.vue';
import ReqForm from '../views/reqForm.vue';

import getStrayAnimals from '../composition/useStrayAnimals';
const { strayAnimals } = getStrayAnimals();

const getUsers = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/users/`,
      {
        method: "GET",
        headers: {'Content-Type':'application/json',
        Authorization: localStorage.getItem("token"),},
        
      }
    );

    if (res.status === 200) {
      const userData = await res.json(); 
      user.value = userData;
    } else {
      if (res.status === 404) {
        console.error("Error: Post not found");
        router.push({
          name: "notfound",
        });
      } else if (res.status === 401) {
        console.error("Login");
        localStorage.removeItem("token")
        router.push({
          name: "login",
        });
      }else if (res.status === 500) {
        console.error("Error: Internal Server Error");
      } else {
        console.error("Error:", res.status, res.statusText);
      }
    }
  } catch (error) {
    console.error(error);
  }
};


onMounted(async () => {
  getUsers();
});

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






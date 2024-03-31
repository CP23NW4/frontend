<script setup>
import { ref, onMounted } from 'vue';
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const user = ref({})
const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

let checkSignIn= ref(localStorage.getItem('token'))    


const SignOut = () => {
  if (confirm("Sign Out?")) {
    localStorage.removeItem("token");
    location.reload();
  }

};




const getUsers = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/users/user/info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

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
      } else if (res.status === 500) {
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

</script>

<template>

<!-- <nav class="shadow-md hover:shadow-lg w-full h-18 bg-zinc-100 dark:bg-gray-900 fixed z-20 top-0 left-0 dark:border-gray-600"> -->
<nav style="background-color: #F1EFED" class="hover:shadow-lg w-full h-18 dark:bg-gray-900 fixed z-20 top-0 left-0 dark:border-gray-600">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <router-link :to="{ name: 'home' }">
    <a class="flex items-center">
      <img src="https://mnwanimals.blob.core.windows.net/accessories/logo3.png" class="h-10 mr-1" alt="Logo">
      <div class="flex-col justify-start items-start inline-flex">
          <div class="text-black text-base font-bold leading-relaxed tracking-tight">MEOW & WOOF</div>
          <div class="text-black text-[10px] font-bold leading-none tracking-tight">HOME FINDER</div>
        </div>
  </a>
  </router-link>


  <div class="md:hidden" >
    <button @click="toggleMobileMenu" class="text-gray-600 focus:outline-none absolute top-4 right-4">
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>

        <div v-if="mobileMenuOpen" style="background-color: #F1EFED" class="fixed top-0 left-0 w-full h-full bg-white">
      <div class="p-4 flex justify-end">
        <button @click="closeMobileMenu" class="text-gray-600 focus:outline-none">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div class="p-4">
        <router-link :to="{ name: 'home' }" @click="closeMobileMenu" class="block text-gray-800 py-2 border-b border-gray-300">Home</router-link>
        <!-- <router-link :to="{ name: 'health' }" @click="closeMobileMenu" class="block text-gray-800 py-2 border-b border-gray-300">Health</router-link>
        <router-link :to="{ name: 'about-us' }" @click="closeMobileMenu" class="block text-gray-800 py-2 border-b border-gray-300">About Me</router-link> -->
        <router-link :to="{ name: 'profile' }" @click="closeMobileMenu" class="block text-gray-800 py-2 border-b border-gray-300" v-if="checkSignIn">Profile</router-link>
        <router-link :to="{ name: 'login' }" @click="closeMobileMenu" class="block font-semibold text-green-600 py-2" v-if="!checkSignIn">Sign in</router-link>
        <router-link :to="{ name: 'login' }" @click="SignOut" class="block font-semibold text-red-800 py-2" v-if="checkSignIn">Sign out</router-link>
        <!-- <a class="text-red-700 cursor-pointer" v-if="checkSignIn" @click="SignOut">Sign out</a> -->
    </div>
      </div>
      </div>
  
  <div class="flex items-center md:order-2 hidden md:block lg:block ">
    <!-- <img class="w-5 mr-4" src="/noti3.png"> -->
    <router-link :to="{ name: 'login' }">
        <div v-if="!checkSignIn" class="mr-4 px-7 py-2 bg-orange-600 rounded-3xl justify-start items-center flex hover:bg-amber-400 hover:text-white">
            <a class="text-white text-sm font-medium">Sign in</a>
        </div>
    </router-link>

<div v-if="checkSignIn" class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img alt="user profile" :src="user.userPicture"/>
        </div>

      </div>
      <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <router-link :to="{ name: 'profile' }">
          <a class="justify-between">
            Profile
          </a>
        </router-link>
        </li>
        <!-- <li><a>Settings</a></li> -->
        <li><a class="text-red-700" @click="SignOut">Sign out</a></li>
      </ul>
    </div>

  </div>
  <div class="justify-start items-start gap-4 flex">
  <!-- <router-link :to="{ name: 'home' }" class="hidden md:block underline-none">
    <div class="px-7 py-2 border-b-2 border-transparent hover:border-indigo-950 transition duration-300">
      <a class="text-indigo-950 text-sm font-extrabold">HOME</a>
    </div>
  </router-link> -->

  <!-- <router-link :to="{ name: 'health' }" class="hidden md:block underline-none">
    <div class="px-7 py-2 border-b-2 border-transparent hover:border-indigo-950 transition duration-300">
      <a class="text-indigo-950 text-sm font-extrabold">HEALTH</a>
    </div>
  </router-link>

  <router-link :to="{ name: 'about-us' }" class="hidden md:block underline-none">
    <div class="px-7 py-2 border-b-2 border-transparent hover:border-indigo-950 transition duration-300">
      <a class="text-indigo-950 text-sm font-extrabold">ABOUT US</a>
    </div>
  </router-link> -->

</div>

 </div>
</nav>
</template>
<style>
  .bg-f9f9f9 {
    background-color: #f9f9f9 !important;
  }
</style>

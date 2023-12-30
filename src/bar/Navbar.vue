<script setup>
import { ref } from "@vue/reactivity";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

let checkSignIn= ref(localStorage.getItem('token'))     

const SignOut = () => {
  if (confirm("Sign Out?")) {
    localStorage.removeItem("token");
     location.reload();
  }

};

</script>

<template>

<!-- <nav class="shadow-md hover:shadow-lg w-full h-18 bg-zinc-100 dark:bg-gray-900 fixed z-20 top-0 left-0 dark:border-gray-600"> -->
<nav style="background-color: #F1EFED" class="hover:shadow-lg w-full h-18 dark:bg-gray-900 fixed z-20 top-0 left-0 dark:border-gray-600">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <router-link :to="{ name: 'home' }">
    <a class="flex items-center">
      <img src="/logo3.png" class="h-10 mr-1" alt="Logo">
      <div class="flex-col justify-start items-start inline-flex">
          <div class="text-black text-base font-bold leading-relaxed tracking-tight">MEOW & WOOF</div>
          <div class="text-black text-[10px] font-bold leading-none tracking-tight">HOME FINDER</div>
        </div>
  </a>
  </router-link>


  <div class="flex items-center md:order-2">
    <!-- <img class="w-5 mr-4" src="/noti3.png"> -->
    <router-link :to="{ name: 'login' }">
        <div v-if="!checkSignIn" class="mr-4 px-7 py-2 bg-orange-600 rounded-3xl justify-start items-center flex hover:bg-amber-400 hover:text-white">
            <a class="text-white text-sm font-medium">Sign in</a>
        </div>
    </router-link>

<div v-if="checkSignIn" class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img alt="user profile" src="/cat.jpg" />
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
        <li><a>Settings</a></li>
        <li><a class="text-red-700" @click="SignOut">Sign out</a></li>
      </ul>
    </div>

  </div>
  <div class="justify-start items-start gap-4 flex">
  <router-link :to="{ name: 'home' }" class="underline-none">
    <div class="px-7 py-2 border-b-2 border-transparent hover:border-indigo-950 transition duration-300">
      <a class="text-indigo-950 text-sm font-extrabold">HOME</a>
    </div>
  </router-link>

  <router-link :to="{ name: 'health' }" class="underline-none">
    <div class="px-7 py-2 border-b-2 border-transparent hover:border-indigo-950 transition duration-300">
      <a class="text-indigo-950 text-sm font-extrabold">HEALTH</a>
    </div>
  </router-link>

  <router-link :to="{ name: 'about-us' }" class="underline-none">
    <div class="px-7 py-2 border-b-2 border-transparent hover:border-indigo-950 transition duration-300">
      <a class="text-indigo-950 text-sm font-extrabold">ABOUT US</a>
    </div>
  </router-link>

  <!-- <router-link :to="{ name: 'profile' }" class="underline-none">
    <div class="px-7 py-2 border-b-2 border-transparent hover:border-indigo-950 transition duration-300">
      <a class="text-indigo-950 text-sm font-extrabold">PROFILE</a>
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

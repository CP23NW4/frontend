<script setup>
import { ref } from "@vue/reactivity";
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
</script>

<template>

<nav class="shadow-md hover:shadow-lg w-full h-16 bg-white dark:bg-gray-900 fixed z-20 top-0 left-0 dark:border-gray-600">
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
        <div class="mr-4 px-7 py-2 bg-orange-600 rounded-3xl justify-start items-center flex hover:bg-amber-400 hover:text-white">
            <a class="text-white text-sm font-medium">Sign in</a>
        </div>
    </router-link>
      <button type="button" class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span class="sr-only">Open user menu</span>
        <img class="w-8 h-8 rounded-full object-cover" src="/cat.jpg" alt="user photo">  
<!-- use profile img path from users data {{ users.img }} -->
<!-- add default image when image==null use defaul image -->
      </button>
<!-- Dropdown menu -->
      <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
        <div class="px-4 py-3">
          <span class="block text-sm text-gray-900 dark:text-white">millieme.m</span>
          <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">millie@gmail.com</span>
        </div>
        <ul aria-labelledby="user-menu-button">
          <li>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">My Pets</a>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
          </li>
        </ul>
      </div>
  </div>
  <!-- <div class="justify-start items-start gap-4 flex">
    <router-link :to="{ name: 'home' }">
        <div class="px-7 py-2 bg-indigo-950 rounded-3xl justify-start items-center flex hover:bg-zinc-800 hover:text-white">
            <a class="text-white text-sm font-medium">Home</a>
        </div>
    </router-link>
    <router-link :to="{ name: 'health' }">
        <div class="px-7 py-2 bg-indigo-950 rounded-3xl justify-start items-center flex hover:bg-zinc-800 hover:text-white">
            <a class="text-white text-sm font-medium">Test</a>
        </div>    
    </router-link>

   </div> -->
 </div>
</nav>
</template>

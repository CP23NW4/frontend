<script setup>
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
</script>

<template>
  <nav class="w-full h-16 dark:bg-gray-900 z-20 top-0 left-0 dark:border-gray-600">
    <div class="max-w-screen-xl flex items-center justify-center mx-auto p-4">
      <div class="flex gap-4">
        <router-link :to="{ name: 'home' }" class="underline-none"
        :class="{ 'border-b-2 border-indigo-950': route.name === 'home', 'border-transparent': route.name !== 'dog' }">
          <div class="px-7 py-2">
            <a class="text-indigo-950 text-sm font-extrabold">ALL</a>
          </div>
        </router-link>

        <router-link :to="{ name: 'dog' }" class="underline-none"
        :class="{ 'border-b-2 border-indigo-950': route.name === 'dog', 'border-transparent': route.name !== 'dog' }">
        <div class="px-7 py-2">
            <a class="text-indigo-950 text-sm font-extrabold">DOG</a>
          </div>
        </router-link>

        <router-link :to="{ name: 'cat' }" class="underline-none"
        :class="{ 'border-b-2 border-indigo-950': route.name === 'cat', 'border-transparent': route.name !== 'cat' }">
        <div class="px-7 py-2">
            <a class="text-indigo-950 text-sm font-extrabold">CAT</a>
          </div>
        </router-link>
      </div>
    </div>
  </nav>
</template>

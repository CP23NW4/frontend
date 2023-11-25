<script setup>
import { defineProps } from 'vue';

const { strayAnimal } = defineProps(['strayAnimal']);
</script>

<template>
  <div href="#" class="mx-12 mb-10 text-left block max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 focus:translate-y-0 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <div class="relative w-full h-52">
        <img v-if="strayAnimal.picture !== null" :src="strayAnimal.picture" class="w-full h-full object-cover rounded-lg" alt="Animal Image">
        <img v-else-if="strayAnimal.picture === null" src="/cat1.jpg" class="w-full h-full object-cover rounded-lg" alt="Animal Image">

    </div>
    <div class="flex items-center p-5">
      <img v-if="strayAnimal.gender === 'Female'" src="/female.svg" class="h-5 mr-4" alt="Female Icon">
      <img v-else-if="strayAnimal.gender === 'Male'" src="/male.svg" class="h-5 mr-4" alt="Male Icon">
      <div class="text-[16px] font-bold leading-none tracking-tight">
        {{ strayAnimal.name }}
      </div>
    </div>
  </div>
</template>

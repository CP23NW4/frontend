<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';
defineEmits(['setSearchKeyword'])
const keyword = ref('')
</script>

<template>
  <div>
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
      <!-- Your existing search input field -->
      <input
        type="search"
        id="default-search"
        class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search name, type..."
        v-model="keyword"
      />
      <button 
      type="submit"
      class="text-white bg-amber-700 hover:bg-amber-600 focus:ring-0 focus:ring-amber-200 font-medium rounded-none text-sm px-5 py-2.5"
    >
      Search
    </button>
    </div>
  </div>
</template>

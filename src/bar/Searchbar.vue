<script setup>
import { ref, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['setSearchKeyword']);
const keyword = ref('');

function search() {
  emit('setSearchKeyword', keyword.value);
}

</script>

<template>
  <div>
    <!-- <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label> -->
    <div class="relative mt-4 mx-8 md:mx-20 lg:mx-20">
      <!-- Your existing search input field -->
      <input
        type="search"
        id="default-search"
        class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search name, type, color, description..."
        v-model="keyword"
        @input="search()" 

      />
    </div>
  </div>
</template>

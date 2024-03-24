<script setup>
import { ref } from "vue";
import YourPosts from '../profile/YourPosts.vue'; 
import ReqHistory from '../profile/ReqHistory.vue'; 
const activeTab = ref('YourPosts');

</script>

<template>
  <div>
    <nav class="w-full h-16 dark:bg-gray-900 z-20 top-0 left-0 dark:border-gray-600">
      <div class="max-w-screen-xl flex items-center justify-center mx-auto p-4">
        <div class="flex gap-4">
          <div @click="activeTab = 'YourPosts'" :class="{ 'border-b-2 border-indigo-950': activeTab === 'YourPosts' }" class="text-indigo-950 text-sm font-extrabold cursor-pointer">YOUR POSTS</div>
          <div @click="activeTab = 'ReqHistory'" :class="{ 'border-b-2 border-indigo-950': activeTab === 'ReqHistory' }" class="text-indigo-950 text-sm font-extrabold cursor-pointer">REQUEST HISTORY</div>
          <div @click="activeTab = '#'" :class="{ 'border-b-2 border-indigo-950': activeTab === '#' }" class="text-indigo-950 text-sm font-extrabold cursor-pointer">YOUR ADOPTED</div>
        </div>
      </div>
    </nav>

    <div>
      <component :is="activeTab === 'YourPosts' ? YourPosts : ReqHistory" />
    </div>
  </div>
</template>

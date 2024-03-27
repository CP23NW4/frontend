<script setup>
import { ref, onMounted } from 'vue';
import Comment from '../components/Comment.vue'; 
import AdoptHistory from '../profile/AdoptHistory.vue'; 

const activeTabDT = ref(localStorage.getItem('activeTabDT') || 'Comment');

const handleTabChange = (tabName) => {
  activeTabDT.value = tabName;
  localStorage.setItem('activeTabDT', tabName);
};

onMounted(() => {
  if (!localStorage.getItem('activeTabDT')) {
    localStorage.setItem('activeTabDT', 'Comment');
  }
});
</script>

<template>
  <div>
    <nav class="w-full h-16 dark:bg-gray-900 z-20 top-0 left-0 dark:border-gray-600">
      <div class="max-w-screen-xl flex items-center justify-center mx-auto p-4">
        <div class="flex gap-4">
          <div @click="handleTabChange('Comment')" :class="{ 'border-b-2 border-indigo-950': activeTabDT === 'Comment' }" class="text-indigo-950 text-sm font-extrabold cursor-pointer">COMMENT</div>
          <div @click="handleTabChange('AdoptHistory')" :class="{ 'border-b-2 border-indigo-950': activeTabDT === 'AdoptHistory' }" class="text-indigo-950 text-sm font-extrabold cursor-pointer">REQUEST</div>
        </div>
      </div>
    </nav>

    <div>
      <component :is="activeTabDT === 'Comment' ? Comment : AdoptHistory" />
    </div>
  </div>
</template>

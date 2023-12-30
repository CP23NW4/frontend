<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CreateEditPost from '../components/CreateEditPostClearTest.vue';

const route = useRoute();
const router = useRouter();
const isCreatePostModalOpen = ref(false);

const openCreatePostModal = () => {
  isCreatePostModalOpen.value = true;
};

const closeCreatePostModal = () => {
  const shouldClose = window.confirm("Cancel? Changes you made may not be saved.");
  if (shouldClose) {
    isCreatePostModalOpen.value = false;
  }
};

const handleCreatePostModalClosed = (shouldRefresh) => {
  closeCreatePostModal();
  if (shouldRefresh) {
    // Optionally, you can add logic to refresh the page here
    // For example, you can use router.go(0) to reload the current page
    router.go(0);
  }
};
</script>

<template>
  <nav class="w-full h-16 dark:bg-gray-900 z-20 top-0 left-0 dark:border-gray-600">
    <div class="max-w-screen-xl flex items-center justify-center mx-auto p-4">
      <div class="flex gap-4">
        <router-link :to="{ name: 'home' }" class="underline-none" :class="{ 'border-b-2 border-indigo-950': route.name === 'home', 'border-transparent': route.name !== 'home' }">
          <div class="px-7 py-2">
            <a class="text-indigo-950 text-sm font-extrabold">ALL</a>
          </div>
        </router-link>

        <router-link :to="{ name: 'dog' }" class="underline-none" :class="{ 'border-b-2 border-indigo-950': route.name === 'dog', 'border-transparent': route.name !== 'dog' }">
          <div class="px-7 py-2">
            <a class="text-indigo-950 text-sm font-extrabold">DOG</a>
          </div>
        </router-link>

        <router-link :to="{ name: 'cat' }" class="underline-none" :class="{ 'border-b-2 border-indigo-950': route.name === 'cat', 'border-transparent': route.name !== 'cat' }">
          <div class="px-7 py-2">
            <a class="text-indigo-950 text-sm font-extrabold">CAT</a>
          </div>
        </router-link>

        <!-- Create Post Button -->
        <div
          @click="openCreatePostModal"
          class="text-white px-7 py-2 bg-zinc-800 font-bold rounded-3xl justify-start items-center flex hover:bg-orange-600 hover:text-white cursor-pointer"
        >
          +
        </div>

        <!-- Create Post Modal -->
        <teleport to="body">
          <div v-if="isCreatePostModalOpen" @click.self="closeCreatePostModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div @click.stop class="bg-white p-6 rounded-md mt-20">
              <CreateEditPost @closeModal="handleCreatePostModalClosed" />
            </div>
          </div>
        </teleport>
      </div>
    </div>
  </nav>
</template>

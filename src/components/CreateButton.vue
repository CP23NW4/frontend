<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CreateEditPost from './CreateEditPost.vue';


const router = useRouter();
const expandButton = ref(false);

const isCreatePostModalOpen = ref(false);

const openCreatePostModal = () => {
  isCreatePostModalOpen.value = true;
};
const formPost = ref({
  name: "",
  type: "",
  gender: "",
  color: "",
  description: "",
  picture: null,
  createdOn: new Date().toISOString(),
});

const closeCreatePostModal = () => {
  const hasInputValue = Object.values(formPost.value).some(value => value !== '');
  
  if (hasInputValue) {
    const shouldClose = window.confirm("Are you sure you want to cancel? Changes you made may not be saved.");
    if (shouldClose) {
      isCreatePostModalOpen.value = false;
    }
  } else {
    isCreatePostModalOpen.value = false;
  }
};

const handleCreatePostModalClosed = (shouldRefresh) => {
  closeCreatePostModal();
  if (shouldRefresh) {
    router.go(0);
  }
};

const handleCreateModalCloseWithoutConfirmation = () => {
  isCreatePostModalOpen.value = false;
};
</script>
<template>
    <!-- Create Post Button -->
    <div
    @mouseenter="expandButton = true"
    @mouseleave="expandButton = false"
    @click="openCreatePostModal"
    class="fixed bottom-8 right-8 lg:right-20 z-10 text-white flex justify-center items-center bg-orange-600 font-bold rounded-full hover:bg-orange-700 hover:text-white cursor-pointer"
    :style="{ width: expandButton ? 'auto' : '50px', height: '50px' }"
  >
    <span class="text-4xl mx-2 transition-all" :class="{ 'text-lg': expandButton }">+</span>
    <span class="transition-all mr-2" :class="{ 'hidden': !expandButton }">Create Post</span>
  </div>

<!-- delete -->
<!-- <img
    :src="isHover ? '/images/s2.png' : '/images/s1.png'"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
    class="w-3/12 fixed bottom-0 left-0 transition duration-300 ease-in-out"
  /> -->

<!-- Create Post Modal -->
<teleport to="body">
  <div v-if="isCreatePostModalOpen" @click.self="closeCreatePostModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div @click.stop class="bg-white p-6 rounded-md mt-20">
      <CreateEditPost @closeModal="handleCreatePostModalClosed" @closeModalWithoutConfirmation="handleCreateModalCloseWithoutConfirmation" />
    </div>
  </div>
</teleport>

</template>


<style scoped>
  /* Add any additional styling you need */
  .transition-all {
    transition: all 1s ease;
  }


  img {
  transition-property: src;
}
</style>
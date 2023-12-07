<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps(['title', 'message', 'confirmAction', 'cancelAction']);

</script>
<template>
    <div class="max-w-md mx-auto bg-white shadow-lg rounded-md overflow-hidden">
    <div class="p-4">
      <h2 class="text-xl font-semibold mb-2">{{ title }}</h2>
      <p class="text-gray-600">{{ message }}</p>
    </div>
    <div class="flex justify-end p-4 bg-gray-100">
        <button @click="cancelAction" class="ml-2 px-4 py-2 bg-white text-gray-700 rounded-md">Cancel</button>
      <button @click="confirmAction" class="px-4 py-2 bg-amber-500 text-white rounded-md">Confirm</button>
    </div>
  </div>
</template>

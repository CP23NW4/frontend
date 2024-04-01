<template>
    <div :class="alertClasses" role="alert">
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  import { defineProps, computed } from 'vue';
  
  const props = defineProps({
    type: { type: String, default: 'info' }, // Default type is 'info'
  });
  
  const alertClasses = computed(() => {
    return {
      'p-4': true,
      'rounded-md': true,
      'text-white': true,
      'bg-blue-500': props.type === 'info',
      'bg-green-500': props.type === 'success',
      'bg-yellow-500': props.type === 'warning',
      'bg-red-500': props.type === 'error',
    };
  });
  </script>
  
  <style scoped>
  /* Additional styling can be added here */
  </style>
  
<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  label: String,
  color: { type: String, default: 'amber-400' },
});

const { emit } = defineEmits();

const handleClick = () => {
  // Display a confirmation dialog
  if (confirm('Are you sure you want to proceed?')) {
    // Emit a custom event to signal the confirmation
    emit('confirmed');
  }
};
</script>

<template>
  <button
    class="px-4 py-2 bg-amber-400 text-white rounded hover:bg-blue-600 focus:outline-none"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

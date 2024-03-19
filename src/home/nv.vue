<template>
  <nav>
    <button @click="emitChangeCategory('All')">All Animals</button>
    <button @click="emitChangeCategory('Dog')">Dogs</button>
    <button @click="emitChangeCategory('Cat')">Cats</button>
  </nav>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits();
const emitChangeCategory = category => {
  emit('changeCategory', category);
};
</script>

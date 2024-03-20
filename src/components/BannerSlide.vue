<template>
  <div class="carousel w-full h-4/6 mt-20 md:mt-20 lg:mt-20">
    <div v-for="(banner, index) in banners" :key="index" class="carousel-item w-full" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <img :src="banner.src" class="w-full" />
    </div> 
  </div> 
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentIndex = ref(0);
const banners = [
  { src: 'https://mnwanimals.blob.core.windows.net/accessories/b1.png' },
  { src: 'https://mnwanimals.blob.core.windows.net/accessories/b2.png' },
  { src: 'https://mnwanimals.blob.core.windows.net/accessories/b3.png' },
  // { src: '/banner/b4.png' }
];

const totalItems = banners.length;
let forward = true;

onMounted(() => {
  setInterval(() => {
    if (forward) {
      currentIndex.value = (currentIndex.value + 1) % totalItems;
    } else {
      currentIndex.value = (currentIndex.value - 1 + totalItems) % totalItems;
    }

    if (currentIndex.value === totalItems - 1 || currentIndex.value === 0) {
      forward = !forward;
    }
  }, 5000);
});
</script>

<style scoped>
.carousel {
  display: flex;
  overflow: hidden;
  position: relative;
}

.carousel-item {
  flex: 0 0 100%;
  transition: transform 2s ease;
}

.carousel-item img {
  display: block;
  width: 100%;
  height: auto;
}
</style>

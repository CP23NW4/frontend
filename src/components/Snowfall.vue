<template>
    <div class="snowfall-container">
      <div v-for="flake in flakes" :key="flake.id" class="snowflake" :style="{ top: flake.y + 'px', left: flake.x + 'px' }">
        ❄
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const flakes = ref([]);
  
  const createFlake = () => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const speed = Math.random() * 5 + 1;
  
    return { id: Date.now(), x, y, speed };
  };
  
  const updateFlakes = () => {
    flakes.value = flakes.value.map((flake) => {
      flake.y += flake.speed;
  
      // Reset flake if it goes below the screen
      if (flake.y > window.innerHeight) {
        flake.y = 0;
      }
  
      return flake;
    });
  };
  
  onMounted(() => {
    for (let i = 0; i < 50; i++) {
      flakes.value.push(createFlake());
    }
  
    setInterval(updateFlakes, 50);
  });
  
  onUnmounted(() => {
    flakes.value = [];
  });
  </script>
  
  <style scoped>
  .snowfall-container {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 1; /* Set z-index to a value less than your content's z-index */
    width: 100%;
    height: 100%;
    background: transparent; /* Set a transparent background */
  }
  
  .snowflake {
    position: absolute;
    font-size: 28px; /* Adjust the size of the snowflake */
    color: #fff !important; /* Change color to white */
  }
  </style>
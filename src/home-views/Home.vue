<script setup>
import Filterbar from '../bar/Filterbar.vue';
import Banner from '../components/Banner.vue';
import BannerSlide from '../components/BannerSlide.vue';
import Card from '../components/Card.vue';
import Snowfall from '../components/Snowfall.vue';
import useStrayAnimals from '../composition/useStrayAnimals';

const { strayAnimals } = useStrayAnimals();


</script>

<template>
  <div>
    <BannerSlide />
    <Snowfall />
    <Filterbar />
    <div class="min-h-screen">
      <br />
      <!-- <h1 class="font-bold text-left m-8">Finding Home</h1> -->
      <div v-if="strayAnimals.length === 0">
        <p class="text-center text-lg mt-10">No Stray Animals</p>
      </div>
      <div class="grid grid-cols-4 gap-0">
        <div v-for="strayAnimal in strayAnimals" :key="strayAnimal._id">
          <Card :strayAnimal="strayAnimal" />
        </div>
      </div>
    </div>
  
  </div>
</template>

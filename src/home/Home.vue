<script setup>
import { ref, onMounted, computed } from 'vue';
import Filterbar from '../bar/Filterbar.vue';
import Searchbar from '../bar/Searchbar.vue';
import BannerSlide from '../components/BannerSlide.vue';
import Card from './Card.vue';
import Snowfall from '../components/Snowfall.vue';
import getStrayAnimals from '../composition/useStrayAnimals';

const { strayAnimals } = getStrayAnimals();
const keyword = ref('')
const filteredStrayAnimals = computed(() => {
  return strayAnimals.value.filter(
    (strayAnimals) =>
    (strayAnimals.toLowerCase().includes(keyword.value.toLowerCase()) ))
  
})
const setSearchKeyword = (keyword) => {
  keyword.value = keyword
}

</script>


<template>
  <div>
    <BannerSlide />
    <!-- <Searchbar @search="filteredStrayAnimals" /> -->
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

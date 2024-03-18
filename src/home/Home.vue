<script setup>
import { ref, onMounted, computed } from 'vue';
import Filterbar from '../bar/Filterbar.vue';
import Searchbar from '../bar/Searchbar.vue';
import CreateButton from '../components/CreateButton.vue';
import BannerSlide from '../components/BannerSlide.vue';
import Card from './Card.vue';
import Snowfall from '../components/Snowfall.vue';
import getStrayAnimals from '../composition/useStrayAnimals';
import searchFilter from '../composition/searchFilter';

const { strayAnimals } = getStrayAnimals();
const { keyword, filteredStrayAnimals, setSearchKeyword } = searchFilter(strayAnimals);
const filteredStrayAnimalsWithStatusAvailable = computed(() => {
  return filteredStrayAnimals.value.filter(strayAnimal => strayAnimal.status === 'Available');
});
// location.reload()
</script>


<template>
  <div>
    <BannerSlide />
    <Searchbar @setSearchKeyword="setSearchKeyword" />
    <Snowfall />
    <Filterbar />
    <div class="min-h-screen lg:px-20">
      <br />
      <!-- <h1 class="font-bold text-left m-8">Finding Home</h1> -->
      <div v-if="strayAnimals.length === 0">
        <p class="text-center text-lg mt-10">No Stray Animals</p>
      </div>

      <div class="grid lg:grid-cols-4 gap-0 md:grid-cols-3">
        <div v-for="strayAnimal in filteredStrayAnimalsWithStatusAvailable" :key="strayAnimal._id">
          <Card :strayAnimal="strayAnimal" />
        </div>
      </div>
    </div>
  
  </div>
  <CreateButton />

</template>

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

// Reactive variables for different categories
const { strayAnimals: allStrayAnimals } = getStrayAnimals();
const { strayAnimals: dogStrayAnimals } = getStrayAnimals('Dog');
const { strayAnimals: catStrayAnimals } = getStrayAnimals('Cat');

const { keyword, filteredStrayAnimals, setSearchKeyword } = searchFilter(allStrayAnimals);
const filteredStrayAnimalsWithStatusAvailable = computed(() => {
  return filteredStrayAnimals.value.filter(strayAnimal => strayAnimal.status === 'Available');
});

// Variable to track the current category
const currentCategory = ref('All');

// Method to switch categories
const switchCategory = (category) => {
  currentCategory.value = category;
  setSearchKeyword(category); // Pass the category directly as the search keyword
}
</script>

<template>
  <div>
    <BannerSlide />
    <Searchbar @setSearchKeyword="setSearchKeyword" />
    <Snowfall />
    <nav class="p-4">
      <button @click="switchCategory('All')" :class="{ 'bg-gray-500': currentCategory === 'All' }">All</button>
      <button @click="switchCategory('Dog')" :class="{ 'bg-gray-500': currentCategory === 'Dog' }">Dog</button>
      <button @click="switchCategory('Cat')" :class="{ 'bg-gray-500': currentCategory === 'Cat' }">Cat</button>
    </nav>
    <div class="min-h-screen px-20 md:px-20 lg:px-20">
      <br />
      <div v-if="filteredStrayAnimals.value?.length === 0">
        <p class="text-center text-lg mt-10">No Stray Animals</p>
      </div>

      <div class="grid lg:grid-cols-4 gap-0 md:grid-cols-3 grid-cols-1">
        <div v-for="strayAnimal in filteredStrayAnimalsWithStatusAvailable" :key="strayAnimal._id">
          <Card :strayAnimal="strayAnimal" />
        </div>
      </div>
    </div>
  </div>
  <CreateButton />
</template>

<script setup>
import Filterbar from '../bar/Filterbar.vue';
import Banner from '../components/Banner.vue';
import BannerSlide from '../components/BannerSlide.vue';
import Card from '../components/Card.vue';
import useStrayAnimals from '../composition/useStrayAnimals';

const { strayAnimals } = useStrayAnimals('Cat');
</script>


<template>
    <BannerSlide />
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
    <!-- <router-link to="/posts" class="fixed bottom-10 right-12">
      <div class="text-white px-7 py-2 bg-indigo-950 rounded-3xl justify-start items-center flex hover:bg-orange-600 hover:text-white">
        Creat Post
      </div>
    </router-link> -->
  </template>
  
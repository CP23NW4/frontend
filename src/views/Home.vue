<script setup>
import Banner from '../components/Banner.vue';
import Card from '../components/Card.vue';

import { ref, onMounted } from 'vue';


const strayAnimals = ref([])

const getPost = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/api/strayAnimals`, {
        method: 'GET',
      }
    )
    if (res.status === 200) {
      const data = await res.json();
      console.log('success');
      strayAnimals.value = data;
    } else {
      console.error('Error:', res.status, res.statusText)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  getPost()
})
</script>

<template>
  <Banner />
  <div class="min-h-screen">
    <br />
    <h1 class="font-bold text-left m-8">Finding Home</h1>
    <div v-if="strayAnimals.length === 0">
      <p class="text-center text-lg mt-10">No Stray Animals</p>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="strayAnimal in strayAnimals" :key="strayAnimal._id">
        <Card :strayAnimal="strayAnimal" />
      </div>
    </div>
  </div>

  <router-link to="/posts" class="fixed bottom-10 right-12">
    <div class="text-white px-7 py-2 bg-indigo-950 rounded-3xl justify-start items-center flex hover:bg-orange-600 hover:text-white">
      Creat Post
    </div>
  </router-link>

</template>

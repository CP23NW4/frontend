<script setup>
import Banner from '../components/Banner.vue'
import DetailCard from '../components/DetailCard.vue'
import { ref, onMounted } from 'vue'

const strayAnimals = ref([])

const getPost = async () => {
  try {
    // const res = await fetch(`http://localhost:8090/api/strayAnimals`, {
    // const res = await fetch(`http://172.17.0.2:8090/api/strayAnimals`, {
    //  const res = await fetch(import.meta.env.VITE_APP_TITLE, {
      const res = await fetch(`http://54.179.85.138/api/strayAnimals`, {
      // const res = await fetch(
    //   `${import.meta.env.VITE_APP_TITLE}/api/strayAnimals`,
    //   {
        method: 'GET',
      }
    )

    if (res.status === 200) {
      const data = await res.json()
      console.log('Data from API:', data)
      strayAnimals.value = data
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
  <div>
    <Banner />
    <br />
    <h1 class="font-bold text-left m-8">Finding Home</h1>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="strayAnimal in strayAnimals" :key="strayAnimal._id">
        <DetailCard :strayAnimal="strayAnimal" />
      </div>
    </div>
  </div>
</template>

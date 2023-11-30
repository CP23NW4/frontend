<script setup>
import Banner from '../components/Banner.vue'
import DetailCard from '../components/DetailCard.vue'
import { ref, onMounted } from 'vue'

const strayAnimals = ref([])

const getPost = async () => {
  try {
    // const res = await fetch(`http://localhost:8090/api/strayAnimals`, {
    // const res = await fetch(`http://54.179.85.138/api/strayAnimals`, {
    // console.log('API URL:', meta.env.VUE_APP_API_URL) // Ensure this prints the correct value
    const constructedURL = `${import.meta.env.VITE_APP_TITLE}/api/strayAnimals`
    console.log('Constructed URL:', constructedURL) // Check if this logs the expected complete URL
    const res = await fetch(constructedURL, {
      method: 'GET',
    })

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

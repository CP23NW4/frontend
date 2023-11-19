<script setup>
import { ref, onMounted } from 'vue'
import Banner from '../components/Banner.vue'
import DetailCard from '../components/DetailCard.vue'

const strayAnimals = ref([])

const getPost = async () => {
  try {
    // const res = await fetch(`http://localhost:8090/api/strayAnimals`, {
    const res = await fetch(`/backend/api/strayAnimals`, {
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
    <a>{{ strayAnimals }} </a>
    <br />
    <h1 class="font-bold text-left m-8">Finding Home</h1>
    <div class="grid grid-cols-3 gap-4">
      <DetailCard
        v-for="animal in strayAnimals"
        :key="animal.id"
        :animal="animal"
      />
    </div>
  </div>
</template>

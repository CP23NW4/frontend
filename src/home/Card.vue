<script setup>
import { defineProps } from 'vue';
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps(['strayAnimal']);

const showDetail = (id) => {
console.log(id)
  router.push({
    name: 'detail',
    // query: { id: id },
    params: { id: id}
  })
}

</script>

<template>
<!-- {{ strayAnimal }} -->
  <div @click="showDetail(props.strayAnimal._id)" class="mx-8 mb-10 text-left block max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 focus:translate-y-0 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <div class="relative w-full h-52">
        <img v-if="strayAnimal.picture !== null" :src="strayAnimal.picture" class="w-full h-full object-cover rounded-lg" alt="Animal Image">
        <img v-else-if="strayAnimal.picture === null" src="/nodata.png" class="w-full h-full object-cover rounded-lg" alt="Animal Image">
    </div> 
    
    <div class="flex items-center p-5">
<img v-if="strayAnimal && strayAnimal.gender && strayAnimal.gender.toUpperCase() === 'FEMALE'" src="/female.svg" class="h-5 mr-4" alt="Female Icon">
<img v-if="strayAnimal && strayAnimal.gender && strayAnimal.gender.toUpperCase() === 'MALE'" src="/male.svg" class="h-5 mr-4" alt="Male Icon">
      <div v-if="strayAnimal.gender === null" class="mr-4"> ไม่ระบุเพศ </div>
      
      <div class="text-[16px] font-bold leading-none tracking-tight" v-if="strayAnimal.name !== null">
        {{ strayAnimal.name && strayAnimal.name.length < 10
        ? strayAnimal.name
        : strayAnimal.name ? strayAnimal.name.substring(0, 10) + ' ...' : ''}}
      </div>
      <div class="text-[16px] font-bold leading-none tracking-tight" v-if="strayAnimal.name === null">
        ไม่ระบุชื่อ
      </div>
    </div>
  </div>
</template>

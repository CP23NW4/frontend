<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps(['strayAnimal']);
const showDetail = (id) => {
  console.log(id);
  router.push({
    name: "detail",
    params: { id: id },
  });
};
</script>
<template>
  <div @click="showDetail(props.strayAnimal._id)" class="mx-8 md:mx-4 lg:mx-4 mb-10 text-left block max-w-sm bg-white border border-gray-200 shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 focus:translate-y-0 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <div class="relative lg:w-full lg:h-52 md:w-full md:h-36 h-60">
        <img v-if="strayAnimal.picture !== null" :src="strayAnimal.picture" class="w-full h-full object-cover" alt="Animal Image">
        <img v-else-if="strayAnimal.picture === null" src="/nodata.png" class="w-full h-full object-cover rounded-lg" alt="Animal Image">
    </div> 
    
    <div class="flex items-center p-5">
        <img v-if="strayAnimal && strayAnimal.gender && strayAnimal.gender.toUpperCase() === 'FEMALE'" src="/female.svg" class="h-5 mr-4" alt="Female Icon">
        <img v-if="strayAnimal && strayAnimal.gender && strayAnimal.gender.toUpperCase() === 'MALE'" src="/male.svg" class="h-5 mr-4" alt="Male Icon">
        <div v-if="strayAnimal.gender === null" class="mr-4"> ไม่ระบุเพศ </div>
      
        <div class="flex flex-col"> <!-- Use flex-col here -->
          <div class="text-sm font-bold leading-none tracking-tight" v-if="strayAnimal.name !== null">
            {{ strayAnimal.name && strayAnimal.name.length < 10
            ? strayAnimal.name
            : strayAnimal.name ? strayAnimal.name.substring(0, 10) + ' ...' : ''}}
          </div>
          <div class="text-[16px] font-bold leading-none tracking-tight" v-if="strayAnimal.name === null">
            ไม่ระบุชื่อ
          </div>
          
          <div class="text-sm leading-none tracking-tight mt-1" v-if="strayAnimal.description !== null">
            {{ strayAnimal.description && strayAnimal.description.length < 20
            ? strayAnimal.description
            : strayAnimal.description ? strayAnimal.description.substring(0, 20) + ' ...' : ''}}
          </div>
          <div class="text-[16px] font-bold leading-none tracking-tight" v-if="strayAnimal.description === null">
            ไม่ระบุรายละเอียด
          </div>
          <div class="text-[16px] font-bold leading-none tracking-tight text-emerald-600" v-if="strayAnimal.status === 'Available'">
            {{ strayAnimal.status }}
          </div>
          <div class="text-[16px] font-bold leading-none tracking-tight text-red-600" v-if="strayAnimal.status === 'Unavailable'">
            {{ strayAnimal.status }}
          </div>
          
        </div>
    </div>
  </div>
</template>

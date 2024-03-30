<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const adoptionReq = ref([]);
const strayAnimal = ref({});

const getPosts = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/strayAnimals/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    if (res.ok) {
      const data = await res.json();
      strayAnimal.value = data;
    } else {
      console.error('Error fetching adoption requests:', res.status, res.statusText);
    }
  } catch (error) {
    console.error('Error fetching adoption requests:', error);
  }
};

onMounted(async () => {
  getRequest();
  getPosts();
});


const getRequest = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/strayAnimals/sender/reqAdoption`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    if (res.ok) {
      const reqData = await res.json();
      adoptionReq.value = reqData;
    } else {
      console.error('Error fetching adoption requests:', res.status, res.statusText);
    }
  } catch (error) {
    console.error('Error fetching adoption requests:', error);
  }
};

onMounted(async () => {
  getRequest();
});

const showDetail = (id) => {
  router.push({
    name: 'req-detail',
    params: { id: id },
  });
};

const filteredStrayAnimal = computed(() => {
  return strayAnimal.value.filter(animal => adoptionReq.value.some(req => req.animal.saId === animal._id));
});
</script>

<template>

  <div v-for="(req, index) in adoptionReq" :key="req._id" @click="showDetail(req._id)" style="cursor: pointer;" class="mx-1 md:mx-4 lg:mx-4 mb-10 text-left rounded-lg block max-w-sm hover:shadow-lg transition-transform transform hover:border hover:border-gray-500 hover:-translate-y-1 focus:translate-y-0 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <div class="relative lg:w-full lg:h-52 md:w-full md:h-36 h-60">
      <img
        v-if="req.animal.saPicture !== null"
        :src="req.animal.saPicture"
        class="w-full h-full object-cover rounded-lg "
        alt="Animal Image"
      />

      <img
        v-else-if="req.animal.saPicture === null"
        src="/nodata.png"
        class="w-full h-full object-cover rounded-lg"
        alt="Animal Image"
      />
    </div>

    <div class="flex p-3">
      <div v-if="req.animal && req.animal.saGender" >
        <img
          v-if="req.animal.saGender.toUpperCase() === 'FEMALE'"
          src="/female.svg"
          class="h-5 mr-4"
          alt="Female Icon"
        />
        <img
          v-else-if="req.animal.saGender.toUpperCase() === 'MALE'"
          src="/male.svg"
          class="h-5 mr-4"
          alt="Male Icon"
        />
      </div>
      <div v-else class="mr-4 h-5 font-bold text-2xl">?</div>
      <div class="flex flex-col">
        <div class="text-sm font-bold leading-none tracking-tight" v-if="req.animal.saName !== null">
          {{ req.animal.saName && req.animal.saName.length < 10 ? req.animal.saName : req.animal.saName ? req.animal.saName.substring(0, 10) + " ..." : "" }}
        </div>
        <div class="text-[16px] font-bold leading-none tracking-tight" v-if="req.animal.saName === null">
          ไม่ระบุชื่อ
        </div>
        <div class="text-sm leading-none tracking-tight mt-1 text-gray-500" v-if="req.animal.saDesc !== null">
          {{ req.animal.saDesc && req.animal.saDesc.length < 20 ? req.animal.saDesc : req.animal.saDesc ? req.animal.saDesc.substring(0, 40) + " ..." : "" }}
        </div>
        <div class="text-xs leading-none tracking-tight mt-1 text-gray-500">
          Created by {{ req.owner?.ownerUsername }}
        </div>
        <!-- <div class="text-[12px] font-bold leading-none mt-1 tracking-tight text-emerald-600">
            {{ filteredStrayAnimal[index].status }}
        </div> -->

<div class="text-[12px] font-bold leading-none mt-1 tracking-tight" v-if="filteredStrayAnimal[index]">
  <span v-if="filteredStrayAnimal[index].status === 'Available' && req.status === 'On Request'" class="text-amber-500">On Request</span>
  <span v-else-if="filteredStrayAnimal[index].status === 'Unavailable' && req.status === 'On Request'" class="text-red-600">Rejected</span>
  <span v-else-if="filteredStrayAnimal[index].status === 'Unavailable' && req.status === 'Accepted'" class="text-emerald-600">Accepted</span>
</div>

      </div>
    </div>
  </div>
</template>

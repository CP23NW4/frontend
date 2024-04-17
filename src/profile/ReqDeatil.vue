<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from "vue-router";

const adoptionReq = ref(null);
const router = useRouter();
const route = useRoute();

const goBack = () => router.go(-1);

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

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
  getPosts();
});

const getRequest = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/strayAnimals/sender/reqAdoption/${route.params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    if (res.ok) {
      const reqData = await res.json();
      adoptionReq.value = reqData;
    } else {
      console.error('Error fetching adoption request:', res.status, res.statusText);
    }
  } catch (error) {
    console.error('Error fetching adoption request:', error);
  }
};

onMounted(async () => {
  getRequest();
});

</script>

<template>
  {{ adoptionReq }}
  <div v-if="adoptionReq" class="flex items-center justify-center mt-20">
    <div class="items-center gap-4 mb-4 text-center max-w-lg">
      <div class="mb-4">
        <img
          v-if="adoptionReq.animal.saPicture !== null"
          :src="adoptionReq.animal.saPicture "
          class="w-full h-full object-cover rounded-lg"
          alt="Animal Image"
        />
        <img
          v-else-if="adoptionReq.animal.saPicture === null"
          src="/nodata.png"
          class="w-full h-full object-cover rounded-lg"
          alt="Animal Image"
        />
      </div>
      <div class="relative w-full bg-white shadow-lg p-8 my-10 rounded-md text-left">


        <div class="flex mb-4">
          <img class="w-10 h-10 rounded-full object-cover  mr-2" :src="adoptionReq.owner?.ownerPicture" alt="" />
          <div class="font-medium dark:text-white">
            <div class="font-bold">{{ adoptionReq.owner?.ownerUsername }}</div>
            <!-- <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ formatDate(adoptionReq.createdOn) }}
            </div> -->
          </div>
        </div>

        <hr />
        <div class="mt-4">
          <ul>
            <li><a class="font-bold m-2">ชื่อ :</a> {{ adoptionReq.animal.saName }}</li>
            <li>
              <a class="font-bold m-2">เพศ :</a>
              {{ capitalizeFirstLetter(adoptionReq.animal.saGender) }}
            </li>

            <li>
              <a class="font-bold m-2">ประเภท :</a>
              {{ capitalizeFirstLetter(adoptionReq.animal.saType) }}
            </li>
            <li><a class="font-bold m-2">สี :</a> {{ adoptionReq.animal.saColor }}</li>
            <li class="mx-2">  
              <a class="font-bold">คำอธิบาย :</a> {{ adoptionReq.animal.saDesc }}
            </li>
          </ul>
          <h2 class="font-semibold mt-10 mb-2">Your Information</h2>

          <div class="flex mb-4">
          <img class="w-10 h-10 rounded-full object-cover  mr-2" :src="adoptionReq.requester?.reqPicture" alt="" />
          <div class="font-medium dark:text-white">
            <div class="font-bold">{{ adoptionReq.requester?.reqUsername }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ formatDate(adoptionReq.createdOn) }}
            </div>
          </div>
          
        </div>
        <hr />
        <ul class="mt-4">
            <li><a class="font-bold m-2">ชื่อ:</a> {{ adoptionReq.requester.reqName }}</li>
            <li><a class="font-bold m-2">เบอร์ติดต่อ:</a> {{ adoptionReq.requester.reqPhone }}</li>
            <li class="mx-2">  
              <a class="font-bold">คำอธิบาย:</a> {{ adoptionReq.note }}
            </li>
            <li class="mx-2">  
              <a class="font-bold">สถานะ: </a> 
              <span class="text-emerald-600 font-semibold" v-if="adoptionReq.status === 'Accepted' "> {{ adoptionReq.status }}</span>
              <span class="text-amber-500 font-semibold" v-if="adoptionReq.status === 'On Request'"> {{ adoptionReq.status }}</span>
            </li>

            <li class="mx-2">
              <a class="font-bold">ที่พักอาศัย:</a>
              {{adoptionReq.requester.reqAddress?.DistrictThaiShort}}, {{ adoptionReq.requester.reqAddress?.ProvinceThai }} {{ adoptionReq.requester.reqAddress?.PostCode }}
            </li>
            <li v-if="adoptionReq.homePicture" class="mx-2">  
              <img :src="adoptionReq.homePicture" alt="Home Picture" class="w-full h-full object-cover rounded-lg mt-2">
            </li>


          </ul>

<br>

        </div>
      </div>

      <div class="text-left"> 
      <button @click="goBack" class="text-gray-600 font-semibold py-2 px-4 rounded-md hover:text-gray-800 focus:outline-none">Back</button>
          </div>   


</div>
</div>
</template>



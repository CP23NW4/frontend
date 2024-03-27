<script setup>
import { ref, onMounted } from 'vue';
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

<!-- <template>
  <div class="min-h-screen mt-10 flex items-center justify-center w-96">
    <div class="max-w-xl w-full p-8 bg-white shadow-lg rounded-lg">
      <h2 class="text-2xl font-bold mb-4">Request Detail</h2>
      {{ adoptionReq }}
      <div v-if="adoptionReq">
        <div class="text-left">Post Owner: {{ adoptionReq.owner.ownerUsername }}</div>
        <div class="text-left">Animal Name: {{ adoptionReq.animal.saName }}</div>
        <div class="text-left">Your Name: {{ adoptionReq.requester.reqName }}</div>
        <div class="text-left">Status: {{ adoptionReq.status }}</div>
        <div class="text-left">Note: {{ adoptionReq.note }}</div>
        <div class="text-left">Created On: {{ adoptionReq.createdOn }}</div>
        <div v-if="adoptionReq.homePicture" class="text-left">Home Picture: <img :src="adoptionReq.homePicture" alt="Home Picture" style="max-width: 200px;"></div>
      </div>
    </div>
  </div>
  <div class="text-left mb-10 mt-2"> 
    <button @click="goBack" class="text-gray-600 font-semibold px-4 rounded-md hover:text-gray-800 focus:outline-none">Back</button>
  </div>  
</template> -->


<template>
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
          <img class="w-10 h-10 rounded-full mr-2" :src="adoptionReq.owner?.ownerPicture" alt="" />
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
            <!-- <li class="mx-2">  
              <a class="font-bold">สถานะ :</a> 
              <span class="text-emerald-600" v-if="adoptionReq.status === 'Accepted'">{{ adoptionReq.status }}</span>
              <span class="text-red-600" v-if="adoptionReq.status === 'On Request'">{{ adoptionReq.status }}</span>
            </li> -->
          </ul>
          <h2 class="font-semibold mt-10 mb-2">Your Information</h2>

          <div class="flex mb-4">
          <img class="w-10 h-10 rounded-full mr-2" :src="adoptionReq.requester?.reqPicture" alt="" />
          <div class="font-medium dark:text-white">
            <div class="font-bold">{{ adoptionReq.requester?.reqUsername }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ formatDate(adoptionReq.createdOn) }}
            </div>
          </div>
          
        </div>
        <hr />
        <ul class="mt-4">
            <li><a class="font-bold m-2">ชื่อ :</a> {{ adoptionReq.requester.reqName }}</li>
            <li>
              <a class="font-bold m-2">ที่อยู่ :</a>
              {{ adoptionReq.requester.reqAddress?.homeAddress }} แขวง{{ adoptionReq.requester.reqAddress?.TambonThaiShort }} เขต{{adoptionReq.requester.reqAddress?.DistrictThaiShort}} {{ adoptionReq.requester.reqAddress?.ProvinceThai }} {{ adoptionReq.requester.reqAddress?.PostCode }}
              <!-- {{ `${adoptionReq.requester.reqAddress?.homeAddress} แขวง${adoptionReq.requester.reqAddress?.TambonThaiShort} เขต${adoptionReq.requester.reqAddress?.DistrictThaiShort} ${adoptionReq.requester.reqAddress?.ProvinceThai} ${adoptionReq.requester.reqAddress?.PostCode}` }} -->

            </li>
            <li><a class="font-bold m-2">ช่องทางติดต่อ :</a> {{ adoptionReq.requester.reqPhone }}</li>
            <li class="mx-2">  
              <a class="font-bold">คำอธิบาย :</a> {{ adoptionReq.animal.saDesc }}
            </li>
            <li class="mx-2">  
              <a class="font-bold">คำอธิบาย :</a> {{ adoptionReq.note }}
            </li>
            <li class="mx-2">  
              <a class="font-bold">สถานะ : </a> 
              <span class="text-emerald-600" v-if="adoptionReq.status === 'Accepted'">{{ adoptionReq.status }}</span>
              <span class="text-red-600" v-if="adoptionReq.status === 'On Request'">{{ adoptionReq.status }}</span>
            </li>
            <li v-if="adoptionReq.homePicture" class="mx-2">  
              <a class="font-bold">รูปบ้าน :</a> 
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



<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from "vue-router";

const adoptionReq = ref(null);
const router = useRouter();
const route = useRoute();

const goBack = () => router.go(-1);

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
  <div class="min-h-screen mt-10 flex items-center justify-center w-96">
    <div class="max-w-xl w-full p-8 bg-white shadow-lg rounded-lg">
      <h2 class="text-2xl font-bold mb-4">Request Detail</h2>
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
</template>



<script setup>
import { ref, onMounted, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const adoptionAcc = ref({});

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
// const props = defineProps(["comments"]);
const getAdopt = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/strayAnimals/reciever/${route.params.id}/reqAdoption`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    if (res.status === 200) {
      const reqData = await res.json();
      adoptionAcc.value = reqData;
    } else {
      if (res.status === 404) {
        console.error("Error: Post not found");
        router.push({
          name: "notfound",
        });
      } else if (res.status === 401) {
        console.error("Login");
        localStorage.removeItem("token");
        router.push({
          name: "login",
        });
      } else if (res.status === 500) {
        console.error("Error: Internal Server Error");
      } else {
        console.error("Error:", res.status, res.statusText);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  getAdopt();
});





</script>

<template>
  <div class="max-w-2xl mx-auto px-4">
    <!-- {{ adoptionAcc }} -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
        Adoption Request ({{ adoptionAcc.length }})
      </h2>
    </div>
    <div v-if="adoptionAcc.length > 0">
        <div v-for="(req, index) in adoptionAcc" :key="index" class="my-8">
        <article
          class="p-6 text-base bg-white rounded-lg dark:bg-gray-900 relative mt-4"
        >
          <footer class="flex justify-between items-center mb-2">
            <div class="flex items-center">
              <p
                class="inline-flex items-center mr-2 text-sm text-gray-900 dark:text-white font-semibold"
              >
                <img
                  class="mr-2 w-8 h-8 rounded-full object-cover"
                  :src="req.requester.reqPicture"
                  alt="username"
                />
                {{ req.requester.reqName }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(req.createdOn) }}
              </p>
            </div>
          </footer>            
          <div  v-if="req.homePicture !== null" class="mb-4">
            <h2 class="text-lg font-semibold text-gray-900">Home Picture</h2>
            <img :src="req.homePicture" alt="Home Picture" class="w-full h-auto" />
          </div>
          <p class="text-gray-500 dark:text-gray-400 text-left">
  {{ req.requester.reqAddress?.ProvinceThai }}
</p>

          <p class="text-gray-500 dark:text-gray-400 text-left">
            {{ req.note }}
          </p>
          <div class="flex items-center mt-4 space-x-4">
          </div>
        </article>
      </div>
    </div>
    <div v-else>
      <p>No Request this post yet</p>
    </div>
  </div>
  </template>
  
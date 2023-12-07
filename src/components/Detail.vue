<script setup>
import ConfirmCard from './ConfirmCard.vue';

import { ref, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const goBack = () => router.go(-1);
const getDet = ref({});



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

const getPostById = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/api/strayAnimals/${route.query.id}`,
      {
        method: "GET",
      }
    );

    if (res.status === 200) {
      const data = await res.json();
      console.log("success");
      getDet.value = data;
    } else {
      console.error("Error:", res.status, res.statusText);
    }
  } catch (error) {
    console.error(error);
    console.log("saId:", getDet.id);
  }
};

const getUser = ref({});
const getUsers = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/api/users`,
      {
        method: "GET",
      }
    );

    if (res.status === 200) {
      const data = await res.json();
      console.log("success");
      getUser.value = data;
    } else {
      console.error("Error:", res.status, res.statusText);
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getUsers();
});

onMounted(() => {
  getPostById();
});





const removePost = async (id) => {
  if (confirm("Would you like to cancel your post?") == true) {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/api/strayAnimals/${route.query.id}`,
      {
        method: "DELETE",
      }
    );
    // console.log(res.json());
    router.push({
      name: "home",
    });
  } else {
  }
};

const editPost = (id) => {
  console.log(id)
  router.push({
    name: 'posts',
    query: { id: id },
  })
}

</script>
<template>
{{ getDet.ownerId }}
<!-- {{ getUser }} -->
  <div class="flex items-center justify-center">
    <div class="items-center gap-4 mb-4 text-center max-w-lg">
      <div class="mb-4">
        <img src="/cat.jpg" class="w-512 h-300 object-cover rounded-md" />
      </div>
      <div class="w-full bg-white shadow-lg p-8 my-10 rounded-md text-left">
        <div class="flex mb-4">
          <img class="w-10 h-10 rounded-full" src="/pf.png" alt="" />
          <div class="font-medium dark:text-white">
            <div>Millieme</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ formatDate(getDet.createdOn) }}
            </div>
          </div>
        </div>

        <hr />
        <div class="mt-4">
          <ul>
            <li><a class="font-bold m-2">ชื่อ :</a> {{ getDet.name }} </li>
            <li><a class="font-bold m-2">เพศ :</a> {{ getDet.gender }}</li>
            <li><a class="font-bold m-2">ประเภท :</a> {{ getDet.type }}</li>
            <li><a class="font-bold m-2">สี :</a> {{ getDet.color }}</li>
            <li><a class="font-bold m-2">คำอธิบาย :</a> {{ getDet.description }}</li>
            <li><a class="font-bold m-2">ที่อยู่ : </a> อีกตาราง</li>
            <li><a class="font-bold m-2">เบอร์ติดต่อ :</a> อีกตาราง</li>
          </ul>
        </div>
      </div>
      <!-- <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          ขอรับเลี้ยง
        </button> -->
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded-md"
        @click="goBack"
      >
        Close
      </button>

      <button
        class="px-4 py-2 bg-blue-500 text-white rounded-md"
        @click="editPost(getDet.id)"
      >
        Edit
      </button>

      <button
        type="button"
        @click="removePost"
        class="bg-red-700 hover:bg-gray-700 rounded-lg text-white font-bold py-2 px-8 border-grey-700 hover:border-grey-800"
      >
        Delete
      </button>

      
    </div>
  </div>
</template>

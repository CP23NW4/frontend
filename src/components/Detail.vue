<script setup>
import ConfirmCard from "./ConfirmCard.vue";

import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
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
      console.log("success", data);
      getDet.value = data;
    } else {
      if (res.status === 404) {
        console.error("Error: Post not found");
        router.push({
          name: "notfound",
        });
      } else if (res.status === 500) {
        console.error("Error: Internal Server Error");
      } else {
        console.error("Error:", res.status, res.statusText);
      }
    }
  } catch (error) {
    console.error(error);
    console.log("saId:", getDet.id);
  }
};

// const getUser = ref({});
// const getUsers = async () => {
//   try {
//     const res = await fetch(
//       `${import.meta.env.VITE_APP_TITLE}/api/users`,
//       {
//         method: "GET",
//       }
//     );

//     if (res.status === 200) {
//       const data = await res.json();
//       console.log("success");
//       getUser.value = data;
//     } else {
//       if (res.status === 404) {
//         console.error('Error: Post not found');
//       } else if (res.status === 500) {
//         console.error('Error: Internal Server Error');
//       } else {
//         console.error('Error:', res.status, res.statusText);
//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// onMounted(() => {
//   getUsers();
// });

onMounted(() => {
  getPostById();
});

const removePost = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/api/strayAnimals/${route.query.id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      // Show alert if deletion is successful
      alert("Post deleted successfully");
      router.push({
        name: "home",
      });
    } else {
      console.error("Error deleting post:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

const editPost = (id) => {
  console.log(id);
  router.push({
    name: "posts",
    query: { id: id },
  });
};
const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>
<template>
  <!-- {{ getDet }} -->
  <!-- {{ getUser }} -->
  <div class="flex items-center justify-center">
    <div class="items-center gap-4 mb-4 text-center max-w-lg">
      <div class="mb-4">
        <!-- <img src="{{ getDet.picture }}" class="w-512 h-300 object-cover rounded-md" /> -->
        <img
          v-if="getDet.picture !== null"
          :src="getDet.picture"
          class="w-full h-full object-cover rounded-lg"
          alt="Animal Image"
        />
        <img
          v-else-if="getDet.picture === null"
          src="/nodata.png"
          class="w-full h-full object-cover rounded-lg"
          alt="Animal Image"
        />
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
            <li><a class="font-bold m-2">ชื่อ :</a> {{ getDet.name }}</li>
            <li>
              <a class="font-bold m-2">เพศ :</a>
              {{ capitalizeFirstLetter(getDet.gender) }}
            </li>

            <li>
              <a class="font-bold m-2">ประเภท :</a>
              {{ capitalizeFirstLetter(getDet.type) }}
            </li>
            <li><a class="font-bold m-2">สี :</a> {{ getDet.color }}</li>
            <li>
              <a class="font-bold m-2">คำอธิบาย :</a> {{ getDet.description }}
            </li>
            <!-- <li>
              <a class="font-bold m-2">ที่อยู่ : </a> {{ getDet.ownerId }}
            </li>
            <li>
              <a class="font-bold m-2">เบอร์ติดต่อ :</a> {{ getDet.ownerId }}
            </li> -->
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
        class="m-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        @click="goBack"
      >
        Close
      </button>

      <button
        class="m-2 bg-amber-400 hover:bg-gray-700 rounded-lg text-white font-bold py-2 px-8 border-grey-700 hover:border-grey-800"
        @click="editPost(getDet.id)"
      >
        Edit
      </button>

      <!-- <button
        type="button"
        @click="removePost"
        class="m-2 bg-red-700 hover:bg-gray-700 rounded-lg text-white font-bold py-2 px-8 border-grey-700 hover:border-grey-800"
      >
        Delete
      </button> -->

      <button
        class="m-2 bg-red-700 hover:bg-gray-700 rounded-lg text-white font-bold py-2 px-8 border-grey-700 hover:border-grey-800"
        onclick="my_modal_1.showModal()"
      >
        Delete
      </button>
      <dialog id="my_modal_1" class="modal">
        <div class="modal-box flex flex-col items-center justify-center">
          <img src="/modal.svg" />
          <h1 class="font-bold text-2xl text-amber-500 mt-2">Delete Post?</h1>
          <p class="py-2">Would you like to delete your post?</p>
          <div class="modal-action flex">
            <form method="dialog">
              <button
                class="m-2 bg-slate-400 hover:bg-gray-700 rounded-lg text-white font-bold py-2 px-8 border-grey-700 hover:border-grey-800"
              >
                Cancel
              </button>
              <button
                type="button"
                @click="removePost"
                class="m-2 bg-orange-600 hover:bg-gray-700 rounded-lg text-white font-bold py-2 px-8 border-grey-700 hover:border-grey-800"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  </div>
</template>

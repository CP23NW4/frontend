<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import CreateButton from "../components/CreateButton.vue";
import Snowfall from "../components/Snowfall.vue";

import Profilebar from "../bar/Profilebar.vue";

let checkSignIn = ref(localStorage.getItem("token"));

// const { keyword, filteredStrayAnimals, setSearchKeyword } = searchFilter(strayAnimals);
const user = ref({});
const posts = ref({});
const router = useRouter();
const route = useRoute();
const getPosts = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/strayAnimals/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 200) {
      const postsData = await res.json();
      posts.value = postsData;
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
        window.location.reload();
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

const getUsers = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/users/user/info`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    if (res.status === 200) {
      const userData = await res.json();
      user.value = userData;
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
  getUsers();
  getPosts();
});

</script>


<template>
  <div>
    <section class="mt-20">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto overflow-hidden">
          <div class="p-8">
            <!-- User Info Section -->
            <div class="flex items-center">
              <div class="mr-8">
                <img
                  class="w-32 h-32 rounded-full object-cover shadow-xl"
                  :src="user.userPicture"
                  alt="user photo"
                />
              </div>
              <div class="text-left">
                <h2 class="text-3xl font-semibold text-gray-800">
                  {{ user.username }}
                </h2>
                <p class="text-sm text-gray-700">{{ user.email }}</p>
                <p class="text-sm text-gray-700">
                  {{ user.userAddress?.provinceThai }}
                </p>
              </div>
              <router-link
                :to="{ name: 'edit-profile' }"
                class="ml-48 bg-gray-200 hover:bg-gray-700 rounded-lg text-gray-700 font-bold py-2 px-8 border-gray-700 hover:border-gray-800 hover:text-white"
                >Edit profile</router-link
              >
            </div>
            <hr class="mt-8 border-t border-gray-400" />
           <Profilebar />
          </div>
        </div>
      </div>
    </section> 
  </div>
  <CreateButton v-if="checkSignIn" />
</template>

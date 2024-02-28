<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import Filterbar from "../bar/Filterbar.vue";
import Searchbar from "../bar/Searchbar.vue";
import CreateButton from "../components/CreateButton.vue";
import BannerSlide from "../components/BannerSlide.vue";
import Card from "../home/Card.vue";
import Snowfall from "../components/Snowfall.vue";
import getStrayAnimals from "../composition/useStrayAnimals";
import searchFilter from "../composition/searchFilter";

let checkSignIn = ref(localStorage.getItem("token"));
const { strayAnimals } = getStrayAnimals();
// const { keyword, filteredStrayAnimals, setSearchKeyword } = searchFilter(strayAnimals);

const user = ref({});
const router = useRouter();
const route = useRoute();
// import { getUser } from "../composition/useUsers";
// const getUsers = async () => {
//   await getUser("/users/", "Sign in successful!");
// };

const getUsers = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

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
                  src="/cat.jpg"
                  alt="user photo"
                />
              </div>
              <div>
                <h2 class="text-3xl font-semibold text-gray-800">
                  {{ user.username }}
                </h2>
                <p class="text-sm text-gray-700">{{ user.email }}</p>
              </div>
              <router-link
                :to="{ name: 'edit-profile' }"
                class="ml-48 bg-gray-200 hover:bg-gray-700 rounded-lg text-gray-700 font-bold py-2 px-8 border-gray-700 hover:border-gray-800 hover:text-white"
                >Edit profile</router-link
              >
            </div>

            <hr class="my-8 border-t border-gray-400">

            <!-- Pets Section -->
            <div>
              <h3 class="text-m text-left font-semibold text-indigo-900 mb-2">
                My Pets
              </h3>
            </div>
            <div v-if="strayAnimals.length === 0">
              <p class="text-center text-lg mt-10">No Pets</p>
            </div>

            <div class="grid lg:grid-cols-3 gap-0 md:grid-cols-3">
  <template v-for="strayAnimal in strayAnimals">
    <template v-if="strayAnimal.owner.ownerId === user._id">
      <div :key="strayAnimal._id">
        <Card :strayAnimal="strayAnimal" />
      </div>
    </template>
  </template>
</div>

          </div>
        </div>
      </div>
    </section>

    <!-- <Snowfall /> -->
  </div>
  <CreateButton v-if="checkSignIn" />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import CreateButton from "../components/CreateButton.vue";
// import Card from "../home/Card.vue";
import Profile from "./Profile.vue";
import Card from "./CardHistory.vue";

let checkSignIn = ref(localStorage.getItem("token"));

const user = ref({});
const posts = ref({});
const router = useRouter();

const strayAnimals = ref({});

const getPosts = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/strayAnimals/sender/reqAdoption/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 200) {
      const postsData = await res.json();
      strayAnimals.value = postsData;
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
});
onMounted(async () => {
  getPosts();
});
</script>


<template>
  <div class="flex flex-col">
    <div class="min-h-screen">
    <div v-if="strayAnimals?.length === 0">
      <p class="text-center text-lg mt-10">No Posts yet</p>
    </div>
<!-- {{ strayAnimals }} -->
    <div class="grid lg:grid-cols-3 gap-0 md:grid-cols-3 grid-cols-1">
      <div v-for="strayAnimal in strayAnimals" :key="strayAnimal._id">
      <Card :strayAnimal="strayAnimal" />
      </div>
    </div>
    </div>
  </div>
</template>

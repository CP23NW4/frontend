<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import Profile from "./Profile.vue";
import Card from "./CardHistory.vue";
const route = useRoute;
const adoptionReq = ref([]);
import getStrayAnimals from "../composition/useStrayAnimals";
import searchFilter from "../composition/searchFilter";

const { strayAnimals } = getStrayAnimals();
const { keyword, filteredStrayAnimals, setSearchKeyword } =
  searchFilter(strayAnimals);
  const filteredStrayAnimalsWithAdoptionReq = computed(() => {
  const saIds = adoptionReq.value.map((request) => request.animal.saId);
  return filteredStrayAnimals.value.filter((strayAnimal) =>
    saIds.includes(strayAnimal._id)
  );
});

const getRequest = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/strayAnimals/sender/reqAdoption`,
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
      adoptionReq.value = reqData;
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
  getRequest();
});
</script>
<template>
  <div class="flex flex-col">
    <!-- <Profile /> -->
<!-- {{ adoptionReq }} -->
    <div class="min-h-screen">
    <div v-if="strayAnimals?.length === 0">
      <p class="text-center text-lg mt-10">No Request History</p>
    </div>

    <div class="grid lg:grid-cols-3 gap-0 md:grid-cols-3 grid-cols-1">
      <div
        v-for="strayAnimal in filteredStrayAnimalsWithAdoptionReq"
        :key="strayAnimal._id"
      >
        <Card :strayAnimal="strayAnimal" />
      </div>
    </div>
    </div>
  </div>
</template>
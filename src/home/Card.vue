<script setup>
import { ref, onMounted, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const props = defineProps(["strayAnimal"]);
const adoptionReq = ref([]);
const user = ref({});
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
        // localStorage.removeItem("token");
        // router.push({
        //   name: "login",
        // });
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


const checkAdoptionReq = (animalId) => {
  return adoptionReq.value.some(item => item.animal?.saId === animalId);
};

// const route = useRoute();

// import { getUser } from "../composition/useUsers";
// const getUsers = async () => {
//   await getUser("/users/", "Sign in successful!");
// };

// onMounted(async () => {
//   getUsers();
// });

const showDetail = (id) => {
  console.log(id);
  router.push({
    name: "detail",
    params: { id: id },
  });
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


</script>
<template>

<div
  @click="strayAnimal.status === 'Available' || strayAnimal.owner?.ownerId === user._id ? showDetail(props.strayAnimal._id) : null"
  :style="{
    opacity: strayAnimal.picture !== null && strayAnimal.status === 'Unavailable' ? '0.3' : '1',
    cursor: strayAnimal.status === 'Available' || strayAnimal.owner?.ownerId === user._id ? 'pointer' : 'not-allowed',
  }"
    class="mx-1 md:mx-4 lg:mx-4 mb-10 text-left rounded-lg block max-w-sm hover:border hover:border-gray-500 hover:shadow-lg transition-transform transform hover:-translate-y-1 focus:translate-y-0 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <div class="relative lg:w-full lg:h-52 md:w-full md:h-36 h-60">
      <img
        v-if="strayAnimal.picture !== null"
        :src="strayAnimal.picture"
        class="w-full h-full object-cover rounded-lg "
        alt="Animal Image"
      />

      <img
        v-else-if="strayAnimal.picture === null"
        src="/nodata.png"
        class="w-full h-full object-cover rounded-lg"
        alt="Animal Image"
      />
    </div>

    <!-- <div class="flex items-center p-3"> -->
    <div class="flex p-3">
  <div v-if="strayAnimal && strayAnimal.gender" >
  <img
    v-if="strayAnimal.gender.toUpperCase() === 'FEMALE'"
    src="/female.svg"
    class="h-5 mr-4"
    alt="Female Icon"
  />
  <img
    v-else-if="strayAnimal.gender.toUpperCase() === 'MALE'"
    src="/male.svg"
    class="h-5 mr-4"
    alt="Male Icon"
  />
</div>
 <div v-else class="mr-4 h-5 font-bold text-2xl">?</div>
      <div class="flex flex-col">
        <!-- Use flex-col here -->
        <div
          class="text-sm font-bold leading-none tracking-tight"
          v-if="strayAnimal.name !== null"
        >
          {{
            strayAnimal.name && strayAnimal.name.length < 10
              ? strayAnimal.name
              : strayAnimal.name
              ? strayAnimal.name.substring(0, 10) + " ..."
              : ""
          }}
        </div>
        <div
          class="text-[16px] font-bold leading-none tracking-tight"
          v-if="strayAnimal.name === null"
        >
          ไม่ระบุชื่อ
        </div>
      

        <div
          class="text-sm leading-none tracking-tight mt-1 text-gray-500"
          v-if="strayAnimal.description !== null"
        >
          {{
            strayAnimal.description && strayAnimal.description.length < 20
              ? strayAnimal.description
              : strayAnimal.description
              ? strayAnimal.description.substring(0, 40) + " ..."
              : ""
          }}
        </div>

        <div
          class="text-xs leading-none tracking-tight mt-1 text-gray-500"
        >
          Created by {{
            strayAnimal.owner?.ownerUsername 
          }}
        </div>

        <div
          class="text-[12px] font-bold leading-none mt-1 tracking-tight text-emerald-600"
          v-if="strayAnimal.status === 'Available' && !checkAdoptionReq(strayAnimal._id)"
        >
          {{ strayAnimal.status }}
        </div>
        <div
          class="text-[12px] font-bold leading-none mt-1 tracking-tight text-amber-600"
          v-else-if="strayAnimal.status === 'Available' && checkAdoptionReq(strayAnimal._id)"
        >
        Requested
        </div>
        <div
          class="text-[12px] font-bold leading-none mt-1 tracking-tight text-red-600"
          v-if="strayAnimal.status === 'Unavailable'"
        >
          Adopted
        </div>
      </div>
    </div>
  </div>
</template>

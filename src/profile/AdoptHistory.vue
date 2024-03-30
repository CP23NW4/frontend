<script setup>
import { ref, onMounted, defineProps, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const adoptionAcc = ref({});
const update = ref({
  status: ''
})
const updatePost = ref({
  status: 'Unavailable'
})

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


// const allRequestsAccepted = computed(() => {
//   return adoptionAcc.value.every(req => req.status === 'Accepted');
// });
// const props = defineProps(["comments"]);
const getAdopt = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/strayAnimals/receiver/${route.params.id}/reqAdoption`,
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


const updateReqStatus = async (id, status) => {
  const confirmed = window.confirm("Are you sure you want to accept this request form ? This action cannot be undone.");
  if (confirmed) {
  try {
    update.value.status = "Accepted";
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/strayAnimals/receiver/reqAdoption/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(update.value),
      }
    );

    if (res.status === 200) {
      const data = await res.json();
        console.log("Updated successfully:", data);
        updateStrStatus()
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
}
};


const updateStrStatus = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/strayAnimals/${route.params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(updatePost.value),
      }
    );

    if (res.status === 200) {
      const data = await res.json();
      window.location.reload();
      console.log("Updated status successfully:", data);
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

const strayAnimals = ref({});

const getPosts = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/strayAnimals/${route.params.id}`, {
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

onMounted(async () => {
  getPosts();
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
                <!-- <img
                  class="mr-2 w-8 h-8 rounded-full object-cover"
                  :src="req.requester.reqPicture"
                  alt="username"
                /> -->
                {{ req.requester.reqUsername }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(req.createdOn) }}
              </p>
            </div>
          </footer>            
          <p class="text-black dark:text-gray-400 text-left">
            <span class="font-semibold">ชื่อ:</span> {{ req.requester.reqName }}
</p>
        
<p class="text-black dark:text-gray-400 text-left">
  <!-- {{ req }} -->
  <span class="font-semibold">เบอร์ติดต่อ:</span> {{ req.requester.reqPhone }}
</p>

          <p class="text-black dark:text-gray-400 text-left">
            <span class="font-semibold">หมายเหตุ:</span> {{ req.note }}
          </p>
          <p class="text-black dark:text-gray-400 text-left">
            <span class="font-semibold">ที่พักอาศัย:</span> {{ req.requester.reqAddress?.DistrictThaiShort }}, {{ req.requester.reqAddress?.ProvinceThai }} {{ req.requester.reqAddress?.PostCode }}
</p>
          <div  v-if="req.homePicture !== null" class="mb-4">
            <img :src="req.homePicture" alt="Home Picture" class="w-full h-auto" />
          </div>
          <div>
          <p v-if="strayAnimals.status === 'Available'" class="text-emerald-700 dark:text-gray-400 text-left">
            <span class="font-semibold text-black">สถานะคำขอ: </span>{{ req.status }} </p>
            <p v-else-if="strayAnimals.status === 'Unavailable' && req.status === 'Accepted'" class="text-emerald-700 dark:text-gray-400 text-left">
              <span class="font-semibold text-black">สถานะคำขอ: </span>{{ req.status }} </p>
            <p v-else-if="strayAnimals.status === 'Unavailable' && req.status !== 'Accepted'" class="text-red-700 dark:text-gray-400 text-left">
              <span class="font-semibold text-black">สถานะคำขอ: </span>Rejected 
            </p></div>
            <!-- {{ req }} -->
          <button
  @click="updateReqStatus(req._id, 'Accepted')"
  class="btn mt-4"
  :disabled="strayAnimals.status === 'Unavailable' "

>
  Update Status
</button>

        </article>
        
      </div>
    </div>
    <div v-else>
      <p>No Request this post yet</p>
    </div>
  </div>
  </template>
  
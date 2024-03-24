<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Comment from '../components/Comment.vue';
const router = useRouter();
const route = useRoute();
const goBack = () => router.go(-1);
const getDet = ref({});
const adoptionAcc = ref({});

const adoptionReq = ref([]);
const comments = ref([]);
// const props = defineProps(["comments"]);
// const adoptionReq = ref([]);
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


const getAdopt = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/strayAnimals/reciever/reqAdoption`,
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
  getAdopt();
});


// const checkAdoptionReq = (_id) => {
//   return adoptionReq.value.some(item => item.animal?.saId === _id);
// };

let checkSignIn= ref(localStorage.getItem('token'))     


const showAlert = () => {
  alert("You need to sign in before adopting!");
};


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
      `${import.meta.env.VITE_APP_TITLE}/strayAnimals/${route.params.id}`,
      {
        method: "GET",
        headers: {'Content-Type':'application/json'}
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
      } else if (res.status === 401) {
          alert("No authentication, Go to signin");
          localStorage.removeItem("token");
          router.push({
            name: "login",
          });
          window.location.reload() 
        }
        else if (res.status === 500) {
        console.error("Error: Internal Server Error");
        router.push({
          name: "notfound",
        });
      } else {
        console.error("Error:", res.status, res.statusText);
        router.push({
          name: "notfound",
        });
      }
    }
  } catch (error) {
    console.error(error);
    console.log("saId:", getDet.id);
  }
};

onMounted(() => {
  getPostById();
});

const removePost = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/strayAnimals/${route.params.id}`,
      {
        method: "DELETE",
        headers: {
        Authorization: localStorage.getItem("token"),
    },
      }
    );

    if (res.status === 200) {
      // Show alert if deletion is successful
      alert("Post deleted successfully");
      router.push({
        name: "home",
      });
      } else if (res.status === 401) {
      alert("No authentication, Go to signin");
      localStorage.removeItem("token");
      router.push({
        name: "login"})
      } else if (res.status === 403) {
          alert("You do not have permission to edit other post, Check your role");
          router.push({
            name: "home",
          });
        }else {
      console.error("Error deleting post:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

const editPost = (id) => {
  console.log(id);
  router.push({
    name: "posts-detail",
    params: { id: id },
  });
};
const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const user = ref({});



const getUsers = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/users/`,
      {
        method: "GET",
        headers: {'Content-Type':'application/json',
        Authorization: localStorage.getItem("token"),},
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
      
        } else if (res.status === 403) {
          alert("You do not have permission to edit other post, Check your role");
          router.push({
            name: "home",
          });
        } else if (res.status === 500) {
        console.error("Error: Internal Server Error");
        router.push({
          name: "notfound",
        });
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

const showDetail = (id) => {
console.log(id)
  router.push({
    name: 'detail',
    params: { id: id}
  })
}

</script>
<template>
  <!-- {{ adoptionReq }} -->
  <!-- {{ getDet }} -->
  <!-- {{ getUser }} -->

  <!-- {{ adoptionAcc }} -->
  <div class="flex items-center justify-center mt-10">
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
      <div class="relative w-full bg-white shadow-lg p-8 my-10 rounded-md text-left">

<div v-if="checkSignIn && user._id === getDet.owner?.ownerId || user._id === '65d231533f0e791b0e10c9d1' " class="dropdown dropdown-end absolute top-0 right-2 p-4">
      <div tabindex="0" role="button" class="btn btn-sm bg-transparent border-transparent shadow-transparent">
        <div class="w-4 rounded-full">
          <img src="/menu.png" />
        </div>
      </div>
      <ul tabindex="0" class="mt-0 z-[1] p-2 shadow-lg menu menu-sm dropdown-content bg-white rounded-box w-52">
        <li><a @click="editPost(getDet._id)">Edit</a></li>
        <li><a class="text-red-700" onclick="my_modal_1.showModal()">Delete</a></li>
      </ul>
    </div>

        <div class="flex mb-4">
          <img class="w-10 h-10 rounded-full mr-2" src="/pf.png" alt="" />
          <div class="font-medium dark:text-white">
            <div class="font-bold">{{ getDet.owner?.ownerUsername }}</div>
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
            <li class="mx-2">  
              <a class="font-bold">คำอธิบาย :</a> {{ getDet.description }}
            </li>
            <li class="mx-2">  
              <a class="font-bold">สถานะ :</a> 
              <span class="text-emerald-600" v-if="getDet.status === 'Available'">{{ getDet.status }}</span>
              <span class="text-red-600" v-if="getDet.status === 'Unavailable'">{{ getDet.status }}</span>
            </li>
          </ul>
<br>

    <!-- Button to adopt -->
    <router-link v-if="user._id !== getDet.owner?.ownerId && checkSignIn" :to="{ name: 'reqform' }" class="block mx-2 bg-orange-500 hover:bg-gray-700 rounded-lg text-white font-bold py-2 px-8 border-gray-700 hover:border-gray-800 text-center w-full">Adopt Now</router-link>
<button v-else-if="user._id !== getDet.owner?.ownerId && !checkSignIn" @click="showAlert" class="block mx-2 bg-gray-500 hover:bg-gray-700 rounded-lg text-white font-bold py-2 px-8 border-gray-700 hover:border-gray-800 text-center w-full">Adopt Now</button>
<!-- <button v-else-if="checkAdoptionReq" @click="showAlert" class="block mx-2 bg-gray-500 hover:bg-gray-700 rounded-lg text-white font-bold py-2 px-8 border-gray-700 hover:border-gray-800 text-center w-full">Adopt Now</button> -->

        </div>
      </div>

      <div class="text-left"> 
      <button @click="goBack" class="text-gray-600 font-semibold py-2 px-4 rounded-md hover:text-gray-800 focus:outline-none">Back</button>
          </div>   
          <!-- <router-link :to="{ name: 'reqform' }" v-if="user._id !== getDet.owner?.ownerId" class="m-2 bg-orange-500 hover:bg-gray-700 rounded-lg text-white font-bold py-2 px-8 border-gray-700 hover:border-gray-800">Adopt</router-link> -->

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

    <Comment />


  
</div>
  </div>
</template>

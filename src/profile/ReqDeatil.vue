<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from "vue-router";
const user = ref({});
const router = useRouter(); 
const route = useRoute(); 
const getDet = ref({});
  const reqForm = ref({
    note: '',
    homePicture: ''
  });

  const goBack = () => router.go(-1);

  // const reqForm = {
  //   reqAddress: '',
  //   reqPhone: '',
  //   reqIdCard: '',
  //   note: ''
  // };
  
  const submitForm = () => {
    // Handle form submission logic here
    reqAdoption()
    console.log('Data:', reqForm.value);
  };

const getUsers = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/users/user/info`,
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
      } else if (res.status === 401) {
        alert("go to sign in pleasee")
        console.error("Login");
        localStorage.removeItem("token")
        router.push({
          name: "login",
        });
      }else if (res.status === 500) {
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

onMounted(() => {
  getPostById();
});

  </script>
  
  <template>
    <div class="min-h-screen mt-10 flex items-center justify-center w-96">
      <div class="max-w-xl w-full p-8 bg-white shadow-lg rounded-lg">
        <h2 class="text-2xl font-bold mb-4">Request Detail</h2>
        <!-- {{ user }} -->
        <form @submit.prevent="submitForm">
          <!-- Grid with 2 columns -->
          <div class="grid grid-cols-1 gap-4">
           <div class="text-left">Your information</div> 
            <!-- First Name -->
            <div>
    <label for="Name" class="block mb-1 text-left text-[14px]">Name</label>
    <input type="text" v-model="user.name" id="name" disabled class="w-full bg-gray-200 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400">
</div>
            <!-- Address -->
            <div>
              <label for="address" class="block mb-1 text-left text-[14px]">Address</label>
              <textarea 
          id="address" 
          disabled 
          class="w-full bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
          style="padding-top: 0; margin-top: 0; height: 100px;">
  {{ `${user.userAddress?.homeAddress} แขวง${user.userAddress?.TambonThaiShort} เขต${user.userAddress?.DistrictThaiShort} ${user.userAddress?.ProvinceThai} ${user.userAddress?.PostCode}` }}
</textarea>

            </div>
            <!-- Phone Number -->
            <div>
              <label for="phoneNumber" class="block mb-1 text-left text-[14px]">Phone Number</label>
              <input v-if="user.phoneNumber !== null" type="text" v-model="user.phoneNumber" id="phoneNumber" disabled class="w-full bg-gray-200 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400">
              <input v-else type="text" v-model="reqForm.reqPhone" id="phoneNumber" disabled class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400">
            </div>
            <!-- ID Card -->
            <div>
              <label for="idCard" class="block mb-1 text-left text-[14px]">ID Card</label>
               <input maxlength="13" v-if="user.idCard !== null" type="text" v-model="user.idCard" id="idCard" disabled class="w-full bg-gray-200 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400">
               <input maxlength="13" v-else type="text" v-model="reqForm.reqIdCard" id="reqIdCard" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400">
          </div>
            <!-- Home Picture -->
            <!-- <div>
              <label for="homePicture" class="block mb-1">Home Picture</label>
              <input type="file" v-model="reqForm.homePicture" id="homePicture" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400">
            </div> -->

            <div class="grid gap-3 md:grid-cols-1">
<label class="block text-sm font-medium text-gray-900 dark:text-white text-left text-[14px]" for="file_input">Upload your home Picture</label>
<input @change="handleFileUpload" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
</div>
            <!-- Note -->
            <div>
              <label for="note" class="block mb- text-left text-[14px]">Note (salary) or more question and if requested can not request again</label>
              <textarea v-model="reqForm.note" id="note" rows="4" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"></textarea>
            </div>
          </div>
          <div class="text-left">อยากจะขอรับเลี้ยงน้อง {{ getDet.name }}</div>
          <!-- Submit Button -->
          <div class="mt-6">
            <button type="submit" class="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Submit</button>
          </div>
        </form>
      </div>
    </div>
    <div class="text-left mb-10 mt-2"> 
      <button @click="goBack" class="text-gray-600 font-semibold px-4 rounded-md hover:text-gray-800 focus:outline-none">Back</button>
          </div>  
    
  </template>
  
  
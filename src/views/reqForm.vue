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

    // const formData = new FormData();
    // formData.append("firstName", reqForm.value.firstName);
    // formData.append("lastName", reqForm.value.lastName);
    // formData.append("address", reqForm.value.address);
    // formData.append("phoneNumber", reqForm.value.phoneNumber);
    // formData.append("idCard", reqForm.value.idCard);
    // formData.append("note", reqForm.value.note);

// console.log("Test log",reqForm.value)


  const reqAdoption = async () => {
  try {
    const formData = new FormData();
    formData.append('note', reqForm.value.note);
    // formData.append('homePicture', reqForm.value.homePicture);
    if (reqForm.value.homePicture) {
    formData.append('homePicture', reqForm.value.homePicture);
  }


    const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/strayAnimals/${route.params.id}/reqAdoption`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': localStorage.getItem("token"),
      },
      // body: JSON.stringify(reqForm.value),
      body: formData,
    });

    if (res.status === 200 || res.status === 201) {
      const reqData = await res.json();
      console.log("Request Adoption successfull0y:", reqData);
      alert("Request Adoption Successful!");
      router.go(-1);
      // emit("closeModal", true);
    } else if (res.status === 401) {
      alert("No authentication, Go to signin");
      localStorage.removeItem("token");
      router.push({
        name: "login",
      });
    } else {
      console.error("Error:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];

  if (file) {
    const maxSizeInBytes = 3 * 1024 * 1024;

    if (file.size <= maxSizeInBytes) {
      registerData.value.homePicture = file;
      console.log(registerData.value.homePicture);
    } else {
      alert("File size exceeds the limit (3MB). Please choose a smaller file.");
    }
  }
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
        <h2 class="text-2xl font-bold mb-4">Adoption Form</h2>
        <!-- {{ user }} -->
        <form @submit.prevent="submitForm">
          <!-- Grid with 2 columns -->
          <div class="grid grid-cols-1 gap-4">
            <!-- First Name -->
            <div>
    <label for="Name" class="block mb-1 text-left">Name</label>
    <input type="text" v-model="user.name" id="name" disabled class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400">
</div>

            <!-- Address -->
            <div>
              <label for="address" class="block mb-1 text-left">Address</label>
              <input v-if="user.userAddress !== null" type="text" v-model="user.userAddress" id="address" disabled class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400">
              <input v-else type="text" v-model="reqForm.reqAddress" id="address" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400">
            </div>
            <!-- Phone Number -->
            <div>
              <label for="phoneNumber" class="block mb-1 text-left">Phone Number</label>
              <input v-if="user.phoneNumber !== null" type="text" v-model="user.phoneNumber" id="phoneNumber" disabled class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400">
              <input v-else type="text" v-model="reqForm.reqPhone" id="phoneNumber" disabled class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400">
            </div>
            <!-- ID Card -->
            <div>
              <label for="idCard" class="block mb-1 text-left">ID Card</label>
               <input maxlength="13" v-if="user.idCard !== null" type="text" v-model="user.idCard" id="idCard" disabled class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400">
               <input maxlength="13" v-else type="text" v-model="reqForm.reqIdCard" id="reqIdCard" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400">
          </div>
            <!-- Home Picture -->
            <!-- <div>
              <label for="homePicture" class="block mb-1">Home Picture</label>
              <input type="file" v-model="formData.homePicture" id="homePicture" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400">
            </div> -->
            <!-- Note -->
            <div>
              <label for="note" class="block mb- text-left">Note</label>
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
    <div class="text-left"> 
      <button @click="goBack" class="text-gray-600 font-semibold px-4 rounded-md hover:text-gray-800 focus:outline-none">Back</button>
          </div>  
    
  </template>
  
  
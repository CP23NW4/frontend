<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from "vue-router";
const user = ref({});
const router = useRouter(); 
const route = useRoute(); 

  const reqForm = ref({
    reqAddress: '',
    reqPhone: '',
    reqIdCard: '',
    note: ''
  });

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
    const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/strayAnimals/${route.params.id}/reqAdoption`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': localStorage.getItem("token"),
      },
      // body: JSON.stringify(reqForm.value),
      body : JSON.stringify(reqForm.value),
    });

    if (res.status === 200 || res.status === 201) {
      const reqData = await res.json();
      console.log("Request Adoption successfull0y:", reqData);
      alert("Request Adoption Successful!");
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



  </script>
  
  <template>
    <div class="min-h-screen flex items-center justify-center">
      <div class="max-w-xl w-full p-8 bg-white shadow-lg rounded-lg">
        <h2 class="text-2xl font-bold mb-4">Adoption Form</h2>
        <!-- {{ user }} -->
        <form @submit.prevent="submitForm">
          <!-- Grid with 2 columns -->
          <div class="grid grid-cols-1 gap-4">
            <!-- First Name -->
            <div>
    <label for="Name" class="block mb-1">Name</label>
    <input type="text" v-model="user.name" id="name" disabled class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400">
</div>


            <!-- Last Name -->
            <!-- <div>
              <label for="lastName" class="block mb-1">Last Name</label>
              <input type="text" v-model="reqForm.lastName" id="lastName" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400">
            </div> -->
          </div>
          <!-- Grid with 1 column -->
          <div class="grid grid-cols-1 gap-4 mt-4">
            <!-- Address -->
            <div>
              <label for="address" class="block mb-1">Address</label>
              <input v-if="user.userAddress !== null" type="text" v-model="user.userAddress" id="address" disabled class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400">
              <input v-else type="text" v-model="reqForm.reqAddress" id="address" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400">
            </div>
            <!-- Phone Number -->
            <div>
              <label for="phoneNumber" class="block mb-1">Phone Number</label>
              <input v-if="user.phoneNumber !== null" type="text" v-model="user.phoneNumber" id="phoneNumber" disabled class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400">
              <input v-else type="text" v-model="reqForm.reqPhone" id="phoneNumber" disabled class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400">
            </div>
            <!-- ID Card -->
            <div>
              <label for="idCard" class="block mb-1">ID Card</label>
               <!-- <input maxlength="13" v-if="user.idCard !== null" type="text" v-model="user.idCard" id="idCard" disabled class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"> -->
               <input maxlength="13" type="text" v-model="reqForm.reqIdCard" id="reqIdCard" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400">
          </div>
            <!-- Home Picture -->
            <!-- <div>
              <label for="homePicture" class="block mb-1">Home Picture</label>
              <input type="file" v-model="formData.homePicture" id="homePicture" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400">
            </div> -->
            <!-- Note -->
            <div>
              <label for="note" class="block mb-1">Note</label>
              <textarea v-model="reqForm.note" id="note" rows="4" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-400"></textarea>
            </div>
          </div>
          <!-- Submit Button -->
          <div class="mt-6">
            <button type="submit" class="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  
  <style scoped>
  /* Add any additional styling here */
  </style>
  
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from "vue-router";

const profileForm = ref({
  username: '',
  phoneNumber: '',
  userAddress: {
    PostCode: '',
    TambonThaiShort: '',
    DistrictThaiShort: '',
    ProvinceThai: '',
    homeAddress: 'Address'
  }
});

const user = ref({});
const router = useRouter();
const route = useRoute();

const goBack = () => {
  router.push({
          name: "profile",
        });
};

const formattedDOB = computed(() => {
  if (user.value.DOB) {
    const date = new Date(user.value.DOB);
    const year = date.getFullYear();
    return year.toString();
  } else {
    return '';
  }
});


const getUsers = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/users/user/info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 200) {
      const userData = await res.json();
      user.value = userData;
      profileForm.value = {
    username: userData.username,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    userAddress: {
      PostCode: userData.userAddress.PostCode,
      TambonThaiShort: userData.userAddress.TambonThaiShort,
      DistrictThaiShort: userData.userAddress.DistrictThaiShort,
      ProvinceThai: userData.userAddress.ProvinceThai,
      homeAddress: userData.userAddress.homeAddress,
    },
    userAddressText: `${userData.userAddress.homeAddress} ${userData.userAddress.TambonThaiShort} ${userData.userAddress.DistrictThaiShort} ${userData.userAddress.ProvinceThai} ${userData.userAddress.PostCode}`
  };
      
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


const deleteUser = async () => {
  const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");

  if (confirmed) {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/users/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      if (res.status === 200) {
        localStorage.removeItem("token");
        alert("Deleted account successfully");
        console.error("Delete your account");
        router.push({
          name: "login",
        });
        window.location.reload() 
      } else {
        if (res.status === 404) {
          console.error("Error: Post not found");
          router.push({
            name: "notfound",
          });
        } else if (res.status === 401) {
          console.error("Unauthorized: Please log in again");
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




const updateProfile = async () => {
  const confirmed = window.confirm("Are you sure you want to update the profile?");

  if (confirmed) {
    try {
      // profileForm.value.userAddress.ProvinceThai = selectedProvince.value.ProvinceThai;
      // profileForm.value.userAddress.DistrictThaiShort = selectedDistrict.value.DistrictThaiShort;
      // profileForm.value.userAddress.TambonThaiShort = selectedTambon.value.TambonThaiShort;
      // profileForm.value.userAddress.PostCode = selectedTambon.value.PostCode;
      const res = await fetch(
        `${import.meta.env.VITE_APP_TITLE}/users/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(profileForm.value),
        }
      );

      if (res.status === 200) {
        const data = await res.json();
        console.log("Updated successfully:", data);
        // router.push({
        //     name: "profile",
        //   });
      } else {
        if (res.status === 404) {
          console.error("Error: Post not found");
          router.push({
            name: "notfound",
          });
        } else if (res.status === 500) {
          console.error("Error: Internal Server Error");
        } else if (res.status === 401) {
          alert("No authentication, Go to signin");
          localStorage.removeItem("token");
          router.push({
            name: "login",
          });
        } else if (res.status === 400) {
          console.log("No Valid");
          alert("400 Bad Request");
          const confirmed = window.confirm("Not validate");
        } else {
          console.error("Error:", res.status, res.statusText);
        }
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  } else {
    console.log("Update canceled by user");
  }
};

onMounted(async () => {
  getUsers();
});


const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const selectedTambon = ref(null);
const selectedPostCode = ref(null);

const thailand = ref([]);

const getThailandData = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/thailand/`, {
      method: 'GET',
    });

    if (res.ok) {
      const data = await res.json();
      console.log('Thailand data:', data);
      thailand.value = data;
      // Extract distinct province names
      // uniqueProvinces.value = [...new Set(data.map(item => item.provinceThai))];
    } else {
      if (res.status === 404) {
        console.error('Error: Thailand data not found');
        router.push({ name: 'notfound' });
      } else if (res.status === 500) {
        console.error('Error: Internal Server Error');
      } else {
        console.error('Error:', res.status, res.statusText);
      }
    }
  } catch (error) {
    console.error('Error fetching Thailand data:', error);
  }
};

onMounted(() => {
  getThailandData();
});

const filteredProvinces = computed(() => {
  const visitedProvinces = new Map();
  const uniqueProvinces = thailand.value.filter(province => {
    if (!visitedProvinces.has(province.ProvinceThai)) {
      visitedProvinces.set(province.ProvinceThai, true);
      return true;
    }
    return false;
  });
  return uniqueProvinces.sort((a, b) => a.ProvinceThai.localeCompare(b.ProvinceThai));
});

const filteredDistricts = computed(() => {
  if (!selectedProvince.value) return [];

  const visitedDistricts = new Map();
  const districts = thailand.value.filter(district => district.ProvinceThai === selectedProvince.value.ProvinceThai);
  const uniqueDistricts = districts.filter(district => {
    if (!visitedDistricts.has(district.DistrictThaiShort)) {
      visitedDistricts.set(district.DistrictThaiShort, true);
      return true;
    }
    return false;
  });

  return uniqueDistricts.sort((a, b) => a.DistrictThaiShort.localeCompare(b.DistrictThaiShort));
});

const filteredTambons = computed(() => {
  if (!selectedDistrict.value) return [];

  const visitedTambons = new Map();
  const tambons = thailand.value.filter(tambon => tambon.DistrictThaiShort === selectedDistrict.value.DistrictThaiShort);
  const uniqueTambons = tambons.filter(tambon => {
    if (!visitedTambons.has(tambon.TambonThaiShort)) {
      visitedTambons.set(tambon.TambonThaiShort, true);
      return true;
    }
    return false;
  });

  return uniqueTambons.sort((a, b) => a.TambonThaiShort.localeCompare(b.TambonThaiShort));
});



const filteredPostCodes = computed(() => {
  if (!selectedProvince.value || !selectedDistrict.value || !selectedTambon.value) return [];

  return thailand.value.filter(postCode => {
    return (
      postCode.ProvinceThai === selectedProvince.value.ProvinceThai &&
      postCode.DistrictThaiShort === selectedDistrict.value.DistrictThaiShort &&
      postCode.TambonThaiShort === selectedTambon.value.TambonThaiShort
    );
  }).map(postCode => parseInt(postCode.PostCode)).sort((a, b) => a - b);
});



</script>

<template>
  <div class="mt-20 max-w-lg mx-auto">
    <!-- {{ user }} -->
    <h1 class="text-2xl font-semibold mb-4 text-left">Edit Profile</h1>
    <form @submit.prevent="updateProfile" class="space-y-4">
      <div class="flex items-center">
        <label for="username" class="w-1/2 text-left mr-4">Username:</label>
        <input v-model="profileForm.username" type="text" id="username" class="w-3/4 px-3 py-2 border border-gray-300 rounded-md">
      </div>
      <div class="flex items-center">
        <label for="email" class="w-1/2 text-left mr-4">Email:</label>
        <input v-model="profileForm.email" disabled type="text" id="email" class="w-3/4 px-3 py-2 border border-gray-300 rounded-md">
      </div>

      <div class="flex items-center">
        <label for="dob" class="w-1/2 text-left mr-4">Year of Birth:</label>
        <input v-model="formattedDOB" disabled type="text" id="dob" class="w-3/4 px-3 py-2 border border-gray-300 rounded-md">
      </div>

      <div class="flex items-center">
        <label for="phoneNumber" class="w-1/2 text-left mr-4">Phone Number:</label>
        <input v-model="profileForm.phoneNumber" type="text" id="phoneNumber" maxlength="10" class="w-3/4 px-3 py-2 border border-gray-300 rounded-md">
      </div>

      <div class="flex items-center">
  <label for="address" class="w-1/2 text-left mr-4">Address:</label>
  <textarea disabled v-model="profileForm.userAddressText" id="address" class="w-3/4 px-3 py-2 border border-gray-300 rounded-md" :maxlength="200" rows="4"></textarea>
</div>
<!-- <div class="flex items-center">
        <label for="homeAddress" class="w-1/2 text-left mr-4">Address:</label>
        <input v-model="profileForm.homeAddress" type="text" id="homeAddress" class="w-3/4 px-3 py-2 border border-gray-300 rounded-md">
  </div> -->

<!-- <div class="grid gap-3 mb-4 md:grid-cols-2">
  <label for="province">Select Province:</label>
  <select class="select select-bordered" id="province" v-model="selectedProvince">
    <option disabled value="">{{ profileForm.userAddress?.ProvinceThai }}</option>
    <option v-for="province in filteredProvinces" :key="province._id" :value="province">{{ province.ProvinceThai }}</option>
  </select>
  
  <label for="district">Select District:</label>
  <select class="select select-bordered" id="district" v-model="selectedDistrict">
    <option disabled value="" class="">{{ profileForm.userAddress?.DistrictThaiShort }}</option>
    <option v-for="district in filteredDistricts" :key="district._id" :value="district">{{ district.DistrictThaiShort }}</option>
  </select>
  <label for="tambon">Select Tambon:</label>
  <select class="select select-bordered" id="tambon" v-model="selectedTambon">
    <option disabled value="">{{ profileForm.userAddress?.TambonThaiShort }}</option>
    <option v-for="tambon in filteredTambons" :key="tambon._id" :value="tambon">{{ tambon.TambonThaiShort }}</option>
  </select>
  <label for="postCode">Post Codes:</label>
<div>
  <span v-if="selectedTambon">
    <template v-for="postCode in filteredPostCodes">
      {{ postCode }}
    </template>
  </span>
  <span v-else>No tambon selected</span>
</div>
</div>
   -->
  


  <div>
    <!-- Delete your Account -->
    <div @click="deleteUser" class="text-red-700 text-right mb-4 cursor-pointer">Delete your account</div>
    
    <!-- Submit and Cancel Buttons -->
    <div class="flex justify-between">
      <!-- Cancel Button -->
    <button @click="goBack" class="text-gray-600 font-semibold py-2 px-4 rounded-md hover:text-gray-800 focus:outline-none">Cancel</button>
    <!-- Submit Button -->
    <button type="submit" class="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none">Update Profile</button>
  </div>
</div>

    </form>
  </div>
</template>


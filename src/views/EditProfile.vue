<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from "vue-router";
import axios from 'axios';

const profileForm = ref({
  phoneNumber: '',
  userAddress: '',
});

const user = ref({});
const router = useRouter();
const route = useRoute();

const formattedDOB = computed(() => {
  if (user.value.DOB) {
    const date = new Date(user.value.DOB);
    const day = date.getDate();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  } else {
    return '';
  }
});


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
      profileForm.value = {
        username: userData.username,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        userAddress: userData.userAddress,
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
};



const updateProfile = async () => {
  const confirmed = window.confirm("Are you sure you want to update the profile?");

  if (confirmed) {
    try {
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
        router.push({
            name: "profile",
          });
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

// const updateProfile = async () => {
//   try {
//     const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/users/`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: localStorage.getItem("token"),
//       },
//       body: JSON.stringify(formPost.value),
//     });
    

//     if (res.status === 200) {
//       alert("Update successfully");
//       const data = await res.json();
//         console.log("Updated successfully:", data);
//         router.go(-1);
//     } else {
//       if (res.status === 404) {
//         console.error("Error: Post not found");
//         router.push({
//           name: "notfound",
//         });
//       }else if (res.status === 400) {
//           console.log("No Valid");
//           alert("400 Bad Request");
//           const confirmed = window.confirm("Not validate");
//         } else if (res.status === 401) {
//         console.error("Unauthorized: Please log in again");
//         localStorage.removeItem("token");
//         router.push({
//           name: "login",
//         });
//       } else if (res.status === 500) {
//         console.error("Error: Internal Server Error");
//       } else {
//         console.error("Error:", res.status, res.statusText);
//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

onMounted(async () => {
  getUsers();
});
</script>

<template>
  <div class="mt-20 max-w-md mx-auto">
    <!-- {{ user }} -->
    <h1 class="text-2xl font-semibold mb-4">Edit Profile</h1>
    <form @submit.prevent="updateProfile" class="space-y-4">
      <div class="flex items-center">
        <label for="username" class="w-1/4 text-left mr-4">Username:</label>
        <input v-model="profileForm.username" disabled type="text" id="username" class="w-3/4 px-3 py-2 border rounded-md">
      </div>
      <div class="flex items-center">
        <label for="email" class="w-1/4 text-left mr-4">Email:</label>
        <input v-model="profileForm.email" disabled type="text" id="email" class="w-3/4 px-3 py-2 border rounded-md">
      </div>

      <div class="flex items-center">
        <label for="dob" class="w-1/4 text-left mr-4">Date of Birth:</label>
        <input v-model="formattedDOB" disabled type="text" id="dob" class="w-3/4 px-3 py-2 border rounded-md">
      </div>

      <div class="flex items-center">
        <label for="phoneNumber" class="w-1/4 text-left mr-4">Phone Number:</label>
        <input v-model="profileForm.phoneNumber" type="text" id="phoneNumber" class="w-3/4 px-3 py-2 border rounded-md">
      </div>

      <div class="flex items-center">
  <label for="address" class="w-1/4 text-left mr-4">Address:</label>
  <textarea v-model="profileForm.userAddress" id="address" class="w-3/4 px-3 py-2 border rounded-md" :maxlength="200" rows="4"></textarea>
</div>

      <button type="submit" class="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">Update Profile</button>
      <button @click="deleteUser" class="bg-orange-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">Delete Account</button>
    </form>
  </div>
</template>


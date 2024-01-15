<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const editedUser = ref({
  username: '',
  phoneNumber: '',
});

const updateProfile = async () => {
  try {
    const res = await fetch(
        `${import.meta.env.VITE_APP_TITLE}/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedUser.value),
        }
      );

    // const response = await axios.put(`/api/users/${userId}`, editedUser.value);
    // console.log(response.data); 
  } catch (error) {
    console.error('Update Profile Error:', error.response?.data || error.message);
  }
};

const userId = '61c44877c50a9a5b64b177d1'; // Replace with your actual user ID

onMounted(async () => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    
    if (response.status === 200) {
      editedUser.value = response.data;
    } else {
      console.error(`Failed to fetch user data. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Fetch User Data Error:', error.response?.data || error.message);
  }
});
</script>

<template>
  <div class="mt-20">
    <h1>Edit Profile</h1>
    <form @submit.prevent="updateProfile">
      <label for="username">Username:</label>
      <input v-model="editedUser.username" type="text" id="username" />

      <label for="phoneNumber">Phone Number:</label>
      <input v-model="editedUser.phoneNumber" type="text" id="phoneNumber" />

      <button type="submit">Update Profile</button>
    </form>
  </div>
</template>

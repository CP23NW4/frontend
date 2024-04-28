<script setup>
import { ref, onMounted, watch, defineProps, defineEmits } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from 'sweetalert2';
const router = useRouter();
const route = useRoute();

const props = defineProps(["closeModal", "formPost"]);
const emit = defineEmits();
const goBack = () => router.go(-1);
const minCount = 0;
const maxCountDesc = 500;
let nameError = "";

const validateName = () => {
  const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;

  const trimmedName = formPost.name?.trim();

  // if (!trimmedName) {
  //   nameError = "Name is required.";
  // } else
  if (trimmedName?.length > 20) {
    nameError = "Name cannot exceed 20 characters.";
  } else if (specialCharacterRegex.trimmedName) {
    nameError = "Special characters are not allowed.";
    console.log(specialCharacterRegex);
  } else {
    nameError = "";
  }
};

const formPost = ref({
  name: "",
  type: "",
  gender: "",
  color: "",
  description: "",
  picture: null,
  createdOn: new Date().toISOString(),
});

const touchedInputs = ref({
  name: false,
  type: false,
  gender: false,
  color: false,
});

const getPostById = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/strayAnimals/${route.params.id}`,
      {
        method: "GET",
      }
    );

    if (res.status === 200) {
      const data = await res.json();
      formPost.value = data;
    } else if (res.status === 404) {
      console.error("Error: Post not found");
      router.push({
        name: "notfound",
      });
      location.reload();
    } else if (res.status === 500) {
      console.error("Error: Internal Server Error");
      router.push({
          name: "notfound",
        });
      location.reload();
    } else if (res.status === 400) {
      console.error("Not validate");
    } else if (res.status === 401) {
      Swal.fire({
    icon: 'error',
    title: 'No authentication',
    text: 'Please sign in again.',
  }).then(() => {
    localStorage.removeItem("token");
    router.push({
      name: "login",
    });
    location.reload();
  });
        }else {
      console.error("Error:", res.status, res.statusText);
    }
  } catch (error) {
    console.error(error);
  }
};

const updatePost = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_TITLE}/strayAnimals/${route.params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(formPost.value),
        }
      );

      if (res.status === 200) {
        Swal.fire({
        title: 'Success!',
        text: 'Post updated successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        router.go(-1);
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
        } else if (res.status === 403) {
        Swal.fire({
        title: 'Error',
        text: 'You do not have permission to edit other post, Check your role',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then(() => {
        router.go(-1);
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

};

const createPost = async () => {
  try {
    const formData = new FormData();
    formData.append("name", formPost.value.name);
    formData.append("type", formPost.value.type);
    formData.append("gender", formPost.value.gender);
    formData.append("color", formPost.value.color);
    formData.append("description", formPost.value.description);

    if (formPost.value.picture) {
      formData.append("picture", formPost.value.picture);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please upload a picture.',
      });
      return;
    }

    const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/strayAnimals`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: formData,
    });

    if (res.status === 200 || res.status === 201) {
      const data = await res.json();
      console.log("Post created successfully:", data);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Create Successful!',
      }).then(() => {
        emit("closeModal", true);
        window.location.reload();
      });
    } else if (res.status === 400) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Bad Request: Please check your input data.',
      });
    } else if (res.status === 401) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No authentication, please sign in.',
      }).then(() => {
        localStorage.removeItem("token");
        router.push({
          name: "login",
        });
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Error: ${res.status} ${res.statusText}`,
      });
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
      formPost.value.picture = file;
      console.log(formPost.value.picture);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'File size exceeds the limit (3MB). Please choose a smaller file.',
      });
    }
  }
};


const handleInputBlur = (inputName) => {
  touchedInputs.value[inputName] = true;
  if (formPost[inputName]?.trim() === "") {
    formPost[inputName] = ""; // Set to empty string to trigger class change
  }
};

const handleSubmit = async () => {
  if (route.params.id) {
    // If ID update post
    updatePost();
  } else {
    // else create new post
    createPost();
    emit('closeModalWithoutConfirmation');// Emit an event to close the modal without confirmation
  }
};

onMounted(() => {
  if (route.params.id) {
    // Fetch data if ID is present
    getPostById();
  }
});

const selectGender = (selectedGender) => {
  formPost.gender = selectedGender;
};

watch(
  formPost,
  (newValue, oldValue) => {
    for (const inputName in touchedInputs.value) {
      if (
        newValue[inputName] !== oldValue[inputName] &&
        touchedInputs.value[inputName]
      ) {
        validateName(); // You can add similar validation for other inputs
      }
    }
  },
  { deep: true }
);
</script>

<template>
  <!-- {{ formPost }} -->
  <div class="flex items-center justify-center flex-col">
    <form
      @submit.prevent="handleSubmit"
      action="#"
      method="POST"
      class="text-zine-900 max-w-lg mx-auto text-center"
    >
      <!-- images -->
      <!-- {{ formPost.picture }} -->

      <div v-if="!route.params.id">
        <label
          class="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
          for="file_input"
          >Upload Picture</label
        >
        
        <input
          @change="handleFileUpload"
          class="mb-4 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
        />
      </div>
      <div v-else>
      <img
        :src="formPost.picture"
        class="w-full h-full object-cover rounded-lg mb-4"
        alt="Animal Image"
      /></div>

      <div class="mb-4">
        <input
          type="text"
          id="name"
          maxlength="20"
          v-model="formPost.name"
          placeholder="Your pet name"
          @input="validateName"
          @blur="() => handleInputBlur('name')"
          :class="{ 'border-red-500': touchedInputs.name && !formPost.name }"
          required
          class="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
        />
        <p v-if="nameError" class="text-red-500 text-sm">{{ nameError }}</p>
        <!-- <p v-if="!formPost.name" class="text-red-500 text-sm">*</p> -->
      </div>

      <div class="grid gap-3 mb-4 md:grid-cols-3">
        <label class="form-control w-full max-w-xs">
          <select
            class="select select-bordered"
            @blur="() => handleInputBlur('type')"
            :class="{ 'border-red-500': touchedInputs.type && !formPost.type }"
            required
            v-model="formPost.type"
            :disabled="route.params.id"
          >
            <option value="" disabled selected>Type</option>
            <option value="Cat">Cat</option>
            <option value="Dog">Dog</option>
          </select>
        </label>

        <label class="form-control w-full max-w-xs">
          <select
            class="select select-bordered"
            @blur="() => handleInputBlur('gender')"
            :class="{
              'border-red-500': touchedInputs.gender && !formPost.gender,
            }"
            required
            v-model="formPost.gender"
          >
            <option value="" disabled selected>Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>

        <!-- <details class="dropdown">
  <summary class="m-1 btn">Gender</summary>
  <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
    <li><a @click="selectGender('Male')">Male</a></li>
    <li><a @click="selectGender('Female')">Female</a></li>
  </ul>
</details> -->

        <!-- <div class="relative inline-block text-left">
  <button id="genderDropdownButton" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    Gender
    <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
    </svg>
  </button>

  <div id="genderDropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="genderDropdownButton">
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Male</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Female</a>
      </li>
    </ul>
  </div>
</div> -->

        <div>
          <input
            type="text"
            id="color"
            v-model="formPost.color"
            placeholder="Color"
            maxlength="50"
            @blur="() => handleInputBlur('color')"
            :class="{
              'border-red-500': touchedInputs.color && !formPost.color,
            }"
            required
            class="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
          />
          <!-- <p v-if="!formPost.color" class="text-red-500 text-sm">Color is required.</p> -->
        </div>
      </div>
      <div>
        <textarea
          v-model="formPost.description"
          placeholder=" Write your description..."
          cols="5"
          rows="3"
          maxlength="500"
          class="bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] rounded-lg"
        ></textarea>
        <span class="text-xs ml-[95%] text-gray-400"
          >{{
            minCount + (formPost.description ? formPost.description.length : 0)
          }}/{{ maxCountDesc }}</span
        >
      </div>
      <!-- <div class="mb-4">
        <input
          type="text"
          id="address"
          v-model="address"
          placeholder="Select your address"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
        />
      </div>
      <div class="mb-4">
        <input
          type="text"
          id="phone"
          v-model="phone"
          placeholder="Phone numbers"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
        />
      </div> -->
      <div class="mb-4">
        <button
          type="submit"
          class="block w-full px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {{ route.params.id ? "Update" : "Create" }}
        </button>
      </div>
      
    </form>
    
  </div>
  <div class="text-left mt-4 ">
      <button v-if="route.params.id" @click="goBack" class="text-gray-600 font-semibold py-2 px-4 rounded-md hover:text-gray-800 focus:outline-none">Back</button>
    </div> 
</template>
<style scoped>

</style>
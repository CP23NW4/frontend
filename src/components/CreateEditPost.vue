<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const minCount = 0;
const maxCountDesc = 500;

const formPost = ref({
  name: '',
  type: '',
  gender: '',
  color: '',
  description: '',
  image: null,
  createdOn: null,
});

const getPostById = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/api/strayAnimals/${route.query.id}`,
      {
        method: 'GET',
      }
    );

    if (res.status === 200) {
      const data = await res.json();
      formPost.value = data;
    } else {
      console.error('Error:', res.status, res.statusText);
    }
  } catch (error) {
    console.error(error);
  }
};

const updatePost = async () => {
  const confirmed = window.confirm('Are you sure you want to update the post?');

  if (confirmed) {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_TITLE}/api/strayAnimals/${route.query.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formPost.value),
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log('Post updated successfully:', data);
        router.push({
          name: 'home',
        });
      } else {
        console.error('Error updating post:', res.status, res.statusText);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  } else {
    // The user canceled the update
    console.log('Update canceled by user');
  }
};


const createPost = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/api/strayAnimals`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formPost.value),
      }
    );

    if (res.ok) {
      const data = await res.json();
      console.log('Post created successfully:', data);
      router.push({
        name: 'home',
      });
    } else {
      console.error('Error creating post:', res.status, res.statusText);
    }
  } catch (error) {
    console.error('Error creating post:', error);
  }
};

const handleSubmit = async () => {
  if (route.query.id) {
    // If ID update post
    updatePost();
  } else {
    // else create new post
    createPost();
  }
};

onMounted(() => {
  if (route.query.id) {
    // Fetch data if ID is present
    getPostById();
  }
});
</script>

<template>
<!-- {{ formPost }} -->
  <div class="flex items-center justify-center">
    <form @submit.prevent="handleSubmit" action="#" method="POST">
      <div class="flex items-center justify-center w-full mb-4">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG or JPG up tp 10MB
            </p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" />
        </label>
      </div>

      <div class="mb-4">
        <input
          type="text"
          id="name"
          v-model="formPost.name"
          placeholder="Name of pets"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
        />
      </div>

      <div class="grid gap-3 mb-4 md:grid-cols-3">
        <div>
          <input
            type="text"
            id="type"
            v-model="formPost.type"
            placeholder="Type"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>

        <div>
          <input
            type="text"
            id="gender"
            v-model="formPost.gender"
            placeholder="Gender"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>

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
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>
      </div>
      <div>
        <textarea
          v-model="formPost.description"
          placeholder=" Write your description..."
          cols="5"
          rows="5"
          class="bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] rounded-lg"
        ></textarea>
        <span class="text-xs ml-[95%] text-gray-400">{{ minCount + (formPost.description ? formPost.description.length : 0) }}/{{ maxCountDesc }}</span>

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
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">
          {{ route.query.id ? 'Update' : 'Create' }}
        </button>
      </div>
    </form>
  </div>
</template>

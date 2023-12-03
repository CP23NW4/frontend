<script setup>
// import { ref, onMounted } from 'vue';

// const strayAnimal = ref(null);
// const formPost = ref({
//   name: '',
//   type: '',
//   gender: '',
//   color: '',
//   notes: '',
//   address: '',
//   phone: '',
//   image: null
// });

// onMounted(() => {
//   const strayAnimalId = 1; 
//   if (strayAnimalId) {
//     strayAnimal.value = {
//       id: strayAnimalId,
//       name: strayAnimal.name,
//       type: strayAnimal.type,
//       gender: strayAnimal.gender,
//       color: strayAnimal.color,
//       notes: strayAnimal.notes,
//       address: strayAnimal.address,
//       phone: strayAnimal.phone,
//     };
//     formPost.value = { ...strayAnimal.value };
//   }
// });
// const handleSubmit = async () => {
//   const formPost = new formPost();

//   Object.entries(formPost.value).forEach(([key, value]) => {
//     formData.append(key, value);
//   });

//   if (formPost.value.image) {
//     formData.append('image', formPost.value.image);
//   }

//   try {
//     const response = await fetch('/api/upload', {
//       method: 'POST',
//       body: formData,
//     });

//     if (response.ok) {
//       console.log('File uploaded successfully!');
//     } else {
//       console.error('File upload failed!');
//     }
//   } catch (error) {
//     console.error('Error uploading file:', error);
//   }
// };

</script>
<template>
  <div class="flex items-center justify-center">
    <form
      @submit.prevent="handleSubmit"
      action="#"
      method="POST"
    >
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
          v-model="name"
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
            v-model="type"
            placeholder="Type"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>

        <div>
          <input
            type="text"
            id="gender"
            v-model="gender"
            placeholder="Gender"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>

        <div>
          <input
            type="text"
            id="color"
            v-model="color"
            placeholder="Color"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>
      </div>
      <textarea
        v-model="notes"
        placeholder=" Write your description..."
        cols="5"
        rows="5"
        class="bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] rounded-lg"
      ></textarea>
      <div class="mb-4">
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
      </div>
      <div class="mb-4">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {{ strayAnimal ? "Update" : "Create" }}
        </button>
      </div>
    </form>
  </div>
</template>

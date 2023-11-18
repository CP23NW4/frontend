<script setup>
</script>
<template>
<div class="flex items-center justify-center">
<form action="#" method="POST">
<div class="flex items-center justify-center w-full mb-4">
    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG or JPG up tp 10MB</p>
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

          
<ul class="grid gap-6 md:grid-cols-2 mb-4">
    <li>
        <input type="checkbox" id="react-option" value="" class="hidden peer" required="">
        <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
            <div class="block">
              <img src="/dog.svg">
                <div class="w-full text-lg font-semibold">Dog</div>
            </div>
        </label>
    </li>
    <li>
        <input type="checkbox" id="flowbite-option" value="" class="hidden peer">
        <label for="flowbite-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div class="block">
              <img src="/cat.svg">
                <div class="w-full text-lg font-semibold">Cat</div>
            </div>
        </label>
    </li>
    <li>
        <input type="checkbox" id="react-option" value="" class="hidden peer" required="">
        <label for="react-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
            <div class="block">
              <img src="/dog.svg">
                <div class="w-full text-lg font-semibold">Male</div>
            </div>
        </label>
    </li>
    <li>
        <input type="checkbox" id="flowbite-option" value="" class="hidden peer">
        <label for="flowbite-option" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div class="block">
              <img src="/cat.svg">
                <div class="w-full text-lg font-semibold">Cat</div>
            </div>
        </label>
    </li>
</ul>




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
      </form>
</div>
</template>

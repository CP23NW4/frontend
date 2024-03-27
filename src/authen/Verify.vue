

<template>
    <div class="min-h-screen flex items-center justify-center">
      <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg p-8 max-w-md w-full">
        <div class="flex flex-col items-center justify-center space-y-6">
          <img src="https://mnwanimals.blob.core.windows.net/accessories/logo3.png" class="h-20" alt="Logo">
          <h2 class="text-2xl font-semibold text-center">Verify Your Email</h2>
          <p class="text-gray-600 dark:text-gray-400 text-center">A verification link has been sent to your email address. Please check your email and click the verification link to activate your account.</p>
          <div class="flex justify-center space-x-4">
          <!-- <button @click="resendEmail" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400">Resend Email</button> -->
          <router-link :to="{ name: 'login' }" class="font-semibold px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-orange-600 hover:text-white focus:outline-none focus:ring focus:ring-gray-400">Go to Sign In</router-link>
          </div>
          <p class="text-gray-500 dark:text-gray-400 text-center text-sm">Didn't receive the email? Check your spam folder or <a href="#" class="underline">contact support</a>.</p>
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const resendEmail = () => {
    // Your logic to resend the verification email goes here
    console.log('Resend email functionality');
  };
  </script>
  
  <style>
  /* Add any custom styles here */
  </style>
  
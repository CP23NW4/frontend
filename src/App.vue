 <script setup>
import Navbar from "./bar/Navbar.vue";
import Footer from './bar/Footer.vue';

import { useRouter } from "vue-router";
// const router = useRouter();
// const clearConsole = () => {
//   console.clear();
// };

// router.afterEach(() => {
//   clearConsole();
// });

 </script>

<template>
  <div> 
   <Navbar />
  <router-view class="min-h-screen" />
  <!-- <Footer /> -->
  </div>
</template>





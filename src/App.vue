 <script setup>
import Navbar from "./components/Navbar.vue";
// import LoginRegister from "./components/LoginRegister.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const clearConsole = () => {
  console.clear();
};

// Use the router's afterEach hook to clear the console when navigating
router.afterEach(() => {
  clearConsole();
});

 </script>

<template>
  <div> 
   <Navbar />
  <router-view class="min-h-screen" />
  </div>


</template>



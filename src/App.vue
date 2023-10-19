<script setup>
import Navbar from "./components/Navbar.vue";
// import Navbar from "./components/nv.vue";
import LoginRegister from "./components/LoginRegister.vue";

</script>

<template>
  <div>
    <Navbar />
    <!-- <LoginRegister /> -->
  <router-view class="min-h-screen" />
  </div>
</template>



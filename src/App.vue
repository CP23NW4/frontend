<template>
  <div>
    <Navbar />
    <router-view class="min-h-screen" />
    <!-- <Footer /> -->
    <span>Version: {{ version }}</span>
    <span>path: {{ path }}</span>
  </div>
</template>

<script setup>
import Navbar from './bar/Navbar.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Accessing environment variables
const version = import.meta.env.VITE_APP_VERSION
const path = import.meta.env.VITE_APP_TITLE
</script>

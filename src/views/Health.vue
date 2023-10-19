<script setup>
import HealthCard from '../components/HealthCard.vue'

</script>

<template><br>
    <h1 class="font-bold text-left m-8">Health Topics</h1>
    <div class="grid grid-cols-3 gap-4">
      <HealthCard v-for="index in 12" :key="index" />
    </div>
</template>
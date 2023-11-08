<script setup>
// import SearchFilter from '../components/SearchFilter.vue'
// import Sf from '../components/sf.vue'
  import ScanIdCard from '../components/ScanIdCard.vue';
  import AutoFillForm from '../components/AutoFillForm.vue';
  import Banner from '../components/Banner.vue';
  import DetailCard from '../components/DetailCard.vue'

</script>

<template>
    <!-- <SearchFilter /> <br> -->
    <!-- <Sf /> -->
    <!-- v-if data===0 -->
    <!-- <Banner /> -->
    <Banner />
<br>
    <h1 class="font-bold text-left m-8">Finding Home</h1>
    <div class="grid grid-cols-3 gap-4">
      <DetailCard v-for="index in 12" :key="index" />
    </div>
    <!-- <v-else></v-else> -->

</template>


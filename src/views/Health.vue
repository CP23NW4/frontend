<script setup>
import CreateEditPost from '../components/CreateEditPost.vue'
import Banner from '../components/Banner.vue';
import Button from '../components/Button.vue';

</script>

<template>
<Banner />
<br>
<h1 class="font-bold text-left m-8">Finding Home</h1>

      <CreateEditPost />
      <Button label="Cancel" color="amber-500" />
      <Button label="Confirm" />

</template>
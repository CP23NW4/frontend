<script setup>
import CreateEditPost from '../components/CreateEditPost.vue'
import Banner from '../components/Banner.vue';
import Button from '../components/Button.vue';

</script>

<template>
<Banner />
<br>

      <CreateEditPost />
      <Button label="Cancel" color="amber-500" />
      <Button label="Confirm" />

</template>
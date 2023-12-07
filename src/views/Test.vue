<script setup>
import ConfirmCard from '../components/ConfirmCard.vue'

const handleConfirm = () => {
  // Logic for confirming action
  console.log('Action confirmed!');
};

const handleCancel = () => {
  // Logic for canceling action
  console.log('Action canceled!');
};

</script>

<template>
      <div>
    <ConfirmCard
      title="Delete Post"
      message="Are you sure you want to delete this post?"
      :confirmAction="handleConfirm"
      :cancelAction="handleCancel"
    />
  </div>


</template>
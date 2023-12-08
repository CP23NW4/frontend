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

    


    <details class="dropdown">
  <summary class="m-1 btn">open or close</summary>
  <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</details>
  </div>


</template>
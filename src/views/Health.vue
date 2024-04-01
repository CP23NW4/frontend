<template>
  <dialog :id="id" class="modal">
    <div class="modal-box flex flex-col items-center justify-center">
      <slot name="image">
        <img src="/modal.svg" alt="Modal Image" />
      </slot>
      <h1 class="font-bold text-2xl text-amber-500 mt-2">{{ title }}</h1>
      <p class="py-2">{{ message }}</p>
      <div class="modal-action flex">
        <form method="dialog" @submit.prevent>
          <slot></slot>
        </form>
      </div>
    </div>
  </dialog>
</template>
<style scoped>

</style>

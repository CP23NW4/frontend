<script setup>
</script>
<template>
<div class="carousel w-full h-4/6 mt-28 md:mt-16 lg:mt-16 rounded-xl">
  <div id="item1" class="carousel-item w-full">
    <img src="/b2.png" class="w-full" />
  </div> 
  <div id="item2" class="carousel-item w-full">
    <img src="/b1.png" class="w-full" />
  </div> 
  <div id="item1" class="carousel-item w-full">
    <img src="/b2.png" class="w-full" />
  </div> 
  <div id="item2" class="carousel-item w-full">
    <img src="/b1.png" class="w-full" />
  </div> 
</div> 

</template>

<!-- 
<script>

export default {

    data() {
      return {
        selectedImage: 1,
      };
    },
    methods: {
      selectImage(imageNumber) {
        this.selectedImage = imageNumber;
      },
      autoChangeSlide() {
        setInterval(() => {
          this.selectedImage = (this.selectedImage % 3) + 1;
        }, 3000);
      },
    },
    mounted() {
      this.autoChangeSlide();
    },
    
  };
  </script>
<template>


<div class="w-full h-full mt-14 md:mt-12 custom-gradient">
      <div class="inline-flex flex-col items-center justify-center w-full gap-5 px-6 pt-14 md:px-24 md:pt-24">
        <div class="inline-flex items-center justify-center w-full gap-6">
          <div v-if="selectedImage === 1" class="relative flex items-center justify-center w-full bg-center bg-cover md:h-[500px]">
            <img src="/b1.png" class="w-full" />
          </div> 
          <div v-if="selectedImage === 2" class="relative flex items-center justify-center w-full bg-center bg-cover md:h-[500px]">
            <img src="/b2.png" class="w-full" />
          </div>
          <div v-if="selectedImage === 3" class="relative flex items-center justify-center w-full bg-center bg-cover md:h-[500px]">
            <img src="/b1.png" class="w-full" />
          </div>
        </div>
        <div class="inline-flex items-center justify-center gap-3 md:pb-8">
          <button @click="selectImage(1)" :class="{ 'md:w-24 w-16 relative bg-[#F5821F] rounded-full': selectedImage === 1, 'bg-white': selectedImage !== 1 }" class="relative w-4 h-4 rounded-full md:h-6 md:w-6"></button>
          <button @click="selectImage(2)" :class="{ 'md:w-24 w-16 relative bg-[#F5821F] rounded-full': selectedImage === 2, 'bg-white': selectedImage !== 2 }" class="relative w-4 h-4 rounded-full md:h-6 md:w-6"></button>
          <button @click="selectImage(3)" :class="{ 'md:w-24 w-16 relative bg-[#F5821F] rounded-full': selectedImage === 3, 'bg-white': selectedImage !== 3 }" class="relative w-4 h-4 rounded-full md:h-6 md:w-6"></button>
        </div>
    
      </div>
      
      </div>

</template> -->

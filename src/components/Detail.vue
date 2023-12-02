<script setup>
// import { ref, onMounted } from "vue";

// const strayAnimals = ref([]);

// const getPostById = async () => {
//   try {
//     const res = await fetch(
//       `${import.meta.env.VITE_APP_TITLE}/api/strayAnimals/id`,
//       {
//         method: "GET",
//       }
//     );

//     if (res.status === 200) {
//       const data = await res.json();
//       console.log("success");
//       strayAnimals.value = data;
//     } else {
//       console.error("Error:", res.status, res.statusText);
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

// onMounted(() => {
//   getPost();
// });
</script>
<template>
  <div class="flex items-center justify-center">
    <div class="items-center gap-4 mb-4 text-center max-w-lg">
      <div class="mb-4">
        <img src="/cat.jpg" class="w-512 h-300 object-cover rounded-md" />
      </div>
      <div class="w-full bg-white shadow-lg p-8 my-10 rounded-md text-left">
        <div class="flex mb-4">
          <img class="w-10 h-10 rounded-full" src="/pf.png" alt="" />
          <div class="font-medium dark:text-white">
            <div>Millieme</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              20 Aug 2022 22:22
            </div>
          </div>
        </div>

        <hr />
        <div class="mt-4">
          <ul>
            <li><a class="font-bold m-2">ชื่อ :</a> ปิงปิง</li>
            <li><a class="font-bold m-2">เพศ :</a> หญิง</li>
            <li><a class="font-bold m-2">ประเภท :</a> สุนัข</li>
            <li><a class="font-bold m-2">สี :</a> ขาว</li>
            <li><a class="font-bold m-2">คำอธิบาย :</a> อารมณ์ดี น่ารัก</li>
            <li><a class="font-bold m-2">ที่อยู่ :</a> 777/56 ซอย 3</li>
            <li><a class="font-bold m-2">เบอร์ติดต่อ :</a> 0669873045</li>
          </ul>
        </div>
      </div>
      <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          ขอรับเลี้ยง
        </button>
    </div>
  </div>
</template>

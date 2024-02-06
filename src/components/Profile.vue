<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const user = ref({});
const router = useRouter(); 

const getUsers = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/users/658ab8a4e1cf3dd5aca96bc8`,
      {
        method: "GET",
        headers: {'Content-Type':'application/json'}
      }
    );

    if (res.status === 200) {
      const userData = await res.json(); 
      user.value = userData;
    } else {
      if (res.status === 404) {
        console.error("Error: Post not found");
        router.push({
          name: "notfound",
        });
      } else if (res.status === 500) {
        console.error("Error: Internal Server Error");
      } else {
        console.error("Error:", res.status, res.statusText);
      }
    }
  } catch (error) {
    console.error(error);
  }
};


onMounted(async () => {
  getUsers();
});
</script>

<template>
  {{ user }}
  <section class="relative block h-500-px overflow-hidden">
  <div class="top-0 mt-20 w-full h-full bg-center bg-cover overflow-hidden">
  <img
      src="/banner1.png"
      class="min-w-screen w-full h-full object-cover rounded-3xl"
      alt="Banner"
    />
    </div>
  </section>
  <section class="relative py-16">
    <div class="container mx-auto px-4">
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
      >
        <div class="px-6">
          <div class="flex flex-wrap justify-center">
            <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
              <img class="w-36 h-36 rounded-full object-cover shadow-xl align-middle absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" src="/cat1.jpg" alt="user photo">  
            </div>

            <div class="w-full lg:w-4/12 px-3 lg:order-3 lg:text-right lg:self-start">
  <div class="py-6 px-3 mt-10 sm:mt-0">
    <button
      class="bg-zinc-700 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
      type="button"
    >
      Edit profile
    </button>

    <router-link :to="{ name: 'edit-profile' }" class="underline-none">
    <div class="px-7 py-2 border-b-2 border-transparent hover:border-indigo-950 transition duration-300">
      <a class="text-indigo-950 text-sm font-extrabold">Edit profile</a>
    </div>
  </router-link>
  </div>
</div>


            <div class="w-full lg:w-4/12 px-4 lg:order-1">
              <div class="flex justify-center py-4 lg:pt-4 pt-8">
                <div class="mx-2 p-3 pl-10 text-center">
                  <span
                    class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                    >22</span
                  ><span class="text-sm text-blueGray-400">Friends</span>
                </div>
                <div class="mx-2 p-3 text-center">
                  <span
                    class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                    >10</span
                  ><span class="text-sm text-blueGray-400">Posts</span>
                </div>
                <div class="mx-2 mr-20 p-3 text-center">
                  <span
                    class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
                    >89</span
                  ><span class="text-sm text-blueGray-400">Likes</span>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center mt-4">
            <h3
              class="text-4xl font-semibold leading-normal mb-0 text-blueGray-700"
            >
              {{ user.username }}
            </h3>
            <div
              class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
            >
              Bangkok, Thailand
            </div>
            <div class="mb-2 text-blueGray-600 mt-10">
              <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i
              >Welcome to my feed
            </div>
          </div>
          <hr class="my-4">
          <div class="text-indigo-950 text-sm font-extrabold"> MY PETS
<p>lucky</p>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

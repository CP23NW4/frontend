<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { handleAuthentication } from "../composition/auth";

const router = useRouter();
const identifier = ref('');
const password = ref('');


onBeforeMount(() => {
  const checkLogin = localStorage.getItem("token");
  if (checkLogin) {
    router.push({
      name: "home",
    });
  }
});

const login = async () => {
  const loginData = {
    identifier: identifier.value,
    password: password.value,
  };
  await handleAuthentication("/users/login", loginData, "Login successful!");
};

</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <img src="/mnw.png" class="w-96 drop-shadow-lg" />
    <div>
      <div class="mb-4">
        <a class="flex items-center">
          <img src="/logo3.png" class="h-10 mr-1" alt="Logo" />
          <div class="flex-col justify-start items-start inline-flex">
            <div class="text-black text-base font-bold leading-relaxed tracking-tight">
              MEOW & WOOF
            </div>
            <div class="text-black text-[10px] font-bold leading-none tracking-tight">
              HOME FINDER
            </div>
          </div>
        </a>
      </div>

      <h2 class="text-2xl font-bold mb-4 text-left">
        Sign in to your account
      </h2>

      <form @submit.prevent="login" action="#" method="POST">
        <div class="mb-4">
          <div class="mb-4">
            <input
              type="text"
              id="email"
              v-model="identifier"
              placeholder="Email or Username"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <div class="mb-4">
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        <div class="flex items-center h-5 mb-4">
          <input
            id="remember"
            type="checkbox"
            value=""
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required
          />
          <label
            for="remember"
            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
          <p @click="toggleForm" class="text-sm text-blue-500 text-right ml-14">
            Forgot your password?
          </p>
        </div>

        <div class="mb-6">
          <button
            type="submit"
            @click="login"
            class="w-full bg-amber-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 focus:outline-none"
          >
            Sign in
          </button>
        </div>

        <p>Don't have an account? <router-link :to="{ name: 'sign-up' }"><a @click="toggleForm" class="text-blue-500 cursor-pointer">Create account here</a>
        </router-link></p>
      </form>
    </div>
  </div>
</template>

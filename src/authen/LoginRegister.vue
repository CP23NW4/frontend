<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const showLogin = ref(true);
const loginData = ref({
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  birthday: "",
  age: 0,
  phoneNumber: "",
});

const toggleForm = () => {
  showLogin.value = !showLogin.value;
};

const passwordsMatch = computed(() => {
  return loginData.value.password === loginData.value.confirmPassword;
});

const checkPasswordMatch = () => {
  if (!passwordsMatch.value) {
    console.log("Passwords do not match.");
  }
};
// const login = () => {
//   console.log("Logging in:", loginData.value);
// };

const register = () => {
  if (loginData.value.password !== loginData.value.confirmPassword) {
    console.log("Passwords do not match.");
    return;
  }
  const birthDate = new Date(loginData.value.birthday);
  a;
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();

  if (age < 18) {
    console.log("You must be at least 18 years old to register.");
    return;
  }
  loginData.age = age;

  console.log("Registering:", loginData.value);
};

const login = async () => {
  const data = {
    email: email.value,
    password: password.value,
  };
  const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/api/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.status === 200) {
    const token = await res.json();
    localStorage.setItem("refreshToken", token.refreshToken);
    localStorage.setItem("accessToken", token.accessToken);
    console.log(token.accessToken);
    console.log(token);
    alert("Login successful!");
    console.log("login successfully");

    location.reload();
  } else if (res.status === 401) {
    alert("Password Incorrect");
    console.log(res.status);
  } else if (res.status === 403) {
    console.log("go to login");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push({
      name: "log-in",
    });
  } else if (res.status === 404) {
    router.push({
      name: "notfound",
    });
    console.log(res.status);
  } else {
    console.log("Error, something went wrong");
    console.error("Error:", res.status, res.statusText);
  }
};


</script>


<template>
  <div class="min-h-screen flex items-center justify-center">
    <!-- left image and right form -->
    <!-- <div class="bg-red p-8 rounded-lg shadow-md bg-slate-50"> -->

    <img src="/mnw.png" class="w-96 drop-shadow-lg" v-if="showLogin" />
    <div>
      <div v-if="showLogin" class="mb-4">
        <a class="flex items-center">
          <img src="/logo3.png" class="h-10 mr-1" alt="Logo" />
          <div class="flex-col justify-start items-start inline-flex">
            <div
              class="text-black text-base font-bold leading-relaxed tracking-tight"
            >
              MEOW & WOOF
            </div>
            <div
              class="text-black text-[10px] font-bold leading-none tracking-tight"
            >
              HOME FINDER
            </div>
          </div>
        </a>
      </div>

      <h2 class="text-2xl font-bold mb-4 text-left">
        {{ showLogin ? "Sign in to your account " : "Create new account" }}
      </h2>
      <form @submit.prevent="showLogin ? login : register" action="#" method="POST">
        <div v-if="showLogin" class="mb-4">
          <div class="mb-4">
            <input
              type="text"
              id="username"
              v-model="loginData.username"
              placeholder="Email or username"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <div class="mb-4">
            <input
              type="password"
              id="password"
              v-model="loginData.password"
              placeholder="Password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
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
              >Remember me</label
            >

            <p
              @click="toggleForm"
              class="text-sm text-blue-500 text-right ml-14"
            >
              <!-- change to forgot password form -->
              Forgot your password?
            </p>
          </div>
        </div>
    <div v-if="!showLogin" class="grid gap-3 mb-4 md:grid-cols-2">
        <!-- <div v-if="!showLogin" class="mb-4 md:grid-cols-2"> -->
          <div>
            <input
              type="text"
              id="firstName"
              v-model="loginData.firstName"
              placeholder="First Name (ภาษาไทย)"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>

          <div>
            <input
              type="text"
              id="lastName"
              v-model="loginData.lastName"
              placeholder="Last Name (ภาษาไทย)"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <input
              type="text"
              id="email"
              v-model="loginData.email"
              placeholder="Email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <input
              type="text"
              id="username"
              v-model="loginData.username"
              placeholder="Username"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              v-model="loginData.password"
              placeholder="Password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <input
              type="password"
              id="confirmPassword"
              v-model="loginData.confirmPassword"
              placeholder="Confirm Password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <input
              type="data"
              id="phoneNumber"
              v-model="loginData.phoneNumber"
              placeholder="Phone number"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
    </div>
    <div v-if="!showLogin" class="mb-4">
          <div>
            <label for="birthday" class="block text-gray-700 font-medium"
              >Date of Birth</label
            >
            <input
              type="date"
              id="birthday"
              v-model="loginData.birthday"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        <div class="mb-6">
          <button
            type="submit"
            class="w-full bg-amber-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 focus:outline-none"
          >
            {{ showLogin ? "Sign in" : "Sign up" }}
          </button>
        </div>

        <p>
          {{
            showLogin ? "Don't have an account?" : "Already have an account?"
          }}
          <a @click="toggleForm" class="text-blue-500 cursor-pointer">
            {{ showLogin ? "Create account here" : "Sign in here" }}
          </a>
        </p>
      </form>
      <p v-if="!showLogin && loginData.age > 0">
        Your age: {{ loginData.age }} years old
      </p>
    </div>
  </div>
  
</template>

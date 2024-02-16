<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { handleAuthentication } from "../composition/auth";
import { calculateAge } from "../composition/validate";

const router = useRouter();
const registerData = ref({
  firstName: '',
  lastName: '',
  phoneNumber: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  birthday: '',
  address: '',
});



const signup = async () => {
  if (calculateAge(registerData.value.birthday) < 18) {
    alert("You must be at least 18 years old to register.");
    return;
  }

  if (registerData.value.password !== registerData.value.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }
  const data = {
    name: `${registerData.value.firstName} ${registerData.value.lastName}`,
    username: registerData.value.username,
    email: registerData.value.email,
    password: registerData.value.password,
    phoneNumber: registerData.value.phoneNumber,
    DOB: registerData.value.birthday,
    address: registerData.value.address,
  };
  await handleAuthentication("/users/register", data, "Sign Up successful!");
};

const onInput = (input) => {
  if (input === 'firstName') {
    isFirstNameFocused.value = true;
  } else if (input === 'lastName') {
    isPasswordFocused.value = true;
  }
};


</script>


<template>
  <div class="mt-10 min-h-screen flex items-center justify-center">

    <div>
      <h2 class="text-2xl font-bold mb-4 text-left">Create new account</h2>
      <form @submit.prevent="register" action="#" method="POST">

        <div class="grid gap-3 mb-4 md:grid-cols-2">
        <!-- First Name -->
        <div class="relative">
          <input
            type="text"
            id="firstName"
            v-model="registerData.firstName"
            placeholder=" "
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            @input="onInput('firstName')"
          />
          <label
            for="email"
            class="absolute left-4 top-2 transition-all text-gray-400 bg-white px-1"
            :class="{ 'text-xs': isFirstNameFocused || registerData.firstName }"
          >
            First Name (ภาษาไทย)
          </label>
        </div>

        <!-- Last Name -->
        <div class="relative">
          <input
            type="text"
            id="lastName"
            v-model="registerData.lastName"
            placeholder=" "
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            @input="onInput('lastName')"
          />
          <label
            for="lastName"
            class="absolute left-4 top-2 transition-all text-gray-400 bg-white px-1"
            :class="{ 'text-xs': isPasswordFocused || registerData.lastName }"
          >
          Last Name (ภาษาไทย)
          </label>
        </div>

          <div>
            <input
              type="text"
              id="email"
              v-model="registerData.email"
              placeholder="Email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <input
              type="text"
              id="username"
              v-model="registerData.username"
              placeholder="Username"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              v-model="registerData.password"
              placeholder="Password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <input
              type="password"
              id="confirmPassword"
              v-model="registerData.confirmPassword"
              placeholder="Confirm Password"
              
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <input
              type="data"
              id="phoneNumber"
              maxlength="10"
              v-model="registerData.phoneNumber"
              placeholder="Phone number"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>
        <div class="mb-4">
          <div>
            <label for="birthday" class="block text-gray-700 font-medium"
              >Date of Birth</label
            >
            <input
              type="date"
              id="birthday"
              v-model="registerData.birthday"
              
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>
        <div class="mb-4">
        <textarea
          v-model="registerData.address"
          placeholder="Address"
          cols="5"
          rows="2"
          maxlength="200"
          class="bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] rounded-lg"
        ></textarea>
      </div>

        <div class="mb-6">
          <button
            type="submit"
            @click="signup"
            class="w-full bg-amber-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-500 focus:outline-none"
          >
            Sign up
          </button>
        </div>
        <p>
          Already have an account?
          <router-link :to="{ name: 'login' }"
            ><a @click="toggleForm" class="text-blue-500 cursor-pointer">
              Sign in here
            </a></router-link
          >
        </p>
      </form>
    </div>
  </div>
</template>
<style scoped>
/* Add any additional styling you need */
input:focus + label,
input:not(:placeholder-shown) + label {
  top: -0.5rem; 
  font-size: 0.75rem; 
  color: #4b5563; 
  transition: top 0.3s ease; 
}
/* input {
  background-color: transparent;
} */
</style>
<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { handleAuthentication } from "../composition/auth";
import { calculateAge } from "../composition/validate";

const router = useRouter();
const registerData = ref({
  firstName: "",
  lastName: "",
  phoneNumber: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  birthday: "",
  userAddress: "",
  idCard: "",
});

const minCount = 0;
const maxCountAddress = 200;

// const registerData = ref({
//   firstName: "",
//   lastName: "",
//   phoneNumber: "",
//   username: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
//   birthday: "",
//   address: "",
//   idCard: "",
// });

const touched = {
  firstName: false,
  lastName: false,
  email: false,
  username: false,
  password: false,
  confirmPassword: false,
  phoneNumber: false,
  birthday: false,
  userAddress: false,
  idCard: false,
};
const showPassword = ref(false);

const isValidThaiFirstName = computed(() => {
  const thaiNameRegex = /^[\u0E01-\u0E5B]+$/;
  return thaiNameRegex.test(registerData.value.firstName);
});
const isValidThaiLastName = computed(() => {
  const thaiNameRegex = /^[\u0E01-\u0E5B]+$/;
  return thaiNameRegex.test(registerData.value.lastName);
});

const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidLength = registerData.value.email.length >= 5 && registerData.value.email.length <= 50;
  return emailRegex.test(registerData.value.email) && isValidLength;
});

const isValidUsername = computed(() => {
  const usernameRegex = /^[a-zA-Z0-9._]+$/;
  return (
    usernameRegex.test(registerData.value.username) &&
    !/\s/.test(registerData.value.username) &&
    registerData.value.username.length >= 5 &&
    registerData.value.username.length <= 20
  );
});

const isValidPassword = computed(() => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,20}$/;
  return passwordRegex.test(registerData.value.password);
});

const isValidPhoneNumber = computed(() => {
  const phoneNumberRegex = /^(09|06|08)\d{8}$/;
  return phoneNumberRegex.test(registerData.value.phoneNumber);
});

const isValidIdCard = computed(() => {
  const idCardRegex = /^\d{13}$/;
  return idCardRegex.test(registerData.value.idCard);
});
const isValidAddress = computed(() => {
  const userAddress = registerData.value.userAddress;
  return userAddress?.length >= 5 && userAddress?.length <= 200;
});


const isValidAge = computed(() => {
  return calculateAge(registerData.value.birthday) >= 18;
});

const isValidForm = computed(() => {
  return (
    isValidThaiFirstName.value &&
    isValidThaiLastName.value &&
    isValidEmail.value &&
    isValidUsername.value &&
    isValidPassword.value &&
    isValidPhoneNumber.value &&
    isValidAge.value &&
    isValidIdCard.value &&
    isValidUserAddress.value
  );
});



const validateFirstName = () => {
  touched.firstName = true;
  if (!isValidThaiFirstName.value) {
  }
};
const validateLastName = () => {
  touched.lastName = true;
  if (!isValidThaiLastName.value) {
  }
};
const validateEmail = () => {
  touched.email = true;
  if (!isValidEmail.value) {
  }
};
const validateUsername = () => {
  touched.username = true;
  if (!isValidUsername.value) {
  }
};

const isPasswordMatch = ref(true);

const validateConfirmPassword = () => {
  touched.confirmPassword = true;
  isPasswordMatch.value = registerData.value.password === registerData.value.confirmPassword;
};

const validatePhoneNumber = () => {
  touched.phoneNumber = true;
  if (!isValidPhoneNumber.value) {
  }
};

const validateIdCard = () => {
  touched.idCard = true;
  if (!isValidIdCard.value) {
  }
};
const validateUserAddress = () => {
  touched.idCard = true;
  if (!isValidUserAddress.value) {
  }
};
const validateAge = () => {
  touched.birthday = true;
  if (!isValidAge.value) {
    alert("You must be at least 18 years old to register.");
  }
};



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
    userAddress: registerData.value.userAddress,
    idCard: registerData.value.idCard,
  };
  await handleAuthentication("/users/register", data, "Sign Up successful!");
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];

  if (file) {
    const maxSizeInBytes = 10 * 1024 * 1024;

    if (file.size <= maxSizeInBytes) {
      registerData.value.picture = file;
      console.log(registerData.value.picture);
    } else {
      alert("File size exceeds the limit (1MB). Please choose a smaller file.");
    }
  }
};


</script>


<template>
  <div class="mt-10 min-h-screen flex items-center justify-center">
    <div>
      <h2 class="text-2xl font-bold mb-4 text-left">Create new account</h2>
      <form @submit.prevent="signup" action="#" method="POST">
        <div class="grid gap-3 mb-4 md:grid-cols-1">
<!-- <label class="block text-sm font-medium text-gray-900 dark:text-white text-left" for="file_input">Upload Picture</label>
<input @change="handleFileUpload" class="mb-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"> -->
</div>
        <div class="grid gap-3 mb-4 md:grid-cols-2">
          <!-- First Name -->
          <div class="relative">
            <input
              type="text"
              id="firstName"
              v-model="registerData.firstName"
              @input="validateFirstName"
              placeholder=" "
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
            <label
              for="firstName"
              class="absolute left-4 top-2 transition-all text-gray-400 bg-white px-1"
              :class="{ 'text-xs': registerData.firstName }"
            >
              First Name (ภาษาไทย)
            </label>
            <span v-if="!isValidThaiFirstName && touched.firstName" class="text-red-500 text-xs absolute left-4 bottom-0">
              Must be in Thai language
            </span>
          </div>

          <!-- Last Name -->
          <div class="relative">
            <input
              type="text"
              id="lastName"
              v-model="registerData.lastName"
              @input="validateLastName"
              placeholder=" "
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
            <label
              for="lastName"
              class="absolute left-4 top-2 transition-all text-gray-400 bg-white px-1"
              :class="{ 'text-xs': registerData.lastName }"
            >
              Last Name (ภาษาไทย)
            </label>
            <span v-if="!isValidThaiLastName && touched.lastName" class="text-red-500 text-xs absolute left-4 bottom-0">
              Must be in Thai language
            </span>
          </div>
          <!-- Email -->
          <div class="relative">
            <input
              type="text"
              id="email"
              v-model="registerData.email"
              @input="validateEmail"
              placeholder=" "
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
            <label
              for="email"
              class="absolute left-4 top-2 transition-all text-gray-400 bg-white px-1"
              :class="{ 'text-xs': registerData.email }"
            >
              Email
            </label>
            <span v-if="!isValidEmail && touched.email" class="text-red-500 text-xs absolute left-4 bottom-0">
              Please enter a valid email.
            </span>
          </div>
          <!-- Username -->
          <div class="relative">
            <input
              type="text"
              id="username"
              v-model="registerData.username"
              @input="validateUsername"
              placeholder=" "
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
            <label
              for="username"
              class="absolute left-4 top-2 transition-all text-gray-400 bg-white px-1"
              :class="{ 'text-xs': registerData.username }"
            >
              Username
            </label>
            <span v-if="!isValidUsername && touched.username" class="text-red-500 text-xs absolute left-4 bottom-0">
              Must be 5-20 characters
            </span>
          </div>
<!-- Password -->
<div class="relative">
  <input
    :type="showPassword ? 'text' : 'password'"
    id="password"
    v-model="registerData.password"
    @input="validatePassword"
    placeholder=" "
    required
    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
  />
  <label
    for="password"
    class="absolute left-4 top-2 transition-all text-gray-400 bg-white px-1"
    :class="{ 'text-xs': registerData.password }"
  >
    Password
  </label>
  <button
    @click="showPassword = !showPassword"
    class="absolute right-4 top-2 text-gray-400 focus:outline-none"
  >
    {{ showPassword ? 'Hide' : 'Show' }}
  </button>
</div>

<!-- Confirm Password -->
<div class="relative">
  <input
    :type="showPassword ? 'text' : 'password'"
    id="confirmPassword"
    v-model="registerData.confirmPassword"
    @input="validateConfirmPassword"
    placeholder=" "
    required
    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
  />
  <label
    for="confirmPassword"
    class="absolute left-4 top-2 transition-all text-gray-400 bg-white px-1"
    :class="{ 'text-xs': registerData.confirmPassword }"
  >
    Confirm Password
  </label>
  <span v-if="!isPasswordMatch && touched.confirmPassword" class="text-red-500 text-xs absolute left-4 bottom-0">
    Passwords do not match.
  </span>
</div>


          <!-- phone number -->
          <div class="relative">
            <input
              type="text"
              id="phoneNumber"
              v-model="registerData.phoneNumber"
              @input="validatePhoneNumber"
              maxlength="10"
              placeholder=" "
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
            <label
              for="phoneNumber"
              class="absolute left-4 top-2 transition-all text-gray-400 bg-white px-1"
              :class="{ 'text-xs': registerData.phoneNumber }"
            >
              Phone Number
            </label>
            <span v-if="!isValidPhoneNumber && touched.phoneNumber" class="text-red-500 text-xs absolute left-4 bottom-0">
              Invalid phone number format.
            </span>
          </div>

          <div class="relative">
            <input
              type="text"
              id="idCard"
              v-model="registerData.idCard"
              @input="validateIdCard"
              maxlength="13"
              placeholder=" "
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
            <label
              for="idCard"
              class="absolute left-4 top-2 transition-all text-gray-400 bg-white px-1"
              :class="{ 'text-xs': registerData.idCard }"
            >
              ID Card
            </label>
            <span v-if="!isValidIdCard && touched.idCard" class="text-red-500 text-xs absolute left-4 bottom-0">
              ID Card Must be 13 digits.
            </span>
          </div>

          <!-- dob  -->
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
              @input="validateAge"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>
        <!-- addess -->
        <div class="relative mb-4">
          <input
            type="text"
            id="userAddress"
            v-model="registerData.userAddress"
            placeholder=" "
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
          />
          <label
            for="userAddress"
            class="absolute left-4 top-2 transition-all text-gray-400 bg-white px-1"
            :class="{ 'text-xs': registerData.userAddress }"
          >
            Address
          </label>
          <span class="text-xs ml-[95%] text-gray-400"
          >{{
            minCount + (registerData.userAddress ? registerData.userAddress.length : 0)
          }}/{{ maxCountAddress }}</span
        >
        </div>
        <!-- addess -->
        <!-- <div class="relative mb-4">
        <textarea
          v-model="registerData.address"
          id="address"
          placeholder=" "
          cols="5"
          rows="2"
          maxlength="200"
          class="bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] rounded-lg"
        ></textarea>
        <label
            for="address"
            class="absolute left-4 top-2 transition-all text-gray-400 bg-white px-1"
            :class="{ 'text-xs': registerData.address }"
          >Address
        </label>
      </div> -->

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
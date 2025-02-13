<template>
  <div class="flex items-center justify-center h-screen bg-white">
    <div class="flex w-[1000px] h-[90%] shadow-lg rounded-lg overflow-hidden border-2 border-gray-300">
      <!-- Welcome Section -->
      <div
        class="relative flex-1 bg-cover bg-center text-white p-8"
        :style="{ backgroundImage: `url(${imageUrl})` }"
      >
        <div class="absolute inset-0 bg-black bg-opacity-40 rounded-l-lg"></div>
        <div class="relative z-10 max-w-sm flex items-center justify-center flex-col mt-[240px]">

          <h1 class="text-[40px] font-bold">Welcome</h1>
          <h3 class="text-[20px] pl-2">To Ex Stay.</h3>

          <div class="flex space-x-4 text-[20px] pl-2">
            <a href="https://www.linkedin.com" target="_blank">
              <font-awesome-icon :icon="['fab', 'linkedin']" class="cursor-pointer hover:text-blue-600" />
            </a>
            <a href="https://www.facebook.com" target="_blank">
              <font-awesome-icon :icon="['fab', 'facebook']" class="cursor-pointer hover:text-blue-500" />
            </a>
            <a href="https://www.instagram.com" target="_blank">
              <font-awesome-icon :icon="['fab', 'instagram']" class="cursor-pointer hover:text-pink-500" />
            </a>
            <a href="https://www.twitter.com" target="_blank">
              <font-awesome-icon :icon="['fab', 'twitter']" class="cursor-pointer hover:text-blue-400" />
            </a>
          </div>
        </div>
      </div>

      <!-- Login Section -->
      <div class="flex-1 flex flex-col justify-center items-center bg-white p-8 rounded-r-lg">
        <h2 class="text-[50px] font-semibold mb-4">Log In</h2>
        <form @submit.prevent="submit" class="w-full flex flex-col space-y-4">
          <div class="relative w-full">
            <label class="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              v-model="email"
              type="text"
              required
              placeholder="johndoe@email.com"
              class="w-[500px] border border-gray-400 shadow-md focus:shadow-md rounded-md py-2 pl-10 pr-3"
            />
            <font-awesome-icon :icon="['fas', 'envelope']" class="absolute left-3 top-9 transform -translate-y-1/2 text-gray-500" />
          </div>

          <div class="relative w-full">
            <label class="block text-gray-700 text-sm font-medium mb-1">Password</label>
            <input
              v-model="password"
              type="password"
              required
              placeholder="••••••"
              class="w-[500px] border border-gray-400 shadow-md focus:shadow-md rounded-md py-2 pl-10 pr-3"
            />
            <font-awesome-icon :icon="['fas', 'lock']" class="absolute left-3 top-9 transform -translate-y-1/2 text-gray-500" />
          </div>

          <button
            type="submit"
            :disabled="session.login.loading"
            class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
          >
            {{ session.login.loading ? "Logging in..." : "Login" }}
          </button>

          <div class="flex items-center justify-between">
            <p class=" text-sm">
            Don't have an account? 
            <router-link to="/signup" class="text-green-600 font-bold hover:underline">Sign Up</router-link>
            </p>

            <router-link to="/forgot_password" class="text-sm text-green-600 font-bold hover:underline">Forgot Password?</router-link>
          </div>

          <!-- !Error Message -->
          <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { session } from '../data/session'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import beachImage from '@/assets/images/beachvue.jpg' // Ensure correct path

const email = ref("")
const password = ref("")
const imageUrl = ref(beachImage) // Assign the imported image to a reactive variable
const errorMessage = ref(null)


// Register icons globally
library.add(faEnvelope, faLock, faFacebook, faInstagram, faLinkedin, faTwitter)

async function submit() {
  if (!email.value || !password.value) {
    errorMessage.value = "Email and password are required.";
    return;
  }

  try {
    await session.login.submit({
      email: email.value,
      password: password.value,
    });
  } catch (error) {
    handleLoginError(error);
  }
}

function handleLoginError(error) {
  if (error.response && error.response.data) {
    errorMessage.value = error.response.data.message || "Invalid Credentials, Please try again.";
  } else {
    errorMessage.value = "Invalid Credentials, Please try again.";
  }
}


</script>

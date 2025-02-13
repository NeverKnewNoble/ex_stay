<template>
  <div class="flex items-center justify-center h-screen bg-white">
      <div class="flex w-[1000px] h-[90%] shadow-lg rounded-lg overflow-hidden border-2 border-gray-300">
          <!-- Welcome Section -->
          <div class="relative flex-1 bg-cover bg-center text-white p-8" :style="{ backgroundImage: `url(${imageUrl})` }">
              <div class="absolute inset-0 bg-black bg-opacity-40 rounded-l-lg"></div>
              <div class="relative z-10 max-w-sm"></div>
          </div>

          <!-- Reset Password Section -->
          <div class="flex-1 flex flex-col justify-center items-center bg-white p-8 rounded-r-lg">
              <h2 class="text-[50px] font-semibold mb-4">Forgot Password</h2>
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

                  <button
                      type="submit"
                      class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
                      :disabled="loading"
                  >
                      {{ loading ? "Sending Email..." : "Reset Password" }}
                  </button>

                  <div class="flex items-center justify-between">
                      <p class="text-sm">
                          <router-link to="/account/login" class="text-sm text-green-600 font-bold hover:underline">Back To Login</router-link>
                      </p>
                  </div>

                    <!-- !Error Message -->
                    <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
              </form>
          </div>
      </div>

      <!-- Success Popup Modal -->
      <div v-if="showSuccessPopup" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div class="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
              <h2 class="text-green-600 text-xl font-bold mb-4">Please Check Your Email!</h2>
              <p class="text-gray-700 mb-2">An email has been sent to you with instructions to reset your password.</p>
              <p class="text-gray-500 text-sm mb-4">If you can't find the email, please check your spam folder.</p>
              <button
                  @click="goToLogin"
                  class="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
              >
                  Go to Login Page
              </button>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import beachImage from '@/assets/images/beachvue.jpg' // Ensure correct path
import axios from 'axios'

const router = useRouter()
const email = ref("")
const loading = ref(false)
const showSuccessPopup = ref(false)  // Popup visibility state
const imageUrl = ref(beachImage) // Assign the imported image to a reactive variable
const errorMessage = ref(null)

// Register icons globally
library.add(faEnvelope, faFacebook, faInstagram, faLinkedin, faTwitter)


async function submit() {
    loading.value = true;
    try {
        const response = await axios.post(
            'http://127.0.0.1:8000/api/method/ex_stay.api.forgot_password.forgot_password',
            { email: email.value },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );


        if (response.data.message.status === "success") {
            showSuccessPopup.value = true; // ✅ Show popup when successful
        } else {
            handleLoginError(error);
        }
    } catch (error) {
        handleLoginError(error);
    } finally {
        loading.value = false;
    }
}

function handleLoginError(error) {
  if (error.response && error.response.data) {
    errorMessage.value = error.response.data.message || "Check Your Email, Please try again.";
  } else {
    errorMessage.value = "Check Your Email, Please try again.";
  }
}

// Function to navigate to login page
function goToLogin() {
  showSuccessPopup.value = false;
  router.push('/account/login')
}
</script>

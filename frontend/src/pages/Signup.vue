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
            <h1 class="text-3xl font-bold">Welcome to our community</h1>
            <p class="mt-2 text-sm">Enter your personal details and start your journey with us</p>
            <div class="flex space-x-4 mt-2 text-lg">
                <a href="https://www.facebook.com" target="_blank">
                <font-awesome-icon :icon="['fab', 'facebook']" class="cursor-pointer hover:text-blue-500" />
                </a>
                <a href="https://www.twitter.com" target="_blank">
                <font-awesome-icon :icon="['fab', 'twitter']" class="cursor-pointer hover:text-blue-400" />
                </a>
                <a href="https://www.google.com" target="_blank">
                <font-awesome-icon :icon="['fab', 'google']" class="cursor-pointer hover:text-red-500" />
                </a>
                <a href="https://www.linkedin.com" target="_blank">
                <font-awesome-icon :icon="['fab', 'linkedin']" class="cursor-pointer hover:text-blue-600" />
                </a>
            </div>
            </div>
        </div>

        <!-- Signup Section -->
        <div class="flex-1 flex flex-col justify-center items-center bg-white p-8 rounded-r-lg">
            <h2 class="text-[50px] font-semibold mb-4">Sign Up</h2>
            <form @submit.prevent="submitForm" class="w-full flex flex-col space-y-4">
            <div class="relative w-full">
                <label class="block text-gray-700 text-sm font-medium mb-1">First Name</label>
                <input
                v-model="firstName"
                type="text"
                required
                placeholder="Enter your first name"
                class="w-[500px] border border-gray-400 focus:border-gray-400 shadow-md rounded-md py-2"
                />
            </div>
            <div class="relative w-full">
                <label class="block text-gray-700 text-sm font-medium mb-1">Last Name</label>
                <input
                v-model="lastName"
                type="text"
                required
                placeholder="Enter your last name"
                class="w-[500px] border border-gray-400 focus:border-gray-400 shadow-md rounded-md py-2"
                />
            </div>
            <div class="relative w-full">
                <label class="block text-gray-700 text-sm font-medium mb-1">Email</label>
                <input
                v-model="email"
                type="email"
                required
                placeholder="Enter your email"
                class="w-[500px] border border-gray-400 focus:border-gray-400 shadow-md rounded-md py-2"
                />
            </div>
            <div class="relative w-full">
                <label class="block text-gray-700 text-sm font-medium mb-1">Password</label>
                <input
                v-model="password"
                type="password"
                required
                placeholder="Enter your password"
                class="w-[500px] border border-gray-400 focus:border-gray-400 shadow-md rounded-md py-2"
                />
            </div>

            <button
                type="submit"
                class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                :disabled="loading"
            >
                {{ loading ? "Creating Account..." : "Sign Up" }}
            </button>

            <p class="mt-4 text-sm">
                Already have an account? 
                <router-link to="/account/login" class="text-green-600 font-bold hover:underline">Log in</router-link>
            </p>

            <!-- <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p> -->
            <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage['message'] }}</p>
            </form>
        </div>
        </div>

        <!-- Success Popup Modal -->
        <div v-if="showSuccessPopup" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 class="text-green-600 text-xl font-bold mb-4">Account Created Successfully!</h2>
            <p class="text-gray-700 mb-4">Your account has been created. Please log in to continue.</p>
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
    import { session } from "../data/session"
    import { createResource } from "frappe-ui";
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
    import { faFacebook, faTwitter, faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import beachImage from '@/assets/images/beachvue.jpg' // Ensure correct path

    const router = useRouter()

    const firstName = ref("")
    const lastName = ref("")
    const email = ref("")
    const password = ref("")
    const loading = ref(false)
    const errorMessage = ref("")
    const showSuccessPopup = ref(false)
    const imageUrl = ref(beachImage) // Assign the imported image to a reactive variable

    // Register icons globally
    library.add(faUser, faEnvelope, faLock, faFacebook, faTwitter, faGoogle, faLinkedin)


    async function submitForm() {
    loading.value = true;
    errorMessage.value = '';
    showSuccessPopup.value = false;

    try {
        console.log('Submitting signup form...');

        const response = await session.signup.fetch({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        });

        if (response && response.status === 'success') {
        showSuccessPopup.value = true;

        // Clear form fields
        firstName.value = '';
        lastName.value = '';
        email.value = '';
        password.value = '';

        // Redirect to login page after success
        setTimeout(() => {
            router.push('/account/login');
        }, 2000);
        } else {
        errorMessage.value = response.message || 'Failed to create user. Please try again.';
        }
    } catch (error) {
        console.error('🚨 Unable to create user:', error);
        errorMessage.value = error.message || 'An unexpected error occurred.';
    } finally {
        loading.value = false;
    }
    }


// Redirect to login page
function goToLogin() {
    showSuccessPopup.value = false;
    router.push("/account/login");
}
</script>

<template>
  <nav class="bg-white py-2 w-full max-w-screen-lg mx-auto rounded-sm px-4 md:px-20">
    <div class="flex justify-between items-center">
      <div>
        <router-link to="/">
          <img src="../../assets/images/logogreencp.png" alt="logo" class="w-[140px]">
        </router-link>
      </div>
      <div class="flex items-center gap-2">
        <!-- Desktop Menu -->
        <ul class="hidden md:flex mr-2">
          <li class="inline-block px-2 hover:text-[#7ebd9c] cursor-pointer ">CATALOGS</li>
        </ul>
        <!-- Mobile Menu Button -->
        <button class="md:hidden p-2" @click="toggleMenu">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <!-- Login and Sign Up buttons -->
        <button
          @click="logout"
          class="border px-6 py-2 rounded-sm cursor-pointer bg-[#7ebd9c] text-white transition-colors hover:bg-white hover:border-black  hover:text-black"
        >Logout
        </button>
        

      </div>
    </div>
    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden bg-white shadow-md rounded-sm">
      <ul class="flex flex-col">
        <li class="px-4 py-2 hover:text-[#7ebd9c] cursor-pointer font-semibold">HOME</li>
        <li class="px-4 py-2 hover:text-[#7ebd9c] cursor-pointer font-semibold">CATALOGS</li>
      </ul>
    </div>
  </nav>
</template>



<script>
import axios from 'axios';

export default {
  name: 'NavBarComponent',
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    async logout() {
      try {
        // Call the Frappe logout API
        await axios.post('/api/method/logout', {}, { withCredentials: true });

        // Clear stored authentication tokens
        localStorage.removeItem('token');
        sessionStorage.clear(); // Clears session storage if used

        // Redirect user to login page
        this.$router.push('/account/login');

        // Force reload to ensure a clean session
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
  },
};
</script>

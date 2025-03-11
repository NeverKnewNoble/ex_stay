<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
      <!-- Navbar -->
      <Navbar class="shadow-md" />
        
          <!-- Floating Notification -->
        <div class="fixed top-20 right-5 z-50 w-100">
        <transition name="fade">
            <!-- Booking Alert -->
            <n-alert v-if="alertMessage" :type="alertType" closable @close="alertMessage = null">
            {{ alertMessage }}
            </n-alert>
        </transition>
        </div>

      <!-- Main Content -->
      <main class="flex-grow pt-20 pb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Bookings Card -->
          <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <!-- Header Section -->
            <div class="p-6 bg-green-600 text-white">
              <h1 class="text-2xl font-semibold">My Bookings</h1>
            </div>

            <!-- Bookings List -->
            <div class="p-6">
              <div v-if="loading" class="text-center text-gray-500">Loading bookings...</div>
              <div v-else-if="filteredBookings.length === 0" class="text-center text-gray-500">
                <p>No bookings found.</p>
              </div>
              <div v-else>
                <div
                  v-for="booking in filteredBookings"
                  :key="booking.name"
                  class="mb-6 border-b pb-6 last:border-b-0 flex flex-col md:flex-row items-center md:items-start gap-6"
                >
                  <!-- Property Image -->
                  <img
                    :src="booking.profile_picture_import"
                    alt="Property Image"
                    class="w-full max-w-[200px] h-[200px] object-cover rounded-lg shadow-sm border"
                  />

                  <!-- Booking Details -->
                  <div class="flex-grow w-full">
                    <div class="flex flex-col md:flex-row justify-between items-start">
                      <!-- Left Section -->
                      <div class="w-full">
                        <h2 class="text-xl font-semibold text-gray-500 mb-2">{{ booking.name }}</h2>
                        <h2 class="text-xl font-semibold">{{ booking.title }}</h2>
                        <p class="text-gray-600">{{ booking.country }} | {{ booking.city }} | {{ booking.location }}</p>
                        <p class="text-gray-700 mt-2">Guests: {{ booking.guests }}</p>
                        <p class="text-gray-700">Check-in: {{ booking.check_in }}</p>
                        <p class="text-gray-700">Check-out: {{ booking.check_out }}</p>
                        <p class="text-gray-700">Nights: {{ booking.no_of_nights }}</p>
                      </div>

                      <!-- Status & Cancel Button -->
                      <div class="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0 w-full">
                        <span
                          :class="{
                            'text-green-800 bg-green-400 rounded-full text-sm py-2 px-4': booking.status === 'Confirmed',
                            'text-yellow-800 bg-yellow-400 rounded-full text-sm py-2 px-4': booking.status === 'Pending',
                            'text-red-800 bg-red-400 rounded-full text-sm py-2 px-4': booking.status === 'Cancelled',
                          }"
                          class="font-semibold text-xs md:text-sm w-full text-center"
                        >
                          {{ booking.status }}
                        </span>
                        <button
                          @click="cancelMyBooking.submit(booking.name)"
                          class="bg-red-500 text-white px-2 py-2 rounded-lg text-xs md:text-sm font-semibold hover:bg-red-600 w-full text-center"
                        >
                          {{ loading ? "Cancelling..." : "Cancel" }}
                        </button>
                      </div>
                    </div>

                    <!-- Price Details -->
                    <div class="mt-4 flex justify-end md:text-right text-center">
                      <div>
                        <p class="text-gray-600 text-sm">
                          <span class="font-semibold text-[18px] md:text-[20px]">
                            {{ booking.currency }} {{ booking.price_per_night }}
                          </span> 
                          night
                        </p>
                        <p class="text-green-600 text-lg font-semibold pt-3">
                          Total Price: {{ booking.currency }} {{ Number(booking.price_per_night) * Number(booking.no_of_nights) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

  
      <!-- Footer -->
      <FooterComponent class="mt-auto" />
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from "vue";
  import { useFetchMyBookings } from "../components/utility/my_bookings_page/getMyBookings";
  import Navbar from "@/components/elements/navbar.vue";
  import FooterComponent from "@/components/elements/footer.vue";
  import { session } from "../data/session";

  
  export default {
    components: {
      Navbar,
      FooterComponent,
    },
    setup() {
      const { FetchMyBookings, cancelMyBooking, alertMessage, alertType  } = useFetchMyBookings();
      const bookings = ref([]);
      const loading = ref(true);
      const userEmail = computed(() => session.user || ""); // Ensure we get the logged-in user's email
  
      onMounted(async () => {
        loading.value = true;
        bookings.value = await FetchMyBookings();
        loading.value = false;
      });

  
      // Filter bookings based on userEmail
      const filteredBookings = computed(() => {
        return bookings.value.filter(booking => booking.email === userEmail.value);
      });

  
      return {
        bookings,
        filteredBookings,
        loading,
        userEmail,
        alertMessage,
        alertType,
        cancelMyBooking
      };
    },
  };
  </script>

  
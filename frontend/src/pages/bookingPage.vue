<template lang="">
  <div class="w-full h-screen bg-white text-black">
    <!-- **Navbar -->
    <div
      :class="[
        isScrollingDown ? '-translate-y-full' : 'translate-y-0',
        ' w-full transition-transform duration-500 ease-in-out z-50 border-b-2 border-b-bg-gray-300 bg-white shadow-md'
      ]"
    >
      <NavBar/>
    </div>

    <!-- **Image Of Property -->
    <section class="w-full bg-white relative overflow-hidden px-[194px] ">
      <!-- Carousel Section -->
      <n-carousel
        effect="custom"
        :transition-props="{ name: 'creative' }"
        show-arrow
        class="shadow-md overflow-hidden"
        style="width: 100%; height: 500px"
      >
        <img
          class="w-full h-full object-cover min-h-[300px] sm:min-h-[400px] md:min-h-[500px]"
          src="../assets/images/savvana.jpg"
          alt="Destination 1"
        />
        <img
          class="w-full h-full object-cover min-h-[300px] sm:min-h-[400px] md:min-h-[500px]"
          src="../assets/images/sundown.jpg"
          alt="Destination 2"
        />
        <img
          class="w-full h-full object-cover min-h-[300px] sm:min-h-[400px] md:min-h-[500px]"
          src="../assets/images/beachvue.jpg"
          alt="Destination 3"
        />
        <img
          class="w-full h-full object-cover min-h-[300px] sm:min-h-[400px] md:min-h-[500px]"
          src="../assets/images/homebanner.jpg"
          alt="Destination 4"
        />
      </n-carousel>


    </section>


    <!-- ***Booking Content -->
    <section class="bg-white py-10 px-40 w-full min-h-[600px]">
      <div class=" flex items-center justify-center mx-auto">
        <!-- Left Section: Property Details -->
        <div class="min-w-lg py-10 px-10">
          <h1 class="text-3xl font-bold mb-3">Savanna Beach, Luxury Apartment.</h1>
          <p class="text-gray-700 mb-3">4 guests · 1 bedroom · 3 beds · 1 bath</p>

          <n-divider />
          <!-- Host Info -->
          <div class="flex items-center gap-3 mb-6">
            <img
              src="../assets/images/logoblack.png"
              alt="Host"
              class="w-12 border h-12 rounded-full"
            />
            <span class="text-gray-700 font-medium">Hosted By Larry-Noble</span>
          </div>

          <n-divider />
          <!-- What This Place Offers -->
          <h2 class="font-bold mb-3">What this place offers</h2>
          <div class="grid grid-cols-2 gap-3 text-gray-700">
            <p class="flex items-center gap-2"><i class="fas fa-utensils"></i> Kitchen</p>
            <p class="flex items-center gap-2"><i class="fas fa-wifi"></i> Wifi</p>
            <p class="flex items-center gap-2"><i class="fas fa-laptop"></i> Dedicated workspace</p>
            <p class="flex items-center gap-2"><i class="fas fa-parking"></i> Free parking on premises</p>
            <p class="flex items-center gap-2"><i class="fas fa-swimming-pool"></i> Shared pool</p>
            <p class="flex items-center gap-2"><i class="fas fa-paw"></i> Pets allowed</p>
            <p class="flex items-center gap-2"><i class="fas fa-tv"></i> TV</p>
            <p class="flex items-center gap-2"><i class="fas fa-washer"></i> Washer</p>
          </div>
        </div>



        <!-- **Right Section: Booking Card -->
        <div class="bg-white rounded-lg shadow-md p-6 border ">
          <!-- Date Selection -->
          <div class="mb-4">
            <div class="flex items-center mb-2">
              <div>Check In</div>
              <div class="ml-48">Check Out</div>
            </div>
            <div class="flex items-center">
              <!-- **Naive UI Date Picker -->
              <n-date-picker v-model:value="range" type="daterange" clearable class="text-black"/>
            </div>
          </div>

          <!-- Guest Selection -->
          <div class="mb-15">
            <label class="block text-sm text-gray-600">Guests</label>
            <div class="flex items-center w-full py-2">
            <GuestDropdown />
            </div>
          </div>

          <!-- Price Section -->
          <div class="text-2xl font-bold mb-1">GH₵ 15,000 <span class="text-gray-500 text-lg">/ night</span></div>
          <p class="text-gray-500 mb-4">Total before taxes: <span class="font-semibold">GH₵ 14,800</span></p>

          <!-- Reserve Button -->
          <button class="w-full bg-[#7ebd9c] text-white py-2 px-4 rounded-md hover:bg-[#6ea589] transition">
            Reserve
          </button>
        </div>
      </div>
    </section>

    <!-- **Footer -->
    <FooterComponent/>
  </div>
</template>


<script>
import FooterComponent from '../components/elements/footer.vue';
import NavBar from '../components/elements/navbar.vue';
import GuestDropdown from '../components/widgets/guests.vue';
import { ref, onMounted, onUnmounted } from "vue";

export default {
  name: "BookingPage",
  components: {
    NavBar,
    FooterComponent,
    GuestDropdown,
  },
  setup() {
    const isScrollingDown = ref(false);
    let lastScrollY = 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (Math.abs(currentScrollY - lastScrollY) > 10) {  // Small threshold to ignore minor scrolls
            isScrollingDown.value = currentScrollY > lastScrollY;
            lastScrollY = currentScrollY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      isScrollingDown,
    };
  },
};
</script>



<style scoped>
  /* Custom transition effects for creative entrance and exit */
  :deep(.creative-enter-from),
  :deep(.creative-leave-to) {
  opacity: 0;
  transform: scale(0.8);
  }

  :deep(.creative-enter-active),
  :deep(.creative-leave-active) {
  transition: all 0.4s ease-in-out;
  }
</style>


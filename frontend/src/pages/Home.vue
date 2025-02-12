<template>
  <div class="w-full h-screen bg-gray-200 text-black">
    <!-- **Main Banner -->
    <section class="w-full h-[680px] relative">
      <!-- Background Image -->
      <img
        src="../assets/images/mountaintroup.jpg"
        class="w-full h-full object-cover"
        alt="homebanner"
      />

      <!-- Navbar -->
      <div class="absolute top-2 left-0 w-full">
        <Navbar />
      </div>

      <!-- Search Bar -->
      <div class="absolute top-[500px] left-0 w-full flex items-center justify-center ">
        <div class="relative">
          <!-- Input Field -->
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search For Your Destination"
            class="bg-gray-100 sm:w-[680px] md:w-[800px] lg:w-[950px] h-[36px] transition rounded-full pl-5 pr-12 focus:border-none outline-none !important"
            
          />

          <!-- Search Button -->
          <button
            type="submit"
            aria-label="Search"
            class="w-[42px] h-[42px] absolute right-[4px] top-1/2 transform -translate-y-1/2 bg-[#7ebd9c] rounded-full flex items-center justify-center hover:bg-[#6daa8b] transition-colors"
          >
            <!-- Search Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- **Filters -->
    <section class="flex bg-white justify-center items-center h-auto">
      <div class="flex bg-gray-100 p-4 shadow-lg rounded-lg mt-10 h-auto">
        <div class="flex items-center justify-center gap-2">
          <div class="flex items-center">
            <!-- **Naive UI Date Picker -->
            <n-date-picker v-model:value="range" type="daterange" clearable class="text-black"/>
          </div>
          <div class="flex items-center">
            <GuestDropdown />
          </div>
        </div>
      </div>
    </section>

    <!-- **Places -->
    <section class="w-full bg-white min-h-screen pt-10 px-15 pb-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-x-2">
        <!-- Listing 1 -->
        <router-link to="/booking" class="cursor-pointer">
          <listingCard
            location="Accra, Ghana"
            :distance="25"
            price="GH₵499"
            imageUrl="../../assets/images/savvana.jpg"
          />
        </router-link>
        <!-- Listing 2 -->
        <listingCard
          location="Accra, Ghana"
          :distance="25"
          price="GH₵499"
          imageUrl="../../assets/images/sundown.jpg"
        />
        <!-- Listing 3 -->
        <listingCard
          location="Accra, Ghana"
          :distance="25"
          price="GH₵499"
          imageUrl="../../assets/images/beachvue.jpg"
        />
        <!-- Listing 4 -->
        <listingCard
          location="Accra, Ghana"
          :distance="25"
          price="GH₵499"
          imageUrl="../../assets/images/homebanner.jpg"
        />
        <!-- Listing 1 -->
        <listingCard
          location="Accra, Ghana"
          :distance="25"
          price="GH₵499"
          imageUrl="../../assets/images/savvana.jpg"
        />
        <!-- Listing 2 -->
        <listingCard
          location="Accra, Ghana"
          :distance="25"
          price="GH₵499"
          imageUrl="../../assets/images/savvana.jpg"
        />
        <!-- Listing 3 -->
        <listingCard
          location="Accra, Ghana"
          :distance="25"
          price="GH₵499"
          imageUrl="../../assets/images/savvana.jpg"
        />
        <!-- Listing 4 -->
        <listingCard
          location="Accra, Ghana"
          :distance="25"
          price="GH₵499"
          imageUrl="../../assets/images/savvana.jpg"
        />
      </div>
      <div class="flex items-center justify-center pt-15">
        <n-pagination v-model:page="page" :page-count="100" />
      </div>
    </section>

    <!-- **Footer -->
    <FooterComponent />

  </div>
</template>


<script>
import Navbar from '../components/elements/navbar.vue'; 
import GuestDropdown from '../components/widgets/guests.vue'; 
import listingCard from '../components/widgets/listingCard.vue';
import FooterComponent from '../components/elements/footer.vue'
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: 'HomePage',
  components: {
    Navbar,
    GuestDropdown,
    listingCard,
    FooterComponent
  },
  setup() {
    const page = ref(2);


    return {
      page,
    };
  }
});

</script>

<style>
html, body {
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}
</style>
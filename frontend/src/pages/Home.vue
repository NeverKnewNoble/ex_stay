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
      <div class="absolute top-[500px] left-0 w-full flex items-center justify-center">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search For Your Destination"
            class="bg-gray-100 sm:w-[680px] md:w-[950px] lg:w-[950px] py-[12px] focus:bg-white border-none transition rounded-full pl-5 pr-12 focus:border-none"
          />
          <button
            @click="searchProperties"
            class="w-[42px] h-[42px] absolute right-[4px] top-1/2 transform -translate-y-1/2 bg-[#7ebd9c] rounded-full flex items-center justify-center hover:bg-[#6daa8b] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- **Places -->
    <section class="w-full bg-white min-h-screen pt-10 px-15 pb-20">
      <h2 class="text-[50px] mt-[100px] font-semibold text-center text-green-600 mb-10">
        Experience Comfort Like Never Before
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-x-2">
        <listingCard
          v-for="property in paginatedProperties"
          :key="property.item_code"
          :title="property.custom_title"
          :address="property.custom_location"
          :location="property.custom_city"
          :country="property.custom_country"
          :price="property.rate || 'N/A'"
          :currency="property.currency || 'N/A'"
          :imageUrl="getImageUrl(property.custom_profile_picture)"
          @click="goToBookingPage(property)"
        />
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-center pt-15">
        <n-pagination v-model:page="page" :page-count="totalPages" />
      </div>
    </section>

    <!-- Search Results Modal -->
    <div v-if="showSearchResults" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white rounded-lg p-6 max-w-4xl w-full shadow-lg relative">
        <button @click="closeSearchResults" class="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
          ✖
        </button>
        <h2 class="text-2xl font-semibold text-green-600 text-center mb-5">
          Results for "{{ searchQuery }}"
        </h2>
        <div v-if="filteredProperties.length">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <listingCard
              v-for="property in filteredProperties"
              :key="property.item_code"
              :title="property.custom_title"
              :address="property.custom_location"
              :location="property.custom_city"
              :country="property.custom_country"
              :price="property.rate || 'N/A'"
              :currency="property.currency || 'N/A'"
              :imageUrl="getImageUrl(property.custom_profile_picture)"
              @click="goToBookingPage(property)"
            />
          </div>
        </div>
        <p v-else class="text-center text-gray-500">No results found.</p>
      </div>
    </div>

    <!-- **Footer -->
    <FooterComponent />
  </div>
</template>

<script>
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Navbar from "../components/elements/navbar.vue";
import listingCard from "../components/widgets/listingCard.vue";
import FooterComponent from "../components/elements/footer.vue";

export default {
  name: "HomePage",
  components: {
    Navbar,
    listingCard,
    FooterComponent,
  },
  setup() {
    const properties = ref([]);
    const page = ref(1);
    const perPage = ref(8);
    const router = useRouter();
    const searchQuery = ref("");
    const showSearchResults = ref(false);
    const filteredProperties = ref([]);

    const getImageUrl = (imagePath) => {
      if (!imagePath) return "../assets/images/default-property.jpg";
      if (imagePath.startsWith("/files")) {
        return `http://127.0.0.1:8000${imagePath}`;
      }
      return imagePath;
    };

    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/method/ex_stay.api.homeproperty.homeproperty"
        );
        properties.value = response.data.message;
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    const paginatedProperties = computed(() => {
      const start = (page.value - 1) * perPage.value;
      return properties.value.slice(start, start + perPage.value);
    });

    const totalPages = computed(() => Math.ceil(properties.value.length / perPage.value));

    const goToBookingPage = (property) => {
      router.push({
        name: "BookingPage",
        query: {
          title: property.custom_title,
        },
      });
    };

    const searchProperties = () => {
      const query = searchQuery.value.toLowerCase();
      filteredProperties.value = properties.value.filter((property) =>
        [property.custom_title, property.custom_location, property.custom_city, property.custom_country]
          .some(field => field?.toLowerCase().includes(query))
      );
      showSearchResults.value = true;
    };

    const closeSearchResults = () => {
      showSearchResults.value = false;
      searchQuery.value = "";
      filteredProperties.value = [];
    };

    onMounted(fetchProperties);

    return {
      properties,
      page,
      perPage,
      totalPages,
      paginatedProperties,
      getImageUrl,
      goToBookingPage,
      searchQuery,
      searchProperties,
      filteredProperties,
      showSearchResults,
      closeSearchResults,
    };
  },
};
</script>

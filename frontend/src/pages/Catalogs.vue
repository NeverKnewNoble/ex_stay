<template>
    <div class="w-full h-screen bg-gray-200 text-black relative">
        <!-- Navbar -->
        <div
            :class="[isScrollingDown ? '-translate-y-full' : 'translate-y-0',
                'w-full transition-transform duration-500 ease-in-out z-50 border-b-2 border-gray-300 bg-white shadow-md'
            ]">
            <NavBar />
        </div>

        <!-- Title and Filter -->
        <section class="w-full bg-white relative overflow-hidden px-[80px]">
            <h1 class="pt-[80px] text-[50px] text-[#6ea589]">Catalogue</h1>

            <button 
                @click="toggleFilters" 
                class="bg-white text-[#6ea589] w-[150px] rounded-sm border-[#6ea589] border py-2"
            >
                Active Filters
            </button>

            <!-- Overlay Filter Section -->
            <transition name="fade-slide">
                <div 
                    v-if="showFilters"
                    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-[150px] z-50"
                >
                    <div class="w-[90%] max-w-[800px] bg-gray-200 rounded-md shadow-lg p-6 relative">
                        <!-- Close Button -->
                        <button 
                            @click="toggleFilters" 
                            class="absolute top-2 right-2 text-gray-700 hover:text-red-500 text-xl font-bold"
                        >
                            ✕
                        </button>

                        <!-- Filter Fields -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div class="flex flex-col">
                                <label class="text-[#6ea589] text-sm mb-1">Country:</label>
                                <select 
                                    v-model="tempSelectedCounty" 
                                    class="py-2 px-4 border border-gray-300 rounded-md focus:border-green-600 w-[350px] cursor-pointer text-lg"
                                >
                                    <option value="">Select A Country</option>
                                    <option v-for="country in countries" :key="country.country_name" :value="country.country_name">
                                        {{ country.country_name }}
                                    </option>
                                </select>
                            </div>

                            <div class="flex flex-col">
                                <label class="text-[#6ea589] text-sm mb-1">City:</label>
                                <input v-model="tempCity" type="text" placeholder="Enter City"
                                    class="py-2 px-4 border border-gray-300 rounded-md focus:border-green-600 w-[355px] p-2 cursor-pointer text-lg"/>
                            </div>

      

                            <div class="flex flex-col md:col-span-2 mt-2">
                                <div class="grid grid-cols-2 gap-2">
                                    <div class="flex flex-col">
                                        <label class="text-[#6ea589] text-sm mb-1">From Price:</label>
                                        <input v-model="tempFromPrice" type="number" placeholder="Min price"
                                            class="py-2 px-4 border border-gray-300 rounded-md focus:border-green-600 w-[350px] p-2 cursor-pointer text-lg"/>
                                    </div>
                                    <div class="flex flex-col">
                                        <label class="text-[#6ea589] text-sm mb-1">To Price:</label>
                                        <input v-model="tempToPrice" type="number" placeholder="Max price"
                                            class="py-2 px-4 border border-gray-300 rounded-md focus:border-green-600 w-[355px] p-2 cursor-pointer text-lg"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Apply Filters Button -->
                        <div class="flex justify-center md:justify-end mt-4">
                            <button @click="resetFilter"
                                class="bg-[#6ea589] mr-2 text-white px-6 py-2 rounded-sm shadow-md hover:bg-[#5b8f73] transition-all w-full md:w-auto">
                                Clear
                            </button>
                            <button @click="applyFilters"
                                class="bg-[#6ea589] text-white px-6 py-2 rounded-sm shadow-md hover:bg-[#5b8f73] transition-all w-full md:w-auto">
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            </transition>
        </section>

        <!-- Catalogue -->
        <section class="w-full bg-white min-h-screen pt-10 px-[80px] pb-20 relative">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-x-2">
                <listingCard
                    v-for="listing in paginatedListings"
                    :key="listing.item_code"
                    :title="listing.custom_title"
                    :address="listing.custom_location"
                    :location="listing.custom_city"
                    :country="listing.custom_country"
                    :distance="25"
                    :price="`${listing.price_list_rate || 'N/A'}`"
                    :imageUrl="getImageUrl(listing.custom_profile_picture)"
                    @click="goToBookingPage(listing)"
                />
            </div>

            <!-- Dynamic Pagination -->
            <div class="flex items-center justify-center pt-15">
                <n-pagination v-model:page="page" :page-count="totalPages" />
            </div>
        </section>

        <!-- Footer -->
        <FooterComponent />
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import NavBar from '../components/elements/navbar.vue';
import FooterComponent from '../components/elements/footer.vue';
import listingCard from '../components/widgets/listingCard.vue';
import { useFetchProperties } from "../components/utility/catalogs_page/fetchProperties";
import { useFetchCountries } from "../components/utility/catalogs_page/fetchCountries";
import { useFilterAndPagination } from "../components/utility/catalogs_page/filterAndPagination";
import { useImageUtils } from "../components/utility/catalogs_page/imageUtils";

export default {
  name: "CatalogsPage",
  components: {
    NavBar,
    FooterComponent,
    listingCard,
  },
  setup() {
    const router = useRouter();
    const showFilters = ref(false);

    // Fetch properties
    const { properties, fetchProperties } = useFetchProperties();

    // Fetch countries
    const { countries, fetchCountries } = useFetchCountries();

    // Filter and pagination logic
    const {
      page,
      perPage,
      tempSelectedCounty,
      tempCity,
      tempFromPrice,
      tempToPrice,
      selectedCounty,
      city,
      fromPrice,
      toPrice,
      filteredListings,
      paginatedListings,
      totalPages,
      applyFilters,
      resetFilter,
    } = useFilterAndPagination(properties);

    // Image utilities
    const { getImageUrl } = useImageUtils();

    // Toggle filters
    const toggleFilters = () => {
      showFilters.value = !showFilters.value;
    };

    // Navigate to booking page
    const goToBookingPage = (listing) => {
      router.push({
        name: "BookingPage",
        query: {
          title: listing.custom_title,
        },
      });
    };

    // Fetch data on mount
    onMounted(async () => {
      await fetchProperties();
      await fetchCountries();
    });

    return {
      showFilters,
      properties,
      countries,
      page,
      perPage,
      tempSelectedCounty,
      tempCity,
      tempFromPrice,
      tempToPrice,
      selectedCounty,
      city,
      fromPrice,
      toPrice,
      filteredListings,
      paginatedListings,
      totalPages,
      toggleFilters,
      applyFilters,
      resetFilter,
      getImageUrl,
      goToBookingPage,
    };
  },
};
</script>

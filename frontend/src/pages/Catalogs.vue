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
                                <label class="text-[#6ea589] text-sm mb-1">Location:</label>
                                <input v-model="tempLocation" type="text" placeholder="Enter location"
                                    class="py-2 px-4 border border-gray-300 rounded-md focus:border-green-600 w-[355px] p-2 cursor-pointer text-lg"/>
                            </div>

                            <!-- Address Filter -->
                            <div class="flex flex-col md:col-span-2 mt-2">
                                <label class="text-[#6ea589] text-sm mb-1">Address:</label>
                                <input v-model="tempAddress" type="text" placeholder="Enter Address"
                                    class="py-2 px-4 border border-gray-300 rounded-md focus:border-green-600 w-full p-2 cursor-pointer text-lg"/>
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
                    :title="listing.title"
                    :address="listing.address"
                    :location="listing.city"
                    :country="listing.country"
                    :distance="25"
                    :price="`${listing.rate || 'N/A'}`"
                    :imageUrl="getImageUrl(listing.profile_picture)"
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
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import NavBar from '../components/elements/navbar.vue';
import FooterComponent from '../components/elements/footer.vue';
import listingCard from '../components/widgets/listingCard.vue';
import { useRouter } from "vue-router";

export default {
    name: "CatalogsPage",
    components: {
        NavBar,
        FooterComponent,
        listingCard,
    },
    setup() {
        const showFilters = ref(false);
        const properties = ref([]);
        const page = ref(1);
        const perPage = ref(8); // Listings per page
        const router = useRouter();

        // Temporary filter values before applying
        const tempSelectedCounty = ref("");
        const tempLocation = ref("");
        const tempAddress = ref(""); 
        const tempFromPrice = ref("");
        const tempToPrice = ref("");

        // Actual applied filter values
        const selectedCounty = ref("");
        const location = ref("");
        const selectedAddress = ref("");
        const fromPrice = ref("");
        const toPrice = ref("");

        const toggleFilters = () => {
            showFilters.value = !showFilters.value;
        };

        // Function to get the correct image URL
        const getImageUrl = (imagePath) => {
            if (!imagePath) return "../assets/images/default-property.jpg"; 
            if (imagePath.startsWith("/files")) {
                return `http://127.0.0.1:8000${imagePath}`;
            }
            return imagePath;
        };

        // Fetch properties from API
        const fetchProperties = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/method/ex_stay.api.property.get_property_details"
                );
                properties.value = response.data.message;
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        // Compute filtered properties
        const filteredListings = computed(() => {
            return properties.value.filter(property => {
                return (
                    (!selectedCounty.value || property.country.toLowerCase().includes(selectedCounty.value.toLowerCase())) &&
                    (!location.value || property.city.toLowerCase().includes(location.value.toLowerCase())) &&
                    (!selectedAddress.value || property.address.toLowerCase().includes(selectedAddress.value.toLowerCase())) &&
                    (!fromPrice.value || property.rate >= parseFloat(fromPrice.value)) &&
                    (!toPrice.value || property.rate <= parseFloat(toPrice.value))
                );
            });
        });

        // Paginated listings based on selected page
        const paginatedListings = computed(() => {
            const start = (page.value - 1) * perPage.value;
            return filteredListings.value.slice(start, start + perPage.value);
        });

        // Compute total pages dynamically
        const totalPages = computed(() => {
            return Math.ceil(filteredListings.value.length / perPage.value);
        });

        // Apply filter values
        const applyFilters = () => {
            selectedCounty.value = tempSelectedCounty.value;
            location.value = tempLocation.value;
            selectedAddress.value = tempAddress.value;
            fromPrice.value = tempFromPrice.value;
            toPrice.value = tempToPrice.value;

            showFilters.value = false;
            page.value = 1; // Reset to first page after filtering
        };


        // Reset Filter Fields
        const resetFilter = () => {
            tempSelectedCounty.value = "";
            tempLocation.value = "";
            tempAddress.value = "";
            tempFromPrice.value = "";
            tempToPrice.value = "";

            showFilters.value = false;
            applyFilters();
            page.value = 1;
        };

        const goToBookingPage = (listing) => {
            router.push({
                name: "BookingPage",
                query: {
                title: listing.title, // Pass only the title
                },
            });
        };
        
        
        // ? Fetch Countries from Frappe API
        const countries = ref([]);  // ✅ Store country list

        const fetchCountries = async () => {
            try {
                const countryResponse = await axios.get(
                    "http://127.0.0.1:8000/api/method/ex_stay.api.countryList.countryInFrappe"
                );

                if (countryResponse.data.message && countryResponse.data.message.data) {
                    countries.value = countryResponse.data.message.data; // ✅ Store country list
                    console.log("Fetched Countries:", countries.value);  // ✅ Debugging
                } else {
                    console.log("No countries found.");
                }
            } catch (err) {
                console.error("❌ Error fetching countries:", err);
            }
        };

        
        onMounted(() => {
            fetchProperties();
            fetchCountries();  // ✅ Ensure it runs on mount
        });

        return { 
            showFilters, 
            resetFilter,
            properties, 
            page, 
            perPage, 
            totalPages, 
            tempSelectedCounty, 
            fetchCountries,
            countries,
            tempLocation, 
            tempAddress, 
            tempFromPrice, 
            tempToPrice, 
            selectedCounty, 
            location, 
            selectedAddress, 
            fromPrice, 
            toPrice, 
            toggleFilters, 
            applyFilters, 
            paginatedListings, 
            getImageUrl,
            goToBookingPage
        };
    }
};
</script>

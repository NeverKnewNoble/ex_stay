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
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { createResource } from "frappe-ui";
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
        // const properties = ref([]);
        const page = ref(1);
        const perPage = ref(8); // Listings per page
        const router = useRouter();

        // Temporary filter values before applying
        const tempSelectedCounty = ref("");
        const tempCity = ref("");
        const tempAddress = ref(""); 
        const tempFromPrice = ref("");
        const tempToPrice = ref("");

        // Actual applied filter values
        const selectedCounty = ref("");
        const city = ref("");
        
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

        
        // !Fetch properties from API
        const propertiesResource = createResource({
            url: "frappe.client.get_list",
            params: {
                doctype: "Item",
                fields: [
                "item_code", "item_name", "custom_title", "custom_property_description",
                "custom_location", "custom_city", "custom_country",
                "custom_profile_picture", "custom_2nd_image", "custom_3rd_image",
                "custom_4th_image", "custom_property_category", "custom_apartment_offers"
                ],
                filters: { custom_is_ex_stay_property: 1 }, // ✅ Fetch only properties with this flag
                limit_page_length: 100,
            },
        });

        const properties = ref([]);
        const property = ref(null);


        onMounted(async () => {
            try {
                console.log("Fetching properties...");
                const response = await propertiesResource.fetch();

                if (Array.isArray(response) && response.length > 0) {
                    properties.value = response;
                    console.log("✅ Fetched Properties:", properties.value);

                    // Extract all item_codes for price lookup
                    const itemCodes = properties.value.map((p) => p.item_code);
                    if (itemCodes.length === 0) {
                        console.warn("⚠️ No item codes found, skipping price fetch.");
                        return;
                    }

                    // Fetch item prices
                    console.log("Fetching Item Prices...");
                    const pricesResource = createResource({
                        url: "frappe.client.get_list",
                        params: {
                            doctype: "Item Price",
                            filters: [["item_code", "in", itemCodes]], // Correct filter format
                            fields: ["item_code", "price_list_rate", "currency"],
                        },
                    });

                    const pricesResponse = await pricesResource.fetch();
                    console.log("✅ Fetched Prices:", pricesResponse);

                    // Convert price list to a dictionary for quick lookup
                    const priceDict = {};
                    if (Array.isArray(pricesResponse)) {
                        pricesResponse.forEach((price) => {
                            priceDict[price.item_code] = {
                                price_list_rate: price.price_list_rate,
                                currency: price.currency
                            };
                        });
                    }
                    console.log("✅ Price Mapping Dictionary:", priceDict);

                    // Attach prices to properties
                    properties.value.forEach((prop) => {
                        prop.price_list_rate = priceDict[prop.item_code]?.price_list_rate || null;
                        prop.currency = priceDict[prop.item_code]?.currency || null;
                        prop.vat_inclusion = priceDict[prop.item_code]?.vat_inclusion || null;
                    });

                } else {
                    console.warn("⚠️ No properties found.");
                }

            } catch (error) {
                console.error("🚨 Unable to fetch properties:", error);
            }
        });





        // ! Compute filtered properties
        const filteredListings = computed(() => {
            return properties.value.filter(property => {
                return (
                    (!selectedCounty.value || (property.custom_country || "").toLowerCase().includes(selectedCounty.value.toLowerCase())) &&
                    (!city.value || (property.custom_city || "").toLowerCase().trim().includes(city.value.toLowerCase().trim())) &&  
                    (!fromPrice.value || (property.price_list_rate && property.price_list_rate >= parseFloat(fromPrice.value))) &&
                    (!toPrice.value || (property.price_list_rate && property.price_list_rate <= parseFloat(toPrice.value)))
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
            return Math.max(1, Math.ceil(filteredListings.value.length / perPage.value));
        });

        // ?Apply filter values
        const applyFilters = () => {
            selectedCounty.value = tempSelectedCounty.value;
            city.value = tempCity.value.trim();  // ✅ Ensure trimming to avoid extra spaces
            fromPrice.value = tempFromPrice.value;
            toPrice.value = tempToPrice.value;

            showFilters.value = false;
            page.value = 1; // Reset to first page after filtering
        };




        // ? Reset Filter Fields
        const resetFilter = () => {
            tempSelectedCounty.value = "";
            tempCity.value = "";
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
                title: listing.custom_title, // Pass only the title
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
            // fetchProperties();
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
            tempCity, 
            tempFromPrice, 
            tempToPrice, 
            selectedCounty, 
            location, 
            fromPrice, 
            toPrice, 
            toggleFilters, 
            applyFilters, 
            city,
            property,
            paginatedListings, 
            getImageUrl,
            goToBookingPage
        };
    }
};
</script>

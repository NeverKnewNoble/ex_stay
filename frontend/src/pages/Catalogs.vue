<template>
    <div class="w-full h-screen bg-gray-200 text-black">
        <!-- **Navbar -->
        <div
        :class="[
            isScrollingDown ? '-translate-y-full' : 'translate-y-0',
            ' w-full transition-transform duration-500 ease-in-out z-50 border-b-2 border-b-bg-gray-300 bg-white shadow-md'
        ]">
            <NavBar/>
        </div>

        <!-- **Title and filter -->
        <section class="w-full bg-white relative overflow-hidden px-[80px]">
            <h1 class="pt-[80px] text-[50px] text-[#6ea589]">Catalogue</h1>

            <button 
                @click="toggleFilters" 
                class="bg-white text-[#6ea589] w-[150px] rounded-sm border-[#6ea589] border py-2"
            >
                Active Filters
            </button>
            
            <div v-if="showFilters" class="w-full bg-gray-200 h-auto rounded-sm  shadow-md p-4 mb-2">
                
                <div class="mt-2">
                    <div class="flex items-center justify-center gap-2">
                        <!-- County Select Field -->
                        <div class="flex flex-col">
                            <label for="location" class="text-[#6ea589]">Country:</label>
                            <input 
                                id="selectedCounty" 
                                v-model="selectedCounty" 
                                type="text" 
                                placeholder="Enter Your County" 
                                class="hover:border h-[19px] rounded-sm hover:border-[#6ea589] p-2 cursor-pointer"
                            />
                        </div>

                        <!-- Location Input Field -->
                        <div class="flex flex-col">
                            <label for="location" class="text-[#6ea589]">Location:</label>
                            <input 
                                id="location" 
                                v-model="location" 
                                type="text" 
                                placeholder="Enter location" 
                                class="border border-[#6ea589] h-[19px] p-2 rounded-sm cursor-pointer"
                            />
                        </div>

                        <!-- Naive UI Date Picker -->
                        <div class="flex flex-col">
                            <label class="text-[#6ea589] cursor-pointer">Date Range:</label>
                            <n-date-picker v-model:value="range" type="daterange" clearable class="text-black"/>
                        </div>

                        <!-- Guest Dropdown -->
                        <div class="flex flex-col">
                            <label class="text-[#6ea589]">Guests:</label>
                            <GuestDropdown />
                        </div>
                    </div>
                </div>

                <!-- Apply Filters Button -->
                <div class="flex justify-end mt-4">
                    <button 
                        @click="applyFilters" 
                        class="bg-[#6ea589] text-white px-6 py-2 rounded-sm shadow-md hover:bg-[#5b8f73] transition-all"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </section>


        <!-- **Catalogue -->
        <section class="w-full  bg-white min-h-screen pt-10 px-[80px] pb-20">
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
            </div>

            <div class="flex items-center justify-center pt-15">
                <n-pagination v-model:page="page" :page-count="100" />
            </div>
        </section>

        <!-- **Footer -->
        <FooterComponent/>
    </div>
</template>



<script>
import { ref } from "vue";
import NavBar from '../components/elements/navbar.vue';
import FooterComponent from '../components/elements/footer.vue';
import GuestDropdown from '../components/widgets/guests.vue'; 
import listingCard from '../components/widgets/listingCard.vue';

export default {
  name: "BookingPage",
  components: {
    NavBar,
    FooterComponent,
    listingCard,
    GuestDropdown,
  },
  setup() {
    const showFilters = ref(false);
    const selectedCounty = ref("");
    const location = ref("");
    const range = ref(null);
    const counties = ref(["County A", "County B", "County C"]);

    const toggleFilters = () => {
        showFilters.value = !showFilters.value;
    };

    const applyFilters = () => {
        console.log("Filters applied:", {
            county: selectedCounty.value,
            location: location.value,
            dateRange: range.value
        });

        // You can now use these values to fetch filtered results from your API
    };

    return {
        showFilters,
        selectedCounty,
        location,
        range,
        counties,
        toggleFilters,
        applyFilters
    };
 }
};
</script>


















  
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
            id="search"
            name="search"
            placeholder="Search For Your Destination"
            class="bg-gray-100 sm:w-[680px] md:w-[950px] lg:w-[950px] py-[12px] focus:bg-white border-none transition rounded-full pl-5 pr-12 focus:border-none "
          />
          <button
            type="submit"
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
          :distance="25"
          :price="`${property.price_list_rate || 'N/A'}`"
          :imageUrl="getImageUrl(property.custom_profile_picture)"
          @click="goToBookingPage(property)"
        />
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-center pt-15">
        <n-pagination v-model:page="page" :page-count="totalPages" />
      </div>
    </section>

    <!-- **Footer -->
    <FooterComponent />
  </div>
</template>

<script>
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { createResource } from "frappe-ui";
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
    const page = ref(1);
    const perPage = ref(8);
    const router = useRouter();

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


    const paginatedProperties = computed(() => {
      const start = (page.value - 1) * perPage.value;
      return properties.value.slice(start, start + perPage.value);
    });

    const totalPages = computed(() => Math.ceil(properties.value.length / perPage.value));

    const goToBookingPage = (property) => {
      router.push({
        name: "BookingPage",
        query: {
          title: property.custom_title, // Pass only the title
        },
      });
    };

   

    return {
      properties,
      page,
      perPage,
      totalPages,
      paginatedProperties,
      getImageUrl,
      goToBookingPage,
    };
  },
};
</script>

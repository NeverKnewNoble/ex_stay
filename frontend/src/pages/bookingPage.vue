<template>
  <div class="w-full min-h-screen bg-white text-black">
    <!-- Navbar -->
    <div
     
    >
      <NavBar />
    </div>

    <!-- Loader -->
    <div v-if="!property" class="flex justify-center items-center h-screen">
      <p class="text-gray-700 text-xl">Loading property details...</p>
    </div>

    <div v-else class="pt-20 px-6 md:px-[150px]">
      <!-- **Image Gallery -->
      <section class="w-full relative overflow-hidden py-10 ">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Large Image -->
          <div class="md:col-span-2 relative cursor-pointer" @click="openLightbox(0)">
            <img
              :src="images[0]"
              class="w-full h-[500px] object-cover rounded-lg shadow-lg"
              alt="Main Property Image"
            />
          </div>

          <!-- Small Images -->
          <div class="grid grid-rows-3 gap-4">
            <img
              v-for="(img, index) in images.slice(1, 4)"
              :key="index"
              :src="img"
              class="w-full h-[160px] object-cover rounded-lg shadow-md cursor-pointer"
              @click="openLightbox(index + 1)"
              alt="Property Image"
            />
          </div>
        </div>
      </section>

      <!-- Lightbox Modal -->
      <div v-if="lightboxVisible" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
        <button @click="closeLightbox" class="absolute top-5 right-5 text-[25px] text-white text-5xl hover:text-gray-400">
          &times;
        </button>
        <div class="relative max-w-4xl w-full flex items-center justify-center">
          <img :src="images[lightboxIndex]" class="w-full max-h-[90vh] object-contain rounded-lg" alt="Image" />
          <button
            @click="prevLightbox"
            class="absolute left-5 top-1/2 px-[20px] transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white p-4 text-2xl rounded-full"
          >
            &#10094;
          </button>
          <button
            @click="nextLightbox"
            class="absolute right-5 top-1/2 px-[20px] transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white p-4 text-2xl rounded-full"
          >
            &#10095;
          </button>
        </div>
      </div>

      <!-- **Property Information -->
      <section class="bg-white shadow-md rounded-lg p-8 mt-6">
        <h1 class="text-3xl font-bold mb-3">{{ property.custom_title }}</h1>
        <p class="text-gray-600 text-lg">{{ property.custom_country }} · {{ property.custom_city }} · {{ property.custom_location }}</p>
        <hr class="my-4" />
        <div class="text-gray-700">
          <h3 class="text-xl font-semibold mb-2">Description</h3>
          <p class="whitespace-pre-line">{{ property.custom_property_description }}</p>
        </div>
      </section>

      <!-- **2 Side Sections -->
      <div class="flex flex-col lg:flex-row gap-6 mt-10 mb-15">
        <!-- Left Section -->
        <section class="bg-white w-full lg:w-[65%] rounded-lg shadow-md p-6">
          <h2 class="font-bold text-xl mb-4">What This Place Offers</h2>
          <div class="grid grid-cols-2 text-gray-700">
            <template v-if="property && property.custom_apartment_offers && property.custom_apartment_offers.length > 0">
              <p v-for="(offer, index) in property.custom_apartment_offers" 
                :key="index" 
                class="flex items-center gap-1 mb-4 text-gray-700">
                <img src="../assets/images/check-regular-24.png" alt="Check Icon"> 
                {{ offer }}
              </p>
            </template>
            <p v-else class="text-gray-500 italic">No offers available</p>
          </div>

          <hr class="mb-10" />

          <!-- Reviews -->
          <div>
            <h2 class="font-bold text-xl mb-3">Guest Reviews</h2>
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <img src="../assets/images/user-pin-solid-24.png" class="w-8 h-8 rounded-full" alt="User Avatar" />
                <div>
                  <p class="font-semibold">John Doe</p>
                  <p class="text-gray-600 text-sm">"Great place! The location was perfect and the amenities were top-notch."</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <img src="../assets/images/user-pin-solid-24.png" class="w-8 h-8 rounded-full" alt="User Avatar" />
                <div>
                  <p class="font-semibold">John Doe</p>
                  <p class="text-gray-600 text-sm">"Great place! The location was perfect and the amenities were top-notch."</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <img src="../assets/images/user-pin-solid-24.png" class="w-8 h-8 rounded-full" alt="User Avatar" />
                <div>
                  <p class="font-semibold">John Doe</p>
                  <p class="text-gray-600 text-sm">"Great place! The location was perfect and the amenities were top-notch."</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <img src="../assets/images/user-pin-solid-24.png" class="w-8 h-8 rounded-full" alt="User Avatar" />
                <div>
                  <p class="font-semibold">John Doe</p>
                  <p class="text-gray-600 text-sm">"Great place! The location was perfect and the amenities were top-notch."</p>
                </div>
              </div>
            </div>
          </div>

        </section>

        <!-- **Booking Section -->
        <section class="bg-white w-full lg:w-[40%] rounded-3xl shadow-xl p-8 border border-gray-200">
          <h3 class="text-3xl font-extrabold text-green-600 text-center mb-6">Reserve Now!</h3>

          <div class="space-y-6">
            <!-- Date Pickers -->
            <div class="mb-4">
              <label class="block">Check-In Date</label>
              <DatePicker placeholder="Select Check In Date" v-model="checkIn" clearable class="w-full text-[15px]  rounded-sm focus:border-green-800" />

              <label class="block mt-3">Check-Out Date</label>
              <DatePicker placeholder="Select Check Out Date" v-model="checkOut" clearable class="w-full text-[15px]  rounded-sm  focus:border-green-800" />
            </div>

            <!-- Price Breakdown -->
            <div class="grid grid-cols-2 gap-4 items-center text-gray-700">
              <p class="text-lg font-semibold">Price per Night</p>
              <span class="text-lg font-bold text-green-600 text-right">
                {{ property.currency }} {{ property.price_list_rate }}
              </span>


              <p class="text-lg">{{ numberOfNights }} Nights × {{ property.currency }} {{ property.price_list_rate }}</p>
              <span class="text-lg font-semibold text-right">
                {{ property.currency }} {{ plusNights }}
              </span>

              <p class="text-lg">Levies (16%)</p>
              <span class="text-lg font-semibold text-right">
                {{ property.currency }} {{ levy }}
              </span>

              <!-- VAT Calculation -->
              <template v-if="property.vat_inclusion === 'VAT Standard (15%)'">
                <p class="text-lg">VAT (15%)</p>
                <span class="text-lg font-semibold text-right text-gray-700">
                  {{ property.currency }} {{ vat15 }}
                </span>
              </template>
            </div>


            <!-- Grand Total -->
            <div class="bg-green-50 border-l-4 border-green-600 p-5 rounded-xl">
              <div class="grid grid-cols-2 gap-4 items-center text-green-800 font-bold text-2xl">
                <p>Total Price</p>
                <span class="text-green-600 text-right">
                  {{ property.currency }} {{ totalPrice }}
                </span>
              </div>
              <p v-if="property.vat_inclusion === 'VAT Standard (15%)' || property.vat_inclusion === 'VAT Flat (3%)'"
                class="text-sm text-gray-500 text-right">
                Includes VAT and all charges
              </p>
              <p v-else 
                class="text-sm text-gray-500 text-right">
                No VAT with all charges included
              </p>
            </div>


            <!-- Reserve Button -->
            <button 
              @click="showReservationForm = true"
              class="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02] transition duration-300">
              <span class="text-[18px]">🔒 Secure Your Booking</span>
            </button>
          </div>
        </section>
      </div>


      <!-- Reservation Form Modal -->
      <div v-if="showReservationForm" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg border relative transition-all duration-300 transform scale-100">
          
          <!-- Close Button -->
          <button @click="showReservationForm = false" class="absolute top-5 right-5 text-[25px] text-black text-5xl hover:text-green-600">
          &times;
          </button>

          <!-- Header -->
          <h2 class="text-2xl font-bold text-gray-800 text-center mb-4">Reserve Your Stay</h2>
          <p class="text-sm text-gray-500 text-center mb-6">Fill in the details to complete your reservation.</p>

          <!-- Form Fields -->
          <div class="space-y-5">
            <div>
              <label class="block text-gray-700 font-medium">First Name</label>
              <input 
                v-model="firstName"
                type="text"
                class="w-full py-2 px-4 border border-gray-300 rounded-md focus:border-green-600 focus:ring-2 focus:ring-green-400 transition"
                placeholder="First Name"
            </div>
            
            <div>
              <label class="block text-gray-700 font-medium">Last Name</label>
              <input
                v-model="lastName" 
                type="text" 
                class="w-full py-2 px-4 border border-gray-300 rounded-md focus:border-green-600 focus:ring-2 focus:ring-green-400 transition"
                placeholder="Last Name" 
            </div>

            <div>
              <label class="block text-gray-700 font-medium">Country</label>
              <select 
                v-model="selectedCountry"
                class="w-full py-2 px-4 border border-gray-300 rounded-md focus:border-green-600 focus:ring-2 focus:ring-green-400 transition">
                <option value="">Select A Country</option>
                <option v-for="country in countries" :key="country.value" :value="country.value">
                  {{ country.label }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-gray-700 font-medium">Phone Number</label>
              <input 
                v-model="telephoneNumber"
                type="tel"
                class="w-full py-2 px-4 border border-gray-300 rounded-md focus:border-green-600 focus:ring-2 focus:ring-green-400 transition"
                placeholder="Phone Number" />
            </div>

            <div>
              <label class="block text-gray-700 font-medium">Email</label>
              <input 
                
                type="email" :value="userEmail"
                class="w-full py-2 px-4 border border-gray-300 rounded-md focus:border-green-600 focus:ring-2 focus:ring-green-400 transition"
                placeholder="Email" :readonly="userEmail !== ''" />
            </div>

            <div>
              <label class="block text-gray-700 font-medium">Guests</label>
              <GuestDropdown v-model="guestCount" />
            </div>
          </div>

          <!-- Divider -->
          <div class="border-t border-gray-200 my-6"></div>

          <!-- Reserve Button -->
          <button 
          @click="book"
          class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transform hover:scale-105 transition duration-300">
            🔒 Secure Your Booking
          </button>
        </div>
      </div>
      
    </div>

    <FooterComponent />
  </div>
</template>


<script>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import FooterComponent from "../components/elements/footer.vue";
import NavBar from "../components/elements/navbar.vue";
import GuestDropdown from "../components/widgets/guests.vue";
import { session } from '../data/session';
import { DatePicker, createResource } from "frappe-ui";

export default {
  name: "BookingPage",
  components: {
    NavBar,
    FooterComponent,
    GuestDropdown,
    DatePicker,
  },
  setup() {
    const route = useRoute();
    const propertyTitle = route.query.title || "";
    // const property = ref(null);
    // const images = ref([]);
    const showReservationForm = ref(false); 
    const checkIn = ref("");  // ✅ Stores selected check-in date
    const checkOut = ref(""); // ✅ Stores selected check-out date
 


    // ? POST FIELDS FOR BOOKING
    const firstName = ref("")
    const lastName = ref("")
    const country = ref("")
    const telephoneNumber = ref("")
    const guestCount = ref("")
    const selectedCountry = ref("");


    // ? Assigning computations to varaibles
    const plusNights = computed(() => {
      if (property.value && property.value.price_list_rate && numberOfNights.value > 0) {
        return formatCurrency(property.value.price_list_rate * numberOfNights.value);
      }
      return formatCurrency(0);
    });

    const levy = computed(() => {
      if (property.value && property.value.price_list_rate && numberOfNights.value > 0) {
        return formatCurrency(property.value.price_list_rate * numberOfNights.value * 0.16);
      }
      return formatCurrency(0);
    });

    const vat15 = computed(() => {
      if (levy.value && plusNights.value) {
        // Ensure levy and plusNights are properly converted back to numbers
        const plusNightsValue = parseFloat((plusNights.value || "0").replace(/,/g, ""));
        const levyValue = parseFloat((levy.value || "0").replace(/,/g, ""));

        if (isNaN(plusNightsValue) || isNaN(levyValue)) {
          return formatCurrency(0);
        }

        const total = plusNightsValue + levyValue;
        return formatCurrency(total * 0.15);
      }
      return formatCurrency(0);
    });


    const totalPrice = computed(() => {
      if (!property.value || !property.value.price_list_rate || numberOfNights.value <= 0) {
        return formatCurrency(0);
      }

      const basePrice = parseFloat(plusNights.value.replace(/,/g, ""));
      const additionalLevy = parseFloat(levy.value.replace(/,/g, ""));
      const vatAmount = parseFloat(vat15.value.replace(/,/g, ""));

      return formatCurrency(basePrice + additionalLevy + vatAmount);
    });

    // ! Computed Property: Calculates Number of Nights
    const numberOfNights = computed(() => {
      if (checkIn.value && checkOut.value) {
        const start = new Date(checkIn.value);
        const end = new Date(checkOut.value);

        if (isNaN(start) || isNaN(end)) {
          return 0; // Prevent calculation if dates are invalid
        }

        const nights = (end - start) / (1000 * 60 * 60 * 24);

        return nights > 0 ? Math.floor(nights) : 0;
      }
      return 0;
    });

    // ? Money Formatting
    const formatCurrency = (value) => {
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    };


    // ? Corrected computed property
    const userEmail = computed(() => session.user || ""); // ✅ Ensures session.user is set
    


    // Lightbox state
    const lightboxVisible = ref(false);
    const lightboxIndex = ref(0);

    // Open lightbox
    const openLightbox = (index) => {
      lightboxIndex.value = index;
      lightboxVisible.value = true;
    };

    // Close lightbox
    const closeLightbox = () => {
      lightboxVisible.value = false;
    };

    // Navigate in lightbox
    const prevLightbox = () => {
      lightboxIndex.value = (lightboxIndex.value - 1 + images.value.length) % images.value.length;
    };

    const nextLightbox = () => {
      lightboxIndex.value = (lightboxIndex.value + 1) % images.value.length;
    };




    // ! Trial TO GET PROPERTY DETAILS
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
    const images = ref([]);

    onMounted(async () => {
      try {
        console.log("Fetching properties...");
        const response = await propertiesResource.fetch();

        if (Array.isArray(response) && response.length > 0) {
          properties.value = response;
          console.log("✅ Fetched Properties:", properties.value);

             // **Find Property by Title**


          // Process child table: Extract `offer` values from `custom_apartment_offers`
          properties.value.forEach((prop) => {
            prop.custom_apartment_offers = prop.custom_apartment_offers
              ? prop.custom_apartment_offers.map((offer) => offer.offer)
              : [];
          });

          // Extract all item_codes for price lookup
          const itemCodes = properties.value.map((p) => p.item_code);

          // **Create a new resource to fetch item prices**
          const pricesResource = createResource({
            url: "frappe.client.get_list",
            params: {
              doctype: "Item Price",
              filters: { item_code: ["in", itemCodes] },
              fields: ["item_code", "price_list_rate", "currency", "vat_inclusion"],
            },
          });

          // Fetch Prices
          console.log("Fetching Item Prices...");
          const pricesResponse = await pricesResource.fetch();

          // Convert price list to a dictionary for quick lookup
          const priceDict = {};
          if (Array.isArray(pricesResponse)) {
            pricesResponse.forEach((price) => {
              priceDict[price.item_code] = {
                price_list_rate: price.price_list_rate,
                currency: price.currency,
                vat_inclusion: price.vat_inclusion,
              };
            });
          }

          // Attach prices to properties
          properties.value.forEach((prop) => {
            prop.price_list_rate = priceDict[prop.item_code]?.price_list_rate || null;
            prop.currency = priceDict[prop.item_code]?.currency || null;
            prop.vat_inclusion = priceDict[prop.item_code]?.vat_inclusion || null;
          });

          // **Find Property by Title**
          const matchedProperty = properties.value.find((p) => p.custom_title === propertyTitle);

          if (matchedProperty) {
            property.value = matchedProperty;

            // **Ensure Valid Images**
            const getValidImage = (image, fallback) => (image && image !== "null" ? image : fallback);

            images.value = [
              getValidImage(matchedProperty.custom_profile_picture, "../assets/images/default-property.jpg"),
              getValidImage(matchedProperty.custom_2nd_image, matchedProperty.custom_profile_picture),
              getValidImage(matchedProperty.custom_3rd_image, matchedProperty.custom_profile_picture),
              getValidImage(matchedProperty.custom_4th_image, matchedProperty.custom_profile_picture),
            ];

            // Fetch property offers only after property is assigned
            await fetchPropertyOffers();
          } else {
            console.error("Property not found for title:", propertyTitle);
          }
        } else {
          console.error("❌ No properties found or invalid response format.");
        }
      } catch (error) {
        console.error("🚨 Unable to fetch properties:", error);
      }
    });


    // ! Fetch Property Offers
    const fetchPropertyOffers = async () => {
      try {
        console.log("Fetching property offers...");
        const response = await axios.get(
          "http://127.0.0.1:8000/api/method/ex_stay.api.property.get_property_details"
        );

        console.log("🔍 Full API Response:", response);

        // Handle "message" wrapper
        const offersData = response.data?.message || response.data;

        if (Array.isArray(offersData)) {
          console.log("✅ Offers Fetched:", offersData);

          // Convert response to dictionary for quick lookup
          const offersDict = {};
          offersData.forEach((property) => {
            offersDict[property.item_code] = property.custom_apartment_offers || [];
          });

          // Ensure property is defined before assigning
          if (property.value) {
            property.value.custom_apartment_offers = offersDict[property.value.item_code] || [];
            console.log("✅ Updated Property with Offers:", property.value.custom_apartment_offers);
          } else {
            console.warn("⚠️ Property is null, delaying offer assignment...");
          }
        } else {
          console.error("❌ Invalid response format for offers.", response.data);
        }
      } catch (error) {
        console.error("🚨 Error fetching property offers:", error);
      }
    };




    // ! country fetch
    const countriesResource = createResource({
      url: 'frappe.client.get_list',
      params: {
        doctype: 'Country',
        fields: ['name'],
        limit_page_length: 300
      },
    });

    // Country options for the dropdown
    const countries = ref([]);

    // Fetch the country list when the component is mounted
    onMounted(async () => {
      try {
        console.log("Fetching country list...");
        const response = await countriesResource.fetch();

        // Ensure the response contains an array of country names
        if (Array.isArray(response)) {
          countries.value = response.map(country => ({
            label: country.name,
            value: country.name,
          }));
          console.log("✅ Fetched Countries:", countries.value);
        } else {
          console.error("❌ No countries found or invalid response format.");
        }
      } catch (error) {
        console.error("🚨 Unable to fetch countries:", error);
      }
    });


    // ! API Call to Book Reservation
    const book = async () => {
      try {
        console.log("Preparing booking data...");

        const bookingData = {
          doctype: "Ex Bookings",
          email: userEmail.value || "",
          first_name: firstName.value || "",
          last_name: lastName.value || "",
          guest_country: selectedCountry.value || "",
          phone: telephoneNumber.value || "",
          guests: guestCount.value || "",
          check_in: checkIn.value || "",
          check_out: checkOut.value || "",
          no_of_nights: numberOfNights.value,
          code: property.value?.item_code,
          rate: property.value?.price_list_rate,
          price_per_night: property.value?.price_list_rate,
          total_price: parseFloat(totalPrice.value.replace(/,/g, "")),  // ✅ Convert to raw number
          nights_x_price_per_night: parseFloat(plusNights.value.replace(/,/g, "")),  // ✅ Convert to raw number
          levies: parseFloat(levy.value.replace(/,/g, "")),  // ✅ Convert to raw number
          vat_frontend: parseFloat(vat15.value.replace(/,/g, "")),  // ✅ Convert to raw number
        };

        console.log("📩 Booking Payload:", bookingData);

        const bookResponse = await createResource({
          url: 'frappe.client.insert',
          params: {
            doc: bookingData,  // Ensure it's wrapped inside 'doc'
          },
        }).fetch();

        console.log("📩 API Response:", bookResponse);

        if (bookResponse && bookResponse.name) {
          console.log("✅ Booking successful!", bookResponse);
          alert(`🎉 Booking successful! Booking ID: ${bookResponse.name}`);
          showReservationForm.value = false; // Close modal
        } else {
          console.error("❌ Booking failed:", bookResponse);
          alert("Booking failed. Please try again.");
        }
      } catch (err) {
        console.error("🚨 Unable to book reservation", err);
        alert("An error occurred. Please check the console for details.");
      }
    };


    return { showReservationForm, userEmail, 
      property, images,checkIn, countries,
      checkOut, book, plusNights, formatCurrency,
      numberOfNights, vat15, levy,  totalPrice,
      lightboxVisible, lightboxIndex, 
      openLightbox, closeLightbox, 
      prevLightbox, nextLightbox,
      firstName,
      lastName,
      country,
      telephoneNumber, selectedCountry,
      guestCount, };
  },
};
</script>
<template>
  <div class="w-full min-h-screen bg-white text-black">
    <!-- Navbar -->
    <div
      :class="[
        isScrollingDown ? '-translate-y-full' : 'translate-y-0',
        'fixed top-0 w-full transition-transform duration-500 ease-in-out z-50 bg-white shadow-lg border-b border-gray-200',
      ]"
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
        <h1 class="text-3xl font-bold mb-3">{{ property.title }}</h1>
        <p class="text-gray-600 text-lg">{{ property.country }} · {{ property.city }} · {{ property.address }}</p>
        <hr class="my-4" />
        <div class="text-gray-700">
          <h3 class="text-xl font-semibold mb-2">Description</h3>
          <p>{{ property.property_description }}</p>
        </div>
      </section>

      <!-- **2 Side Sections -->
      <div class="flex flex-col lg:flex-row gap-6 mt-10 mb-15">
        <!-- Left Section -->
        <section class="bg-white w-full lg:w-[65%] rounded-lg shadow-md p-6">
          <h2 class="font-bold text-xl mb-4">What This Place Offers</h2>
          <div class="grid grid-cols-2 text-gray-700">
            <p v-for="(offer, index) in property.apartment_offers" :key="index" class="flex items-center gap-1 mb-4">
              <img src="../assets/images/check-regular-24.png"> {{ offer }}
            </p>
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
                {{ property.currency }} {{ (property.rate).toFixed(2) }}
              </span>


              <p class="text-lg">{{ numberOfNights }} Nights × {{ property.currency }} {{ property.rate }}</p>
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
    const property = ref(null);
    const images = ref([]);
    const showReservationForm = ref(false); 
    const checkIn = ref("");  // ✅ Stores selected check-in date
    const checkOut = ref(""); // ✅ Stores selected check-out date
 


    // ? POST FIELDS FOR BOOKING
    const firstName = ref("")
    const lastName = ref("")
    const country = ref("")
    const telephoneNumber = ref("")
    const guestCount = ref("")


    // ? Assigning computations to varaibles
    const plusNights = computed(() => {
      if (property.value && property.value.rate && numberOfNights.value > 0) {
        return formatCurrency(property.value.rate * numberOfNights.value);
      }
      return formatCurrency(0);
    });

    const levy = computed(() => {
      if (property.value && property.value.rate && numberOfNights.value > 0) {
        return formatCurrency(property.value.rate * numberOfNights.value * 0.16);
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
      if (!property.value || !property.value.rate || numberOfNights.value <= 0) {
        return formatCurrency(0);
      }

      const basePrice = parseFloat(plusNights.value.replace(/,/g, ""));
      const additionalLevy = parseFloat(levy.value.replace(/,/g, ""));
      const vatAmount = parseFloat(vat15.value.replace(/,/g, ""));

      return formatCurrency(basePrice + additionalLevy + vatAmount);
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

    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/method/ex_stay.api.property.get_property_details"
        );

        const matchedProperty = response.data.message.find((p) => p.title === propertyTitle);

        if (matchedProperty) {
          property.value = matchedProperty;

          const getValidImage = (image, fallback) => image && image !== "null" ? image : fallback;

          images.value = [
            getValidImage(matchedProperty.profile_picture, "../assets/images/default-property.jpg"),
            getValidImage(matchedProperty["2nd_image"], matchedProperty.profile_picture),
            getValidImage(matchedProperty["3rd_image"], matchedProperty.profile_picture),
            getValidImage(matchedProperty["4th(_image"], matchedProperty.profile_picture),
          ];
        } else {
          console.error("Property not found for title:", propertyTitle);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };


    // ✅ Computed Property: Calculates Number of Nights
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


    // ✅ Debugging: Watch for Date Selection Changes
    watch([checkIn, checkOut, userEmail], ([newCheckIn, newCheckOut]) => {
      checkIn.value = newCheckIn ? new Date(newCheckIn).toISOString().split("T")[0] : "";
      checkOut.value = newCheckOut ? new Date(newCheckOut).toISOString().split("T")[0] : "";
      console.log("Updated Check-In:", checkIn.value);
      console.log("Updated Check-Out:", checkOut.value);
      console.log("Updated Email:", userEmail.value);
    });


    watch(numberOfNights, (newValue) => {
      console.log("Computed Number of Nights:", newValue);
    });


    //country fetch
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




    // ? API Call to Book Reservation
    const book = async () => {
  try {
    console.log("Preparing booking data...");

    const bookingData = {
      doctype: "Ex Bookings",
      first_name: firstName.value || "",
      last_name: lastName.value || "",
      country: country.value || "",
      telephone_number: telephoneNumber.value || "",
      guest_count: guestCount.value || "",
      check_in: checkIn.value || "",
      check_out: checkOut.value || "",
      email: userEmail.value || "",
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





    // ? Fetch when component mounts

    onMounted(fetchPropertyDetails);

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
      telephoneNumber,
      guestCount, };
  },
};
</script>
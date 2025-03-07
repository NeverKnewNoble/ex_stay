<template>
  <div class="w-full min-h-screen bg-white text-black">
    <!-- Navbar -->
    <div>
      <NavBar />
    </div>

    <!-- Floating Notification -->
    <div class="fixed top-5 right-5 z-50 w-100">
      <transition name="fade">
        <!-- Booking Alert -->
        <n-alert v-if="bookingAlertMessage" :type="bookingAlertType" closable @close="bookingAlertMessage = null">
          {{ bookingAlertMessage }}
        </n-alert>
      </transition>

      <transition name="fade">
        <!-- Comment Alert -->
        <n-alert v-if="commentAlertMessage" :type="commentAlertType" closable @close="commentAlertMessage = null">
          {{ commentAlertMessage }}
        </n-alert>
      </transition>

      <transition name="fade">
        <!-- Comment Alert -->
        <n-alert v-if="commentdeleteAlertMessage" :type="commentdeleteAlertType" closable @close="commentdeleteAlertMessage = null">
          {{ commentdeleteAlertMessage }}
        </n-alert>
      </transition>

      <transition name="fade">
        <!-- Comment Alert -->
        <n-alert v-if="packageAlertMessage" :type="packageAlertType" closable @close="packageAlertMessage = null">
          {{ packageAlertMessage }}
        </n-alert>
      </transition>
    </div>


    <!-- Loader -->
    <div v-if="!property" class="flex justify-center items-center h-screen">
      <!-- <p class="text-gray-700 text-xl">Loading property details...</p> -->
      <HouseLoading />
    </div>

    <div v-else class="pt-5 px-6 md:px-[150px]">
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
          <p class="whitespace-pre-wrap font-sans">{{ property.custom_property_description }}</p>
        </div>
      </section>


      <!-- **Hotel Packages -->
      <section v-if="property.custom_property_category === 'Hotel'">
        <main class="flex-grow pt-20 pb-8">
          <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Hotel Packages Card -->
            <div class="bg-white shadow-lg rounded-lg overflow-hidden">
              <!-- Header Section -->
              <div class="p-6 bg-green-600 text-white">
                <h1 class="text-2xl font-semibold">Hotel Packages</h1> 
              </div>

              <!-- Hotel Packages List -->
              <div class="p-6">
                <div v-if="!property || !property.custom_packages" class="text-center text-gray-500">
                  <p>Loading packages...</p> 
                </div>

                <div v-else-if="sortedPackages.length === 0" class="text-center text-gray-500">
                  <p>No packages found.</p> 
                </div>

                <div v-else>
                  <div
                    v-for="(packageItem, index) in sortedPackages"
                    :key="index"
                    class="mb-6 border-b pb-6 last:border-b-0 flex items-center gap-6"
                  >
                    <!-- Package Image -->
                    <img
                      :src="packageItem.package_image || '../assets/images/default-package.jpg'"
                      alt="Package Image" 
                      class="w-[200px] h-[200px] object-cover rounded-lg shadow-sm border"
                    />

                    <!-- Package Details -->
                    <div class="flex-grow">
                      <div class="flex justify-between items-start">
                        <!-- Left Section -->
                        <div>
                          <h2 class="text-xl font-semibold">{{ packageItem.package_name }}</h2>
                          <p class="text-gray-700 ">Max Guests: {{ packageItem.maximum_number_of_guests }}</p> 
                        </div>
                      </div>

                      <div class="">
                        <p class="whitespace-pre-wrap font-sans">{{ packageItem.package_description }}</p>
                      </div>

                      <!-- Price and Button -->
                      <div class="mt-2 flex justify-between items-center">
                        <p class="text-green-600 text-lg font-semibold">
                          <span class="text-[20px]">{{ property.currency }} {{ packageItem.package_price }}</span> night
                        </p>
                        <button
                          class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition"
                          @click="choosePackage(packageItem)"
                        >
                          Choose This Package
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
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
                <img src="../assets/images/checklist.png" alt="Check Icon"> 
                {{ offer }}
              </p>
            </template>
            <p v-else class="text-gray-500 italic">No offers available</p>
          </div>

          <hr class="mb-10" />

          <!-- Reviews -->
          <div>
            <div>
            <p>Leave A Comment</p>
            <div class="mb-2 flex items-center gap-2">
              <input
                v-model="comment"
                type="text"
                class="w-full px-4 rounded-sm border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-400 transition"
                placeholder="Place A Comment"
              />
              <button 
                @click="sendCommnent"
                class="bg-green-700 px-3 py-3 rounded-full hover:bg-black flex items-center justify-center"
                aria-label="Submit Comment"
              >
                <img 
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAuVJREFUSEvtllmIzWEYxn+PLURZbiyJ4sJWkpKLkTVXRJQQQ1lupixZQsnYZWmGssUVyQXFBRe2UpqihBskYS7IbnKBsb7+7/Sd6Zu/OXPOzDmaG+/V/3zb8z7v+3zPd0QrhVoJl//ARau8mfUB1gLLgIfAOElfMgBFL7WZDQI2AKVAu4jJGEm3iw5sZiOBjcBMoE0jpRsmyZnXRcGMzWwSsA6YkgJzdk+BeWG8l6Q3BQGbmSc8A1gPjE4BXgV2SrphZl7ynWG+o6RvLQI2M+/Z/MBwSARowPmkp9sl3cuMm9meILBaSZ3iBPMqtZn5JlfnaqBfdMBP4DSwS9LjdF/N7DiwBHglyVVeH00Cm1k3YDmwEuge7fOSnQB2S3oRMRwi6VH0+xwwC3ggaXhOYDPrDawJLLtEGz4Bh4EKSe8igIGAl/W+pG3R+HVgIlAlqSQrcLiDLpgFiSg6RAvfApUOKsnB68LMeiY3Y0tI0M2hr6TP0fxdwK/ZRUnTGgU2s/HANaBttOAlsA84Kqk2OtB7vioYRaYi6yTtjQ83s+fAAOCkpIXZgL2PFdHkL2ATcEzSx8DQjWFx8l0OxGLxigyQ9DUFXJNUynVSmVTKE/1bXGbWHpgTlDsiWvMdOAN4v9woGogkrFsp6UAK1Cv3I5jUZklb8xHXhFDKqXm422ugvyRPsD5C/9+HgRWSDuYEjnrphu8lWpSotnO8Mfouk+RKbxBBqE/CYKmkU3kDRwn0AD5kAXbQ/ZKepRiPAu6EsamSLjUbOAjLbTFb+NwV4BBwSdJvM/NH43LYUCKp6l8Ax2dW+/VLWuT3/UiYGBo7mo/l5dU5GLthnE3+ZcxuQge9JbkI66NQ4FvAXEnVZtYVcJMoAwanetLgSSyEsfd0R3JAuSQ3mrSiJ4cEpgefHpte0xLG/hrNk3SzCbHVTZmZ22VN7O+ZPc0FvuB3urGDciVRCOOlkvxhL0rkzbgoaC1RdbGB/wCh9gUuioQc1QAAAABJRU5ErkJggg=="
                  alt="Submit"
                  class="w-5 h-5"
                />
              </button>

            </div>
          </div>
            <h2 class="font-bold mt-8 text-xl mb-3">Guest Reviews</h2>
            <div class="space-y-4">
              <!-- ✅ Display comments only if they exist -->
              <template v-if="comments.filter(c => c.item === property.item_code).length > 0">
                <div 
                  v-for="(comment, index) in comments.filter(c => c.item === property.item_code)" 
                  :key="index" 
                  class="flex items-center gap-2"
                > 
                  <div class="flex items-center justify-center">
                  <img src="../assets/images/compic.png" class=" pt-3" alt="User Avatar" />
                  </div>
                  <div class="flex items-center justify-between w-full">
                    <div>
                      <p class="text-gray-600 text-sm">{{ comment.full_name }}</p>
                      <p class="font-semibold">{{ comment.comment }}</p>
                    </div>
                    
                    <template v-if="comment.email === userEmail">
                      <button 
                        @click="deleteComment.submit(comment.name)"
                        class=" px-3 py-3 hover:opacity-100 hover:rounded-lg flex items-center justify-center"
                        aria-label="Delete Comment"
                      >
                        <img 
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAASFJREFUSEvtljFuwkAQRZ9FRUWOwBEQFwDOEIoUILgBEkqfUKcgRyAKDRKcAbgA4ggcASo6kozkjUYm9nrXlpxip/TOzNv9M+udiIosqoiLC7gGPAP1lM1egTfglucwLuB3YGJJOgemZYJHwCJPQuAJWNl8kyfuAltbkOd6D9iZ2H8DbgJjzxPZwqRUp7QT6+AW8GDLZlk/A8e/fLK6WurRKQje/9RV+ubOAlhLkpR6Fi+KdMkSiKTmqryoJKVIbcryCujkwpFNyXexrwAu2tVBaq1gaC6jRrjHv33h8kjIBCEm77WMQto+1GikJ5hSpPZ5Ib3Aa+DRh6ZiNkDf9c81AD4LgofA0hUs/u34CWw4buACiMyHtDiXgd6Rne1eGfgbWNpaHzl+XRoAAAAASUVORK5CYII="
                          alt="delete"
                          class="w-5 h-5 opacity-25 "
                        />
                      </button>
                    </template>
                    <p v-else></p>
                  </div>                  
                </div>
              </template>

              <!-- ✅ Correct condition for empty comments -->
              <p v-else class="text-gray-500 italic">No Comments available</p>
            </div>
          </div>

        </section>

        <!-- **Booking Section -->
        <section class="bg-white w-full lg:w-[40%] rounded-3xl shadow-xl p-8 border border-gray-200">
          <h3 class="text-3xl font-extrabold text-green-600 text-center mb-6">Reserve Now!</h3>

          <div class="space-y-6 mb-5">
            <!-- Date Pickers -->
            <div class="mb-4">
              <label class="block">Check-In Date</label>
              
              <DatePicker 
              placeholder="Select Check In Date" 
              v-model="checkIn" 
              clearable 
              class="w-full text-[15px] h-[40px] rounded-sm focus:border-green-800" 
              />
             
              <label class="block mt-3">Check-Out Date</label>
              <DatePicker 
              placeholder="Select Check Out Date" 
              v-model="checkOut" 
              clearable 
              class="w-full h-[40px] text-[15px] rounded-sm focus:border-green-800" 
              />

              <div v-if="property.custom_property_category === 'Hotel'">
                <label class="block mt-3 font-medium">Selected Package</label>
                <input 
                  v-model="selectedPackage"
                  type="text"
                  class="w-full py-2 px-4 border border-gray-400 rounded-sm focus:border-green-600 focus:ring-2 focus:ring-green-400 transition"
                  placeholder="Select A Package above"
                  readonly
                />
              </div>
            </div>

            <!-- Price Breakdown -->
            <div class="grid grid-cols-2 gap-4 items-center text-gray-700">
              <p class="text-lg font-semibold"></p>
              <span class="text-[20px] font-bold text-green-600 text-right">
                {{ property.currency }} {{ selectedPackagePrice ? selectedPackagePrice : property.price_list_rate }} night
              </span>


              <p class="text-lg">{{ numberOfNights }} Nights × {{ property.currency }} {{ property.price_list_rate }}</p>
              <span class="text-lg font-semibold text-right">
                {{ property.currency }} {{ plusNights }}
              </span>
            </div>


            <!-- Grand Total -->
            <div class="bg-green-50 border-l-4 border-green-600 p-5 rounded-xl">
              <div class="grid grid-cols-2 gap-4 items-center text-green-800 font-bold text-2xl">
                <p>Total Price</p>
                <span class="text-green-600 text-right">
                  {{ property.currency }} {{ plusNights }}
                </span>
              </div>
              <p
                class="text-sm text-gray-500 text-right">
                No Taxes Included
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
                placeholder="First Name">
            </div>
            
            <div>
              <label class="block text-gray-700 font-medium">Last Name</label>
              <input
                v-model="lastName" 
                type="text" 
                class="w-full py-2 px-4 border border-gray-300 rounded-md focus:border-green-600 focus:ring-2 focus:ring-green-400 transition"
                placeholder="Last Name">
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
              <label class="block text-gray-700 font-medium">Passport Number</label>
              <input 
                v-model="passportNumber"
                type="text"
                class="w-full py-2 px-4 border border-gray-300 rounded-md focus:border-green-600 focus:ring-2 focus:ring-green-400 transition"
                placeholder="Passport Number" />
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
            ✈ Turn In Your Booking
          </button>
        </div>
      </div>
      
    </div>

    <FooterComponent />
  </div>
</template>










<script>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { DatePicker } from "frappe-ui";
import FooterComponent from "../components/elements/footer.vue";
import NavBar from "../components/elements/navbar.vue";
import GuestDropdown from "../components/widgets/guests.vue";
import HouseLoading from "../components/elements/houseLoading.vue";
import { useLightbox } from "../components/utility/booking_page/lightbox";
import { useBooking } from "../components/utility/booking_page/booking";
import { useProperty } from "../components/utility/booking_page/property";
import { useCountries } from "../components/utility/booking_page/countries";
import { useSendComment } from "../components/utility/booking_page/sendcomment";
import { getComments } from "../components/utility/booking_page/fetchcomments";

export default {
  name: "BookingPage",
  components: {
    NavBar,
    FooterComponent,
    GuestDropdown,
    DatePicker,
    HouseLoading,
  },
  setup() {
    const route = useRoute();
    const propertyTitle = route.query.title || "";
    const comment= ref("");


    
    const { property, images } = useProperty(propertyTitle); 
    const { lightboxVisible, lightboxIndex, openLightbox, closeLightbox, prevLightbox, nextLightbox } = useLightbox(images);
    const { showReservationForm, checkIn, selectedPackage, checkOut, passportNumber, firstName, lastName, country, telephoneNumber, guestCount, selectedCountry, userEmail, numberOfNights, formatCurrency, plusNights, book,
      alertMessage: bookingAlertMessage, alertType: bookingAlertType
    } = useBooking(property); // Pass property to useBooking

    const { countries } = useCountries();
    const { sendCommnent, alertMessage: commentAlertMessage, alertType: commentAlertType} = useSendComment(comment, property, userEmail);
    const { deleteComment, comments, fetchComments, alertMessage: commentdeleteAlertMessage, alertType: commentdeleteAlertType  } = getComments();
  




    // **Computed property to sort packages by price (lowest to highest)
    const sortedPackages = computed(() => {
      if (!property.value || !property.value.custom_packages) return [];
      return [...property.value.custom_packages].sort((a, b) => a.package_price - b.package_price);
    });

    // !Hotel Package selection Logic
    // **Hotel Package function
    // const selectedPackage = ref(""); // Holds the selected package name
    const selectedPackagePrice = ref(0); // Holds the selected package price

    // Separate alert for package selection
    const packageAlertMessage = ref(null);
    const packageAlertType = ref(null);

    const choosePackage = (packageItem) => {
      try {
        selectedPackage.value = packageItem.package_name; // Update package name
        selectedPackagePrice.value = packageItem.package_price; // Store selected price
        property.value.price_list_rate = packageItem.package_price; // Update displayed price

        // Set package-specific alert
        packageAlertMessage.value = `Package Selected: ${packageItem.package_name}`;
        packageAlertType.value = "success";

        // Auto-hide the alert after 3 seconds
        setTimeout(() => {
          packageAlertMessage.value = null;
        }, 3000);
      } catch (err) {
        packageAlertMessage.value = "Failed To Select Package. Please try again.";
        packageAlertType.value = "error";
        
        setTimeout(() => {
          packageAlertMessage.value = null;
        }, 3000);
      }
    };


    return {
      showReservationForm,
      userEmail,
      comments,
      property,
      images,
      checkIn,
      checkOut,
      passportNumber,
      book,
      plusNights,
      formatCurrency,
      numberOfNights,
      lightboxVisible,
      lightboxIndex,
      openLightbox,
      closeLightbox,
      prevLightbox,
      nextLightbox,
      firstName,
      lastName,
      country,
      telephoneNumber,
      selectedCountry,
      guestCount,
      countries,
      comment,
      sendCommnent,
      fetchComments, 
      deleteComment,
      bookingAlertMessage, 
      bookingAlertType,
      commentAlertMessage, 
      commentAlertType,
      commentdeleteAlertMessage,
      commentdeleteAlertType,
      choosePackage,
      sortedPackages,
      selectedPackage,
      selectedPackagePrice,
      packageAlertMessage,
      packageAlertType,
      
    };
  },
};

</script>


// src/utils/booking.js
import { ref, computed } from "vue";
import { createResource } from "frappe-ui";
import { session } from '../../../data/session';

export function useBooking(property) { // Accept property as a parameter
  const showReservationForm = ref(false);
  const checkIn = ref("");
  const checkOut = ref("");
  const firstName = ref("");
  const lastName = ref("");
  const country = ref("");
  const telephoneNumber = ref("");
  const guestCount = ref("");
  const selectedCountry = ref("");
  const passportNumber = ref("");
  const selectedPackage = ref("");

  const alertMessage = ref(null);
  const alertType = ref(null);

  const userEmail = computed(() => session.user || "");

  

  const numberOfNights = computed(() => {
    if (checkIn.value && checkOut.value) {
      const start = new Date(checkIn.value);
      const end = new Date(checkOut.value);

      if (isNaN(start) || isNaN(end)) {
        return 0;
      }

      const nights = (end - start) / (1000 * 60 * 60 * 24);
      return nights > 0 ? Math.floor(nights) : 0;
    }
    return 0;
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const plusNights = computed(() => {
    if (property.value && property.value.price_list_rate && numberOfNights.value > 0) {
      return formatCurrency(property.value.price_list_rate * numberOfNights.value);
    }
    return formatCurrency(0);
  });

  const isBooking = ref(false);

  const book = async () => {

    if (isBooking.value) return; // Prevent duplicate requests
    isBooking.value = true; // Lock function while request is running


    try {
      console.log("Preparing booking data...");

      // Validation
      if (!firstName.value) {
        alertMessage.value = "⚠️ First Name is required.";
        alertType.value = "warning";
        return;
      }

      if (!lastName.value) {
          alertMessage.value = "⚠️ Last Name is required.";
          alertType.value = "warning";
          return;
      }

      if (!selectedCountry.value) {
          alertMessage.value = "⚠️ Please select a Country.";
          alertType.value = "warning";
          return;
      }

      if (!telephoneNumber.value) {
          alertMessage.value = "⚠️ Phone Number is required.";
          alertType.value = "warning";
          return;
      }

      if (!passportNumber.value) {
          alertMessage.value = "⚠️ Passport Number is required.";
          alertType.value = "warning";
          return;
      }

      if (!checkIn.value) {
          alertMessage.value = "⚠️ Check-in date is required.";
          alertType.value = "warning";
          return;
      }

      if (!checkOut.value) {
          alertMessage.value = "⚠️ Check-out date is required.";
          alertType.value = "warning";
          return;
      }

      if (!guestCount.value || parseInt(guestCount.value) <= 0) {
          alertMessage.value = "⚠️ Please enter a valid number of guests (greater than 0).";
          alertType.value = "warning";
          return;
      }

      if (!selectedPackage.value && property.value?.custom_property_category === 'Hotel') {
        alertMessage.value = "⚠️ Please select a package.";
        alertType.value = "warning";
        return;
    }

      const bookingData = {
        doctype: "Ex Bookings",
        email: userEmail.value || "",
        first_name: firstName.value || "",
        last_name: lastName.value || "",
        guest_country: selectedCountry.value || "",
        phone: telephoneNumber.value || "",
        passport_no: passportNumber.value || "",
        guests: guestCount.value || "",
        check_in: checkIn.value || "",
        check_out: checkOut.value || "",
        no_of_nights: numberOfNights.value,
        code: property.value?.item_code,
        item_price_name:property.value?.name,
        tax_category: property.value?.tax,
        price_per_night: property.value?.price_list_rate,
        property_category: property.value?.custom_property_category,
        hotel_package_selected: selectedPackage.value || "",
      };

      console.log("📩 Booking Payload:", bookingData);

      const bookResponse = await createResource({
        url: 'frappe.client.insert',
        params: {
          doc: bookingData,
        },
      }).fetch();

      console.log("📩 API Response:", bookResponse);

      if (bookResponse && bookResponse.name) {
        console.log("✅ Booking successful!", bookResponse);
        alertMessage.value = `🎉 Booking successful! Booking ID: ${bookResponse.name}`;
        alertType.value = "success";
        showReservationForm.value = false;


        // ✅ Reset fields after successful booking
        checkIn.value = "";
        checkOut.value = "";
        firstName.value = "";
        lastName.value = "";
        selectedCountry.value = "";
        telephoneNumber.value = "";
        passportNumber.value = "";
        guestCount.value = "";
        selectedPackage.value = "";
        
      } else {
        console.error("❌ Booking failed:", bookResponse);
        alertMessage.value = "❌ Booking failed. Please try again.";
        alertType.value = "error";
      }
    } catch (err) {
      console.error("🚨 Unable to book reservation", err);
    }
  };

  return {
    showReservationForm,
    checkIn,
    checkOut,
    passportNumber,
    firstName,
    lastName,
    country,
    telephoneNumber,
    guestCount,
    selectedCountry,
    userEmail,
    numberOfNights,
    formatCurrency,
    plusNights,
    book,
    alertMessage,
    alertType, 
    selectedPackage
  };
}





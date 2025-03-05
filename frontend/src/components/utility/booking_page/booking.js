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
        passport_no: passportNumber.value || "",
        guests: guestCount.value || "",
        check_in: checkIn.value || "",
        check_out: checkOut.value || "",
        no_of_nights: numberOfNights.value,
        code: property.value?.item_code,
        item_price_name:property.value?.name,
        tax_category: property.value?.tax,
        price_per_night: property.value?.price_list_rate,
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
        alert(`🎉 Booking successful! Booking ID: ${bookResponse.name}`);
        showReservationForm.value = false;
      } else {
        console.error("❌ Booking failed:", bookResponse);
        alert("Booking failed. Please try again.");
      }
    } catch (err) {
      console.error("🚨 Unable to book reservation", err);
      alert("An error occurred. Please check the console for details.");
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
  };
}
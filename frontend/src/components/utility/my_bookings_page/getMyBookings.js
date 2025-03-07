import { createResource } from "frappe-ui";
import { ref } from "vue";

export function useFetchMyBookings() {
    const alertMessage = ref(null);
    const alertType = ref(null);


    const myBookingResource = createResource({
        method: "post",
        url: "/api/method/frappe.client.get_list",
        params: {
            doctype: "Ex Bookings",
            fields: [
                "name", "email", "status", "country", "location", "city", "check_in",
                "check_out", "guests", "price_per_night", "no_of_nights",
                "profile_picture_import", "title", "currency"
            ],
            limit_page_length: 100,
        },
    });

    const FetchMyBookings = async () => {
        try {
            console.log("Fetching bookings...");
            const response = await myBookingResource.fetch();

            // Debugging API response
            console.log("✅ Raw API Response:", response);

            // Return response directly as it's already an array
            if (Array.isArray(response)) {
                console.log("✅ Fetched bookings:", response);
                return response;
            } else {
                console.warn("⚠️ Unexpected response format:", response);
                return [];
            }
        } catch (err) {
            console.error("🚨 Unable to fetch bookings:", err);
            return [];
        }
    };
    
    // Cancel Booking
    const cancelMyBooking = createResource({
        url: "ex_stay.api.cancel_booking.cancel_booking", 
        makeParams(booking_name) {
            return { name: booking_name }; 
        },
        onSuccess(data) {
            alertMessage.value = `Booking Cancelled successfully.`;
            alertType.value = "success";
            FetchMyBookings(); // Refresh comments after deletion
        },
        onError(error) {
            alertMessage.value = "An error occurred while cancelling your booking.";
            alertType.value = "error";
        },
    });

    return {
        FetchMyBookings,
        cancelMyBooking,
        alertType,
        alertMessage
    };
}


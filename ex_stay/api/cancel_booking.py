import frappe
from frappe import _

@frappe.whitelist(allow_guest=True)  # Allow calling this API externally
def cancel_booking(name):
    """Cancel a booking by updating the status field to 'Cancelled'."""
    try:
        # Fetch the document
        booking = frappe.get_doc("Ex Bookings", name)

        # Check if the document exists
        if not booking:
            return {"status": "error", "message": _("Booking not found")}

        # Update the status to 'Cancelled'
        booking.status = "Cancelled"
        booking.save()
        frappe.db.commit()

        return {"status": "success", "message": _("Booking has been cancelled"), "booking_name": name}

    except frappe.DoesNotExistError:
        return {"status": "error", "message": _("Booking not found")}
    except Exception as e:
        frappe.log_error(f"Cancel Booking Error: {str(e)}", "Ex Bookings API")
        return {"status": "error", "message": str(e)}

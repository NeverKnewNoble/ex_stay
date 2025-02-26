import frappe
import json
from frappe import _

@frappe.whitelist(allow_guest=True)
def book(**kwargs):
    try:
        data = frappe._dict(kwargs)
        
        # Validate required fields
        required_fields = [
            "email", "first_name", "last_name", "guest_country",
            "phone", "check_in", "check_out", "no_of_nights",
            "guests", "code", "rate", "price_per_night", "total_price", "nights_x_price_per_night",
            "levies", "vat_frontend"
        ]
        
        missing_fields = [field for field in required_fields if not data.get(field)]
        if missing_fields:
            return {"status": "error", "message": f"Missing required fields: {', '.join(missing_fields)}"}
        
        # Create new booking document
        booking = frappe.get_doc({
            "doctype": "Ex Bookings",
            "email": data.email,
            "first_name": data.first_name,
            "last_name": data.last_name,
            "guest_country": data.guest_country,
            "phone": data.phone,
            "check_in": data.check_in,
            "check_out": data.check_out,
            "no_of_nights": data.no_of_nights,
            "guests": data.guests,
            "code": data.code,
            "rate": data.rate,
            "price_per_night": data.price_per_night,
            "total_price": data.total_price,
            "nights_x_price_per_night": data.nights_x_price_per_night,
            "levies": data.levies,
            "vat_frontend": data.vat_frontend
        })
        
        booking.insert(ignore_permissions=True)
        frappe.db.commit()
        
        return {"status": "success", "message": "Booking created successfully", "booking_id": booking.name}
    
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Create Booking API Error")
        return {"status": "error", "message": str(e)}



# http://127.0.0.1:8000/api/method/ex_stay.api.booking.book
import frappe

@frappe.whitelist(allow_guest=True)
def countryInFrappe(**kwargs):
    try:
        countries = frappe.get_all(
            "Country",
            fields=["country_name"]
        )

        if not countries:
            return {"status": "success", "message": "No countries found.", "data": []}

        return {"status": "success", "data": countries}

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Unable to get countries")
        return {"status": "error", "message": str(e)}
    

    
# http://127.0.0.1:8000/api/method/ex_stay.api.countryList.countryInFrappe

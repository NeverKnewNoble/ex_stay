import frappe
import json

@frappe.whitelist(allow_guest=True)
def create_user(first_name, last_name, email, password):
    """
    Create a new user in the Frappe system.
    """
    try:
        # Create a new user document
        user = frappe.get_doc({
            "doctype": "User",
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "new_password": password,
            "enabled": 1,
            "send_welcome_email": 1
        })
        
        # Insert the user into the system
        user.insert(ignore_permissions=True)

        # Commit the transaction
        frappe.db.commit()

        return {"status": "success", "message": "User created successfully!", "user": user.name}
    except frappe.DuplicateEntryError:
        frappe.local.response.http_status_code = 409
        return {"status": "error", "message": "User with this email already exists."}
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "User Creation Error")
        frappe.local.response.http_status_code = 500
        print(e)
        return {"status": "error", "message": str(e)}


# http://127.0.0.1:8000/api/method/ex_stay.api.create_user.create_user

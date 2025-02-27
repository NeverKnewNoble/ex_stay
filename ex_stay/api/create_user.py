# import frappe
# import json

# @frappe.whitelist(allow_guest=True)
# def create_user(first_name, last_name, email, password):
#     """
#     Create a new user in the Frappe system and assign the 'Ex Stay User' role.
#     """
#     try:
#         # Check if the user already exists
#         if frappe.db.exists("User", email):
#             return {"status": "error", "message": "User with this email already exists."}

#         # Create a new User document
#         user = frappe.get_doc({
#             "doctype": "User",
#             "first_name": first_name,
#             "last_name": last_name,
#             "email": email,
#             "new_password": password,
#             "enabled": 1,
#             "send_welcome_email": 1,
#         })
        
#         # Insert the user into the system
#         user.insert(ignore_permissions=True)

#         # Assign the "Ex Stay User" role
#         frappe.get_doc({
#             "doctype": "Has Role",
#             "parent": user.name,
#             "parentfield": "roles",
#             "parenttype": "User",
#             "role": "Ex Stay User"
#         }).insert(ignore_permissions=True)

#         # Commit the transaction
#         frappe.db.commit()

#         return {"status": "success", "message": "User created and assigned role successfully!", "user": user.name}
    
#     except frappe.DuplicateEntryError:
#         frappe.local.response.http_status_code = 409
#         return {"status": "error", "message": "User with this email already exists."}

#     except Exception as e:
#         frappe.log_error(frappe.get_traceback(), "User Creation Error")
#         frappe.local.response.http_status_code = 500
#         return {"status": "error", "message": str(e)}


import frappe

@frappe.whitelist(allow_guest=True)
def create_user(first_name, last_name, email, password):
    """
    Create a new user in the Frappe system and assign the 'Ex Stay User' role.
    """
    try:
        # Check if the user already exists
        if frappe.db.exists("User", email):
            return {"status": "error", "message": "User with this email already exists."}

        # Create a new User document
        user = frappe.get_doc({
            "doctype": "User",
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "new_password": password,
            "enabled": 1,
            "send_welcome_email": 1,
            "roles": [{"role": "Ex Stay User"}],  # Assign role correctly
        })
        
        # Insert the user into the system
        user.insert(ignore_permissions=True)

        # Check if customer already exists before inserting
        if not frappe.db.exists("Customer", {"email_id": email}):
            frappe.get_doc({
                "doctype": "Customer",
                "customer_name": first_name + " " + last_name,
                "customer_type": "Individual",
                "customer_group": "Individual",
                "territory": "All Territories",
                "email_id": email
            }).insert(ignore_permissions=True)

        return {"status": "success", "message": "User created and assigned role successfully!", "user": user.name}

    except frappe.DuplicateEntryError:
        frappe.local.response.http_status_code = 409
        return {"status": "error", "message": "User with this email already exists."}

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "User Creation Error")
        frappe.local.response.http_status_code = 500
        return {"status": "error", "message": str(e)}

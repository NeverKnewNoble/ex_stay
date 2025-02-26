# Copyright (c) 2025, Carbonite-Solution.Ltd and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ExBookings(Document):
    pass


# # ***********FUNCTION TO CREATE SALES ORDER FROM EX BOOKINGS****************
# @frappe.whitelist()
# def create_sales_order_from_event(event_name):
#     try:
#         event_doc = frappe.get_doc('Ex Bookings', event_name)

#         # Ensure item exists
#         if not frappe.db.exists("Item", event_doc.code):
#             return f"Item '{event_doc.code}' does not exist."

#         so_doc = frappe.get_doc({
#             'doctype': 'Sales Order',
#             'customer': event_doc.customer,
#             'custom_booking_link': event_doc.name,
#             'delivery_date': frappe.utils.nowdate(),  
#             'tax_category': event_doc.tax_category,
#             'items': [{
#                 'item_code': event_doc.code,
#                 'qty': event_doc.guests,
#                 'rate': event_doc.price_per_night
#             }]
#         })

#         so_doc.insert()
#         so_doc.submit()
#         return so_doc.name

#     except Exception as e:
#         frappe.log_error(f"Error creating Sales Order: {e}\n{frappe.get_traceback()}", "Create Sales Order Error")
#         return str(e)


# @frappe.whitelist()
# def get_sales_order_count(event_name):
#     return frappe.db.count('Sales Order', filters={'custom_booking_link': event_name})


# # ***********FUNCTION TO CREATE SALES INVOICE FROM EX BOOKINGS****************
# @frappe.whitelist()
# def create_sales_invoice_from_event(event_name):
#     try:
#         event_doc = frappe.get_doc('Ex Bookings', event_name)

#         # Ensure item exists
#         if not frappe.db.exists("Item", event_doc.code):
#             return f"Item '{event_doc.code}' does not exist."

#         si_doc = frappe.get_doc({
#             'doctype': 'Sales Invoice',
#             'customer': event_doc.customer,
#             'custom_booking_link': event_doc.name,
#             'posting_date': frappe.utils.nowdate(),
#             'tax_category': event_doc.tax_category,
#             'items': [{
#                 'item_code': event_doc.code,
#                 'qty': event_doc.guests,
#                 'rate': event_doc.price_per_night
#             }]
#         })

#         si_doc.insert()
#         si_doc.submit()
#         return si_doc.name

#     except Exception as e:
#         frappe.log_error(f"Error creating Sales Invoice: {e}\n{frappe.get_traceback()}", "Create Sales Invoice Error")
#         return str(e)


# @frappe.whitelist()
# def get_sales_invoice_count(event_name):
#     return frappe.db.count('Sales Invoice', filters={'custom_booking_link': event_name})







# ***********FUNCTION TO CREATE SALES ORDER FROM EX BOOKINGS****************
@frappe.whitelist()
def create_sales_order_from_event(event_name):
    try:
        event_doc = frappe.get_doc('Ex Bookings', event_name)

        # Ensure customer exists or create a new one
        customer_name = f"{event_doc.first_name} {event_doc.last_name}".strip()
        customer_email = event_doc.email
        customer = get_or_create_customer(customer_name, customer_email)

        # Ensure item exists
        if not frappe.db.exists("Item", event_doc.code):
            return f"Item '{event_doc.code}' does not exist."

        so_doc = frappe.get_doc({
            'doctype': 'Sales Order',
            'customer': customer,
            'custom_booking_link': event_doc.name,
            'delivery_date': frappe.utils.nowdate(),
            'tax_category': event_doc.tax_category,
            'items': [{
                'item_code': event_doc.code,
                'qty': event_doc.guests,
                'rate': event_doc.price_per_night
            }]
        })

        so_doc.insert()
        so_doc.submit()
        return so_doc.name

    except Exception as e:
        frappe.log_error(f"Error creating Sales Order: {e}\n{frappe.get_traceback()}", "Create Sales Order Error")
        return str(e)


@frappe.whitelist()
def get_sales_order_count(event_name):
    return frappe.db.count('Sales Order', filters={'custom_booking_link': event_name})


# ***********FUNCTION TO CREATE SALES INVOICE FROM EX BOOKINGS****************
@frappe.whitelist()
def create_sales_invoice_from_event(event_name):
    try:
        event_doc = frappe.get_doc('Ex Bookings', event_name)

        # Ensure customer exists or create a new one
        customer_name = f"{event_doc.first_name} {event_doc.last_name}".strip()
        customer_email = event_doc.email
        customer = get_or_create_customer(customer_name, customer_email)

        # Ensure item exists
        if not frappe.db.exists("Item", event_doc.code):
            return f"Item '{event_doc.code}' does not exist."

        si_doc = frappe.get_doc({
            'doctype': 'Sales Invoice',
            'customer': customer,
            'custom_booking_link': event_doc.name,
            'posting_date': frappe.utils.nowdate(),
            'tax_category': event_doc.tax_category,
            'items': [{
                'item_code': event_doc.code,
                'qty': event_doc.guests,
                'rate': event_doc.price_per_night
            }]
        })

        si_doc.insert()
        si_doc.submit()
        return si_doc.name

    except Exception as e:
        frappe.log_error(f"Error creating Sales Invoice: {e}\n{frappe.get_traceback()}", "Create Sales Invoice Error")
        return str(e)


@frappe.whitelist()
def get_sales_invoice_count(event_name):
    return frappe.db.count('Sales Invoice', filters={'custom_booking_link': event_name})


# ***********FUNCTION TO CREATE OR SELECT CUSTOMER****************
def get_or_create_customer(customer_name, customer_email):
    """Check if the customer exists by email, else create a new customer"""
    existing_customer = frappe.db.get_value("Customer", {"email_id": customer_email}, "name")
    
    if existing_customer:
        return existing_customer  # Return existing customer name

    # If customer doesn't exist, create a new one
    new_customer = frappe.get_doc({
        "doctype": "Customer",
        "customer_name": customer_name,
        "customer_type": "Individual",
        "customer_group": "Individual",
        "territory": "All Territories",
        "email_id": customer_email
    })
    
    new_customer.insert(ignore_permissions=True)
    frappe.db.commit()

    return new_customer.name  # Return the new customer name

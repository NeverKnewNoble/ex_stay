import frappe
from frappe import _

@frappe.whitelist()
def delete_comment(name):
    """
    Deletes a Property Comment document if it exists.
    """
    if not name:
        frappe.throw(_("Document name is required"), frappe.MandatoryError)

    # Check if comment exists
    if not frappe.db.exists("Property Comments", name):
        frappe.throw(_("Comment not found"), frappe.DoesNotExistError)

    # Delete the comment
    frappe.delete_doc("Property Comments", name, force=True)

    return {"message": "Comment deleted successfully"}


import frappe
from frappe import _

@frappe.whitelist()
def delete_comment(comment_id):
    """
    Deletes a Property Comment document if it exists.
    """
    if not comment_id:
        frappe.throw(_("Comment ID is required"), frappe.MandatoryError)

    # Check if comment exists
    comment = frappe.get_value("Property Comments", comment_id, "name")
    if not comment:
        frappe.throw(_("Comment not found"), frappe.DoesNotExistError)

    # Delete the comment
    frappe.delete_doc("Property Comments", comment, force=True)

    return {"message": "Comment deleted successfully"}


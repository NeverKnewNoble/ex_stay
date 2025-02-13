import frappe
import hashlib
import time

@frappe.whitelist(allow_guest=True)
def forgot_password(email):
    """
    Sends a password reset email to the user.
    """
    try:
        user = frappe.get_doc("User", email)

        # Check if the user is disabled
        if not user.enabled:
            return {"status": "error", "message": "User account is disabled."}

        # Generate a reset password key
        reset_key = hashlib.sha256(f"{user.name}{time.time()}".encode()).hexdigest()[:32]
        
        # Store the reset key in the user document
        user.db_set("reset_password_key", reset_key)
        
        # Generate reset URL
        reset_url = frappe.utils.get_url(f"/update-password?key={reset_key}")

        # Send email
        frappe.sendmail(
            recipients=email,
            subject="Reset Your Password",
            message=f"""
                <p>Hello {user.first_name},</p>
                <p>You requested to reset your password. Click the link below to proceed:</p>
                <p><a href="{reset_url}" target="_blank">Reset Password</a></p>
                <p>If you did not request this, please ignore this email.</p>
                <br>
                <p>Thank you.</p>
            """
        )

        # ✅ Ensure success response after sending the email
        return {"status": "success", "message": "Password reset email sent successfully."}

    except frappe.DoesNotExistError:
        return {"status": "error", "message": "Email not found in the system."}
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Forgot Password Error")
        return {"status": "error", "message": str(e)}


# http://127.0.0.1:8000/api/method/ex_stay.api.forgot_password.forgot_password
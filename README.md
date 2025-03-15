# **Ex Stay**

A vacation bookings page for guests and for owners willing to rent out their property.

---

## **Installation**

To install the Ex Stay app in **Frappe**, follow these steps:

### **Step 1: Get the App**
Ensure you have **Frappe** and **Bench** installed. Then, run:

```bash
bench get-app ex_stay https://github.com/your-repo/ex_stay.git
bench --site yoursite install-app ex_stay
```

### **Step 2: Migrate and Restart**
```bash
bench --site yoursite migrate
bench restart
```

---

## **User Role Setup**

To allow users to access Ex Stay, create a **User Role** called **"Ex Stay User"** in Frappe.

### **Step 1: Create the Role**
1. Go to **Frappe Desk**.  
2. Navigate to **Role List** (`/app/role`).  
3. Click **New**, enter **"Ex Stay User"**, and save.  

### **Step 2: Assign Permissions**
Grant **"Ex Stay User"** permissions for the following Doctypes:

- **Property Listings**
- **Property Pricing**
- **Tax Category**
- **Sales Taxes Type**
- **Ex Stay Settings**
- **Ex Bookings**
- **Property Comments**

#### **Steps to Set Permissions**
1. Go to **Role Permissions Manager** (`/app/role-permission-manager`).
2. Select the role **"Ex Stay User"**.
3. For each **Doctype**, click **Add a Permission Rule**.
4. Set **Read, Write, Create, Delete, and Submit** permissions as required.
5. Save changes.

---

## **Customize Email Template**

To set up a **custom welcome email**:

### **Step 1: Open System Settings**
1. Go to **System Settings** (`/app/system-settings`).
2. Click on the **Email** tab.
3. Locate the **Welcome Email Template** field.

### **Step 2: Create a New Email Template**
1. Navigate to **Email Templates** (`/app/email-template`).
2. Click **New** and enter:

#### **Subject:**
```
Welcome to Ex Stay! Your Journey Starts Here
```

#### **Response:**
```
Dear Valued Customer,

Welcome to Ex Stay – your new home away from home! 🎉 We’re thrilled to have you join our community of travelers, hosts, and explorers looking for the best stays and experiences.

What’s next?
✅ Complete Your Profile: Enhance your experience by adding your details and preferences.
✅ Explore Listings: Browse incredible stays and find your perfect getaway.
✅ Book & Enjoy: Secure your dream stay in just a few clicks.

Why Choose Ex Stay?
🏡 Unique Stays: Find handpicked homes, apartments, and unique spaces.
🛡️ Secure Bookings: Your safety and comfort are our top priorities.
💬 24/7 Support: We’re here whenever you need assistance.

If you have any questions, don't hesitate to get in touch with our support team at [support@email.com].

We can't wait to be a part of your next adventure! 🌍

**Happy Stays,**  
The Ex Stay Team
```

3. Save and set this template as the **Welcome Email Template**.

---

## **You're All Set! 🚀**
Your Ex Stay app is now ready to use! 🎉 Let us know if you need any help.

---

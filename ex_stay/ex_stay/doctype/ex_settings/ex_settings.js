// Copyright (c) 2025, Carbonite-Solution.Ltd and contributors
// For license information, please see license.txt


//  ! Function to toggle system notifications on or off
// ? ***********System Booking Notification***************
frappe.ui.form.on('Ex Settings', {
    after_save: function(frm) {
        frappe.call({
            method: 'ex_stay.ex_stay.doctype.ex_settings.ex_settings.toggle_notification',
            args: {
                notification_title: 'Ex Stay System Booking Notifications',
                enabled: frm.doc.sys_booking_noti ? 1 : 0  // ? Enable if checked, disable if unchecked
            },
            callback: function(response) {
                if (response.message === 'success') {
                    frappe.msgprint(__('Notification has been updated successfully.'));
                } else {
                    frappe.msgprint(__('Failed to update the notification.'));
                }
            }
        });
    }
});

// ? ***********System Booking Cancelled Notification***************
frappe.ui.form.on('Ex Settings', {
    after_save: function(frm) {
        frappe.call({
            method: 'ex_stay.ex_stay.doctype.ex_settings.ex_settings.toggle_notification',
            args: {
                notification_title: 'System Booking Cancelled Notification',
                enabled: frm.doc.sys_cancel_noti ? 1 : 0  // ? Enable if checked, disable if unchecked
            },
            callback: function(response) {
                if (response.message === 'success') {
                    frappe.msgprint(__('Notification has been updated successfully.'));
                } else {
                    frappe.msgprint(__('Failed to update the notification.'));
                }
            }
        });
    }
});

// ? ***********System Posted Comment Notifications***************
frappe.ui.form.on('Ex Settings', {
    after_save: function(frm) {
        frappe.call({
            method: 'ex_stay.ex_stay.doctype.ex_settings.ex_settings.toggle_notification',
            args: {
                notification_title: 'System Posted Comment Notifications',
                enabled: frm.doc.sys_comment_noti ? 1 : 0  // ? Enable if checked, disable if unchecked
            },
            callback: function(response) {
                if (response.message === 'success') {
                    frappe.msgprint(__('Notification has been updated successfully.'));
                } else {
                    frappe.msgprint(__('Failed to update the notification.'));
                }
            }
        });
    }
});

// ? ***********System Deleted Comment Notifications***************
frappe.ui.form.on('Ex Settings', {
    after_save: function(frm) {
        frappe.call({
            method: 'ex_stay.ex_stay.doctype.ex_settings.ex_settings.toggle_notification',
            args: {
                notification_title: 'System Deleted Comment Notifications',
                enabled: frm.doc.sys_deleted_noti ? 1 : 0  // ? Enable if checked, disable if unchecked
            },
            callback: function(response) {
                if (response.message === 'success') {
                    frappe.msgprint(__('Notification has been updated successfully.'));
                } else {
                    frappe.msgprint(__('Failed to update the notification.'));
                }
            }
        });
    }
});


//  ! Function to toggle Email notifications on or off
// ? ***********Email Booking Notification***************
frappe.ui.form.on('Ex Settings', {
    after_save: function(frm) {
        frappe.call({
            method: 'ex_stay.ex_stay.doctype.ex_settings.ex_settings.toggle_notification',
            args: {
                notification_title: 'Email Ex Stay Booking Notification',
                enabled: frm.doc.email_booking_noti ? 1 : 0  // ? Enable if checked, disable if unchecked
            },
            callback: function(response) {
                if (response.message === 'success') {
                    frappe.msgprint(__('Notification has been updated successfully.'));
                } else {
                    frappe.msgprint(__('Failed to update the notification.'));
                }
            }
        });
    }
});

// ? ***********Email Sales Order Notification***************
frappe.ui.form.on('Ex Settings', {
    after_save: function(frm) {
        frappe.call({
            method: 'ex_stay.ex_stay.doctype.ex_settings.ex_settings.toggle_notification',
            args: {
                notification_title: 'Email Ex Stay Sales Order Notifications',
                enabled: frm.doc.email_profoma_noti ? 1 : 0  // ? Enable if checked, disable if unchecked
            },
            callback: function(response) {
                if (response.message === 'success') {
                    frappe.msgprint(__('Notification has been updated successfully.'));
                } else {
                    frappe.msgprint(__('Failed to update the notification.'));
                }
            }
        });
    }
});

// ? ***********Email Sales Order Notification***************
frappe.ui.form.on('Ex Settings', {
    after_save: function(frm) {
        frappe.call({
            method: 'ex_stay.ex_stay.doctype.ex_settings.ex_settings.toggle_notification',
            args: {
                notification_title: 'Email Ex Stay Sales Invoice Notifications',
                enabled: frm.doc.email_sales_inv_noti ? 1 : 0  // ? Enable if checked, disable if unchecked
            },
            callback: function(response) {
                if (response.message === 'success') {
                    frappe.msgprint(__('Notification has been updated successfully.'));
                } else {
                    frappe.msgprint(__('Failed to update the notification.'));
                }
            }
        });
    }
});

// ? ***********Email Sales Order Notification***************
frappe.ui.form.on('Ex Settings', {
    after_save: function(frm) {
        frappe.call({
            method: 'ex_stay.ex_stay.doctype.ex_settings.ex_settings.toggle_notification',
            args: {
                notification_title: 'Hotel Email Ex Stay Sales Invoice Notifications',
                enabled: frm.doc.email_hotel_booking_noti ? 1 : 0  // ? Enable if checked, disable if unchecked
            },
            callback: function(response) {
                if (response.message === 'success') {
                    frappe.msgprint(__('Notification has been updated successfully.'));
                } else {
                    frappe.msgprint(__('Failed to update the notification.'));
                }
            }
        });
    }
});
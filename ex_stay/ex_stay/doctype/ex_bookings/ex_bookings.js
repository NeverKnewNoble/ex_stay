// Copyright (c) 2025, Carbonite-Solution.Ltd and contributors
// For license information, please see license.txt


//**************CURRENT DATE OF USER CREATING THE DOCUMENT*********************
frappe.ui.form.on("Ex Bookings", {
    before_load(frm) {
        if (!frm.doc.posting_date) {
            frm.set_value('posting_date', frappe.datetime.get_today());
        }
    }
});


// ******************DROPDOWN FOR SALES INVOICE AND SALES ORDER********************
frappe.ui.form.on('Ex Bookings', {
    refresh: function(frm) {
        if (!frm.is_new()) {
            // Fetch sales order count
            frappe.call({
                method: "ex_stay.ex_stay.doctype.ex_bookings.ex_bookings.get_sales_order_count",
                args: { event_name: frm.doc.name },
                callback: function(r) {
                    if (r.message > 0) {
                        frm.page.remove_action_menu_item(__('Sales Order'));
                    } else {
                        frm.add_custom_button(__('Sales Order'), function() {
                            frappe.call({
                                method: "ex_stay.ex_stay.doctype.ex_bookings.ex_bookings.create_sales_order_from_event",
                                args: { event_name: frm.doc.name },
                                callback: function(r) {
                                    if (r.message && !r.message.startsWith("Error")) {
                                        frappe.show_alert({
                                            message: __('Sales Order {0} created', [r.message]),
                                            indicator: 'green'
                                        });
                                        frappe.set_route('Form', 'Sales Order', r.message);
                                    } else {
                                        frappe.msgprint(__('Error: {0}', [r.message]));
                                    }
                                }
                            });
                        }, __("Create"));
                    }
                }
            });

            // Fetch sales invoice count
            frappe.call({
                method: "ex_stay.ex_stay.doctype.ex_bookings.ex_bookings.get_sales_invoice_count",
                args: { event_name: frm.doc.name },
                callback: function(r) {
                    if (r.message > 0) {
                        frm.page.remove_action_menu_item(__('Sales Invoice'));
                    } else {
                        frm.add_custom_button(__('Sales Invoice'), function() {
                            frappe.call({
                                method: "ex_stay.ex_stay.doctype.ex_bookings.ex_bookings.create_sales_invoice_from_event",
                                args: { event_name: frm.doc.name },
                                callback: function(r) {
                                    if (r.message && !r.message.startsWith("Error")) {
                                        frappe.show_alert({
                                            message: __('Sales Invoice {0} created', [r.message]),
                                            indicator: 'green'
                                        });
                                        frm.reload_doc();
                                        frappe.set_route('Form', 'Sales Invoice', r.message);
                                    } else {
                                        frappe.msgprint(__('Error: {0}', [r.message]));
                                    }
                                }
                            });
                        }, __("Create"));
                    }
                }
            });
        }
    }
});

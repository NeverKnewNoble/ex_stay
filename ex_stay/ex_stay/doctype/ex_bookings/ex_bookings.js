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





// ******TAX CATEGORY SELECTION
// frappe.ui.form.on('Ex Bookings', {
//     onload: function(frm) {
//         frm.fields_dict['taxes_and_charges'].get_query = function(doc, cdt, cdn) {
//             var tax_cate = frappe.model.get_value(cdt, cdn, 'tax_category');
//             var companyfield = frappe.defaults.get_user_default("Company");
//             return {
//                 filters: [
//                     ['tax_category', '=', tax_cate],
//                     ['company', '=', companyfield],
//                     ['docstatus', '!=', 2]
//                 ]
//             };
//         };
//     },

//     tax_category: function(frm) {
//         if (frm.doc.tax_category) {
//             frappe.call({
//                 method: 'frappe.client.get_list',
//                 args: {
//                     doctype: 'Sales Taxes and Charges Template',
//                     filters: {
//                         tax_category: frm.doc.tax_category
//                     },
//                     fields: ['name']
//                 },
//                 callback: function(response) {
//                     if (response && response.message && response.message.length > 0) {
//                         frm.set_value('taxes_and_charges', response.message[0].name);
//                     } else {
//                         frm.set_value('taxes_and_charges', '');
//                     }
//                 }
//             });
//         }
//     }
// });


// frappe.ui.form.on("Ex Bookings", {
//     onload: function(frm) {
//         frm.fields_dict['tax_category'].get_query = function(doc) {
//             return {
//                 filters: {
//                     "custom_is_sales": 1,
//                     "custom_is_purchases": 0,
//                 }
//             };
//         };
//     }
// });

frappe.ui.form.on('Ex Bookings', {
    onload: function(frm) {
        // Set query for taxes_and_charges
        frm.fields_dict['taxes_and_charges'].get_query = function(doc, cdt, cdn) {
            var tax_cate = frappe.model.get_value(cdt, cdn, 'tax_category');
            var companyfield = frappe.defaults.get_user_default("Company");
            return {
                filters: [
                    ['tax_category', '=', tax_cate],
                    ['company', '=', companyfield],
                    ['docstatus', '!=', 2]
                ]
            };
        };

        // Set query for tax_category
        frm.fields_dict['tax_category'].get_query = function(doc) {
            return {
                filters: {
                    "custom_is_sales": 1,
                    "custom_is_purchases": 0,
                }
            };
        };

        // Check if tax_category is already set, then trigger function
        if (frm.doc.tax_category) {
            frm.trigger("tax_category");
        }
    },

    tax_category: function(frm) {
        if (frm.doc.tax_category) {
            frappe.call({
                method: 'frappe.client.get_list',
                args: {
                    doctype: 'Sales Taxes and Charges Template',
                    filters: {
                        tax_category: frm.doc.tax_category
                    },
                    fields: ['name']
                },
                callback: function(response) {
                    if (response && response.message && response.message.length > 0) {
                        frm.set_value('taxes_and_charges', response.message[0].name);
                    } else {
                        frm.set_value('taxes_and_charges', '');
                    }
                }
            });
        }
    }
});

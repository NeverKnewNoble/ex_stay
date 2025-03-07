import frappe

@frappe.whitelist(allow_guest=True)
def get_hotel_packages():
    try:
        # Fetch all Item Prices with their fields
        item_prices = frappe.get_all(
            "Item Price",
            fields=["item_code", "price_list_rate", "currency", "name", "custom_tax_category"]
        )

        if not item_prices:
            return {"message": "No item prices found"}

        # Collect all item names (since `name` is the identifier in `Item Price`)
        item_price_names = [price["name"] for price in item_prices]

        # Fetch Hotel Packages (child table data)
        package_dict = {}
        for price in item_prices:
            hotel_packages = frappe.get_all(
                "Hotel packages List",
                filters={"parent": price["name"], "parenttype": "Item Price"},
                fields=["package_name", "package_price", "maximum_number_of_guests", "package_image", "package_description"]
            )
            package_dict[price["item_code"]] = hotel_packages

        # Attach child table data to Item Prices
        for price in item_prices:
            price["custom_packages"] = package_dict.get(price["item_code"], [])

        return {"message": item_prices}

    except Exception as e:
        frappe.log_error(f"Error fetching hotel packages: {str(e)}", "get_hotel_packages")
        return {"error": str(e)}


# http://127.0.0.1:8000/api/method/ex_stay.api.hotel_packages.get_hotel_packages
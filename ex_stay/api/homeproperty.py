import frappe 

@frappe.whitelist(allow_guest=True)
def homeproperty():
    try:
        # Fetch all items where "is_ex_stay_property" is checked
        properties = frappe.get_all(
            "Item",
            filters={"is_ex_stay_property": 1},
            fields=[
             "item_code", "item_name", "custom_title",
            "custom_location", "custom_city", "custom_country",
            "custom_profile_picture",
            ]
        )

        if not properties:
            return {"message": "No properties found"}

        # Collect item codes to check in Item Price
        item_codes = [prop["item_code"] for prop in properties]

        # Fetch Item Prices for matching item codes
        item_prices = frappe.get_all(
            "Item Price",
            filters={"item_code": ["in", item_codes]},
            fields=["item_code", "price_list_rate", "currency"]
        )

        # Convert list to dictionary for quick lookup
        price_dict = {
            item["item_code"]: {
                "price_list_rate": item["price_list_rate"],
                "currency": item["currency"],
            }
            for item in item_prices
        }

        # Fetch apartment_offers (child table data)
        for prop in properties:            
            # Attach pricing details
            price_data = price_dict.get(prop["item_code"], {})
            prop["rate"] = price_data.get("price_list_rate")
            prop["currency"] = price_data.get("currency")

        return properties

    except Exception as e:
        frappe.log_error(f"Error in get_property_details: {str(e)}", "Property API Error")
        return {"error": str(e)}



# http://127.0.0.1:8000/api/method/ex_stay.api.homeproperty.homeproperty
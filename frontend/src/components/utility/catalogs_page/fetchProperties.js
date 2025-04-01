// src/utils/fetchProperties.js
import { ref } from "vue";
import { createResource } from "frappe-ui";

export function useFetchProperties() {
  const properties = ref([]);

  const propertiesResource = createResource({
    url: "frappe.client.get_list",
    params: {
      doctype: "Item",
      fields: [
        "item_code", "item_name", "custom_property_category", "custom_title", "custom_property_description",
        "custom_location", "custom_city", "custom_country",
        "custom_profile_picture", "custom_2nd_image", "custom_3rd_image",
        "custom_4th_image", "custom_apartment_offers"
      ],
      filters: { custom_is_ex_stay_property: 1 },
      limit_page_length: 100,
    },
  });

  const fetchProperties = async () => {
    try {
      // console.log("Fetching properties...");
      const response = await propertiesResource.fetch();

      // console.log(response.data);

      if (Array.isArray(response) && response.length > 0) {
        properties.value = response;

        // Extract all item_codes for price lookup
        const itemCodes = properties.value.map((p) => p.item_code);
        if (itemCodes.length === 0) {
          console.warn("⚠️ No item codes found, skipping price fetch.");
          return;
        }

        // Fetch item prices
        // console.log("Fetching Item Prices...");
        const pricesResource = createResource({
          url: "frappe.client.get_list",
          params: {
            doctype: "Item Price",
            filters: [["item_code", "in", itemCodes]],
            fields: ["item_code", "price_list_rate", "currency"],
          },
        });

        const pricesResponse = await pricesResource.fetch();
        // console.log("✅ Fetched Prices:", pricesResponse);

        // Convert price list to a dictionary for quick lookup
        const priceDict = {};
        if (Array.isArray(pricesResponse)) {
          pricesResponse.forEach((price) => {
            priceDict[price.item_code] = {
              price_list_rate: price.price_list_rate,
              currency: price.currency,
            };
          });
        }
        // console.log("✅ Price Mapping Dictionary:", priceDict);

        // Attach prices to properties
        properties.value.forEach((prop) => {
          prop.price_list_rate = priceDict[prop.item_code]?.price_list_rate || null;
          prop.currency = priceDict[prop.item_code]?.currency || null;
        });

      } else {
        console.warn("⚠️ No properties found.");
      }
    } catch (error) {
      console.error("🚨 Unable to fetch properties:", error);
    }
  };

  return {
    properties,
    fetchProperties,
  };
}
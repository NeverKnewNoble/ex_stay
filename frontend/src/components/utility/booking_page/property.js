import { ref, onMounted } from "vue";
import { createResource } from "frappe-ui";
import axios from "axios"; // Ensure axios is imported for API calls
import { site_url } from "@/components/utility/config.js";

export function useProperty(propertyTitle) {
  const property = ref(null);
  const images = ref([]);
  const properties = ref([]); // Declare properties here

  const propertiesResource = createResource({
    url: "frappe.client.get_list",
    params: {
      doctype: "Item",
      fields: [
        "item_code", "item_name", "custom_title", "custom_property_description",
        "custom_location", "custom_city", "custom_country",
        "custom_profile_picture", "custom_2nd_image", "custom_3rd_image",
        "custom_4th_image", "custom_property_category", "custom_apartment_offers"
      ],
      filters: { custom_is_ex_stay_property: 1 },
      limit_page_length: 100,
    },
  });

  const fetchPropertyOffers = async () => {
    try {
      // console.log("Fetching property offers...");
      const response = await axios.get(
        `${site_url}/api/method/ex_stay.api.property.get_property_details`
      );

      // console.log("🔍 Full API Response:", response);

      const offersData = response.data?.message || response.data;

      if (Array.isArray(offersData)) {
        // console.log("✅ Offers Fetched:", offersData);

        const offersDict = {};
        offersData.forEach((property) => {
          offersDict[property.item_code] = property.custom_apartment_offers || [];
        });

        if (property.value) {
          property.value.custom_apartment_offers = offersDict[property.value.item_code] || [];
          // console.log("✅ Updated Property with Offers:", property.value.custom_apartment_offers);
        } else {
          console.warn("⚠️ Property is null, delaying offer assignment...");
        }
      } else {
        console.error("❌ Invalid response format for offers.", response.data);
      }
    } catch (error) {
      console.error("🚨 Error fetching property offers:", error);
    }
  };

  const fetchPropertyRestrictions = async () => {
    try {
      // console.log("Fetching property restrictions...");
      const response = await axios.get(
        `${site_url}/api/method/ex_stay.api.property.get_property_details`
      );
  
      // console.log("🔍 Full API Response:", response);
  
      const restrictionsData = response.data?.message || response.data;
  
      if (Array.isArray(restrictionsData)) {
        // console.log("✅ Restrictions Fetched:", restrictionsData);
  
        const restrictionsDict = {};
        restrictionsData.forEach((property) => {
          restrictionsDict[property.item_code] = property.custom_apartment_restrictions || [];
        });
  
        if (property.value) {
          property.value.custom_apartment_restrictions = restrictionsDict[property.value.item_code] || [];
          // console.log("✅ Updated Property with Restrictions:", property.value.custom_apartment_restrictions);
        } else {
          console.warn("⚠️ Property is null, delaying restriction assignment...");
        }
      } else {
        console.error("❌ Invalid response format for restrictions.", response.data);
      }
    } catch (error) {
      console.error("🚨 Error fetching property restrictions:", error);
    }
  };
  

  const fetchHotelPackages = async () => {
    try {
      // console.log("Fetching hotel packages...");
      const response = await axios.get(
        `${site_url}/api/method/ex_stay.api.hotel_packages.get_hotel_packages`
      );
  
      // console.log("🔍 Full API Response:", response);
  
      // Extract data correctly
      const hotelPackagesData = response.data?.message?.message || [];
  
      if (Array.isArray(hotelPackagesData)) {
        // console.log("✅ Hotel Packages Fetched:", hotelPackagesData);
  
        const packagesDict = {};
        hotelPackagesData.forEach((price) => {
          packagesDict[price.item_code] = price.custom_packages || [];
        });
  
        // Attach packages to properties
        properties.value.forEach((prop) => {
          prop.custom_packages = packagesDict[prop.item_code] || [];
        });
  
        // console.log("✅ Updated Properties with Packages:", properties.value);
      } else {
        console.error("❌ Invalid response format for hotel packages.", response.data);
      }
    } catch (error) {
      console.error("🚨 Error fetching hotel packages:", error);
    }
  };
  
  
  

  onMounted(async () => {
    try {
      // console.log("Fetching properties...");
      const response = await propertiesResource.fetch();

      if (Array.isArray(response) && response.length > 0) {
        properties.value = response; // Assign fetched properties to the ref
        // console.log("✅ Fetched Properties:", properties.value);

        // Process child table: Extract `offer` values from `custom_apartment_offers`
        properties.value.forEach((prop) => {
          prop.custom_apartment_offers = prop.custom_apartment_offers
            ? prop.custom_apartment_offers.map((offer) => offer.offer)
            : [];
        });

        properties.value.forEach((prop) => {
          prop.custom_apartment_restrictions = prop.custom_apartment_restrictions
            ? prop.custom_apartment_restrictions.map((restriction) => restriction.restriction)
            : [];
        });

        // Extract all item_codes for price lookup
        const itemCodes = properties.value.map((p) => p.item_code);

        // Create a new resource to fetch item prices
        const pricesResource = createResource({
          url: "frappe.client.get_list",
          params: {
            doctype: "Item Price",
            filters: { item_code: ["in", itemCodes] },
            fields: ["item_code", "price_list_rate", "currency", "name", "custom_tax_category", "custom_packages"],
          },
        });

        // Fetch Prices
        // console.log("Fetching Item Prices...");
        const pricesResponse = await pricesResource.fetch();

        // Convert price list to a dictionary for quick lookup
        const priceDict = {};
        if (Array.isArray(pricesResponse)) {
          pricesResponse.forEach((price) => {
            priceDict[price.item_code] = {
              price_list_rate: price.price_list_rate,
              currency: price.currency,
              name: price.name,
              tax: price.custom_tax_category,
            };
          });
        }

        // Attach prices to properties
        properties.value.forEach((prop) => {
          prop.price_list_rate = priceDict[prop.item_code]?.price_list_rate || null;
          prop.currency = priceDict[prop.item_code]?.currency || null;
          prop.name = priceDict[prop.item_code]?.name || null;
          prop.tax = priceDict[prop.item_code]?.tax || null;
        });

        // console.log("🔍 Full Prices Response:", pricesResponse);


        // Find Property by Title
        const matchedProperty = properties.value.find((p) => p.custom_title === propertyTitle);

        if (matchedProperty) {
          property.value = matchedProperty;

          // Ensure Valid Images
          const getValidImage = (image, fallback) => (image && image !== "null" ? image : fallback);

          images.value = [
            getValidImage(matchedProperty.custom_profile_picture, "../assets/images/default-property.jpg"),
            getValidImage(matchedProperty.custom_2nd_image, matchedProperty.custom_profile_picture),
            getValidImage(matchedProperty.custom_3rd_image, matchedProperty.custom_profile_picture),
            getValidImage(matchedProperty.custom_4th_image, matchedProperty.custom_profile_picture),
          ];

          // Fetch property offers only after property is assigned
          await fetchPropertyOffers();
          await fetchPropertyRestrictions();
          await fetchHotelPackages();

        } else {
          console.error("Property not found for title:", propertyTitle);
        }
      } else {
        console.error("❌ No properties found or invalid response format.");
      }
    } catch (error) {
      console.error("🚨 Unable to fetch properties:", error);
    }
  });

  return {
    property,
    images,
  };
}





// src/utils/fetchCountries.js
import axios from "axios";
import { ref } from "vue";
import { site_url } from "@/components/utility/config.js";

export function useFetchCountries() {
  const countries = ref([]);

  const fetchCountries = async () => {
    try {
      const countryResponse = await axios.get(
        `${site_url}/api/method/ex_stay.api.countryList.countryInFrappe`
      );

      if (countryResponse.data.message && countryResponse.data.message.data) {
        countries.value = countryResponse.data.message.data;
        // console.log("Fetched Countries:", countries.value);
      } else {
        console.log("No countries found.");
      }
    } catch (err) {
      console.error("❌ Error fetching countries:", err);
    }
  };

  return {
    countries,
    fetchCountries,
  };
}
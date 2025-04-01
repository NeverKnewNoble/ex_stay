import { ref, onMounted } from "vue";
import { createResource } from "frappe-ui";

export function useCountries() {
  const countries = ref([]);

  const countriesResource = createResource({
    url: 'frappe.client.get_list',
    params: {
      doctype: 'Country',
      fields: ['name'],
      limit_page_length: 300
    },
  });

  onMounted(async () => {
    try {
      // console.log("Fetching country list...");
      const response = await countriesResource.fetch();

      if (Array.isArray(response)) {
        countries.value = response.map(country => ({
          label: country.name,
          value: country.name,}
        ));
        // console.log("✅ Fetched Countries:", countries.value);
      } else {
        console.error("❌ No countries found or invalid response format.");
      }
    } catch (error) {
      console.error("🚨 Unable to fetch countries:", error);
    }
  });

  return {
    countries,
  };
}
// src/utils/filterAndPagination.js
import { ref, computed } from "vue";

export function useFilterAndPagination(properties) {
  const page = ref(1);
  const perPage = ref(40); // Listings per page

  // Temporary filter values before applying
  const tempSelectedCounty = ref("");
  const tempCity = ref("");
  const tempFromPrice = ref("");
  const tempToPrice = ref("");

  // Actual applied filter values
  const selectedCounty = ref("");
  const city = ref("");
  const fromPrice = ref("");
  const toPrice = ref("");

  // Compute filtered properties
  const filteredListings = computed(() => {
    return properties.value.filter(property => {
      return (
        (!selectedCounty.value || (property.custom_country || "").toLowerCase().includes(selectedCounty.value.toLowerCase())) &&
        (!city.value || (property.custom_city || "").toLowerCase().trim().includes(city.value.toLowerCase().trim())) &&
        (!fromPrice.value || (property.price_list_rate && property.price_list_rate >= parseFloat(fromPrice.value))) &&
        (!toPrice.value || (property.price_list_rate && property.price_list_rate <= parseFloat(toPrice.value)))
      );
    });
  });

  // Paginated listings based on selected page
  const paginatedListings = computed(() => {
    const start = (page.value - 1) * perPage.value;
    return filteredListings.value.slice(start, start + perPage.value);
  });

  // Compute total pages dynamically
  const totalPages = computed(() => {
    return Math.max(1, Math.ceil(filteredListings.value.length / perPage.value));
  });

  // Apply filter values
  const applyFilters = () => {
    selectedCounty.value = tempSelectedCounty.value;
    city.value = tempCity.value.trim(); // Ensure trimming to avoid extra spaces
    fromPrice.value = tempFromPrice.value;
    toPrice.value = tempToPrice.value;

    page.value = 1; // Reset to first page after filtering
  };

  // Reset Filter Fields
  const resetFilter = () => {
    tempSelectedCounty.value = "";
    tempCity.value = "";
    tempFromPrice.value = "";
    tempToPrice.value = "";

    applyFilters();
    page.value = 1;
  };

  return {
    page,
    perPage,
    tempSelectedCounty,
    tempCity,
    tempFromPrice,
    tempToPrice,
    selectedCounty,
    city,
    fromPrice,
    toPrice,
    filteredListings,
    paginatedListings,
    totalPages,
    applyFilters,
    resetFilter,
  };
}
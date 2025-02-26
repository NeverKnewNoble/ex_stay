<template>
  <div class="relative inline-block w-full max-w-[434px]">
    <!-- Dropdown Trigger -->
    <div
      @click="toggleDropdown"
      class="cursor-pointer p-3 h-[40px] bg-white border border-gray-200 rounded-md shadow-sm hover:border-[#6ea589] transition-shadow duration-200 flex justify-between items-center w-full"
    >
      <input
        type="text"
        readonly
        :value="guestSummary"
        class="bg-transparent focus:outline-none text-black font-medium border-none w-full cursor-pointer"
      />
      <span class="text-gray-500 transform transition-transform duration-200" :class="{ 'rotate-180': dropdownOpen }">
        &#9660;
      </span>
    </div>

    <!-- Dropdown Content (Overlay) -->
    <div
      v-if="dropdownOpen"
      class="absolute left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50"
      :class="dropdownWidthClass"
    >
      <div v-for="category in categories" :key="category.name" class="flex items-center justify-between mb-3">
        <div>
          <div class="text-sm font-semibold text-gray-800">{{ category.name }}</div>
          <div class="text-xs text-gray-500">{{ category.description }}</div>
        </div>
        <div class="flex items-center">
          <button
            class="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none transition duration-200"
            @click.stop="decrement(category.name)"
            :disabled="category.count === 0"
          >
            -
          </button>
          <span class="mx-3 text-gray-700 font-medium">{{ category.count }}</span>
          <button
            class="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none transition duration-200"
            @click.stop="increment(category.name)"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <script>
export default {
  name: "GuestDropdown",
  data() {
    return {
      dropdownOpen: false,
      categories: [
        { name: "Adult", description: "Ages 13 or above", count: 1 },
        { name: "Children", description: "Ages 2–12", count: 0 },
        { name: "Infant", description: "Under 2", count: 0 },
        { name: "Pet", description: "Bringing a service animal?", count: 0 }
      ],
      windowWidth: window.innerWidth
    };
  },
  computed: {
    guestSummary() {
      const summary = this.categories
        .filter(category => category.count > 0)
        .map(category => `${category.count} ${category.name}${category.count > 1 ? "s" : ""}`)
        .join(", ");
      return summary || "Add guests";
    },
    dropdownWidthClass() {
      return this.windowWidth < 768 ? "w-[90%]" : "w-[420px]";
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    increment(name) {
      const category = this.categories.find(c => c.name === name);
      if (category) category.count++;
    },
    decrement(name) {
      const category = this.categories.find(c => c.name === name);
      if (category && category.count > 0) category.count--;
    },
    updateWindowWidth() {
      this.windowWidth = window.innerWidth;
    }
  },
  mounted() {
    window.addEventListener("resize", this.updateWindowWidth);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateWindowWidth);
  }
};
</script>

<style scoped>
/* Ensure the dropdown does not push elements */
.absolute {
  position: absolute;
  background-color: white;
}

/* Smooth transition */
.rotate-180 {
  transform: rotate(180deg);
}

/* Disable button when count is 0 */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style> -->




<script>
export default {
  name: "GuestDropdown",
  props: {
    modelValue: Number, // Bind `guestCount` from parent
  },
  data() {
    return {
      dropdownOpen: false,
      categories: [
        { name: "Adult", description: "Ages 13 or above", count: 1 },
        { name: "Children", description: "Ages 2–12", count: 0 },
        { name: "Infant", description: "Under 2", count: 0 },
        { name: "Pet", description: "Bringing a service animal?", count: 0 }
      ],
      windowWidth: window.innerWidth
    };
  },
  computed: {
    guestSummary() {
      const summary = this.categories
        .filter(category => category.count > 0)
        .map(category => `${category.count} ${category.name}${category.count > 1 ? "s" : ""}`)
        .join(", ");
      return summary || "Add guests";
    },
    dropdownWidthClass() {
      return this.windowWidth < 768 ? "w-[90%]" : "w-[420px]";
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    increment(name) {
      const category = this.categories.find(c => c.name === name);
      if (category) category.count++;
      this.emitGuestCount();
    },
    decrement(name) {
      const category = this.categories.find(c => c.name === name);
      if (category && category.count > 0) category.count--;
      this.emitGuestCount();
    },
    emitGuestCount() {
      // Sum all selected guests
      const totalGuests = this.categories.reduce((sum, cat) => sum + cat.count, 0);
      this.$emit("update:modelValue", totalGuests);
    },
    updateWindowWidth() {
      this.windowWidth = window.innerWidth;
    }
  },
  mounted() {
    window.addEventListener("resize", this.updateWindowWidth);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateWindowWidth);
  }
};
</script>

<template>
  <div>
    <!-- Dropdown Trigger -->
    <div
      @click="toggleDropdown"
      class="cursor-pointer p-3 h-[35px] bg-white border border-gray-200 rounded-sm shadow-sm hover:border-[#6ea589] hover:border transition-shadow duration-200 flex justify-between items-center !important"
    >
      <input
        type="text"
        readonly
        :value="guestSummary"
        class="bg-transparent focus:outline-none py-2 text-gray-700 font-medium w-[410px] focus:border-none outline-none !important"
      />
      <span class="text-gray-500 transform transition-transform duration-200 !important" :class="{ 'rotate-180': dropdownOpen }">
        &#9660;
      </span>
    </div>

    <!-- Dropdown Content -->
    <div
      v-if="dropdownOpen"
      class="mb-4 p-4 bg-white border border-gray-300 rounded-lg shadow-lg !important"
    >
      <div v-for="category in categories" :key="category.name" class="flex items-center justify-between mb-3 !important">
        <div>
          <div class="text-sm font-semibold text-gray-800">{{ category.name }}</div>
          <div class="text-xs text-gray-500">{{ category.description }}</div>
        </div>
        <div class="flex items-center">
          <button
            class="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none transition-colors duration-200"
            @click.stop="decrement(category.name)"
            :disabled="category.count === 0"
          >
            -
          </button>
          <span class="mx-3 text-gray-700 font-medium">{{ category.count }}</span>
          <button
            class="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none transition-colors duration-200"
            @click.stop="increment(category.name)"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuestDropdown',
  data() {
    return {
      categories: [
        { name: 'Adult', description: 'Ages 13 or above', count: 1 },
        { name: 'Children', description: 'Ages 2–12', count: 0 },
        { name: 'Infant', description: 'Under 2', count: 0 },
        { name: 'Pet', description: 'Bringing a service animal?', count: 0 }
      ],
      dropdownOpen: false
    };
  },
  computed: {
    guestSummary() {
      const guestDetails = this.categories
        .filter(category => category.count > 0)
        .map(category => {
          // Handle special case for 'Children' (don't add 's')
          if (category.name === 'Children') {
            return `${category.count} Children`;
          }
          // Handle regular pluralization for other categories
          return `${category.count} ${category.name}${category.count > 1 ? 's' : ''}`;
        })
        .join(', ');

      return guestDetails || 'Add guests';
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
    }
  }
}
</script>

<style scoped>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

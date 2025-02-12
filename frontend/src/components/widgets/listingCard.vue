<template>
  <div class="max-w-sm rounded-2xl overflow-hidden shadow-lg hover:drop-shadow-2xl transition-all bg-white ">
    <div class="w-full h-[260px]">
      <img :src="imageSrc" alt="Location Image" class="w-full h-full object-cover" />
    </div>

    <div class="p-4">
      <h3 class="text-xl font-semibold text-gray-800">{{ location }}</h3>
      <p class="text-gray-500 text-sm">{{ distance }} kilometers away</p>
      <div class="mt-2 flex items-center justify-between">
        <p class="text-lg font-bold text-green-600">{{ price }} / night</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "listingCard",
  props: {
    location: String,
    distance: Number,
    price: String,
    imageUrl: String,
  },
  computed: {
    imageSrc() {
      return new URL(this.imageUrl, import.meta.url).href;
    }
  }
};
</script>

<template>
  <div>
    <Loading v-if="isLoading" />
    <router-view v-else />
  </div>
</template>


<style>
body {
  font-family: 'League Spartan', sans-serif;
}
</style>


<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import Loading from "@/components/elements/Loading.vue";

const isLoading = ref(false);
const route = useRoute();

watch(route, () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false; // Simulating API call or component load
  }, 2000);
});
</script>

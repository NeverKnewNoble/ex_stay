<script>
export default {
  name: "LottieAnimation",
  mounted() {
    // Ensure Lottie player is loaded dynamically if needed
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
    script.type = "module";
    document.body.appendChild(script);
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-cover bg-center text-white text-center" 
       style="background-image: url('/hotel-bg.jpg');">
    <dotlottie-player 
      src="https://lottie.host/17d1de13-28b3-4abd-9986-39a05f0d53b7/avZgvDOzVM.lottie" 
      background="transparent" 
      speed="1" 
      class="w-52 h-52" 
      loop autoplay>
    </dotlottie-player>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  to { opacity: 1; }
}
</style>

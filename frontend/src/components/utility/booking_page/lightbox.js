import { ref } from "vue";

export function useLightbox(images) {
  const lightboxVisible = ref(false);
  const lightboxIndex = ref(0);

  const openLightbox = (index) => {
    lightboxIndex.value = index;
    lightboxVisible.value = true;
  };

  const closeLightbox = () => {
    lightboxVisible.value = false;
  };

  const prevLightbox = () => {
    lightboxIndex.value = (lightboxIndex.value - 1 + images.value.length) % images.value.length;
  };

  const nextLightbox = () => {
    lightboxIndex.value = (lightboxIndex.value + 1) % images.value.length;
  };

  return {
    lightboxVisible,
    lightboxIndex,
    openLightbox,
    closeLightbox,
    prevLightbox,
    nextLightbox,
  };
}
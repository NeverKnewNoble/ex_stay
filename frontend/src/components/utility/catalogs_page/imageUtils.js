// src/utils/imageUtils.js
import { site_url } from "@/components/utility/config.js";

export function useImageUtils() {
    const getImageUrl = (imagePath) => {
      if (!imagePath) return "../assets/images/default-property.jpg";
      if (imagePath.startsWith("/files")) {
        return `${site_url}${imagePath}`;
      }
      return imagePath;
    };
  
    return {
      getImageUrl,
    };
  }
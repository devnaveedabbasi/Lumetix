import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

// Fast start, long soft landing, no bounce — the Swiper-style carousel glide.
export const SWIPER_GLIDE_EASE = "swiperGlide";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, CustomEase);
    CustomEase.create(SWIPER_GLIDE_EASE, "0.25, 0.46, 0.45, 0.94");
}

export { gsap, ScrollTrigger };

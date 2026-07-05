import { SWIPER_GLIDE_EASE } from "@/lib/gsap";
import type { Slide } from "../types/types";

// Swap for your own demo-page screenshots (portrait ~3:4 crops look best).
export const SLIDES: Slide[] = [
    { id: "landing", image: "/assets/img/hero-slider/1.webp" },
    { id: "workspace", image: "/assets/img/hero-slider/2.webp" },
    { id: "growth", image: "/assets/img/hero-slider/3.webp" },
    { id: "analytics", image: "/assets/img/hero-slider/4.webp" },
    { id: "dashboard-1", image: "/assets/img/hero-slider/5.webp" },
    { id: "dashboard-2", image: "/assets/img/hero-slider/6.webp" },
    { id: "dashboard-3", image: "/assets/img/hero-slider/7.webp" },
];

export const AUTOPLAY_MS = 3800;
export const GLIDE_DURATION = 1.05;
export const GLIDE_EASE = SWIPER_GLIDE_EASE;

// Coverflow layout tuning, per breakpoint.
export const LAYOUT = {
    desktop: { spacing: 460, depth: 160, tilt: 25 },
    mobile: { spacing: 210, depth: 100, tilt: 20 },
};

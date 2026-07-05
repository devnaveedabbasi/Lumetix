"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import HeroBackground from "./HeroBackground";
import HeroNav from "./HeroNav";
import HeroCopy from "./HeroCopy";
import Carousel from "./Carousel/Carousel";
import TrustBadges from "./TrustBadges";

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    // Plays once, from the top, every time the page loads/refreshes.
    useGSAP(
        () => {
            if (prefersReducedMotion) return;

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from("[data-hero-anim='nav-item']", {
                opacity: 0,
                y: -12,
                duration: 0.5,
                stagger: 0.08,
            })
                .from(
                    "[data-hero-anim='badge']",
                    { opacity: 0, y: 22, duration: 0.6 },
                    "-=0.2"
                )
                .from(
                    "[data-hero-anim='heading']",
                    { opacity: 0, y: 26, duration: 0.7 },
                    "-=0.35"
                )
                .from(
                    "[data-hero-anim='heading-underline']",
                    { strokeDashoffset: 1, duration: 0.6, ease: "power2.inOut" },
                    "-=0.35"
                )
                .from(
                    "[data-hero-anim='paragraph']",
                    { opacity: 0, y: 22, duration: 0.6 },
                    "-=0.45"
                )
                .from(
                    "[data-hero-anim='cta']",
                    { opacity: 0, y: 22, duration: 0.6 },
                    "-=0.4"
                )
                .from(
                    "[data-hero-anim='carousel']",
                    { opacity: 0, y: 40, duration: 0.8 },
                    "-=0.3"
                );
        },
        { scope: sectionRef, dependencies: [prefersReducedMotion] }
    );

    return (
        <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-[#050409]">
            <HeroBackground />
            <HeroNav />
            <HeroCopy />
            <div data-hero-anim="carousel">
                <Carousel />
            </div>
            <TrustBadges />
        </section>
    );
}

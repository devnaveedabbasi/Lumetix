"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useStars } from "@/hooks/useStars";

export default function Starfield({ count = 110 }: { count?: number }) {
    const stars = useStars(count);
    const prefersReducedMotion = usePrefersReducedMotion();
    const rootRef = useRef<HTMLDivElement>(null);

    // Runs once on mount (i.e. every page refresh) and keeps looping forever —
    // this is the "always animating" twinkle + shooting-star sweep.
    useGSAP(
        () => {
            if (prefersReducedMotion || !rootRef.current) return;

            rootRef.current.querySelectorAll<HTMLElement>("[data-twinkle]").forEach((el) => {
                const baseOpacity = Number(el.dataset.opacity);
                const duration = Number(el.dataset.duration);
                const delay = Number(el.dataset.delay);

                gsap.to(el, {
                    opacity: baseOpacity * 0.15,
                    scale: 1.4,
                    duration,
                    delay,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                });
            });

            gsap.fromTo(
                "[data-shooting-star]",
                { xPercent: 0, opacity: 0 },
                {
                    xPercent: 1300,
                    opacity: 0,
                    keyframes: { opacity: [0, 1, 0] },
                    duration: 1.6,
                    ease: "power2.out",
                    repeat: -1,
                    repeatDelay: 6.5,
                    delay: 1,
                }
            );

            // Add Parallax ScrollTrigger for stars
            gsap.to(rootRef.current.querySelectorAll("span:not([data-shooting-star])"), {
                y: (i, el) => {
                    // Larger stars move more (simulate being closer)
                    const size = parseFloat(el.style.width) || 1;
                    return -150 * size; // Adjust multiplier for parallax strength
                },
                ease: "none",
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            });
        },
        { scope: rootRef, dependencies: [prefersReducedMotion] }
    );

    return (
        <div ref={rootRef} aria-hidden className="pointer-events-none absolute inset-0">
            {stars.map((s) => (
                <span
                    key={s.id}
                    data-twinkle={s.twinkle && !prefersReducedMotion ? "" : undefined}
                    data-opacity={s.opacity}
                    data-duration={s.duration}
                    data-delay={s.delay}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        width: s.size,
                        height: s.size,
                        opacity: s.opacity,
                    }}
                />
            ))}

            {!prefersReducedMotion && (
                <span
                    data-shooting-star
                    className="absolute h-px w-24 bg-linear-to-r from-white via-white/60 to-transparent"
                    style={{ top: "14%", left: "-10%", rotate: "18deg" }}
                />
            )}
        </div>
    );
}

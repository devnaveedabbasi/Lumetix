"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const BADGES = [
    "Lifetime License for Unlimited Use",
    "Free Updates with Every Improvement",
    "6 Months of Premium Support",
];

export default function TrustBadges() {
    const rootRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useGSAP(
        () => {
            if (prefersReducedMotion || !rootRef.current) return;

            gsap.from(rootRef.current, {
                opacity: 0,
                y: 24,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                },
            });
        },
        { scope: rootRef, dependencies: [prefersReducedMotion] }
    );

    return (
        <div
            ref={rootRef}
            className="relative z-10 mx-auto mb-16 mt-12 flex w-fit max-w-full flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-full border border-white/10 bg-white/3 px-8 py-4 text-sm text-slate-200 backdrop-blur"
        >
            {BADGES.map((t) => (
                <span key={t} className="inline-flex items-center gap-2 whitespace-nowrap">
                    <Check className="h-4 w-4 text-rose-400" />
                    {t}
                </span>
            ))}
        </div>
    );
}

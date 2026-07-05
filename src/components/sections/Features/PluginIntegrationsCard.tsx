"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Check, Puzzle } from "lucide-react";

// ---- Deterministic RNG -------------------------------------------------------
function mulberry32(seed: number) {
    return function () {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function makeStars(count: number, seed: number) {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: rand() * 100,
        y: rand() * 100,
        size: rand() * 1.6 + 0.4,
        opacity: rand() * 0.5 + 0.12,
        duration: 2.5 + rand() * 4,
        delay: rand() * 6,
    }));
}
const STARS = makeStars(50, 77);

// ---- Plugin data ---------------------------------------------------------------
const PLUGINS = [
    { name: "Elementor", icon: "E", color: "from-pink-500 to-red-500", glow: "rgba(239,68,68,0.2)" },
    { name: "WooCommerce", icon: "W", color: "from-purple-500 to-violet-600", glow: "rgba(139,92,246,0.2)" },
    { name: "WordPress", icon: "WP", color: "from-blue-400 to-blue-700", glow: "rgba(59,130,246,0.2)" },
    { name: "Contact Form", icon: "CF", color: "from-emerald-400 to-green-600", glow: "rgba(52,211,153,0.2)" },
    { name: "WPML", icon: "ML", color: "from-orange-400 to-amber-500", glow: "rgba(251,146,60,0.2)" },
    { name: "Yoast SEO", icon: "Y", color: "from-red-400 to-rose-600", glow: "rgba(248,113,113,0.2)" },
];

// ---- Animated Stars Component -----------------------------------------------
function AnimatedStars() {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref.current) return;
        const spans = ref.current.querySelectorAll<HTMLElement>("[data-star]");
        spans.forEach((el) => {
            const base = parseFloat(el.dataset.opacity ?? "0.3");
            const dur = parseFloat(el.dataset.dur ?? "3");
            const delay = parseFloat(el.dataset.delay ?? "0");
            gsap.to(el, {
                opacity: base * 0.08,
                scale: 1.6,
                duration: dur,
                delay,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
            });
        });
    }, { scope: ref });

    return (
        <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
            {STARS.map((s) => (
                <span
                    key={s.id}
                    data-star
                    data-opacity={s.opacity}
                    data-dur={s.duration}
                    data-delay={s.delay}
                    className="absolute rounded-full bg-white"
                    style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, opacity: s.opacity }}
                />
            ))}
        </div>
    );
}

// ---- Main Card ---------------------------------------------------------------
export default function PluginIntegrationsCard() {
    const cardRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(cardRef.current, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 88%",
                toggleActions: "play none none none",
            },
        });

        gsap.from("[data-plugin-pill]", {
            opacity: 0,
            y: 20,
            scale: 0.94,
            duration: 0.5,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "[data-plugin-pill]",
                start: "top 90%",
                toggleActions: "play none none none",
            },
        });

        // Pulse the border dots
        gsap.to("[data-pulse]", {
            opacity: 0.15,
            scale: 2.2,
            duration: 1.6,
            stagger: 0.3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
        });
    }, { scope: cardRef });

    return (
        <div
            ref={cardRef}
            className="relative h-full overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0b0a15]"
        >
            <AnimatedStars />

            {/* Indigo glow top-right */}
            <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(99,102,241,0.28) 0%, rgba(79,70,229,0.1) 40%, transparent 70%)",
                    filter: "blur(50px)",
                }}
            />
            {/* Purple glow bottom-left */}
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-12 -left-12 h-64 w-64 rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
                    filter: "blur(40px)",
                }}
            />

            <div className="relative z-10 flex h-full flex-col p-6">
                {/* Header */}
                <div className="mb-5 flex items-start justify-between">
                    <div>
                        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-slate-400">
                            <Puzzle className="h-3 w-3 text-indigo-400" />
                            Integrations
                        </div>
                        <h3 className="text-xl font-extrabold leading-tight text-white">
                            Top Plugin{" "}
                            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                                Integrations
                            </span>
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-500">
                            All plugins included. No extra cost, no conflicts — pre-configured and ready.
                        </p>
                    </div>
                    {/* Pulse dots decoration */}
                    <div className="flex gap-1.5 pt-1">
                        {[...Array(3)].map((_, i) => (
                            <span key={i} data-pulse className="block h-1.5 w-1.5 rounded-full bg-indigo-400/60" />
                        ))}
                    </div>
                </div>

                {/* Plugin grid — 2 cols, 3 rows */}
                <div className="grid flex-1 grid-cols-2 gap-2.5">
                    {PLUGINS.map((plugin) => (
                        <div
                            key={plugin.name}
                            data-plugin-pill
                            className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-white/[0.07] bg-[#0f0d1c] px-3 py-3 transition-all duration-300 hover:border-white/[0.14] hover:-translate-y-0.5"
                        >
                            {/* Per-card glow */}
                            <div
                                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                                style={{
                                    background: `radial-gradient(circle at 0% 50%, ${plugin.glow} 0%, transparent 70%)`,
                                }}
                            />
                            <div className={`relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-[10px] font-black text-white shadow-md ${plugin.color}`}>
                                {plugin.icon}
                            </div>
                            <div className="relative min-w-0">
                                <p className="truncate text-[12px] font-semibold text-white">{plugin.name}</p>
                                <div className="mt-0.5 flex items-center gap-1">
                                    <Check className="h-2.5 w-2.5 flex-shrink-0 text-emerald-400" />
                                    <span className="text-[10px] text-slate-600">Included</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer strip */}
                <div className="mt-4 flex items-center justify-between rounded-xl border border-dashed border-white/[0.06] bg-white/[0.01] px-4 py-2.5">
                    <span className="text-[11px] text-slate-600">+ 24 more integrations</span>
                    <div className="flex">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="h-5 w-5 rounded-full bg-white/[0.06] ring-1 ring-[#0b0a15]"
                                style={{ marginLeft: i > 0 ? "-6px" : 0 }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

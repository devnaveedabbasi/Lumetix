"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Download, MousePointer2 } from "lucide-react";

// ---- Deterministic RNG (same as Starfield) ----------------------------------
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
        size: rand() * 1.8 + 0.5,
        opacity: rand() * 0.55 + 0.15,
        duration: 2 + rand() * 4,
        delay: rand() * 6,
    }));
}

const STARS = makeStars(80, 99);

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
                opacity: base * 0.1,
                scale: 1.5,
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
                    style={{
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        width: s.size,
                        height: s.size,
                        opacity: s.opacity,
                    }}
                />
            ))}
        </div>
    );
}

// ---- Stacked browser mockup -------------------------------------------------
function BrowserMockup({
    style,
    className = "",
    dark = false,
    children,
}: {
    style?: React.CSSProperties;
    className?: string;
    dark?: boolean;
    children?: React.ReactNode;
}) {
    return (
        <div
            className={`overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-black/60 ${dark ? "bg-[#0d0c18]" : "bg-[#12101e]"} ${className}`}
            style={style}
        >
            {/* Chrome bar */}
            <div className="flex items-center gap-1.5 border-b border-white/[0.07] bg-[#0a0916] px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-rose-500/70" />
                <span className="h-2 w-2 rounded-full bg-amber-500/70" />
                <span className="h-2 w-2 rounded-full bg-green-500/70" />
                <div className="mx-auto h-3 w-28 rounded-full bg-white/5" />
            </div>
            {children}
        </div>
    );
}

// ---- Main card --------------------------------------------------------------
export default function DemoImportCard() {
    const cardRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(cardRef.current, {
            opacity: 0,
            y: 60,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
                trigger: cardRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
            },
        });

        // Float the mockup cluster
        gsap.to("[data-mockup-cluster]", {
            y: -12,
            duration: 4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
        });

        // Subtle rotation wobble on the back card
        gsap.to("[data-mockup-back]", {
            rotateZ: -1.5,
            duration: 5.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
        });
    }, { scope: cardRef });

    return (
        <div
            ref={cardRef}
            className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0b0a15]"
            style={{ minHeight: 520 }}
        >
            {/* Always-animating starfield */}
            <AnimatedStars />

            {/* Large purple glow — left centre */}
            <div
                aria-hidden
                className="pointer-events-none absolute -left-32 top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(120,60,220,0.45) 0%, rgba(100,30,200,0.25) 40%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />
            {/* Smaller accent glow — bottom-left */}
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 left-0 h-64 w-64 rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(180,40,240,0.3) 0%, transparent 70%)",
                    filter: "blur(40px)",
                }}
            />

            {/* Content row: text left, mockups right */}
            <div className="relative z-10 flex h-full flex-col gap-10 p-8 sm:p-12 lg:flex-col  lg:gap-0">

                {/* — Left: text — */}
                <div className="flex-shrink-0 ">
                    <h3 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                        One-Click Demo Import
                    </h3>
                    <p className="mt-4 max-w-sm text-base leading-relaxed text-slate-400">
                        Save hours of setup. Instantly replicate any demo and start editing with your own content.
                    </p>
                </div>

                {/* — Right: stacked mockups — */}
                <div
                    data-mockup-cluster
                    className="relative flex-1 lg:h-[380px]"
                    style={{ perspective: "900px" }}
                >
                    {/* Back-left: plain browser skeleton */}
                    <BrowserMockup
                        data-mockup-back
                        dark
                        className="absolute left-0 top-8 w-[55%] shadow-xl"
                        style={{ transform: "rotateY(6deg) rotateZ(-1deg)", zIndex: 1 }}
                    >
                        {/* Skeleton content */}
                        <div className="space-y-2 p-3">
                            <div className="h-24 rounded-lg bg-white/[0.04] border border-white/[0.04] flex items-center justify-center">
                                <div className="h-8 w-8 rounded bg-white/5 flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-700" fill="currentColor">
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                                </div>
                            </div>
                            {[100, 70, 85].map((w, i) => (
                                <div key={i} className="h-2.5 rounded-full bg-white/[0.05]" style={{ width: `${w}%` }} />
                            ))}
                            <div className="mt-3 h-7 w-24 rounded-lg bg-white/[0.06]" />
                        </div>
                    </BrowserMockup>

                    {/* Center: main large mockup (the "BrightHub" card) */}
                    <BrowserMockup
                        className="absolute left-[20%] top-0 w-[65%] shadow-2xl shadow-purple-900/40"
                        style={{ transform: "rotateY(-2deg)", zIndex: 3 }}
                    >
                        {/* Hero-style content inside */}
                        <div
                            className="relative overflow-hidden p-4"
                            style={{
                                background: "linear-gradient(135deg, #0d0c20 0%, #1a0a2e 50%, #0d1520 100%)",
                                minHeight: 200,
                            }}
                        >
                            {/* Mini nav */}
                            <div className="mb-3 flex items-center gap-2">
                                <div className="h-4 w-4 rounded bg-violet-500/60" />
                                <span className="text-[10px] font-bold text-white/80">Lumetix</span>
                                <div className="ml-auto flex gap-2">
                                    {[40, 32, 28, 40].map((w, i) => (
                                        <div key={i} className="h-1.5 rounded-full bg-white/10" style={{ width: w }} />
                                    ))}
                                </div>
                            </div>
                            {/* Hero text mock */}
                            <div className="my-4 space-y-1.5 text-center">
                                <div className="mx-auto h-3 w-3/4 rounded-full bg-white/25" />
                                <div className="mx-auto h-3 w-1/2 rounded-full bg-violet-400/40" />
                                <div className="mx-auto mt-2 h-2 w-2/3 rounded-full bg-white/10" />
                                <div className="mx-auto mt-3 flex justify-center gap-2">
                                    <div className="h-5 w-16 rounded-full bg-violet-600/70" />
                                    <div className="h-5 w-12 rounded-full bg-white/10" />
                                </div>
                            </div>
                            {/* "Crypto" banner strip */}
                            <div className="mt-3 h-16 overflow-hidden rounded-lg" style={{ background: "linear-gradient(90deg, #0a1628 0%, #0d2040 100%)" }}>
                                <div className="flex h-full items-center px-3 gap-3">
                                    <div className="h-6 w-6 rounded-full bg-cyan-400/30" />
                                    <div className="space-y-1 flex-1">
                                        <div className="h-2 w-3/4 rounded bg-white/20" />
                                        <div className="h-2 w-1/2 rounded bg-cyan-400/30" />
                                    </div>
                                    <div className="h-10 w-10 rounded-full bg-cyan-500/20" />
                                </div>
                            </div>
                        </div>
                    </BrowserMockup>

                    {/* Right overlay card (the "Automate" card) */}
                    <BrowserMockup
                        dark
                        className="absolute right-0 top-[15%] w-[48%] shadow-xl shadow-black/50"
                        style={{ transform: "rotateY(-8deg) rotateZ(1deg)", zIndex: 2 }}
                    >
                        <div className="space-y-2 p-3">
                            <div className="flex items-center gap-1.5">
                                <div className="h-3 w-3 rounded bg-violet-500/50" />
                                <div className="h-2 w-16 rounded-full bg-white/10" />
                            </div>
                            <div className="h-2 w-full rounded-full bg-white/[0.06]" />
                            <div className="h-2 w-4/5 rounded-full bg-white/[0.05]" />
                            <div className="h-2 w-3/4 rounded-full bg-white/[0.04]" />
                            <div className="mt-2 grid grid-cols-3 gap-1">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="h-5 rounded bg-white/[0.04]" />
                                ))}
                            </div>
                            <div className="flex gap-1.5 mt-1">
                                <div className="h-4 flex-1 rounded bg-green-500/20 border border-green-500/20" />
                                <div className="h-4 flex-1 rounded bg-white/[0.04]" />
                            </div>
                        </div>
                    </BrowserMockup>

                  
                </div>
            </div>
        </div>
    );
}

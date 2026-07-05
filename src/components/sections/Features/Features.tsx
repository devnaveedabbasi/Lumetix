"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Type, Layers, Zap } from "lucide-react";
import DemoImportCard from "./DemoImportCard";
import PluginIntegrationsCard from "./PluginIntegrationsCard";

// ---- Data ------------------------------------------------------------------

const FONTS = [
    { name: "The quick brown fox jum", className: "text-xl font-bold text-white" },
    { name: "The quick brown fox jumps over", className: "text-sm font-medium text-slate-300" },
    { name: "The quick brown fox jumps over the la", className: "text-xs font-normal text-slate-500" },
];

// ---- Section ---------------------------------------------------------------

export default function Features() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const cards = sectionRef.current?.querySelectorAll("[data-feat-card]");
        if (!cards) return;

        cards.forEach((card) => {
            gsap.from(card, {
                opacity: 0,
                y: 40,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 88%",
                    toggleActions: "play none none none",
                },
            });
        });

        gsap.from("[data-feat-heading]", {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: "[data-feat-heading]",
                start: "top 85%",
                toggleActions: "play none none none",
            },
        });
    }, { scope: sectionRef, dependencies: [] });

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-[#060508] px-4 py-24 sm:px-8 lg:px-16"
        >
            {/* Background glow */}
            <div
                aria-hidden
                className="pointer-events-none absolute left-1/4 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_70%)] blur-3xl"
            />

            {/* Section Heading */}
            <div className="relative z-10 mx-auto mb-10 max-w-7xl">
                <h2 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                    <span data-feat-heading className="block">All-in-One Powerhouse</span>
                    <span data-feat-heading className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                        Everything You Need, Built Right In
                    </span>
                </h2>
            </div>

            {/* ── Bento Grid ───────────────────────────────────────────────
                Desktop (lg): 3-column grid, auto rows
                  Row 1: DemoImportCard (col 1-3 = span 2) | PluginCard (col 3 = span 1)
                  Row 2: Font (span 1) | Theme Builder (span 1) | SEO (span 1)
            ───────────────────────────────────────────────────────────── */}
            <div className="relative z-10 mx-auto grid max-w-7xl auto-rows-[minmax(340px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {/* ── Row 1, col 1-2: Demo Import Card ── */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-1">
                    <DemoImportCard />
                </div>

                {/* ── Row 1, col 3: Plugin Integrations Card ── */}
                <div className="col-span-1 lg:col-span-1 lg:row-span-1">
                    <PluginIntegrationsCard />
                </div>

                {/* ── Row 2, col 1: Font Card ── */}
                <div
                    data-feat-card
                    className="group relative col-span-1 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d0b14] p-6"
                >
                    <div className="pointer-events-none absolute -bottom-16 -left-8 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.1)_0%,transparent_70%)] blur-2xl transition-all duration-700 group-hover:scale-110" />
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15">
                        <Type className="h-5 w-5 text-emerald-400" />
                    </div>
                    <h3 className="text-base font-semibold text-white">Pick Your Perfect Font</h3>
                    <p className="mt-1.5 text-sm text-slate-500">
                        Unlock access to 1,7k+ Google Fonts, 4,3k+ Adobe Fonts &amp; unlimited custom fonts.
                    </p>
                    <div className="mt-6 space-y-3 rounded-xl border border-white/[0.06] bg-[#0a0910] p-4">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-[10px] font-black text-white">G</div>
                            <span className="text-xs text-slate-500">Google Fonts</span>
                        </div>
                        {FONTS.map((f, i) => (
                            <p key={i} className={`truncate leading-snug tracking-tight ${f.className}`}>{f.name}</p>
                        ))}
                    </div>
                </div>

                {/* ── Row 2, col 2: Visual Theme Builder ── */}
                <div
                    data-feat-card
                    className="group relative col-span-1 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d0b14] p-6"
                >
                    <div className="pointer-events-none absolute -right-12 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.1)_0%,transparent_70%)] blur-2xl" />
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/15">
                        <Layers className="h-5 w-5 text-orange-400" />
                    </div>
                    <h3 className="text-base font-semibold text-white">Visual Theme Builder</h3>
                    <p className="mt-1.5 text-sm text-slate-500">
                        Design global layouts and control where they appear with a visual builder.
                    </p>
                    <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.06] bg-[#0a0910] p-3">
                        <div className="mb-3 flex gap-1.5">
                            {["Header", "Footer", "Archive"].map((l) => (
                                <div key={l} className="h-5 rounded-md bg-white/5 px-2 text-[9px] leading-5 text-slate-600">{l}</div>
                            ))}
                        </div>
                        <div className="space-y-2">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex gap-2">
                                    {[...Array(3)].map((_, j) => (
                                        <div key={j} className="h-6 flex-1 rounded border border-white/[0.04] bg-white/[0.04]" style={{ opacity: 1 - i * 0.14 }} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Row 2, col 3: SEO & Speed Card ── */}
                <div
                    data-feat-card
                    className="group relative col-span-1 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d0b14] p-6"
                >
                    <div className="pointer-events-none absolute -bottom-8 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(234,179,8,0.1)_0%,transparent_70%)] blur-2xl" />
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500/15">
                        <Zap className="h-5 w-5 text-yellow-400" />
                    </div>
                    <h3 className="text-base font-semibold text-white">SEO-Ready &amp; Blazing Fast</h3>
                    <p className="mt-1.5 text-sm text-slate-500">
                        Top scores on Google PageSpeed out of the box — no extra work needed.
                    </p>

                    {/* Speed bar */}
                    <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.06] bg-[#0a0910] p-4">
                        <div className="mb-4">
                            <div className="mb-1.5 flex items-center justify-between text-[10px] text-slate-600">
                                <span>Page Speed Score</span>
                                <span className="text-green-400">98 / 100</span>
                            </div>
                            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/5">
                                <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-400" />
                            </div>
                        </div>
                        <div className="flex items-center justify-around">
                            <div className="text-center">
                                <div className="text-4xl font-black text-green-400">A</div>
                                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">Perf</div>
                            </div>
                            <div className="h-10 w-px bg-white/[0.06]" />
                            <div className="text-center">
                                <div className="text-3xl font-black text-green-400">&gt;90%</div>
                                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">Structure</div>
                            </div>
                            <div className="h-10 w-px bg-white/[0.06]" />
                            <div className="text-center">
                                <div className="text-3xl font-black text-green-400">&gt;90%</div>
                                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">SEO</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
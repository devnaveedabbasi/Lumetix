"use client";

import CarouselCard from "./CarouselCard";
import { useCarouselEngine } from "../../../../hooks/useCarouselEngine";

export default function Carousel() {
    const {
        slides,
        active,
        setPaused,
        goToIndex,
        onCardClick,
        registerCard,
        registerShadowLeft,
        registerShadowRight,
        onPointerDown,
        onPointerMove,
        onPointerUp,
    } = useCarouselEngine();

    return (
        <div
            className="relative z-10 mx-auto mt-16 w-full max-w-7xl sm:mt-20"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Glow behind the active card */}
            <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.35)_0%,rgba(5,4,9,0)_65%)] blur-2xl"
            />

            <div
                className="relative flex h-[380px] w-full cursor-grab touch-pan-y items-center justify-center active:cursor-grabbing sm:h-[600px]"
                style={{ perspective: "1400px" }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
            >
                {slides.map((slide, i) => (
                    <CarouselCard
                        key={slide.id}
                        slide={slide}
                        cardRef={registerCard(i)}
                        shadowLeftRef={registerShadowLeft(i)}
                        shadowRightRef={registerShadowRight(i)}
                        onClick={() => onCardClick(i)}
                    />
                ))}
            </div>

            {/* Floor shadow under the deck */}
            <div
                aria-hidden
                className="pointer-events-none mx-auto -mt-6 h-16 w-[70%] max-w-3xl rounded-[100%] bg-black/80 blur-2xl"
            />

            {/* Dot indicators */}
            <div className="mt-8 flex items-center justify-center gap-2.5">
                {slides.map((s, i) => (
                    <button
                        key={s.id}
                        aria-label={`Go to slide ${i + 1}`}
                        onClick={() => goToIndex(i)}
                        className={[
                            "h-2 rounded-full transition-all duration-500",
                            i === active ? "w-7 bg-fuchsia-400" : "w-2 bg-white/20 hover:bg-white/40",
                        ].join(" ")}
                    />
                ))}
            </div>
        </div>
    );
}

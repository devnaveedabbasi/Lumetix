import { useMemo } from "react";

// Deterministic PRNG so the starfield is identical on server and client (SSR-safe).
function mulberry32(seed: number) {
    return function () {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export interface Star {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    twinkle: boolean;
    delay: number;
    duration: number;
}

export function useStars(count: number): Star[] {
    return useMemo(() => {
        const rand = mulberry32(42);
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            x: rand() * 100,
            y: rand() * 100,
            size: rand() * 1.6 + 0.6,
            opacity: rand() * 0.6 + 0.25,
            twinkle: rand() > 0.72,
            delay: rand() * 5,
            duration: 2.5 + rand() * 3,
        }));
    }, [count]);
}

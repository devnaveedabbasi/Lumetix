"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { gsap } from "@/lib/gsap";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { AUTOPLAY_MS, GLIDE_DURATION, GLIDE_EASE, LAYOUT, SLIDES } from "../constants/constants";

const n = SLIDES.length;

export function useCarouselEngine() {
    const prefersReducedMotion = usePrefersReducedMotion();
    const isMobile = useMediaQuery("(max-width: 640px)");
    const { spacing, depth, tilt } = isMobile ? LAYOUT.mobile : LAYOUT.desktop;

    // Plain mutable object (not React state) — GSAP tweens this directly every frame.
    const progressState = useRef({ progress: 0 }).current;
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    const cardEls = useRef<(HTMLDivElement | null)[]>([]);
    const shadowLeftEls = useRef<(HTMLDivElement | null)[]>([]);
    const shadowRightEls = useRef<(HTMLDivElement | null)[]>([]);

    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    const drag = useRef({
        dragging: false,
        moved: false,
        startX: 0,
        startProgress: 0,
        lastX: 0,
        lastT: 0,
        velocity: 0,
    });
    const suppressClickRef = useRef(false);

    const applyTransforms = useCallback(() => {
        const p = progressState.progress;

        for (let i = 0; i < n; i++) {
            const el = cardEls.current[i];
            if (!el) continue;

            let o = (i - p) % n;
            if (o > n / 2) o -= n;
            if (o < -n / 2) o += n;
            const abs = Math.abs(o);

            const opacity =
                abs <= 1 ? 1 - abs * 0.1 : abs <= 2.2 ? 0.9 - (abs - 1) * 0.7 : 0;
            const brightness = 1 - Math.min(abs, 2) * 0.28;

            gsap.set(el, {
                x: o * spacing,
                z: -Math.min(abs, 2.5) * depth,
                rotationY: Math.max(-2, Math.min(2, o)) * -tilt,
                scale: 1 - Math.min(abs, 2) * 0.06,
                opacity,
                zIndex: 100 - Math.round(abs * 10),
                filter: `brightness(${brightness})`,
                force3D: true,
            });

            const shadowLeft = shadowLeftEls.current[i];
            const shadowRight = shadowRightEls.current[i];
            if (shadowLeft) gsap.set(shadowLeft, { opacity: Math.min(Math.max(o, 0), 1.4) * 0.55 });
            if (shadowRight) gsap.set(shadowRight, { opacity: Math.min(Math.max(-o, 0), 1.4) * 0.55 });
        }

        setActive(((Math.round(p) % n) + n) % n);
    }, [progressState, spacing, depth, tilt]);

    const glideTo = useCallback(
        (target: number) => {
            tweenRef.current?.kill();
            tweenRef.current = gsap.to(progressState, {
                progress: target,
                duration: GLIDE_DURATION,
                ease: GLIDE_EASE,
                onUpdate: applyTransforms,
            });
        },
        [progressState, applyTransforms]
    );

    const step = useCallback(
        (dir: 1 | -1) => glideTo(Math.round(progressState.progress) + dir),
        [glideTo, progressState]
    );

    const goToIndex = useCallback(
        (i: number) => {
            const base = Math.round(progressState.progress);
            let delta = (i - (((base % n) + n) % n)) % n;
            if (delta > n / 2) delta -= n;
            if (delta < -n / 2) delta += n;
            glideTo(base + delta);
        },
        [glideTo, progressState]
    );

    const onCardClick = useCallback(
        (i: number) => {
            if (suppressClickRef.current) return;
            goToIndex(i);
        },
        [goToIndex]
    );

    // Paint the initial coverflow layout before first browser paint.
    useEffect(() => {
        applyTransforms();
    }, [applyTransforms]);

    // Autoplay — paused on hover/drag, disabled for reduced-motion users.
    useEffect(() => {
        if (paused || prefersReducedMotion) return;
        const t = setInterval(() => step(1), AUTOPLAY_MS);
        return () => clearInterval(t);
    }, [paused, prefersReducedMotion, step]);

    const onPointerDown = useCallback(
        (e: PointerEvent<HTMLDivElement>) => {
            tweenRef.current?.kill();
            const d = drag.current;
            d.dragging = true;
            d.moved = false;
            d.startX = e.clientX;
            d.startProgress = progressState.progress;
            d.lastX = e.clientX;
            d.lastT = performance.now();
            d.velocity = 0;
            setPaused(true);
            e.currentTarget.setPointerCapture(e.pointerId);
        },
        [progressState]
    );

    const onPointerMove = useCallback(
        (e: PointerEvent<HTMLDivElement>) => {
            const d = drag.current;
            if (!d.dragging) return;

            const dx = e.clientX - d.startX;
            if (Math.abs(dx) > 6) d.moved = true;
            progressState.progress = d.startProgress - dx / spacing;
            applyTransforms();

            const now = performance.now();
            const dt = now - d.lastT;
            if (dt > 0) d.velocity = (e.clientX - d.lastX) / dt; // px/ms
            d.lastX = e.clientX;
            d.lastT = now;
        },
        [progressState, spacing, applyTransforms]
    );

    const onPointerUp = useCallback(() => {
        const d = drag.current;
        if (!d.dragging) return;
        d.dragging = false;

        // Project momentum forward, then snap to the nearest slide (max one
        // step per gesture), matching the reference Swiper slider feel.
        const projected = progressState.progress - (d.velocity / spacing) * 220;
        const base = Math.round(d.startProgress);
        const target = Math.max(base - 1, Math.min(base + 1, Math.round(projected)));
        glideTo(target);
        setPaused(false);

        if (d.moved) {
            suppressClickRef.current = true;
            requestAnimationFrame(() => {
                suppressClickRef.current = false;
            });
        }
    }, [glideTo, progressState, spacing]);

    const registerCard = useCallback(
        (i: number) => (el: HTMLDivElement | null) => {
            cardEls.current[i] = el;
        },
        []
    );
    const registerShadowLeft = useCallback(
        (i: number) => (el: HTMLDivElement | null) => {
            shadowLeftEls.current[i] = el;
        },
        []
    );
    const registerShadowRight = useCallback(
        (i: number) => (el: HTMLDivElement | null) => {
            shadowRightEls.current[i] = el;
        },
        []
    );

    return useMemo(
        () => ({
            slides: SLIDES,
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
        }),
        [
            active,
            goToIndex,
            onCardClick,
            registerCard,
            registerShadowLeft,
            registerShadowRight,
            onPointerDown,
            onPointerMove,
            onPointerUp,
        ]
    );
}

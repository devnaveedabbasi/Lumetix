import type { Slide } from "../../../../types/types";

export default function CarouselCard({
    slide,
    cardRef,
    shadowLeftRef,
    shadowRightRef,
    onClick,
}: {
    slide: Slide;
    cardRef: (el: HTMLDivElement | null) => void;
    shadowLeftRef: (el: HTMLDivElement | null) => void;
    shadowRightRef: (el: HTMLDivElement | null) => void;
    onClick: () => void;
}) {
    return (
        <div
            ref={cardRef}
            onClick={onClick}
            className="absolute h-[300px] w-[230px] cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#0b0a12] p-4 shadow-[0_25px_60px_rgba(0,0,0,0.75)] [transform-style:preserve-3d] sm:h-[520px] sm:w-[400px]"
        >
            <img
                src={slide.image}
                alt={slide.id}
                draggable={false}
                className="pointer-events-none h-full w-full select-none rounded-lg object-cover object-left-top"
            />

            {/* Swiper-style "backside" shadows — strength follows the 3D rotation */}
            <div
                ref={shadowLeftRef}
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-linear-to-r from-black via-black/40 to-transparent opacity-0"
            />
            <div
                ref={shadowRightRef}
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-linear-to-l from-black via-black/40 to-transparent opacity-0"
            />
        </div>
    );
}

import Starfield from "./Starfield/Starfield";

export default function HeroBackground() {
    return (
        <>
            <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[-20%] h-[900px] w-[1400px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.55)_0%,rgba(124,58,237,0.25)_35%,rgba(5,4,9,0)_70%)] blur-2xl"
            />
            <Starfield count={110} />
        </>
    );
}

import { ArrowRight, Rocket, Zap } from "lucide-react";

export default function HeroCopy() {
    return (
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 pt-16 text-center">
            <div
                data-hero-anim="badge"
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 backdrop-blur"
            >
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-400 text-black">
                    <Zap className="h-3 w-3" />
                </span>
                Now Powered by <span className="font-semibold text-white">AI Automation</span>
            </div>

            <h1
                data-hero-anim="heading"
                className="text-4xl font-bold leading-tight text-white sm:text-6xl"
            >
                Build SaaS Sites Faster.
                <br />
                Scale{" "}
                <span className="relative inline-block text-[#E3F76A]">
                    Smarter.
                    <svg
                        aria-hidden
                        viewBox="0 0 220 12"
                        className="absolute -bottom-2 left-0 h-3 w-full"
                    >
                        <path
                            data-hero-anim="heading-underline"
                            d="M2 8 C 60 2, 160 2, 218 8"
                            stroke="#E3F76A"
                            strokeWidth="4"
                            strokeLinecap="round"
                            fill="none"
                            pathLength={1}
                            strokeDasharray={1}
                        />
                    </svg>
                </span>
            </h1>

            <p
                data-hero-anim="paragraph"
                className="mt-6 max-w-xl text-slate-400"
            >
                Streamline your workflow, automate repetitive tasks, and
                collaborate effortlessly with an all-in-one SaaS platform built
                for modern teams. Save time, increase productivity, and grow
                your business without the complexity.
            </p>

            <div
                data-hero-anim="cta"
                className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
                <a
                    href="#get-started"
                    className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-violet-500 via-fuchsia-500 to-rose-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition-transform duration-300 hover:-translate-y-0.5"
                >
                    <Rocket className="h-4 w-4" />
                    Start Free Trial
                </a>

                <a
                    href="#demo"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
                >
                    Watch Demo
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
            </div>
        </div>
    );
}
import { Sparkles, ArrowRight } from "lucide-react";

const NAV_ITEMS = ["Demos", "Features", "Support", "Documentation"];

export default function HeroNav() {
    return (
        <header className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-6 pt-8 text-sm">
            {/* Logo */}
            <div data-hero-anim="nav-item" className="flex items-center gap-2 text-lg font-bold tracking-wide text-white">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/20">
                    <Sparkles className="h-4 w-4 text-white" />
                </div>
                Lumetix
            </div>

            {/* Center Navigation Links */}
            <nav className="hidden items-center gap-8 text-slate-400 md:flex">
                {NAV_ITEMS.map((item) => (
                    <a
                        key={item}
                        href="#"
                        data-hero-anim="nav-item"
                        className="transition-colors hover:text-white"
                    >
                        {item}
                    </a>
                ))}
            </nav>

            {/* Right Action Buttons */}
            <div data-hero-anim="nav-item" className="flex items-center gap-5">
                <a href="#login" className="hidden font-medium text-slate-300 transition-colors hover:text-white sm:block">
                    Log in
                </a>
                <a
                    href="#get-started"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-medium text-white backdrop-blur transition-all hover:bg-white/10"
                >
                    Get Started
                    <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
                </a>
            </div>
        </header>
    );
}

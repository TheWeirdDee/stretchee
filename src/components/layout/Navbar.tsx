import Link from "next/link";
import React from "react";
import { Menu, ArrowUpRight } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="relative z-20 flex items-center justify-between px-6 py-8 md:px-12 lg:px-16 w-full text-white">
            {/* Left: Menu & Links */}
            <div className="flex items-center gap-8">
                <button aria-label="Menu" className="p-2 -ml-2 hover:opacity-70 transition-opacity">
                    <Menu size={20} strokeWidth={1.5} />
                </button>
                <div className="hidden md:flex gap-6 text-sm font-medium tracking-wide">
                    <Link href="#" className="hover:opacity-70 transition-opacity">Classes</Link>
                    <Link href="#" className="hover:opacity-70 transition-opacity">Programs</Link>
                    <Link href="#" className="hover:opacity-70 transition-opacity">Academy</Link>
                </div>
            </div>

            {/* Center: Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                <span className="text-xl md:text-2xl font-light tracking-wider flex items-center">
                    {/* Cool 'S' Design */}
                    <span className="relative flex items-center justify-center w-8 h-8 mr-1 -ml-2 rounded-full border border-white/50 bg-white/10 backdrop-blur-sm">
                        <span className="font-serif italic font-bold text-[1.4rem] leading-none text-emerald-500 tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>S</span>
                    </span>
                    tretchee
                </span>
            </div>

            {/* Right: Sign in */}
            <div className="flex items-center">
                <Link
                    href="#"
                    className="flex items-center justify-center gap-3 bg-white text-black pl-5 pr-2 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                    Sign in
                    <span className="bg-black text-white p-1.5 rounded-full flex items-center justify-center">
                        <ArrowUpRight size={16} strokeWidth={2} />
                    </span>
                </Link>
            </div>
        </nav>
    );
}

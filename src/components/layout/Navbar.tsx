"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { Waves, X, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        tl.current = gsap.timeline({ paused: true })
            .to(overlayRef.current, { 
                autoAlpha: 1, 
                duration: 0.4, 
                ease: "power2.inOut" 
            })
            .fromTo(".mobile-link", 
                { y: 30, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power3.out" }, 
                "-=0.2"
            );
    }, { scope: overlayRef });

    useEffect(() => {
        if (isMobileMenuOpen) {
            tl.current?.play();
        } else {
            tl.current?.reverse();
        }
    }, [isMobileMenuOpen]);

    return (
        <nav className="relative z-20 flex items-center justify-between px-6 py-8 md:px-12 lg:px-16 w-full text-white">
         
            <div className="flex items-center gap-8">
                {/* Mobile Hamburger Button */}
                <button 
                    aria-label="Open Menu" 
                    className="p-2 -ml-2 hover:opacity-70 transition-opacity md:hidden"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Waves size={24} strokeWidth={1.5} className="rotate-90" />
                </button>
               
                <div className="hidden md:flex gap-6 text-sm font-medium tracking-wide items-center">
                    <Link href="#" className="hover:opacity-70 transition-opacity">Classes</Link>
                    <Link href="#" className="hover:opacity-70 transition-opacity">Programs</Link>
                    <Link href="#" className="hover:opacity-70 transition-opacity">Academy</Link>
                </div>
            </div>
 
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                <span className="text-xl md:text-2xl font-light tracking-wider flex items-center">
              
                    <span className="relative flex items-center justify-center w-8 h-8 mr-1 -ml-2 rounded-full border border-white/50 bg-white/10 backdrop-blur-sm">
                        <span className="font-serif italic font-bold text-[1.4rem] leading-none text-[#1A3626] tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>S</span>
                    </span>
                    <em>tretchee</em>
                </span>
            </div>

            {/* Right: Sign in */}
            <div className="flex items-center">
                <Link
                    href="/auth/signin"
                    className="flex items-center justify-center gap-3 bg-white text-black pl-5 pr-2 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                    Sign in
                    <span className="bg-[#1A3626] text-white p-1.5 rounded-full flex items-center justify-center">
                        <ArrowUpRight size={16} strokeWidth={2} />
                    </span>
                </Link>
            </div>

            {/* Mobile Menu Overlay */}
            <div 
                ref={overlayRef}
                className="fixed inset-0 z-50 bg-black/98 flex flex-col items-center justify-center text-white invisible opacity-0"
            >
                <button 
                    aria-label="Close Menu" 
                    className="absolute top-8 left-6 p-2 -ml-2 hover:opacity-70 transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <X size={28} strokeWidth={1.5} />
                </button>
                <div className="flex flex-col gap-8 text-2xl font-light tracking-wide text-center">
                    <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="mobile-link hover:opacity-70 transition-opacity">Classes</Link>
                    <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="mobile-link hover:opacity-70 transition-opacity">Programs</Link>
                    <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="mobile-link hover:opacity-70 transition-opacity">Academy</Link>
                    <Link href="/auth/signin" onClick={() => setIsMobileMenuOpen(false)} className="mobile-link hover:opacity-70 transition-opacity mt-8 border-t border-white/20 pt-8">Sign in</Link>
                </div>
            </div>
        </nav>
    );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import Navbar from "../layout/Navbar";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ArrowUpRight } from "lucide-react";

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);
    const textRef1 = useRef<HTMLHeadingElement>(null);
    const textRef2 = useRef<HTMLParagraphElement>(null);
    const btnRef = useRef<HTMLAnchorElement>(null);

    const studentCountRef = useRef<HTMLSpanElement>(null);
    const classesCountRef = useRef<HTMLSpanElement>(null);
    const satisfactionCountRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {

        const tl = gsap.timeline();
        tl.fromTo(textRef1.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
            .fromTo(textRef2.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
            .fromTo(btnRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")
            .fromTo(".stat-item", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }, "-=0.4");

        // 2. Number Counting Animations
        // 10.000
        const studentsObj = { val: 0 };
        gsap.to(studentsObj, {
            val: 10000,
            duration: 2.5,
            ease: "power2.out",
            onUpdate: () => {
                if (studentCountRef.current) {
                    studentCountRef.current.innerText = Math.floor(studentsObj.val).toLocaleString("de-DE");
                }
            },
            delay: 0.5
        });

        const classesObj = { val: 0 };
        gsap.to(classesObj, {
            val: 5000,
            duration: 2.5,
            ease: "power2.out",
            onUpdate: () => {
                if (classesCountRef.current) {
                    classesCountRef.current.innerText = Math.floor(classesObj.val).toLocaleString("en-US") + "+";
                }
            },
            delay: 0.7
        });

        const satisfactionObj = { val: 0 };
        gsap.to(satisfactionObj, {
            val: 95,
            duration: 2.5,
            ease: "power2.out",
            onUpdate: () => {
                if (satisfactionCountRef.current) {
                    satisfactionCountRef.current.innerText = Math.floor(satisfactionObj.val) + "%";
                }
            },
            delay: 0.9
        });

    }, { scope: container });

    return (
        <div ref={container} className="relative min-h-screen w-full flex flex-col font-sans text-white overflow-hidden bg-black">
            {/* Background Image Setup */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/LandingPageImages/HeroBg.jpg"
                    alt="Hero background showing person doing yoga stretch"
                    fill
                    priority
                    unoptimized={true}
                    className="object-cover object-center opacity-80"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">

                <Navbar />

                <main className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 mt-10 md:mt-20">
                    <div className="max-w-2xl">
                        <h1 ref={textRef1} className="text-5xl md:text-6xl lg:text-[5rem] font-medium leading-[1.1] tracking-tight mb-6 opacity-0">
                            Flow into <span className="opacity-70">—</span> Peace<br />
                            One Pose at a Time
                        </h1>

                        <p ref={textRef2} className="text-base md:text-lg max-w-sm md:max-w-md opacity-0 leading-relaxed mb-10 font-light tracking-wide">
                            Whether you're just beginning or mastering your journey, join our community for a rejuvenating path toward well-being.
                        </p>

                        <Link
                            ref={btnRef}
                            href="#"
                            className="inline-flex items-center justify-center gap-4 bg-white text-black pl-6 pr-2 py-2 rounded-full text-base font-medium hover:bg-gray-200 transition-colors w-max opacity-0"
                        >
                            Try 14 Days Free
                            <span className="bg-black text-white p-2.5 rounded-full flex items-center justify-center">
                                <ArrowUpRight size={16} strokeWidth={2} />
                            </span>
                        </Link>
                    </div>
                </main>

                <footer className="w-full px-6 md:px-12 lg:px-16 py-8 md:py-12 mt-auto">
                    <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 md:gap-20">

                        <div className="stat-item flex flex-col gap-1 opacity-0">
                            <span ref={studentCountRef} className="text-3xl md:text-4xl font-normal">0</span>
                            <span className="text-sm opacity-70 tracking-wide font-light">Happy Students</span>
                        </div>

                        <div className="stat-item hidden sm:block w-px h-12 bg-white/20 self-center opacity-0"></div>

                        <div className="stat-item flex flex-col gap-1 opacity-0">
                            <span ref={classesCountRef} className="text-3xl md:text-4xl font-normal">0</span>
                            <span className="text-sm opacity-70 tracking-wide font-light">Classes Streamed Monthly</span>
                        </div>

                        <div className="stat-item hidden sm:block w-px h-12 bg-white/20 self-center opacity-0"></div>

                        <div className="stat-item flex flex-col gap-1 opacity-0">
                            <span ref={satisfactionCountRef} className="text-3xl md:text-4xl font-normal">0</span>
                            <span className="text-sm opacity-70 tracking-wide font-light">Member Satisfaction</span>
                        </div>

                    </div>
                </footer>

            </div>
        </div>
    );
}

"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Connect() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {

        gsap.fromTo(contentRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1, ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            }
        );

        const circles = gsap.utils.toArray(".bg-circle");
        circles.forEach((circle: any, i) => {
            gsap.to(circle, {
                yPercent: (i + 1) * -10,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        });

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative w-full min-h-[60vh] mx-auto flex flex-col items-center justify-center py-16 px-6 md:px-12 lg:px-14 overflow-hidden bg-[#1A3626] text-white">

            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

                <div className="bg-circle absolute top-[-20%] left-[-10%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border-[60px] md:border-[80px] border-white/5"></div>

                <div className="bg-circle absolute bottom-[-40%] left-[20%] w-[700px] h-[700px] md:w-[1000px] md:h-[1000px] rounded-full border-[60px] md:border-[100px] border-white/5"></div>

                <div className="bg-circle absolute top-[-30%] right-[-15%] w-[500px] h-[500px] md:w-[900px] md:h-[900px] rounded-full border-[80px] md:border-[120px] border-white/5"></div>
            </div>

            <div ref={contentRef} className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center opacity-0">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-8 leading-[1.15]">
                    Connect, Grow, and<br className="hidden md:block" /> Thrive Together
                </h2>

                <p className="text-base md:text-lg opacity-80 leading-relaxed font-light mb-12 max-w-2xl">
                    Be part of a global community that embraces balance, strength, and mindfulness. Start your journey today and experience the support of like-minded individuals working towards their best selves.
                </p>

                <button className="bg-white text-[#1A3626] px-10 py-3.5 rounded-full text-base font-medium hover:bg-gray-100 transition-colors shadow-sm">
                    Browse Program
                </button>
            </div>

        </section>
    );
}

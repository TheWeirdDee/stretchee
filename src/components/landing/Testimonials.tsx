"use client";

import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo([labelRef.current, headerRef.current],
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            }
        );

        const cards = gsap.utils.toArray('.testimonial-card');
        gsap.fromTo(cards as Element[],
            { y: 100, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            }
        );
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="w-full bg-white text-black py-24 px-6 md:px-12 lg:px-16 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-12 relative">

                <div className="md:w-1/3 lg:w-[32%] flex flex-col justify-between max-md:contents">
                    <div ref={labelRef} className="opacity-0 max-md:order-1 mb-6 md:mb-12 pt-2 md:pt-4">
                        <span className="text-sm font-medium tracking-wide">Testimonial</span>
                    </div>
                    <div className="flex flex-col gap-4 md:gap-6 h-[550px] md:h-[650px] lg:h-[770px] testimonial-card opacity-0 max-md:order-3 max-md:mt-12 md:mr-2 lg:mr-4">
                        <div className="relative w-full flex-[3] rounded-3xl overflow-hidden bg-gray-100 min-h-[300px] md:min-h-0">
                            <Image
                                src="/images/LandingPageImages/SophiaPoseTwo.jpg"
                                fill
                                alt="Sophia Pose 2"
                                className="object-cover object-top"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                        <div className="bg-[#1A3626] text-white p-6 md:p-8 rounded-3xl flex flex-col justify-center flex-[2] shadow-md relative z-10 w-[95%] sm:w-full mx-auto -mt-4 md:mt-0">
                            <h3 className="text-xl font-medium mb-1">Sophia R.</h3>
                            <p className="text-sm opacity-80 mb-4 font-light">Marketing Manager</p>
                            <p className="text-sm font-light leading-relaxed opacity-90">
                                Stretchee has completely transformed my mornings. The guided programs are perfect for someone like me who needed structure to stay consistent.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="md:w-2/3 lg:w-[68%] flex flex-col justify-between max-md:contents">

                    <div ref={headerRef} className="flex flex-col opacity-0 max-md:order-2 md:mt-16 lg:mt-20 md:mb-16 lg:mb-24 max-md:mb-8 md:pl-4 lg:pl-8">
                        <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-medium tracking-tight mb-0">
                            Wellness from Our<br />Thriving Community
                        </h2>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-7">
                            <div className="flex gap-4">
                                <button className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-colors">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                                </button>
                                <button className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5 transition-colors">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                            <p className="max-w-md text-sm md:text-base opacity-70 leading-relaxed font-light mt-6">
                                From beginners finding their first moments of peace to experienced practitioners achieving new milestones, their journeys inspire and motivate us all.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-6 md:gap-8 lg:gap-10 max-md:order-4 w-full md:pl-4 lg:pl-8">
                        <div className="relative w-full h-[350px] md:h-[380px] lg:h-[420px] rounded-3xl overflow-hidden bg-gray-100 testimonial-card opacity-0">
                            <Image
                                src="/images/LandingPageImages/SophiaPoseOne.jpg"
                                fill
                                alt="Sophia Pose 1"
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                        <div className="relative w-full h-[350px] md:h-[340px] lg:h-[370px] rounded-3xl overflow-hidden bg-gray-100 testimonial-card opacity-0">
                            <Image
                                src="/images/LandingPageImages/SophiaPoseThree.jpg"
                                fill
                                alt="Sophia Pose 3"
                                className="object-cover object-top"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}

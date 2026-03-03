"use client";

import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const classesData = [
    {
        title: "Yoga",
        description: "Experience the flow of movement and breath that energizes your body and calms your mind, right from...",
        image: "/images/LandingPageImages/Yoga.jpg",
        offsetClass: "mt-0"
    },
    {
        title: "Meditation",
        description: "Perfect for beginners and experienced practitioners, our sessions help you cultivate mindfulness, reduce...",
        image: "/images/LandingPageImages/Meditation.jpg",
        offsetClass: "mt-0 lg:mt-12"
    },
    {
        title: "Pilates",
        description: "Strengthen and tone with our dynamic Pilates classes, designed to improve core stability, posture, and...",
        image: "/images/LandingPageImages/Pilates.jpg",
        offsetClass: "mt-0"
    },
    {
        title: "Guided Programs",
        description: "Whether you're just beginning or looking to deepen your practice, our structured guided programs...",
        image: "/images/LandingPageImages/Guidance.jpg",
        offsetClass: "mt-0 lg:mt-12"
    }
];

export default function WhatWeDo() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);


    useGSAP(() => {

        gsap.fromTo(headerRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1, ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            }
        );

        if (cardsRef.current) {
            const cards = cardsRef.current.children;
            gsap.fromTo(cards,
                { y: 100, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out",
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 75%",
                    }
                }
            );
        }
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="w-full bg-[#FAFAFA] text-black py-14 md:py-24 px-6 md:px-12 lg:px-16 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col items-center">

                <div ref={headerRef} className="flex flex-col items-center text-center max-w-2xl mb-20 opacity-0">
                    <span className="text-sm font-medium tracking-wide mb-3 opacity-60">What We Do</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
                        Your Healthy Partner
                    </h2>
                    <p className="text-base md:text-lg opacity-70 mb-10 leading-relaxed font-light">
                        Our online yoga, meditation, Pilates, and guided wellness programs are designed to support you at every stage of your wellness journey.
                    </p>
                    <button className="bg-[#1A3626] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#12261a] transition-colors">
                        See All Classes
                    </button>
                </div>

                <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    {classesData.map((item, index) => (
                        <div key={index} className={`flex flex-col bg-white rounded-4xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 opacity-0 ${item.offsetClass}`}>
                            <div className="relative w-full aspect-[4/5]">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                            </div>
                            <div className="p-6 flex flex-col pt-5">
                                <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                                <p className="text-xs opacity-60 leading-relaxed font-light">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

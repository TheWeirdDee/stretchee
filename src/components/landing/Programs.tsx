"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const programCards = [
    {
        title: "14-Day Beginner Yoga Journey",
        description: "Start your yoga practice with this beginner-friendly program designed to build strength, flexibility, and confidence in...",
        image: "/images/LandingPageImages/Beginner.avif"
    },
    {
        title: "30-Day Flexibility Challenge",
        description: "Stretch deeper and enhance your range of motion with a month-long challenge targeting flexibility and mobility.",
        image: "/images/LandingPageImages/Flexibility.jpg"
    },
    {
        title: "Core Strength Yoga Program",
        description: "A 3-week program designed to build core stability and overall body strength through yoga-based exercises.",
        image: "/images/LandingPageImages/Stretch.avif"
    }
];

const filters = ["Yoga", "Meditation", "Pilates"];

export default function Programs() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const [activeFilter, setActiveFilter] = useState("Yoga");

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
                { y: 80, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                    }
                }
            );
        }
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative w-full text-black py-14 md:py-20 px-6 md:px-12 lg:px-16 overflow-hidden bg-[#FAFAFA]">

            <div className="absolute top-0 left-[-40%] w-[100%] md:top-[-10%] md:left-[-20%] md:w-[60%] h-[100%] md:h-[120%] bg-[#FFEADD] opacity-80 blur-[90px] md:blur-[150px] rounded-full pointer-events-none z-0"></div>
            <div className="absolute top-0 right-[-40%] w-[100%] md:top-[-10%] md:right-[-20%] md:w-[60%] h-[100%] md:h-[120%] bg-[#DFF0E6] opacity-80 blur-[90px] md:blur-[150px] rounded-full pointer-events-none z-0"></div>

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mb-16 gap-6">
                    <span className="text-sm font-medium tracking-wide opacity-60">Programs</span>
                    <div className="flex items-center gap-3">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors border ${activeFilter === filter
                                    ? "bg-[#1A3626] text-white border-black"
                                    : "bg-transparent text-black border-black/20 hover:border-black/50"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div ref={headerRef} className="flex flex-col items-center text-center max-w-3xl mb-20 opacity-0">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 leading-[1.1]">
                        Join Guided Programs<br />and Challenges
                    </h2>
                    <p className="text-base md:text-lg opacity-70 mb-10 leading-relaxed font-light">
                        Embark on a journey of growth with our expertly designed programs and exciting challenges. From building core strength to mastering mindfulness, each path is tailored to guide and inspire you.
                    </p>
                    <button className="bg-[#1A3626] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#12261a] transition-colors">
                        Browse Program
                    </button>
                </div>

                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {programCards.map((item, index) => (
                        <div key={index} className="relative flex flex-col rounded-3xl overflow-hidden aspect-[4/5] shadow-sm group opacity-0">

                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                unoptimized={true}
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                            <div className="relative z-10 p-8 flex flex-col justify-end h-full text-white">
                                <h3 className="text-2xl font-medium mb-3 tracking-tight">{item.title}</h3>
                                <p className="text-sm opacity-80 leading-relaxed font-light line-clamp-2 md:line-clamp-3">
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

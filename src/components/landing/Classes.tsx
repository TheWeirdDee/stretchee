"use client";

import Image from "next/image";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Accessibility, Volleyball, Flower2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const classesFeatures = [
    {
        icon: <Layers size={20} strokeWidth={1.5} />,
        title: "Styles Tailored for You",
        description: "From energizing Vinyasa to calming Yin, mindful meditation to dynamic Qigong, ea..."
    },
    {
        icon: <Accessibility size={20} strokeWidth={1.5} />,
        title: "Yoga Anytime, Anywhere",
        description: "Start your day with a fresh boost, reset during lunch, or wind down in the evening..."
    },
    {
        icon: <Volleyball size={20} strokeWidth={1.5} />,
        title: "Expert Instructors",
        description: "Learn and grow with our team of passionate, certified instructors dedicated..."
    },
    {
        icon: <Flower2 size={20} strokeWidth={1.5} />,
        title: "Flexibility on the Go",
        description: "Download your favorite classes and practice anytime, anywhere with our app..."
    }
];

export default function Classes() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {

        gsap.fromTo(contentRef.current,
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
        <section ref={sectionRef} className="relative w-full min-h-[60vh] flex flex-col pt-16 pb-10 md:pb-10 px-6 md:px-12 lg:px-16 overflow-hidden bg-black text-white">

            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/LandingPageImages/Classes.jpg"
                    alt="Close up of a person meditating in lotus pose"
                    fill
                    priority={false}
                    unoptimized={true}
                    className="object-cover object-center opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/40 to-black/80"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col h-full justify-between gap-10 md:gap-22">

                <div ref={contentRef} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 opacity-0 w-full mt-10">
                    <div className="flex flex-col max-w-xl">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4 leading-[1.1]">
                            Classes for Every Level<br />and Intention
                        </h2>
                        <p className="text-base md:text-lg opacity-80 leading-relaxed font-light">
                            Whether you're here to find a moment of calm or to deepen your practice with advanced poses, we have options that fit seamlessly into your schedule and support your journey to wellness.
                        </p>
                    </div>
                    <button className="bg-white text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors whitespace-nowrap">
                        Browse Classes
                    </button>
                </div>

                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full translate-y-2 lg:translate-y-2 z-20">
                    {classesFeatures.map((item, index) => (
                        <div key={index} className="flex flex-col bg-[#F8F9FA] text-black rounded-[1.5rem] p-6 pt-8 shadow-md opacity-0">

                            <div className="bg-[#EFEFEF] w-12 h-12 rounded-xl flex items-center justify-center mb-10 text-[#4A5568]">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-medium mb-2 tracking-snug">{item.title}</h3>
                            <p className="text-sm opacity-60 leading-relaxed font-light tracking-wide">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

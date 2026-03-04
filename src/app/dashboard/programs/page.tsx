"use client";

import { useState } from "react";
import { Filter, Star, Clock, Target, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Programs() {
    const [activeFilter, setActiveFilter] = useState("All");

    const programs = [
        { id: 1, title: "30 Days of Flexibility", level: "Beginner", duration: "4 Weeks", target: "Flexibility", rating: 4.9, thumb: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop" },
        { id: 2, title: "Core & Balance Masterclass", level: "Intermediate", duration: "6 Weeks", target: "Strength", rating: 4.8, thumb: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop" },
        { id: 3, title: "Mindful Morning Routine", level: "All Levels", duration: "2 Weeks", target: "Mindfulness", rating: 5.0, thumb: "https://images.unsplash.com/photo-1599901860904-17e086b976da?q=80&w=600&auto=format&fit=crop" },
        { id: 4, title: "Advanced Ashtanga Series", level: "Advanced", duration: "8 Weeks", target: "Strength & Flex", rating: 4.7, thumb: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=600&auto=format&fit=crop" },
    ];

    return (
        <div className="p-8 pb-20 fade-in max-w-7xl mx-auto">
            <h1 className="text-3xl font-medium tracking-tight mb-2">Programs & Plans</h1>
            <p className="text-black/60 font-light mb-8">Structured multi-week journeys built for your specific goals.</p>

            <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center mb-8">
                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                    {["All", "Flexibility", "Strength", "Mindfulness", "Beginner", "Advanced"].map(filter => (
                        <button 
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                                activeFilter === filter 
                                    ? "bg-[#1A3626] text-white border-[#1A3626]" 
                                    : "bg-white text-black/70 border-black/10 hover:border-black/30"
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
                
                <button className="flex items-center gap-2 px-4 py-2 border border-black/20 rounded-full text-sm font-medium hover:bg-black/5 transition-colors shrink-0">
                    <Filter size={16} /> Advanced Filters
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {programs.map(prog => (
                    <div key={prog.id} className="bg-white border border-black/10 rounded-3xl overflow-hidden hover:-translate-y-1 transition-transform duration-300 group cursor-pointer shadow-sm hover:shadow-xl">
                        <div className="w-full h-56 relative bg-gray-200">
                            <Image 
                                src={prog.thumb} 
                                alt={prog.title} 
                                fill 
                                unoptimized
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                                {prog.level}
                            </div>
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1">
                                <Star size={12} className="fill-yellow-400 text-yellow-400"/> {prog.rating}
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-medium mb-3 group-hover:text-[#1A3626] transition-colors">{prog.title}</h3>
                            
                            <div className="flex gap-4 mb-6 text-sm text-black/60 font-light">
                                <span className="flex items-center gap-1.5"><Clock size={16} className="text-black/40"/> {prog.duration}</span>
                                <span className="flex items-center gap-1.5"><Target size={16} className="text-black/40"/> {prog.target}</span>
                            </div>

                            <button className="w-full py-3 bg-gray-50 border border-black/5 rounded-2xl text-sm font-medium group-hover:bg-[#1A3626] group-hover:text-white transition-colors flex justify-center items-center gap-2">
                                View Program Details <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

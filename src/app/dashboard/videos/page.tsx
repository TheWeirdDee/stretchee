"use client";

import { useState } from "react";
import { Search, Filter, PlayCircle, Clock, Flame, Bookmark, Download } from "lucide-react";
import Image from "next/image";

export default function VideoLibrary() {
    const [activeFilter, setActiveFilter] = useState("All");

    const videos = [
        { id: 1, title: "15-Min Core Crusher", category: "Abs", duration: "15:00", calories: "120 kcal", equipment: "None", thumb: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop" },
        { id: 2, title: "Full Body Dumbbell Workout", category: "Strength", duration: "45:00", calories: "450 kcal", equipment: "Dumbbells", thumb: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop" },
        { id: 3, title: "Hip Opening Yoga Flow", category: "Yoga", duration: "30:00", calories: "150 kcal", equipment: "Mat", thumb: "https://images.unsplash.com/photo-1599901860904-17e086b976da?q=80&w=600&auto=format&fit=crop" },
        { id: 4, title: "High Intensity Cardio (No Jumping)", category: "Cardio", duration: "20:00", calories: "250 kcal", equipment: "None", thumb: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop" },
        { id: 5, title: "Restorative Stretching", category: "Recovery", duration: "40:00", calories: "100 kcal", equipment: "Blocks", thumb: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop" },
        { id: 6, title: "Back Strengthening Basics", category: "Strength", duration: "25:00", calories: "200 kcal", equipment: "Resistance Band", thumb: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=600&auto=format&fit=crop" },
    ];

    return (
        <div className="p-8 pb-20 fade-in max-w-7xl mx-auto flex flex-col h-full">
            <h1 className="text-3xl font-medium tracking-tight mb-2">Video Library</h1>
            <p className="text-black/60 font-light mb-8">Access hundreds of on-demand workouts and guided sessions.</p>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Search for a specific workout, trainer, or target area..." 
                        className="w-full bg-white border border-black/10 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:border-black/30 focus:ring-2 focus:ring-black/5 transition-all"
                    />
                </div>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-black/10 rounded-2xl text-sm font-medium hover:bg-black/5 transition-colors whitespace-nowrap">
                    <Filter size={18} /> Advanced Filters
                </button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-4 mb-4 hide-scrollbar">
                {["All", "Strength", "Yoga", "Cardio", "Abs", "Recovery", "Upper Body", "Lower Body", "No Equipment"].map(filter => (
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

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {videos.map(video => (
                    <div key={video.id} className="bg-white border border-black/10 rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-300 group cursor-pointer shadow-sm">
                        
                        <div className="w-full h-48 relative bg-gray-200">
                            <Image 
                                src={video.thumb} 
                                alt={video.title} 
                                fill 
                                unoptimized
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 bg-black/10 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                                <PlayCircle size={48} strokeWidth={1.5} className="text-white opacity-90 group-hover:scale-110 transition-transform"/>
                            </div>
                            
                            {/* Top right badges */}
                            <div className="absolute top-3 right-3 flex gap-2">
                                <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                                    <Bookmark size={14} />
                                </button>
                                <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                                    <Download size={14} />
                                </button>
                            </div>

                            {/* Bottom right duration */}
                            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded">
                                {video.duration}
                            </div>
                            
                             {/* Bottom left category */}
                             <div className="absolute bottom-3 left-3 bg-[#1A3626] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                                {video.category}
                            </div>
                        </div>

                        <div className="p-5">
                            <h3 className="font-medium mb-3 line-clamp-1 group-hover:text-[#1A3626] transition-colors">{video.title}</h3>
                            
                            <div className="flex items-center justify-between text-xs text-black/50 font-medium">
                                <span className="flex items-center gap-1.5"><Flame size={14} className="text-orange-500"/> {video.calories}</span>
                                <span className="flex items-center gap-1.5"><Clock size={14} className="text-black/40"/> {video.duration}</span>
                                <span className="px-2 py-1 bg-gray-100 rounded text-black/60 capitalize">{video.equipment}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
             <div className="mt-12 flex justify-center">
                <button className="px-8 py-3 rounded-full border border-black/20 text-black/70 font-medium text-sm hover:bg-black/5 transition-colors">
                    Load More Videos
                </button>
            </div>
        </div>
    );
}

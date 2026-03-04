"use client";

import { Dumbbell, Flame, Clock, Calendar as CalendarIcon, ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useEffect, useState } from "react";

export default function DashboardHome() {
  const { user, loading } = useAppStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
      setIsMounted(true);
  }, []);

  return (
    <div className="p-8 pb-20 fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
        <div>
          {!isMounted || loading ? (
             <div className="h-8 w-64 bg-gray-200 animate-pulse rounded-lg mb-2"></div>
          ) : (
             <h1 className="text-3xl font-medium tracking-tight mb-2">Welcome back, {user?.name ? user.name.split(' ')[0] : 'Guest'}! 👋</h1>
          )}
          <p className="text-black/60 font-light">"The only bad workout is the one that didn't happen."</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-200">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium">Goal: {isMounted ? user?.goal || "Loading..." : "Loading..."}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column (Main Focus) */}
        <div className="xl:col-span-2 flex flex-col gap-8">
            
          {/* Today's Workout Card */}
          <section className="bg-white border border-black/5 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-green-50 to-transparent opacity-50 pointer-events-none"></div>
            
            <div className="flex justify-between items-start mb-6">
                <h2 className="text-lg font-medium">Today's Workout</h2>
                <span className="text-xs font-medium px-3 py-1 bg-[#1A3626]/10 text-[#1A3626] rounded-full">Day 12 of 30</span>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center md:items-stretch">
                <div className="w-full md:w-48 h-32 rounded-2xl bg-gray-200 overflow-hidden relative border border-black/5 flex-shrink-0">
                    {/* Placeholder for video thumbnail */}
                    <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Yoga pose" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors cursor-pointer">
                        <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 text-black ml-1" fill="currentColor" />
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-between w-full">
                    <div>
                        <h3 className="text-xl font-medium mb-1">Morning Vinyasa Flow</h3>
                        <p className="text-sm text-black/60 font-light mb-4 line-clamp-2">A beautiful fluid sequence focusing on breath synchronization and full-body opening to start your day right.</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                        <div className="flex items-center gap-4 text-xs font-medium text-black/60">
                            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 45 mins</span>
                            <span className="flex items-center gap-1.5"><Dumbbell className="w-4 h-4" /> Intermediate</span>
                            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Mat block</span>
                        </div>
                        <button className="bg-[#1A3626] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#12261a] transition-colors">
                            Start Session
                        </button>
                    </div>
                </div>
            </div>
          </section>

          {/* Quick Stats Panel */}
          <section>
            <h2 className="text-lg font-medium mb-4">Quick Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Calories Burned", value: "1,240", unit: "kcal", icon: Flame, color: "text-orange-500", bg: "bg-orange-50" },
                    { label: "Active Streak", value: "12", unit: "days", icon: CalendarIcon, color: "text-blue-500", bg: "bg-blue-50" },
                    { label: "Workouts", value: "18", unit: "sessions", icon: Dumbbell, color: "text-purple-500", bg: "bg-purple-50" },
                    { label: "Time Trained", value: "8.5", unit: "hours", icon: Clock, color: "text-green-500", bg: "bg-green-50" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white border border-black/5 rounded-3xl p-5 flex flex-col">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${stat.bg} ${stat.color}`}>
                            <stat.icon size={20} />
                        </div>
                        <p className="text-3xl font-medium tracking-tight mb-1">{stat.value}</p>
                        <p className="text-xs text-black/50 font-medium uppercase tracking-wider">{stat.label} <span className="lowercase normal-case font-light text-black/40">({stat.unit})</span></p>
                    </div>
                ))}
            </div>
          </section>

        {/* Progress Snapshot Graph */}
        <section className="bg-white border border-black/5 rounded-3xl p-6 relative">
             <div className="flex justify-between items-center mb-6">
                <div>
                   <h2 className="text-lg font-medium">Activity Progress</h2>
                   <p className="text-xs text-black/50 font-light mt-1">Last 7 days of training</p>
                </div>
                <button className="text-sm font-medium text-black/60 hover:text-black flex items-center gap-1">Details <ArrowRight size={14}/></button>
            </div>
            {/* Simple CSS-based bar chart for now (Will use Recharts for full page) */}
            <div className="h-48 flex items-end justify-between gap-2 px-2 pb-2 mt-4 border-b border-black/5">
                {[40, 70, 45, 90, 60, 20, 85].map((height, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 group w-full relative">
                        {/* Hover Tooltip */}
                        <div className="absolute -top-8 bg-black text-white text-[10px] font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {height} mins
                        </div>
                        <div 
                            className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 ${height > 60 ? 'bg-[#1A3626]' : 'bg-[#1A3626]/20 group-hover:bg-[#1A3626]/40'}`} 
                            style={{ height: `${height}%` }}
                        ></div>
                        <span className="text-[10px] font-medium text-black/40 uppercase">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                        </span>
                    </div>
                ))}
            </div>
        </section>

        </div>

        {/* Right Column (Sidebar-ish) */}
        <div className="flex flex-col gap-8">
            
            {/* Upcoming Sessions */}
            <section className="bg-white border border-black/5 rounded-3xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-medium">Upcoming Live</h2>
                    <button className="p-2 border border-black/10 rounded-full hover:bg-black/5"><ArrowRight size={14}/></button>
                </div>

                <div className="flex flex-col gap-4">
                    {[
                        { title: "HIIT Core Blast", trainer: "Sarah Jenkins", time: "Today, 5:00 PM", type: "Live Class", color: "bg-red-50 text-red-600 border-red-100" },
                        { title: "Yoga Foundation", trainer: "Michael Chang", time: "Tomorrow, 8:00 AM", type: "1-on-1", color: "bg-blue-50 text-blue-600 border-blue-100" }
                    ].map((session, i) => (
                        <div key={i} className="p-4 rounded-2xl border border-black/5 hover:border-black/10 transition-colors group cursor-pointer">
                            <div className="flex justify-between items-start mb-3">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${session.color}`}>
                                    {session.type}
                                </span>
                                <span className="text-xs font-medium text-black/50">{session.time}</span>
                            </div>
                            <h3 className="font-medium text-sm mb-1 group-hover:text-[#1A3626] transition-colors">{session.title}</h3>
                            <p className="text-xs text-black/50 font-light flex items-center gap-1"><img src={`https://i.pravatar.cc/150?u=${i}`} className="w-4 h-4 rounded-full"/> with {session.trainer}</p>
                            
                            {i === 0 && (
                                <button className="w-full mt-4 py-2 border border-[#1A3626] text-[#1A3626] rounded-xl text-xs font-medium hover:bg-[#1A3626] hover:text-white transition-colors">
                                    Join Room
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Goal Progress Ring */}
            <section className="bg-[#1A3626] text-white rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <h2 className="text-lg font-medium mb-1">Weekly Goal</h2>
                <p className="text-xs text-white/60 font-light mb-6">4 workouts a week</p>

                <div className="flex items-center justify-center mb-6 relative">
                    <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-white/10" />
                        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="none" className="text-[#A2E07E] drop-shadow-[0_0_8px_rgba(162,224,126,0.5)]" strokeDasharray="351.8" strokeDashoffset={351.8 * (1 - 0.75)} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-medium tracking-tighter">75<span className="text-sm tracking-normal opacity-70">%</span></span>
                    </div>
                </div>

                <p className="text-center text-sm text-white/80 font-light">1 more session to reach your goal this week!</p>
            </section>

        </div>
      </div>
    </div>
  );
}

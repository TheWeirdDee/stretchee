"use client";
import { Bell, Search, Menu } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";

export function Header() {
    const { toggleSidebar, user, fetchUser, loading } = useAppStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Fetch user data via Axios and Supabase dynamically on mount
        if (!user) {
            fetchUser();
        }
    }, [fetchUser, user]);

    return (
        <header className="h-20 bg-white border-b border-black/5 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20">
            
            <div className="flex items-center gap-4 flex-1">
                {/* Mobile Menu Toggle */}
                <button 
                    onClick={toggleSidebar}
                    className="lg:hidden p-2 -ml-2 text-black/60 hover:text-black hover:bg-black/5 rounded-xl transition-colors"
                >
                    <Menu size={24} />
                </button>

                <div className="relative w-full max-w-md hidden sm:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 w-4 h-4" />
                    <input 
                        type="text" 
                        placeholder="Search workouts, programs or classes..." 
                        className="w-full bg-gray-50 border border-black/5 rounded-full py-2.5 pl-11 pr-4 text-sm font-light outline-none focus:bg-white focus:border-black/20 focus:ring-2 focus:ring-black/5 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-2 text-black/60 hover:text-black transition-colors rounded-full hover:bg-black/5">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-black/10">
                    <div className="text-right hidden sm:block">
                        {!isMounted || loading ? (
                             <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mb-1"></div>
                        ) : (
                             <p className="text-sm font-medium leading-none text-black">{user?.name || "Guest"}</p>
                        )}
                        <p className="text-xs font-light text-black/50 mt-1">{isMounted ? user?.plan || "Free" : "Free"} Member</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative border border-black/5">
                        <Image 
                            src={user?.avatar_url || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"} 
                            alt="User avatar" 
                            fill 
                            unoptimized
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

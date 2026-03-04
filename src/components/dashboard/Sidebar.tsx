"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { supabase } from "@/lib/supabase";
import { 
    Home, 
    Calendar, 
    Dumbbell, 
    PlaySquare, 
    TrendingUp, 
    CreditCard, 
    Settings, 
    MessageCircle, 
    Apple,
    X
} from "lucide-react";
import { useEffect } from "react";

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { sidebarOpen, toggleSidebar } = useAppStore();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/auth/signin');
    };

   
    useEffect(() => {
        if (sidebarOpen && window.innerWidth < 1024) {
            toggleSidebar();
        }
    }, [pathname]);

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: Home },
        { name: "My Classes", href: "/dashboard/bookings", icon: Calendar },
        { name: "Programs", href: "/dashboard/programs", icon: Dumbbell },
        { name: "Video Library", href: "/dashboard/videos", icon: PlaySquare },
        { name: "Progress", href: "/dashboard/progress", icon: TrendingUp },
        { name: "Chat", href: "/dashboard/chat", icon: MessageCircle },
        { name: "Nutrition", href: "/dashboard/nutrition", icon: Apple },
        { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ];

    return (
        <>
            
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={toggleSidebar}
                ></div>
            )}
  {/* Sidebar drawer */}
            <aside 
                className={`fixed lg:static inset-y-0 left-0 z-50 w-72 lg:w-64 bg-white border-r border-black/5 flex flex-col h-full overflow-y-auto transform transition-transform duration-300 ease-in-out ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                }`}
            >
                <div className="p-6 sticky top-0 bg-white z-10 border-b border-black/5 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="relative flex items-center justify-center w-8 h-8 rounded-full border border-black/10 bg-[#1A3626] text-white">
                            <span className="font-serif italic font-bold text-[1.4rem] leading-none tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>S</span>
                        </span>
                        <em><span className="relative right-2 text-xl font-medium tracking-tight text-black">tretchee</span></em>
                    </Link>

                    {/* Mobile Close Button */}
                    <button 
                        onClick={toggleSidebar}
                        className="lg:hidden p-2 -mr-2 text-black/40 hover:text-black transition-colors rounded-full hover:bg-black/5"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 p-4 flex flex-col gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link 
                                key={item.name} 
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                                    isActive 
                                        ? "bg-[#1A3626] text-white shadow-sm" 
                                        : "text-black/60 hover:text-black hover:bg-black/5"
                                }`}
                            >
                                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-black/5 text-sm bg-gray-50/50 mt-auto shrink-0">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 w-full transition-colors border border-transparent hover:border-red-100"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Log Out
                    </button>
                </div>
            </aside>
        </>
    );
}

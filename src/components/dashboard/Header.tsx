"use client";

import { Bell, Search, Menu, User, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useAppStore } from "@/store/useAppStore";

export function Header() {
  const {
    toggleSidebar,
    user,
    fetchUser,
    loading,
    notifications,
    fetchNotifications,
  } = useAppStore();

  const [showNotifications, setShowNotifications] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    fetchUser();
    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <header className="h-20 bg-white border-b border-black/5 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20">

      <div className="flex items-center gap-4 flex-1">
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
            autoComplete="off"
            className="w-full bg-gray-50 border border-black/5 rounded-full py-2.5 pl-11 pr-4 text-sm font-light outline-none focus:bg-white focus:border-black/20 focus:ring-2 focus:ring-black/5 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-black/60 hover:text-black transition-colors rounded-full hover:bg-black/5"
            >
              <Bell className="w-5 h-5" />

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-black/10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50 overflow-hidden transform origin-top-right transition-all">
                <div className="p-4 border-b border-black/5 flex justify-between items-center bg-gray-50/50">
                  <h3 className="font-medium text-sm">Notifications</h3>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && <span className="text-[10px] bg-[#1A3626] text-white px-2 py-1 rounded-full">{unreadCount} New</span>}
                    <button onClick={() => setShowNotifications(false)} className="text-black/40 hover:text-black transition-colors rounded-full p-1 hover:bg-black/5"><X size={16}/></button>
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto">
                    {notifications && notifications.length > 0 ? (
                        notifications.map(n => (
                            <div key={n.id} className={`p-4 border-b border-black/5 hover:bg-black/5 transition-colors cursor-pointer ${!n.is_read ? 'bg-blue-50/30' : ''}`}>
                                <h4 className={`text-sm ${!n.is_read ? 'font-medium' : 'text-black/80'}`}>{n.title}</h4>
                                <p className="text-xs text-black/60 mt-1">{n.message}</p>
                                <p className="text-[10px] text-black/40 mt-2">{new Date(n.created_at).toLocaleDateString()}</p>
                            </div>
                        ))
                    ) : (
                        <div className="py-10 text-center text-sm text-black/50 font-light flex flex-col items-center justify-center gap-2">
                            <Bell className="w-6 h-6 text-black/20" />
                            Nothing to show yet.
                        </div>
                    )}
                </div>
              </div>
            )}
        </div>

        <div className="flex items-center gap-3 pl-6 border-l border-black/10">
          <div className="text-right hidden sm:block">
            {!isMounted || loading ? (
              <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mb-1" />
            ) : (
              <p className="text-sm font-medium leading-none text-black">
                {user?.name || "Guest"}
              </p>
            )}

            <p className="text-xs font-light text-black/50 mt-1">
              {user?.plan || "Free"} Member
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden relative border border-black/10 flex items-center justify-center shrink-0">
            {isMounted && user?.avatar_url ? (
              <Image
                src={user.avatar_url}
                alt="User avatar"
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <span className="text-black/40 font-medium text-lg flex items-center justify-center">
                {isMounted && user?.name ? user.name.charAt(0).toUpperCase() : <User size={20} />}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
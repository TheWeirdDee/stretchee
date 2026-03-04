"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, Lock, Bell, User, Edit3, Heart, DownloadCloud } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import axios from "axios";

export default function Settings() {
    const [activeTab, setActiveTab] = useState('personal');
    const { user, loading } = useAppStore();
    const [isMounted, setIsMounted] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleDeleteAccount = async () => {
        if (!user?.id) return;
        
        const confirmed = window.confirm("Are you entirely sure? This action cannot be undone.");
        if (!confirmed) return;

        try {
            setIsDeleting(true);
            
            // Delete user securely from admin route
            await axios.delete('/api/user/delete', {
                data: { userId: user.id }
            });

            // Sign out locally
            await supabase.auth.signOut();
            
            alert("Account deleted successfully.");
            router.push('/');
        } catch (error) {
            console.error("Failed to delete account:", error);
            alert("Failed to delete account. You may need to assign SUPABASE_SERVICE_ROLE_KEY in .env.local.");
        } finally {
            setIsDeleting(false);
        }
    };

    const tabs = [
        { id: 'personal', label: 'Personal Info', icon: User },
        { id: 'goals', label: 'Fitness Goals', icon: Heart },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Privacy & Security', icon: Lock },
    ];

    return (
        <div className="p-8 pb-20 fade-in max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
            
            {/* Sidebar Tabs */}
            <div className="w-full md:w-64 shrink-0">
                <h1 className="text-3xl font-medium tracking-tight mb-8">Settings</h1>
                
                <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 hide-scrollbar">
                    {tabs.map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap text-left ${
                                activeTab === tab.id 
                                    ? "bg-[#1A3626] text-white" 
                                    : "text-black/60 hover:bg-black/5 hover:text-black"
                            }`}
                        >
                            <tab.icon size={18} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1">
                <div className="bg-white border text-black border-black/10 rounded-3xl p-8 shadow-sm">
                    
                    {activeTab === 'personal' && (
                        <div className="fade-in">
                            <h2 className="text-xl font-medium mb-6">Personal Information</h2>
                            
                            <div className="flex items-center gap-6 mb-8">
                                <div className="relative w-24 h-24 rounded-full bg-gray-200 border-2 border-white shadow-md overflow-hidden group cursor-pointer lg:shrink-0">
                                    <Image 
                                        src={user?.avatar_url || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"} 
                                        alt="Profile" 
                                        fill 
                                        unoptimized
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="text-white w-6 h-6" />
                                    </div>
                                </div>
                                <div>
                                    {!isMounted || loading ? (
                                        <div className="h-6 w-32 bg-gray-200 animate-pulse rounded mb-2"></div>
                                    ) : (
                                        <h3 className="font-medium text-lg">{user?.name || "Guest"}</h3>
                                    )}
                                    <p className="text-sm text-black/50 font-light mb-3">{isMounted ? user?.email || "No email provided" : "No email provided"}</p>
                                    <button className="text-xs font-semibold px-4 py-1.5 border border-black/20 rounded-full hover:bg-black/5 transition-colors">Change Avatar</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-black/60 px-1">Full Name</label>
                                    <input type="text" defaultValue={isMounted ? user?.name || "" : ""} placeholder="Your Name" className="w-full px-4 py-2.5 rounded-xl border border-black/10 outline-none focus:border-[#1A3626] focus:ring-1 focus:ring-[#1A3626] transition-all text-sm"/>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-black/60 px-1">Email Address</label>
                                    <input type="email" defaultValue={isMounted ? user?.email || "" : ""} placeholder="Your Email" className="w-full px-4 py-2.5 rounded-xl border border-black/10 outline-none focus:border-[#1A3626] focus:ring-1 focus:ring-[#1A3626] transition-all text-sm bg-gray-50"/>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-black/60 px-1">Age</label>
                                    <input type="number" defaultValue="28" className="w-full px-4 py-2.5 rounded-xl border border-black/10 outline-none focus:border-[#1A3626] focus:ring-1 focus:ring-[#1A3626] transition-all text-sm"/>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-black/60 px-1">Gender</label>
                                    <select className="w-full px-4 py-2.5 rounded-xl border border-black/10 outline-none focus:border-[#1A3626] focus:ring-1 focus:ring-[#1A3626] transition-all text-sm bg-white">
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Non-binary</option>
                                        <option>Prefer not to say</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-black/60 px-1">Height (cm)</label>
                                    <input type="number" defaultValue="180" className="w-full px-4 py-2.5 rounded-xl border border-black/10 outline-none focus:border-[#1A3626] focus:ring-1 focus:ring-[#1A3626] transition-all text-sm"/>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-black/60 px-1">Start Weight (lbs)</label>
                                    <input type="number" defaultValue="165" className="w-full px-4 py-2.5 rounded-xl border border-black/10 outline-none focus:border-[#1A3626] focus:ring-1 focus:ring-[#1A3626] transition-all text-sm bg-gray-50"/>
                                </div>
                            </div>

                            <button className="px-8 py-3 bg-[#1A3626] text-white rounded-xl text-sm font-medium hover:bg-[#12261a] transition-colors">
                                Save Changes
                            </button>
                        </div>
                    )}


                    {activeTab === 'privacy' && (
                        <div className="fade-in">
                            <h2 className="text-xl font-medium mb-6">Privacy & Security</h2>
                            
                            <div className="space-y-6 mb-8">
                                <div className="flex items-center justify-between py-4 border-b border-black/5">
                                    <div>
                                        <h3 className="font-medium text-sm mb-1">Public Profile</h3>
                                        <p className="text-xs text-black/50 font-light max-w-sm">Allow other community members to see your profile name and avatar.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1A3626]"></div>
                                    </label>
                                </div>
                                
                                <div className="flex items-center justify-between py-4 border-b border-black/5">
                                    <div>
                                        <h3 className="font-medium text-sm mb-1">Hide Weight Data</h3>
                                        <p className="text-xs text-black/50 font-light max-w-sm">Keep your exact weight and measurements private from trainers.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1A3626]"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between py-4 border-b border-black/5">
                                    <div>
                                        <h3 className="font-medium text-sm mb-1">Data Download</h3>
                                        <p className="text-xs text-black/50 font-light max-w-sm">Export all your personal data, progress history, and logs (GDPR).</p>
                                    </div>
                                    <button className="flex items-center gap-2 px-4 py-2 border border-black/20 rounded-full text-xs font-medium hover:bg-black/5 transition-colors">
                                        <DownloadCloud size={14} /> Export Data
                                    </button>
                                </div>
                            </div>
                            
                            <div className="mt-12 p-6 border border-red-200 bg-red-50 rounded-2xl">
                                <h3 className="font-medium text-red-600 mb-2">Danger Zone</h3>
                                <p className="text-xs text-red-600/70 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                                <button 
                                    onClick={handleDeleteAccount}
                                    disabled={isDeleting}
                                    className={`px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-medium transition-colors ${isDeleting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
                                >
                                    {isDeleting ? "Deleting..." : "Delete Account"}
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* Simplified placeholders for the other two tabs to save file size initially */}
                    {(activeTab === 'goals' || activeTab === 'notifications') && (
                        <div className="fade-in py-12 flex flex-col items-center justify-center text-center opacity-70">
                            <Edit3 size={32} className="mb-4 text-black/40" />
                            <h2 className="text-lg font-medium mb-2 capitalize">{activeTab} Settings</h2>
                            <p className="text-sm font-light max-w-md">Edit your preferences for {activeTab} down to the smallest detail. Module currently under construction.</p>
                        </div>
                    )}

                </div>
            </div>

        </div>
    );
}

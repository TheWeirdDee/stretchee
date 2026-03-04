"use client";

import { useState } from "react";
import { Send, Image as ImageIcon, Paperclip, MoreVertical, Phone, Video, Search, Mic, Download } from "lucide-react";
import Image from "next/image";

export default function ChatSystem() {
    const [message, setMessage] = useState("");

    const chats = [
        { id: 1, name: "Sarah Jenkins", role: "Trainer", lastMsg: "Great form on those squats today!", time: "10:42 AM", unread: 2, online: true, avatar: "https://i.pravatar.cc/150?u=sarah" },
        { id: 2, name: "Yoga Challenge Group", role: "Community", lastMsg: "Has anyone completed day 12 yet?", time: "Yesterday", unread: 0, online: false, avatar: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=150&auto=format&fit=crop" },
        { id: 3, name: "Platform Updates", role: "Admin", lastMsg: "New nutrition plans are now live!", time: "Mon", unread: 0, online: true, avatar: "https://ui-avatars.com/api/?name=S&background=1A3626&color=fff" },
    ];

    return (
        <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-gray-50 fade-in">
            {/* Sidebar List */}
            <div className="w-80 border-r border-black/5 flex flex-col bg-white shrink-0">
                <div className="p-4 border-b border-black/5">
                    <h2 className="text-xl font-medium tracking-tight mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30 w-4 h-4" />
                        <input 
                            type="text" 
                            placeholder="Search messages..." 
                            className="w-full bg-gray-50 border border-black/5 rounded-full py-2 pl-9 pr-4 text-sm font-light outline-none focus:border-black/20 focus:ring-1 focus:ring-black/10 transition-all"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2">
                    {chats.map((chat, i) => (
                        <div key={chat.id} className={`flex gap-3 p-3 rounded-2xl cursor-pointer transition-colors ${i === 0 ? 'bg-black/5' : 'hover:bg-black/5'}`}>
                            <div className="relative shrink-0">
                                <Image src={chat.avatar} alt={chat.name} width={48} height={48} className="rounded-full object-cover w-12 h-12" unoptimized />
                                {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="font-medium text-sm truncate pr-2">{chat.name}</h3>
                                    <span className="text-[10px] text-black/40 whitespace-nowrap">{chat.time}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className={`text-xs truncate pr-2 ${chat.unread > 0 ? 'font-medium text-black' : 'font-light text-black/50'}`}>
                                        {chat.lastMsg}
                                    </p>
                                    {chat.unread > 0 && (
                                        <div className="w-4 h-4 rounded-full bg-[#1A3626] text-white flex items-center justify-center text-[9px] font-bold">
                                            {chat.unread}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Active Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
                {/* Chat Header */}
                <div className="h-16 border-b border-black/5 flex items-center justify-between px-6 shrink-0 bg-white/50 backdrop-blur">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Image src="https://i.pravatar.cc/150?u=sarah" alt="Sarah" width={40} height={40} className="rounded-full object-cover" unoptimized/>
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                            <h2 className="font-medium text-sm">Sarah Jenkins</h2>
                            <p className="text-[10px] text-green-600 font-medium">Online</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-black/40 hover:text-black transition-colors rounded-full hover:bg-black/5"><Phone size={18} /></button>
                        <button className="p-2 text-black/40 hover:text-black transition-colors rounded-full hover:bg-black/5"><Video size={18} /></button>
                        <div className="w-px h-6 bg-black/10 mx-1"></div>
                        <button className="p-2 text-black/40 hover:text-black transition-colors rounded-full hover:bg-black/5"><MoreVertical size={18} /></button>
                    </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
                    <div className="flex justify-center">
                        <span className="text-[10px] font-medium text-black/40 bg-black/5 px-3 py-1 rounded-full uppercase tracking-wider">Today</span>
                    </div>

                    <div className="flex gap-4 max-w-2xl">
                        <Image src="https://i.pravatar.cc/150?u=sarah" alt="Sarah" width={32} height={32} className="rounded-full w-8 h-8 shrink-0 self-end" unoptimized/>
                        <div className="bg-white border border-black/5 p-4 rounded-2xl rounded-bl-sm shadow-sm text-sm font-light leading-relaxed">
                            Hey there! I saw you logged your weight this morning. Great progress! Let's focus on maintaining that core stability during the HIIT session later today.
                            <div className="text-[10px] text-black/40 mt-2 text-right">09:41 AM</div>
                        </div>
                    </div>

                    <div className="flex gap-4 max-w-2xl ml-auto justify-end">
                        <div className="bg-[#1A3626] text-white p-4 rounded-2xl rounded-br-sm shadow-sm text-sm font-light leading-relaxed">
                            Thanks Sarah! I've been really consistent with the nutrition plan. I'll make sure to double check my plank form before we start.
                            <div className="text-[10px] text-white/50 mt-2 text-right flex items-center justify-end gap-1">
                                09:45 AM
                                <svg className="w-3 h-3 text-[#A2E07E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 max-w-2xl">
                        <Image src="https://i.pravatar.cc/150?u=sarah" alt="Sarah" width={32} height={32} className="rounded-full w-8 h-8 shrink-0 self-end" unoptimized/>
                        <div className="bg-white border border-black/5 p-4 rounded-2xl rounded-bl-sm shadow-sm text-sm font-light leading-relaxed">
                            Awesome. Also, here is that PDF guide for the post-workout stretches we talked about.
                            
                            <div className="mt-3 flex items-center gap-3 p-3 bg-gray-50 border border-black/5 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                                <div className="w-10 h-10 bg-red-100 text-red-600 rounded flex items-center justify-center shrink-0">
                                    <span className="font-bold text-xs">PDF</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate text-black">Core_Recovery_Stretches.pdf</p>
                                    <p className="text-xs text-black/50">2.4 MB</p>
                                </div>
                                <Download size={16} className="text-black/40"/>
                            </div>

                            <div className="text-[10px] text-black/40 mt-2 text-right">10:42 AM</div>
                        </div>
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-black/5">
                    <div className="flex items-end gap-2 max-w-4xl mx-auto">
                        <div className="flex items-center gap-1 shrink-0 pb-2">
                            <button className="p-2 text-black/40 hover:text-black transition-colors rounded-full hover:bg-black/5"><Paperclip size={20} /></button>
                            <button className="p-2 text-black/40 hover:text-black transition-colors rounded-full hover:bg-black/5"><ImageIcon size={20} /></button>
                        </div>
                        
                        <div className="flex-1 bg-gray-50 border border-black/10 rounded-2xl relative">
                            <textarea 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..." 
                                className="w-full bg-transparent max-h-32 min-h-[44px] py-3 px-4 text-sm outline-none resize-none font-light"
                                rows={1}
                            />
                        </div>

                        <div className="flex items-center gap-2 shrink-0 pb-1">
                            {message.trim() ? (
                                <button className="w-10 h-10 bg-[#1A3626] text-white rounded-full flex items-center justify-center hover:bg-[#12261a] transition-all transform hover:scale-105 active:scale-95 shadow-md">
                                    <Send size={18} className="ml-0.5" />
                                </button>
                            ) : (
                                <button className="w-10 h-10 bg-gray-100 text-black/60 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                                    <Mic size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

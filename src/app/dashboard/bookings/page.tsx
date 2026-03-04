"use client";

import { useState } from "react";
import { CalendarIcon, Clock, User, List, Calendar as CalendarViewIcon, Video, CheckCircle2, XCircle } from "lucide-react";

export default function Bookings() {
    const [view, setView] = useState<'list' | 'calendar'>('list');

    const upcomingClasses = [
        { id: 1, title: "Morning Vinyasa Flow", date: "Oct 24, 2023", time: "08:00 AM - 08:45 AM", trainer: "Sarah Jenkins", status: "confirmed", type: "live" },
        { id: 2, title: "HIIT Core Blast", date: "Oct 25, 2023", time: "05:00 PM - 05:30 PM", trainer: "Michael Chang", status: "confirmed", type: "1-on-1" },
    ];

    const pastClasses = [
        { id: 3, title: "Restorative Yoga", date: "Oct 20, 2023", time: "07:00 PM", trainer: "Emma Watson", status: "completed" },
        { id: 4, title: "Upper Body Strength", date: "Oct 18, 2023", time: "06:30 AM", trainer: "David Miller", status: "cancelled" },
    ];

    return (
        <div className="p-8 pb-20 fade-in max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-medium tracking-tight mb-2">My Classes</h1>
                    <p className="text-black/60 font-light">Manage your schedule and live sessions.</p>
                </div>
                
                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full border border-black/5">
                    <button 
                        onClick={() => setView('list')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${view === 'list' ? 'bg-white shadow-sm' : 'text-black/50 hover:text-black'}`}
                    >
                        <List size={16} /> List
                    </button>
                    <button 
                        onClick={() => setView('calendar')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${view === 'calendar' ? 'bg-white shadow-sm' : 'text-black/50 hover:text-black'}`}
                    >
                        <CalendarViewIcon size={16} /> Calendar
                    </button>
                </div>
            </div>

            <h2 className="text-lg font-medium mb-4">Upcoming Classes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {upcomingClasses.map(cls => (
                    <div key={cls.id} className="bg-white border border-black/10 rounded-3xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start border-b border-black/5 pb-4 mb-4">
                            <div>
                                <span className={`inline-block px-3 py-1 bg-green-50 text-green-700 border border-green-100 text-[10px] font-bold uppercase tracking-wider rounded-full mb-3`}>
                                    {cls.type === 'live' ? 'Live Group' : '1-on-1 Coaching'}
                                </span>
                                <h3 className="text-xl font-medium">{cls.title}</h3>
                            </div>
                            <span className="text-xs px-2 py-1 bg-black/5 rounded-md text-black/60 font-medium">Confirmed</span>
                        </div>
                        
                        <div className="flex flex-col gap-3 mb-6">
                            <p className="text-sm text-black/70 flex items-center gap-3"><CalendarIcon size={16} className="text-black/40"/> {cls.date}</p>
                            <p className="text-sm text-black/70 flex items-center gap-3"><Clock size={16} className="text-black/40"/> {cls.time}</p>
                            <p className="text-sm text-black/70 flex items-center gap-3"><User size={16} className="text-black/40"/> with {cls.trainer}</p>
                        </div>
                        
                        <div className="flex gap-3">
                            <button className="flex-1 bg-[#1A3626] text-white py-2.5 rounded-full text-sm font-medium hover:bg-[#12261a] transition-colors flex justify-center items-center gap-2">
                                <Video size={16} /> Join Live
                            </button>
                            <button className="px-6 py-2.5 rounded-full text-sm font-medium border border-black/20 text-black/70 hover:bg-black/5 transition-colors">
                                Reschedule
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className="text-lg font-medium mb-4">Past Classes</h2>
            <div className="bg-white border border-black/10 rounded-3xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-black/5 text-xs uppercase tracking-wider text-black/50">
                            <th className="p-4 font-medium">Class</th>
                            <th className="p-4 font-medium">Date & Time</th>
                            <th className="p-4 font-medium">Trainer</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {pastClasses.map((cls, i) => (
                            <tr key={cls.id} className={i !== pastClasses.length - 1 ? "border-b border-black/5" : ""}>
                                <td className="p-4 font-medium">{cls.title}</td>
                                <td className="p-4 text-black/60">{cls.date} at {cls.time}</td>
                                <td className="p-4 text-black/60">{cls.trainer}</td>
                                <td className="p-4">
                                    {cls.status === 'completed' 
                                        ? <span className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-1 rounded inline-flex text-xs font-medium"><CheckCircle2 size={14}/> Completed</span>
                                        : <span className="flex items-center gap-1.5 text-black/40 bg-gray-100 px-2 py-1 rounded inline-flex text-xs font-medium"><XCircle size={14}/> Cancelled</span>
                                    }
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-[#1A3626] font-medium hover:underline">Rebook</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

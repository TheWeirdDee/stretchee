"use client";

import { useState } from "react";
import { Plus, Calculator, ArrowUpRight, ArrowDownRight, Activity, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function ProgressTracker() {
    const [period, setPeriod] = useState("1M");

    // Mock progress data
    const weightData = [
        { date: 'Oct 01', weight: 165 },
        { date: 'Oct 08', weight: 164.2 },
        { date: 'Oct 15', weight: 163.5 },
        { date: 'Oct 22', weight: 162.8 },
        { date: 'Oct 29', weight: 161.5 },
    ];

    const caloriesData = [
        { date: 'Mon', calories: 2400 },
        { date: 'Tue', calories: 2200 },
        { date: 'Wed', calories: 2600 },
        { date: 'Thu', calories: 2100 },
        { date: 'Fri', calories: 2300 },
        { date: 'Sat', calories: 2800 },
        { date: 'Sun', calories: 2500 },
    ];

    return (
        <div className="p-8 pb-20 fade-in max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-medium tracking-tight mb-2">Progress Tracker</h1>
                    <p className="text-black/60 font-light">Monitor your body metrics and workout history over time.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-black/10 rounded-full text-sm font-medium hover:bg-black/5 transition-colors">
                        <Calculator size={16} /> Update BMI
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1A3626] text-white rounded-full text-sm font-medium hover:bg-[#12261a] transition-colors shadow-lg">
                        <Plus size={16} /> Log Measurement
                    </button>
                </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { title: "Current Weight", value: "161.5", unit: "lbs", change: "-1.3 lbs", trend: 'down', target: "155 lbs" },
                    { title: "Body Fat", value: "18.5", unit: "%", change: "-0.5%", trend: 'down', target: "15%" },
                    { title: "Muscle Mass", value: "65.2", unit: "lbs", change: "+0.8 lbs", trend: 'up', target: "70 lbs" },
                    { title: "Avg Daily Burn", value: "2,400", unit: "kcal", change: "+120 kcal", trend: 'up', target: "2,500 kcal" },
                ].map((metric, i) => (
                    <div key={i} className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm relative overflow-hidden group">
                         {/* Subtle background decoration */}
                         <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl opacity-10 ${metric.trend === 'up' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                         
                        <h3 className="text-sm text-black/60 font-medium mb-1">{metric.title}</h3>
                        <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-3xl font-bold tracking-tight">{metric.value}</span>
                            <span className="text-sm text-black/50 font-medium">{metric.unit}</span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5">
                            <div className={`flex items-center gap-1 text-xs font-bold ${metric.trend === 'up' ? 'text-green-600' : 'text-blue-600'}`}>
                                {metric.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {metric.change}
                            </div>
                            <span className="text-xs text-black/40 font-medium">Target: {metric.target}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Weight Chart */}
                <div className="lg:col-span-2 bg-white border border-black/5 rounded-3xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-medium">Weight Journey</h2>
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                            {["1W", "1M", "3M", "1Y"].map(p => (
                                <button 
                                    key={p}
                                    onClick={() => setPeriod(p)}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${period === p ? "bg-white shadow text-black" : "text-black/50 hover:text-black"}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={weightData}>
                                <defs>
                                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#1A3626" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#1A3626" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} dy={10} />
                                <YAxis domain={['dataMin - 2', 'dataMax + 2']} axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} dx={-10} />
                                <RechartsTooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => [`${value} lbs`, 'Weight']}
                                />
                                <Area type="monotone" dataKey="weight" stroke="#1A3626" strokeWidth={3} fillOpacity={1} fill="url(#colorWeight)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Calorie Tracking */}
                <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-medium">Cals Burned</h2>
                        <Activity className="text-black/40 w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 w-full min-h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={caloriesData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 10}} dy={10} />
                                <RechartsTooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => [`${value} kcal`, 'Burned']}
                                />
                                <Line type="monotone" dataKey="calories" stroke="#FF6B6B" strokeWidth={3} dot={{r: 4, fill: '#FF6B6B', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-4 pt-4 border-t border-black/5">
                        <p className="text-center text-sm font-medium text-black/60 tracking-tight">Avg this week: <span className="text-black text-lg">2,414 kcal</span></p>
                    </div>
                </div>
            </div>

            {/* Body Measurements History */}
            <div className="mt-8 bg-white border border-black/5 rounded-3xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-medium">Measurement History</h2>
                    <button className="text-sm font-medium text-[#1A3626] hover:underline">View All</button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-max">
                        <thead>
                            <tr className="bg-gray-50 border-b border-black/5 text-xs uppercase tracking-wider text-black/50">
                                <th className="p-4 rounded-tl-xl font-medium">Date</th>
                                <th className="p-4 font-medium">Weight</th>
                                <th className="p-4 font-medium">Waist</th>
                                <th className="p-4 font-medium">Chest</th>
                                <th className="p-4 font-medium">Arms</th>
                                <th className="p-4 rounded-tr-xl font-medium">Body Fat %</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {[
                                { date: 'Oct 29, 2023', weight: '161.5 lbs', waist: '32"', chest: '41"', arms: '14.5"', fat: '18.5%' },
                                { date: 'Oct 01, 2023', weight: '165.0 lbs', waist: '33"', chest: '40.5"', arms: '14"', fat: '19.8%' },
                                { date: 'Sep 01, 2023', weight: '168.2 lbs', waist: '34"', chest: '40"', arms: '13.5"', fat: '21.0%' },
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-black/5 last:border-0 hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 text-black/70 flex items-center gap-2"><Calendar size={14} className="text-black/40"/> {row.date}</td>
                                    <td className="p-4 font-medium">{row.weight}</td>
                                    <td className="p-4">{row.waist}</td>
                                    <td className="p-4">{row.chest}</td>
                                    <td className="p-4">{row.arms}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-bold">{row.fat}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

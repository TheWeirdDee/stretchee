"use client";

import { useState } from "react";
import { Plus, Search, ChevronLeft, ChevronRight, Apple, Info, Droplet } from "lucide-react";

export default function NutritionPlanner() {
    const [activeDate, setActiveDate] = useState("Today");

    const meals = [
        { 
            type: "Breakfast", 
            target: 450, 
            logged: 420, 
            items: [
                { name: "Oatmeal with Berries", cals: 320, p: "12g", c: "54g", f: "6g" },
                { name: "Black Coffee", cals: 5, p: "0g", c: "1g", f: "0g" },
                { name: "Boiled Egg", cals: 95, p: "8g", c: "1g", f: "7g" }
            ]
        },
        { 
            type: "Lunch", 
            target: 650, 
            logged: 0, 
            items: []
        },
        { 
            type: "Dinner", 
            target: 800, 
            logged: 0, 
            items: []
        },
        { 
            type: "Snacks", 
            target: 300, 
            logged: 150, 
            items: [
                { name: "Protein Shake", cals: 150, p: "25g", c: "4g", f: "2g" }
            ]
        }
    ];

    return (
        <div className="p-8 pb-20 fade-in max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-medium tracking-tight mb-2">Nutrition Planner</h1>
                    <p className="text-black/60 font-light">Track macros and log your daily meals effectively.</p>
                </div>
                
                <div className="flex items-center justify-between md:justify-end gap-4 bg-white border border-black/10 px-2 py-1.5 rounded-full shadow-sm w-full md:w-auto">
                    <button className="p-2 hover:bg-black/5 rounded-full transition-colors text-black/40 hover:text-black"><ChevronLeft size={18} /></button>
                    <span className="text-sm font-medium w-32 text-center text-black">Today</span>
                    <button className="p-2 hover:bg-black/5 rounded-full transition-colors text-black/40 hover:text-black"><ChevronRight size={18} /></button>
                </div>
            </div>

            {/* Daily Summary Rings */}
            <div className="bg-white border border-black/10 rounded-3xl p-8 mb-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    
                    {/* Calories Ring */}
                    <div className="flex flex-col items-center justify-center relative">
                        <h3 className="text-sm font-medium text-black/60 mb-4 absolute top-0 text-center w-full">Calories Remaining</h3>
                        <div className="relative flex items-center justify-center mt-6">
                            <svg className="w-40 h-40 transform -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="none" className="text-gray-100" />
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="none" className="text-[#1A3626]" strokeDasharray="439.8" strokeDashoffset={439.8 * (1 - (570/2200))} strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center mt-2">
                                <span className="text-3xl font-bold tracking-tighter">1,630</span>
                                <span className="text-xs text-black/50 font-medium uppercase tracking-wider">Kcal Left</span>
                            </div>
                        </div>
                        <div className="w-full flex justify-between text-xs text-black/40 font-medium mt-4 px-4">
                            <span>Goal: 2,200</span>
                            <span>Eaten: 570</span>
                        </div>
                    </div>

                    {/* Macros */}
                    <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 md:pt-0">
                        {/* Protein */}
                        <div className="bg-gray-50 rounded-2xl p-5 border border-black/5">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-black/70">Protein</span>
                                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">45g / 150g</span>
                            </div>
                            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden mb-1">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                            <p className="text-[10px] text-black/40 font-medium">105g remaining</p>
                        </div>
                        
                        {/* Carbs */}
                        <div className="bg-gray-50 rounded-2xl p-5 border border-black/5">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-black/70">Carbs</span>
                                <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">59g / 220g</span>
                            </div>
                            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden mb-1">
                                <div className="h-full bg-orange-500 rounded-full" style={{ width: '26%' }}></div>
                            </div>
                            <p className="text-[10px] text-black/40 font-medium">161g remaining</p>
                        </div>

                        {/* Fat */}
                        <div className="bg-gray-50 rounded-2xl p-5 border border-black/5">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-black/70">Fat</span>
                                <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded">15g / 70g</span>
                            </div>
                            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden mb-1">
                                <div className="h-full bg-yellow-400 rounded-full" style={{ width: '21%' }}></div>
                            </div>
                            <p className="text-[10px] text-black/40 font-medium">55g remaining</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Meal Logging Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {meals.map((meal, index) => (
                    <div key={index} className="bg-white border border-black/10 rounded-3xl p-6 shadow-sm flex flex-col">
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-black/5">
                            <h2 className="text-lg font-medium flex items-center gap-2">
                                {meal.type}
                                {meal.logged >= meal.target && <span className="w-2 h-2 rounded-full bg-green-500 mt-1"></span>}
                            </h2>
                            <span className="text-sm font-medium text-black/50">{meal.logged} / {meal.target} kcal</span>
                        </div>

                        {meal.items.length > 0 ? (
                            <div className="space-y-3 mb-6 flex-1">
                                {meal.items.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center border border-black/5 rounded-xl p-3 bg-gray-50">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-black/80">{item.name}</span>
                                            <span className="text-[10px] uppercase font-bold text-black/40 mt-0.5 tracking-wider">P:{item.p} C:{item.c} F:{item.f}</span>
                                        </div>
                                        <span className="text-sm font-bold">{item.cals} kcal</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center py-8 text-black/30">
                                <Apple size={32} className="mb-2 opacity-50"/>
                                <p className="text-sm font-light">No food logged yet</p>
                            </div>
                        )}

                        <button className="w-full mt-auto py-3 bg-white border border-[#1A3626] text-[#1A3626] border-dashed rounded-xl text-sm font-medium hover:bg-[#1A3626] hover:text-white transition-colors flex justify-center items-center gap-2">
                            <Plus size={16} /> Add Food
                        </button>
                    </div>
                ))}
            </div>

            {/* Daily Water & Info */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Water Logger */}
                <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-1">Water Intake</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-blue-600 tracking-tight">32</span>
                            <span className="text-sm font-medium text-blue-400">/ 80 oz</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="w-12 h-12 bg-white rounded-xl shadow-sm border border-blue-100 flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors">
                            <Plus size={20} />
                        </button>
                    </div>
                </div>

                {/* Info Card */}
                <div className="lg:col-span-2 bg-[#1A3626] text-white rounded-3xl p-6 flex items-start gap-4">
                    <Info size={24} className="text-[#A2E07E] shrink-0 mt-1" />
                    <div>
                        <h3 className="font-medium mb-1">Tip of the day</h3>
                        <p className="text-sm text-white/70 font-light leading-relaxed">Eating protein within 30 minutes after your workout can significantly improve muscle recovery. Consider logging your post-workout shake in the snacks section to keep your macros balanced.</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { Check, CreditCard, Download, FileText, Zap } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

export default function Billing() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const { user, loading } = useAppStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const plans = [
        {
            name: "Free",
            price: "0",
            description: "Perfect for getting started",
            features: ["3 Beginner Programs", "Limited Video Library", "Basic Progress Tracking"],
            current: isMounted ? user?.plan === "Free" : false,
        },
        {
            name: "Basic",
            price: billingCycle === 'monthly' ? "15" : "144",
            description: "For consistent practitioners",
            features: ["All Beginner & Intermediate Programs", "Full Video Library", "Advanced Progress Tracking", "Community Access"],
            current: isMounted ? user?.plan === "Basic" : false,
        },
        {
            name: "Pro",
            price: billingCycle === 'monthly' ? "29" : "279",
            description: "Our most popular plan",
            features: ["Everything in Basic", "Advanced Programs", "Up to 5 Live Classes/mo", "Direct Trainer Chat", "Nutrition Planner"],
            current: isMounted ? user?.plan === "Pro" : false,
            popular: true,
        },
        {
            name: "Premium",
            price: billingCycle === 'monthly' ? "99" : "950",
            description: "1-on-1 personalized coaching",
            features: ["Everything in Pro", "Unlimited Live Classes", "Weekly 1-on-1 Sessions", "Custom Daily Routine", "Priority Support"],
            current: isMounted ? user?.plan === "Premium" : false,
        }
    ];

    const invoices = [
        { id: "INV-2023-010", date: "Oct 01, 2023", amount: "$29.00", status: "Paid" },
        { id: "INV-2023-009", date: "Sep 01, 2023", amount: "$29.00", status: "Paid" },
        { id: "INV-2023-008", date: "Aug 01, 2023", amount: "$29.00", status: "Paid" },
    ];

    return (
        <div className="p-8 pb-20 fade-in max-w-6xl mx-auto">
            <h1 className="text-3xl font-medium tracking-tight mb-2">Subscription & Billing</h1>
            <p className="text-black/60 font-light mb-8">Manage your plan, billing cycle, and payment methods.</p>

            {/* Current Plan Card */}
            <div className="bg-white border text-black border-black/10 rounded-3xl p-8 mb-12 shadow-sm relative overflow-hidden">
                 <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-green-50 to-transparent pointer-events-none"></div>
                <h2 className="text-lg font-medium mb-1">Your Current Plan</h2>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-baseline gap-2 mb-2 mt-4">
                            {!isMounted || loading ? (
                                <div className="h-10 w-40 bg-gray-200 animate-pulse rounded"></div>
                            ) : (
                                <span className="text-4xl font-bold tracking-tighter">{user?.plan || "Free"} Plan</span>
                            )}
                            <span className="text-black/60 font-medium">/ monthly</span>
                        </div>
                        <p className="text-sm text-black/60 font-light">Your plan renews on <strong className="font-semibold text-black">Nov 01, 2023</strong>.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-3 border border-black/20 rounded-xl text-sm font-medium text-black hover:bg-black/5 transition-colors">
                            Pause Subscription
                        </button>
                        <button className="px-6 py-3 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl text-sm font-medium transition-colors">
                            Cancel Plan
                        </button>
                    </div>
                </div>
            </div>

            {/* Plan Upgrades */}
            <div className="mb-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-xl font-medium">Available Plans</h2>
                    
                    {/* Toggle */}
                    <div className="flex bg-gray-100 p-1 rounded-full border border-black/5">
                        <button 
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${billingCycle === 'monthly' ? 'bg-white shadow-sm' : 'text-black/50 hover:text-black'}`}
                        >
                            Monthly
                        </button>
                        <button 
                            onClick={() => setBillingCycle('yearly')}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white shadow-sm' : 'text-black/50 hover:text-black'}`}
                        >
                            Yearly <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">Save 20%</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan, i) => (
                        <div key={i} className={`relative bg-white border rounded-3xl p-6 flex flex-col ${plan.popular ? 'border-[#1A3626] shadow-md scale-[1.02] transform' : 'border-black/10'}`}>
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1A3626] text-white text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                    <Zap size={12} fill="currentColor"/> Most Popular
                                </div>
                            )}
                            
                            <h3 className="text-xl font-medium mb-1">{plan.name}</h3>
                            <p className="text-xs text-black/50 font-light mb-6 h-8">{plan.description}</p>
                            
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-sm font-bold opacity-60">$</span>
                                <span className="text-4xl font-bold tracking-tighter">{plan.price}</span>
                                <span className="text-sm font-medium text-black/50">/mo</span>
                            </div>

                            <button className={`w-full py-3 rounded-xl text-sm font-medium mb-8 transition-colors ${plan.current ? 'bg-gray-100 text-black/50 cursor-pointer pointer-events-none' : plan.popular ? 'bg-[#1A3626] text-white hover:bg-[#12261a]' : 'bg-transparent border border-black/20 hover:bg-black/5'}`}>
                                {plan.current ? 'Current Plan' : 'Upgrade'}
                            </button>

                            <div className="space-y-3 mt-auto">
                                {plan.features.map((feat, j) => (
                                    <div key={j} className="flex items-start gap-3">
                                        <div className="mt-0.5 w-4 h-4 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                                            <Check size={10} strokeWidth={3}/>
                                        </div>
                                        <span className="text-sm font-light leading-snug">{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Method & Invoices */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Payment Method */}
                <div className="bg-white border border-black/10 rounded-3xl p-8">
                    <h2 className="text-lg font-medium mb-6">Payment Method</h2>
                    
                    <div className="flex items-center justify-between p-4 border border-black/10 rounded-2xl mb-4 bg-gray-50/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-8 bg-black/5 rounded flex items-center justify-center border border-black/10">
                                <CreditCard size={20} className="text-black/60" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Mastercard ending in 4242</p>
                                <p className="text-xs text-black/50">Expires 12/26</p>
                            </div>
                        </div>
                        <span className="text-xs font-bold text-black/40 bg-black/5 px-2 py-1 rounded">Default</span>
                    </div>

                    <button className="text-[#1A3626] text-sm font-medium hover:underline">+ Add New Payment Method</button>
                </div>

                {/* Billing History */}
                <div className="bg-white border border-black/10 rounded-3xl p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-medium">Billing History</h2>
                        <button className="text-black/50 hover:text-black">
                            <Download size={18} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {invoices.map((inv, i) => (
                            <div key={i} className="flex items-center justify-between pb-4 border-b border-black/5 last:border-0 last:pb-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-black/60">
                                        <FileText size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{inv.amount} - Pro Plan</p>
                                        <p className="text-xs text-black/50">{inv.date} • {inv.id}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded">
                                    {inv.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

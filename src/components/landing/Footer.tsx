import React from "react";
import Link from "next/link";
import { Twitter, Send, Facebook, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-[#F9F9F9] text-black pt-20 pb-8 px-6 md:px-12 lg:px-16">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
 
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8">
 
                    <div className="flex flex-col gap-8 lg:w-1/4">
                        <div className="flex items-center gap-2">
                            <span className="relative flex items-center justify-center w-8 h-8 rounded-full border border-black/10 bg-[#1A3626] text-white">
                                <span className="font-serif italic font-bold text-[1.4rem] leading-none tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>S</span>
                            </span>
                             <em><span className="relative right-2 text-xl md:text-2xl font-medium tracking-tight">
                                tretchee
                            </span></em>
                        </div>
                        <div className="flex gap-3">
                            <a href="#" className="w-10 h-10 rounded-full border-2 border-[#1A3626] flex items-center justify-center hover:bg-black/5 transition-colors">
                                <Twitter size={18} strokeWidth={1.5} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border-2 border-[#1A3626] flex items-center justify-center hover:bg-black/5 transition-colors">
                                <Send size={18} strokeWidth={1.5} className="-ml-0.5 mt-0.5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border-2 border-[#1A3626] flex items-center justify-center hover:bg-black/5 transition-colors">
                                <Facebook size={18} strokeWidth={1.5} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border-2 border-[#1A3626] flex items-center justify-center hover:bg-black/5 transition-colors font-[#1A3626]">
                                <Instagram size={18} strokeWidth={1.5} />
                            </a>
                        </div>
                    </div>
 
                    <div className="flex flex-col gap-8 lg:w-[35%]">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm opacity-60 font-light">Have a question or feedback? Reach out below</span>
                            <a href="mailto:support@stretchee.com" className="text-xl font-medium hover:opacity-70 transition-opacity w-max">
                                support@stretchee.com
                            </a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm opacity-60 font-light">Give us a call</span>
                            <a href="tel:+1234567890" className="text-xl font-medium hover:opacity-70 transition-opacity w-max">
                                +1 234 567 890
                            </a>
                        </div>
                    </div>
 
                    <div className="flex gap-16 sm:gap-24 lg:w-[40%] lg:justify-end">
                        <div className="flex flex-col gap-4">
                            <span className="text-lg font-medium mb-2">Resources</span>
                            <Link href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity font-light">Wellness Tips</Link>
                            <Link href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity font-light">Yoga Dictionary</Link>
                            <Link href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity font-light">Guided Challenges</Link>
                            <Link href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity font-light">Meditation Techniques</Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className="text-lg font-medium mb-2">Support</span>
                            <Link href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity font-light">FAQs</Link>
                            <Link href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity font-light">Contact Us</Link>
                            <Link href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity font-light">Help Center</Link>
                            <Link href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity font-light">Testimonials</Link>
                        </div>
                    </div>

                </div>
 
                <div className="flex flex-wrap gap-6 text-sm opacity-70 font-light mt-8">
                    <Link href="#" className="hover:opacity-100 transition-opacity">Home</Link>
                    <Link href="#" className="hover:opacity-100 transition-opacity">About Us</Link>
                    <Link href="#" className="hover:opacity-100 transition-opacity">Classes</Link>
                    <Link href="#" className="hover:opacity-100 transition-opacity">Programs</Link>
                    <Link href="#" className="hover:opacity-100 transition-opacity">Community</Link>
                </div>

                <div className="w-full h-px bg-black/10"></div>

                <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 text-xs opacity-60 font-light">
                    <span>Copyright 2024, All Right Reserved</span>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:opacity-100 transition-opacity">Privacy & Policy</Link>
                        <Link href="#" className="hover:opacity-100 transition-opacity">Terms & Conditions</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}

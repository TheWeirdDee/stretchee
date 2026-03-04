"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!agreed) {
            setError("You must agree to the Terms and Privacy Policy.");
            return;
        }

        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                }
            }
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setSuccess("Account created successfully! Redirecting...");
            setTimeout(() => {
                router.push('/dashboard');
            }, 1500);
        }
    };

    return (
        <div className="flex min-h-screen bg-white">
            <div className="flex-1 flex flex-col px-8 md:px-16 lg:px-24 xl:px-32 py-10 relative z-10 border-r border-black/5">
                <div className="flex justify-between items-center w-full mb-auto absolute top-10 left-0 px-8 md:px-16 lg:px-24 xl:px-32">
                    <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity text-black">
                        <span className="w-8 h-8 rounded-full border border-black flex items-center justify-center text-black">
                            <ArrowLeft size={16} />
                        </span>
                        Back to Home
                    </Link>

                    <Link href="/" className="flex items-center gap-2">
                        <span className="relative flex items-center justify-center w-8 h-8 rounded-full border border-black bg-[#1A3626] text-white">
                            <span className="font-serif italic font-bold text-[1.4rem] leading-none tracking-tighter" style={{ fontFamily: 'Georgia, serif' }}>S</span>
                        </span>
                        <em><span className="relative right-2 text-xl font-medium tracking-tight text-black">tretchee</span></em>
                    </Link>
                </div>

                <div className="flex flex-col justify-center w-full max-w-md mx-auto my-auto mt-32 text-black">
                    <h1 className="text-3xl font-medium tracking-tight mb-2 text-center md:text-left">Create your account</h1>
                    <p className="text-sm opacity-60 mb-8 font-light text-center md:text-left">Let's get started with your 14 days free trial.</p>

                    <button className="w-full flex items-center justify-center gap-3 py-3 rounded-full border border-black/10 hover:bg-black/5 transition-colors mb-6 text-sm font-medium">
                        <Image src="/images/LandingPageImages/google.svg" width={20} height={20} alt="Google logo" className="w-5 h-5 object-contain" />
                        Sign up with Google
                    </button>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px bg-black/10 flex-1"></div>
                        <span className="text-xs opacity-50 font-light">or</span>
                        <div className="h-px bg-black/10 flex-1"></div>
                    </div>

                    <form className="flex flex-col gap-5" onSubmit={handleSignUp}>
                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="p-3 bg-green-50 text-green-600 text-sm rounded-lg border border-green-100">
                                {success}
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium ml-1">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-5 py-3.5 rounded-2xl border border-black/10 bg-transparent text-sm outline-none focus:border-black/30 focus:ring-1 focus:ring-black/30 placeholder:text-black/30 transition-all font-light"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium ml-1">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-5 py-3.5 rounded-2xl border border-black/10 bg-transparent text-sm outline-none focus:border-black/30 focus:ring-1 focus:ring-black/30 placeholder:text-black/30 transition-all font-light"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-5 py-3.5 pr-12 rounded-2xl border border-black/10 bg-transparent text-sm outline-none focus:border-black/30 focus:ring-1 focus:ring-black/30 placeholder:text-black/30 transition-all font-light"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-black/50 hover:text-black transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center justify-center">
                                    <input 
                                        type="checkbox" 
                                        checked={agreed}
                                        onChange={(e) => setAgreed(e.target.checked)}
                                        className="peer appearance-none w-5 h-5 border border-black/20 rounded-md checked:bg-[#1A3626] checked:border-[#1A3626] transition-colors cursor-pointer" 
                                    />
                                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-sm opacity-80 font-light group-hover:opacity-100 transition-opacity">I agree to all Term, Privacy Policy and Fees</span>
                            </label>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`w-full bg-[#1A3626] text-white py-4 rounded-full text-sm font-medium mt-2 transition-colors relative group overflow-hidden ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#12261a]'}`}
                        >
                            <span className="relative z-10">{loading ? "Signing up..." : "Sign Up"}</span>
                            {!loading && <div className="absolute inset-0 bg-black/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm font-light">
                        Already have an account? <Link href="/auth/signin" className="font-medium hover:underline decoration-black/30 underline-offset-4">Log in</Link>
                    </div>
                </div>

            </div>

            <div className="hidden lg:flex w-1/2 p-6 lg:p-0 relative sticky top-0 bg-white">
                <div className="relative w-full h-full overflow-hidden">
                    <Image
                        src="/images/SignUpInn.jpg"
                        alt="Meditation program"
                        fill
                        unoptimized={true}
                        className="object-cover object-center"
                    />
 
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    {/* Image Internal Content */}
                    <div className="absolute bottom-16 left-12 right-12 z-20 text-white">
                        <h2 className="text-3xl font-medium mb-4 leading-tight tracking-tight">Begin Your Wellness Journey</h2>
                        <p className="text-sm opacity-80 font-light leading-relaxed mb-8 max-w-md">Discover the perfect harmony of mind and body through our guided yoga practices and supportive community.</p>
                        
                        <div className="flex gap-4 text-xs font-medium">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 backdrop-blur-md bg-white/10">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                14-Days Trial
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 backdrop-blur-md bg-white/10">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Full Access
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

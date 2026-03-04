"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Camera, Lock, Bell, User, Heart, DownloadCloud } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import axios from "axios";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("personal");
  const { user, loading } = useAppStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: "",
    notifications_enabled: true,
  });

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsMounted(true);

    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        age: user.age || "",
        gender: user.gender || "",
        height: user.height || "",
        weight: user.weight || "",
        goal: user.goal || "",
        notifications_enabled: user.notifications_enabled ?? true,
      });
    }
  }, [user]);

  // --------------------- Handlers ---------------------

  const handleDeleteAccount = async () => {
    if (!user?.id) return;
    const confirmed = window.confirm(
      "Are you entirely sure? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      setIsDeleting(true);

      await axios.delete("/api/user/delete", { data: { userId: user.id } });

      await supabase.auth.signOut();
      alert("Account deleted successfully.");
      router.push("/");
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert(
        "Failed to delete account. Ensure SUPABASE_SERVICE_ROLE_KEY is set in .env.local."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user?.id) return;
    setIsSaving(true);

    try {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ full_name: formData.name })
        .eq("id", user.id);
      if (profileError) throw profileError;

      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: formData.name,
          goal: formData.goal,
          age: formData.age,
          gender: formData.gender,
          height: formData.height,
          start_weight: formData.weight,
          notifications_enabled: formData.notifications_enabled,
        },
      });
      if (authError) throw authError;

      alert("Settings saved successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Failed to save settings:", error);
      alert("Failed to save settings. Ensure inputs are valid.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    try {
      setIsSaving(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `avatar-${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: publicData } = supabase
        .storage
        .from("avatars")
        .getPublicUrl(filePath);
      const publicUrl = publicData.publicUrl;

      const { error: profileError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);
      if (profileError) throw profileError;

      const { error: authError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      });
      if (authError) throw authError;

      alert("Avatar updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Avatar upload failed:", error);
      alert(
        "Failed to upload avatar. Ensure your 'avatars' bucket exists and RLS allows insert."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // --------------------- Tabs ---------------------
  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "goals", label: "Fitness Goals", icon: Heart },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Lock },
  ];

  return (
    <div className="p-8 pb-20 fade-in max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
      {/* Sidebar Tabs */}
      <div className="w-full md:w-64 shrink-0">
        <h1 className="text-3xl font-medium tracking-tight mb-8">Settings</h1>

        <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 hide-scrollbar">
          {tabs.map((tab) => (
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
          {/* ------------------ Personal Info ------------------ */}
          {activeTab === "personal" && (
            <div className="fade-in">
              <h2 className="text-xl font-medium mb-6">Personal Information</h2>

              {/* Avatar */}
              <div className="flex items-center gap-6 mb-8">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative w-24 h-24 rounded-full bg-gray-100 border-2 border-white shadow-md overflow-hidden group cursor-pointer lg:shrink-0 flex items-center justify-center"
                >
                  {/* Static SSR placeholder */}
                  <span className="text-black/40 font-medium text-3xl flex items-center justify-center">
                    <User size={40} />
                  </span>

                  {/* Client-only content */}
                  {isMounted && (
                    <>
                      {user?.avatar_url ? (
                        <Image
                          src={user.avatar_url}
                          alt="Profile"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : user?.name ? (
                        <span className="text-black/40 font-medium text-3xl flex items-center justify-center">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      ) : null}
                    </>
                  )}

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
                  <p className="text-sm text-black/50 font-light mb-3">
                    {isMounted ? user?.email || "No email provided" : "No email provided"}
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleAvatarUpload}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-semibold px-4 py-1.5 border border-black/20 rounded-full hover:bg-black/5 transition-colors"
                  >
                    Change Avatar
                  </button>
                </div>
              </div>

              {/* Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-black/60 px-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 outline-none focus:border-[#1A3626] focus:ring-1 focus:ring-[#1A3626] transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-black/60 px-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    placeholder="Your Email"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 outline-none focus:border-[#1A3626] focus:ring-1 focus:ring-[#1A3626] transition-all text-sm bg-gray-50 opacity-50 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-black/60 px-1">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="Enter age"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 outline-none focus:border-[#1A3626] focus:ring-1 focus:ring-[#1A3626] transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-black/60 px-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 outline-none focus:border-[#1A3626] focus:ring-1 focus:ring-[#1A3626] transition-all text-sm bg-white"
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-black/60 px-1">Height (cm)</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    placeholder="Enter height"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 outline-none focus:border-[#1A3626] focus:ring-1 focus:ring-[#1A3626] transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-black/60 px-1">Start Weight (kg)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="Enter weight"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/10 outline-none focus:border-[#1A3626] focus:ring-1 focus:ring-[#1A3626] transition-all text-sm bg-gray-50"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className={`px-8 py-3 bg-[#1A3626] text-white rounded-xl text-sm font-medium transition-colors ${
                  isSaving ? "opacity-70 cursor-not-allowed" : "hover:bg-[#12261a]"
                }`}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}

          {/* ------------------ Privacy ------------------ */}
          {activeTab === "privacy" && (
            <div className="fade-in">
              <h2 className="text-xl font-medium mb-6">Privacy & Security</h2>
              <div className="space-y-6 mb-8">
                {/* Public Profile */}
                <div className="flex items-center justify-between py-4 border-b border-black/5">
                  <div>
                    <h3 className="font-medium text-sm mb-1">Public Profile</h3>
                    <p className="text-xs text-black/50 font-light max-w-sm">
                      Allow other community members to see your profile name and avatar.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1A3626]"></div>
                  </label>
                </div>
                {/* Hide Weight */}
                <div className="flex items-center justify-between py-4 border-b border-black/5">
                  <div>
                    <h3 className="font-medium text-sm mb-1">Hide Weight Data</h3>
                    <p className="text-xs text-black/50 font-light max-w-sm">
                      Keep your exact weight and measurements private from trainers.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1A3626]"></div>
                  </label>
                </div>
                {/* Export Data */}
                <div className="flex items-center justify-between py-4 border-b border-black/5">
                  <div>
                    <h3 className="font-medium text-sm mb-1">Data Download</h3>
                    <p className="text-xs text-black/50 font-light max-w-sm">
                      Export all your personal data, progress history, and logs (GDPR).
                    </p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-black/20 rounded-full text-xs font-medium hover:bg-black/5 transition-colors">
                    <DownloadCloud size={14} /> Export Data
                  </button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="mt-12 p-6 border border-red-200 bg-red-50 rounded-2xl">
                <h3 className="font-medium text-red-600 mb-2">Danger Zone</h3>
                <p className="text-xs text-red-600/70 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className={`px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-medium transition-colors ${
                    isDeleting ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
                  }`}
                >
                  {isDeleting ? "Deleting..." : "Delete Account"}
                </button>
              </div>
            </div>
          )}

          {/* ------------------ Goals ------------------ */}
          {activeTab === "goals" && (
            <div className="fade-in">
              <h2 className="text-xl font-medium mb-6">Fitness Goals</h2>
              <div className="space-y-1.5 max-w-lg mb-8">
                <label className="text-xs font-medium text-black/60 px-1">Your Primary Goal</label>
                <select
                  value={formData.goal}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, goal: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-black/10 outline-none focus:border-[#1A3626] focus:ring-1 focus:ring-[#1A3626] transition-all text-sm bg-white"
                >
                  <option value="" disabled>
                    Select Goal
                  </option>
                  <option value="Lose Weight">Lose Weight</option>
                  <option value="Build Muscle">Build Muscle</option>
                  <option value="Improve Flexibility">Improve Flexibility</option>
                  <option value="Overall Fitness">Overall Fitness</option>
                </select>
              </div>
              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className={`px-8 py-3 bg-[#1A3626] text-white rounded-xl text-sm font-medium transition-colors ${
                  isSaving ? "opacity-70 cursor-not-allowed" : "hover:bg-[#12261a]"
                }`}
              >
                {isSaving ? "Saving..." : "Save Goals"}
              </button>
            </div>
          )}

          {/* ------------------ Notifications ------------------ */}
          {activeTab === "notifications" && (
            <div className="fade-in">
              <h2 className="text-xl font-medium mb-6">Notification Preferences</h2>
              <div className="space-y-6 mb-8 max-w-lg">
                <div className="flex items-center justify-between py-4 border-b border-black/5">
                  <div>
                    <h3 className="font-medium text-sm mb-1">Push Notifications</h3>
                    <p className="text-xs text-black/50 font-light max-w-sm">
                      Receive session reminders and trainer messages instantly.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.notifications_enabled}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          notifications_enabled: e.target.checked,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1A3626]"></div>
                  </label>
                </div>
              </div>

              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className={`px-8 py-3 bg-[#1A3626] text-white rounded-xl text-sm font-medium transition-colors ${
                  isSaving ? "opacity-70 cursor-not-allowed" : "hover:bg-[#12261a]"
                }`}
              >
                {isSaving ? "Saving..." : "Save Preferences"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
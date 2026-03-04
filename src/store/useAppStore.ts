import { create } from "zustand";
import { supabase } from "@/lib/supabase";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  goal: string;
  plan: "Free" | "Basic" | "Pro" | "Premium";
  age?: string;
  gender?: string;
  height?: string;
  weight?: string;
  notifications_enabled?: boolean;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface AppState {
  user: UserData | null;
  notifications: Notification[];
  sidebarOpen: boolean;
  loading: boolean;
  loadingNotifications: boolean;

  setUser: (user: UserData | null) => void;
  toggleSidebar: () => void;
  logout: () => Promise<void>;

  fetchUser: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  notifications: [],
  sidebarOpen: false,
  loading: true,
  loadingNotifications: false,

  setUser: (user) => set({ user }),

  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, notifications: [] });
  },

  fetchUser: async () => {
    set({ loading: true });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      set({ user: null, loading: false });
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Profile fetch error:", error);
      set({ user: null, loading: false });
      return;
    }

    set({
      user: {
        id: data.id,
        name: data.full_name || user.user_metadata?.full_name,
        email: user.email!,
        avatar_url: data.avatar_url || user.user_metadata?.avatar_url,
        goal: user.user_metadata?.goal || "",
        plan: data.plan,
        age: user.user_metadata?.age || "",
        gender: user.user_metadata?.gender || "",
        height: user.user_metadata?.height || "",
        weight: user.user_metadata?.start_weight || "",
        notifications_enabled: user.user_metadata?.notifications_enabled ?? true,
      },
      loading: false,
    });
  },

  fetchNotifications: async () => {
    set({ loadingNotifications: true });

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      set({ notifications: [], loadingNotifications: false });
      return;
    }

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Notification fetch error:", error);
    }

    set({
      notifications: data || [],
      loadingNotifications: false,
    });
  },
}));
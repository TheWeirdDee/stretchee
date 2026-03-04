import { create } from 'zustand';
import axios from 'axios';
import { supabase } from '@/lib/supabase';

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  goal: string;
  plan: 'Free' | 'Basic' | 'Pro' | 'Premium';
}

interface AppState {
  user: UserData | null;
  sidebarOpen: boolean;
  loading: boolean;
  setUser: (user: UserData | null) => void;
  toggleSidebar: () => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  user: null, 
  sidebarOpen: false,
  loading: true,
  
  setUser: (user) => set({ user }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },

  fetchUser: async () => {
    try {
        set({ loading: true });
        // Get the active session from Supabase client
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user?.id) {
            set({ user: null, loading: false });
            return;
        }

        // Use Axios to call our new API route with the user ID
        const response = await axios.get(`/api/user?id=${session.user.id}`);
        
        // If successful, our dynamic data will be stored globally for all pages to use
        if (response.data) {
            set({ user: response.data, loading: false });
        } else {
            set({ user: null, loading: false });
        }
    } catch (error) {
        console.error("Failed to fetch user with axios:", error);
        set({ user: null, loading: false });
    }
  }
}));

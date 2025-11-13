// store/useUserStore.ts
import { create } from 'zustand';
import type { User } from '@/types/user';

interface UserStore {
  currentUser: User | null;
  theme: 'light' | 'dark';
  setUser: (user: User | null) => void;
  toggleTheme: () => void;
  users: User[];
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  theme: 'light',
  setUser: (user) => set({ currentUser: user }),
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),
  users: [],
}));
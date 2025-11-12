// store/useUserStore.ts
import { create } from 'zustand';
import type { User } from '@/types/user';

interface UserStore {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const useUserStore = create<UserStore>((set) => ({

  theme: 'light',
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),
}));
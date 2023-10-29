import { create } from "zustand";

interface User {
  id: string;
}

interface UserStore {
  user: User | null;
  logIn: (user: User) => void;
  logOut: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  logIn: (user) => set({ user }),
  logOut: () => set({ user: null }),
}));

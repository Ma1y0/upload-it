import { create } from "zustand";

interface Assignment {
  id: string;
  title: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  assignments: Assignment[];
}

interface UserStore {
  user: User | null;
  logIn: (user: User) => void;
  logOut: () => void;
  // update: () => void;
}

// function updateUserData() {
//
// }

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  logIn: (user) => set({ user }),
  logOut: () => set({ user: null }),
  // update: () =>
}));

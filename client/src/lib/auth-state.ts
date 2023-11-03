import { create } from "zustand";

export interface Assignment {
  Id: string;
  Title: string;
  Completed: number;
  Due: Date;
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
  update: () => void;
}

async function updateUserData() {
  try {
    const res = await fetch("http://127.0.0.1/api/v1/user", {
      credentials: "include",
    });

    return await res.json();
  } catch (e) {
    return null;
  }
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  logIn: (user) => set({ user }),
  logOut: () => set({ user: null }),
  update: async () => {
    const updatedUserData = await updateUserData();
    console.log("Updated!", updatedUserData);
    if (updatedUserData) {
      set({ user: updatedUserData });
    }
  },
}));

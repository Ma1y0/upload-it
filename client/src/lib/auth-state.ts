import { create } from "zustand";

export interface Assignment {
  Id: string;
  Title: string;
  Completed: number;
  Description: string;
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

function logOutUser() {
  fetch("http://127.0.0.1/api/v1/user/logout", {
    method: "POST",
    credentials: "include",
  }).catch((e) => console.log(`Failed to log out user: ${e}`));
}

async function updateUserData() {
  try {
    const res = await fetch("http://127.0.0.1/api/v1/user", {
      credentials: "include",
    });

    // Unauthorized no jwt
    if (res.status === 401 || res.status === 500) {
      return null;
    }

    return await res.json();
  } catch (e) {
    return null;
  }
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  logIn: (user) => set({ user }),
  logOut: () => {
    logOutUser();
    set({ user: null });
  },
  update: async () => {
    const updatedUserData = await updateUserData();
    console.log("Updated!", updatedUserData);
    if (updatedUserData) {
      set({ user: updatedUserData });
    }
  },
}));

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IStore {
  token: string;
  setToken: (token: string) => void;
}

// Store
export const useAuthStore = create<IStore>()(
  persist(
    (set, get) => ({
      token: "",
      setToken: (token: string) => set({ token }),
    }),
    {
      name: "auth-store-marketplace",
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
);

// state.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuth = create(
  persist(
    (set) => ({
      token: false,
      setToken: (response) => set({ token: response }),
      setLogout: () => set({ token: null }),
    }),
    {
      name: "user", // Nama key untuk penyimpanan persist
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuth;

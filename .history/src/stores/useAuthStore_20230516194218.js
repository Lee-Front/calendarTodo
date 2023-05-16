import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
import { decodeJwt } from "jose";

const useAuthStore = create(
  persist((set, get) => ({
    isAuthenticated: !!Cookies.get("accessToken"),
    userId: decodeJwt(Cookies.get("accessToken"))?.userId || "",
    login: (userId) => set((state) => ({ ...state, isAuthenticated: true, userId })),
    logout: () => set((state) => ({ ...state, isAuthenticated: false })),
  })),
  {
    name: "auth-storage",
    getStorage: () => sessionStorage,
  }
);

export default useAuthStore;

import { create } from "zustand";
import Cookies from "js-cookie";
import { JWT } from "jose";

const useAuthStore = create((set, get) => ({
  isAuthenticated: !!Cookies.get("accessToken"),
  userId: JWT(Cookies.get("accessToken")),
  login: (userId) => set((state) => ({ ...state, isAuthenticated: true, userId })),
  logout: () => set((state) => ({ ...state, isAuthenticated: false })),
}));

export default useAuthStore;

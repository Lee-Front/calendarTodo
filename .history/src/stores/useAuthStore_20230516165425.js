import { create } from "zustand";
import Cookies from "js-cookie";

const useAuthStore = create((set, get) => ({
  isAuthenticated: !!Cookies.get("accessToken"),
  userId: "",
  login: () => set((state) => ({ ...state, isAuthenticated: true, userId: Cookies.get("userId") })),
  logout: () => set((state) => ({ ...state, isAuthenticated: false })),
}));

export default useAuthStore;

import { create } from "zustand";
import Cookies from "js-cookie";

const useAuthStore = create((set, get) => ({
  isAuthenticated: !!Cookies.get("accessToken"),
  userId: "",
  profileImg: "",
  login: () => set((state) => ({ ...state, isAuthenticated: true })),
  logout: () => set((state) => ({ ...state, isAuthenticated: false })),
}));

export default useAuthStore;

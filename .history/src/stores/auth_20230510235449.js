import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  isAuthenticated: Cookies.get("jwt"),
  userId: "",
  isLogin: false,
  profileImg: "",
  login: () => set((state) => ({ ...state, isLogin: true })),
  logout: () => set((state) => ({ ...state, isLogin: false })),
}));

export default useAuthStore;

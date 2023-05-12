import { create } from "zustand";

console.log("cookie : ", document.cookie);
const useAuthStore = create((set, get) => ({
  isAuthenticated: document.cookie,
  userId: "",
  isLogin: false,
  profileImg: "",
  login: () => set((state) => ({ ...state, isLogin: true })),
  logout: () => set((state) => ({ ...state, isLogin: false })),
}));

export default useAuthStore;

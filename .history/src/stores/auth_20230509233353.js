import { create } from "zustand";

const useAuthStore = create((set, get) => {
  userId: "";
  isLogin: false;
  login: () => set((state) => ({ ...state, isLogin: true }));
  logout: () => set((state) => ({ ...state, isLogin: false }));
});

export default useAuthStore;

import { create } from "zustand";

const useAuthStore = create((set, get) => {
  userId: "";
  isLogin: false;
  logout: () => set((state) => ({ ...state, isLogin: false }));
});

export default useAuthStore;

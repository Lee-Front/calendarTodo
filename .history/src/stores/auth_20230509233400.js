import { create } from "zustand";

const useAuthStore = create((set, get) => {
  userId: "";
  isLogin: false;
  profileImg: "";
  login: () => set((state) => ({ ...state, isLogin: true }));
  logout: () => set((state) => ({ ...state, isLogin: false }));
});

export default useAuthStore;

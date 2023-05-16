import { create } from "zustand";

import Cookies from "js-cookie";
import { decodeJwt } from "jose";

const useAuthStore = create((set, get) => ({
  isAuthenticated: !!Cookies.get("accessToken"),
  userId: decodeJwt(Cookies.get("accessToken"))?.userId || "",
  login: (userId) => set((state) => ({ ...state, isAuthenticated: true, userId })),
  logout: () => set((state) => ({ ...state, isAuthenticated: false })),
}));

export default useAuthStore;

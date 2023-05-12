import { create } from "zustand";

const useAuthStore = create((set, get) => {
    userId:"",
    isLogin:false,
});

export default useAuthStore;

import { create } from "zustand";

const useAuthStore = create((set, get) => {
    isLogin:false,
    userId:"",
});

export default useAuthStore;

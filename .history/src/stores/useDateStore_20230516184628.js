import { create } from "zustand";
import { persist } from "zustand/middleware";

const useDateStore = create(
  persist((set, get) => ({
    currentDate: new Date(),
    selectDate: null,
    setSelectDate: (date) => set((state) => ({ ...state, selectDate: date })),
    setCurrentDate: (date) => set((state) => ({ ...state, currentDate: date })),
  })),
  sessionStorage
);

export default useDateStore;

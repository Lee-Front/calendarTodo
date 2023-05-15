import { create } from "zustand";

const useDateStore = create((set, get) => ({
  currentDate: new Date(),
  setCurrentDate: (date) => set((state) => ({ ...state, currentDate: date })),
}));


export useDateStore;
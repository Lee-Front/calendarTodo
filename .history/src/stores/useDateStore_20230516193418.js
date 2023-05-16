import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useDateStore = create(
  persist((set, get) => ({
    currentDate: new Date(),
    setCurrentDate: (date) => set((state) => ({ ...state, currentDate: date })),
  }))
);

export default useDateStore;

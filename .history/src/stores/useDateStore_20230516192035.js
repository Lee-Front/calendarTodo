import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useDateStore = create(
  persist(
    (set, get) => ({
      currentDate: new Date(),
      selectDate: null,
      setSelectDate: (date) => set((state) => ({ ...state, selectDate: date })),
      setCurrentDate: (date) => set((state) => ({ ...state, currentDate: date })),
    }),
    {
      name: "date-storage",
      storage: createJSONStorage(() => AsyncStorage),
      serialize: (date) => {
        console.log("date.currentDate : ", date.currentDate);
        date.currentDate = date.currentDate.toISOString();
        date.selectDate = date.selectDate.toISOString();
      },
    }
  )
);

export default useDateStore;

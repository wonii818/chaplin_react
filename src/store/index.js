import create from "zustand";
import { devtools } from "zustand/middleware";

const useZusStore = create()(
  devtools((set, get) => ({
    dayCount: 1,
    days: [[]],
    increaseDayCount: () =>
      set((state) => ({ ...state, dayCount: state.dayCount + 1 })),
    addPlaceToStore: (place) =>
      set((state) => {
        const newDays = [...state.days];
        const newDay1 = [
          ...newDays[0],
          place,
        ];
        newDays[0] = newDay1;
        return { ...state, days: newDays };
      }),

    removePlaceFromStore: (id, day) =>
      set((state) => {
        const newDays = [...state.days];
        const removeDay = [...newDays[day]].filter((item) => item.id !== id);
        newDays[day] = removeDay;

        return { ...state, days: newDays };
      }),
    place: "",
    searchPlace: (place) => set((state) => ({ ...state, page: 1, place })),
    searchResult: [],
    setSearchResult: (result) =>
      set((state) => ({ ...state, searchResult: result })),

    page: 1,
    setPagePrev: () => set((state) => ({ ...state, page: state.page - 1 })),
    setPageNext: () => set((state) => ({ ...state, page: state.page + 1 })),
    setPagination: (pagination) => set((state) => ({ ...state, pagination })),
  }))
);

export default useZusStore;

import { create } from "zustand";

interface DataState {
  data: {
    text: string;
    image: string;
  } | null;
  clearData: () => void;
  setData: (data: { text: string; image: string }) => void;
}

export const useData = create<DataState>((set) => ({
  data: null,
  clearData: () => set({ data: null }),
  setData: (data) => set({ data }),
}));

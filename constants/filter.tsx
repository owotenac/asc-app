import { create } from "zustand";
import { CategoryProps } from "./CategoryProps";

type FilterState = {
    date: Date;
    setDate: (date: Date) => void;
    categoryProps: CategoryProps
    setCategoryProps: (p : CategoryProps) => void
};

export const useAppStore = create<FilterState>((set) => ({
    date: new Date(),
    setDate: (_date: Date) => set({ date: _date }),
    categoryProps: {} as CategoryProps,
    setCategoryProps: ( cat: CategoryProps ) => set( {categoryProps: cat})
}));


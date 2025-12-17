import { create } from "zustand";
import { CategoryProps } from "./CategoryProps";
import { MatchCardProps, PlateauCardProps } from "./MatchCardProps";

type FilterState = {
    date: Date;
    setDate: (date: Date) => void;
    categoryProps: CategoryProps
    setCategoryProps: (p : CategoryProps) => void
    matchProps: MatchCardProps
    setMatchProps: (p : MatchCardProps) => void
    selectedMatches: MatchCardProps[]
    setSelectedMatches: (p: MatchCardProps[]) => void
    selectedPlateaux: PlateauCardProps[]
    setSelectedPlateaux: (p: PlateauCardProps[]) => void

};

export const useAppStore = create<FilterState>((set) => ({
    date: new Date(),
    setDate: (_date: Date) => set({ date: _date }),

    categoryProps: {} as CategoryProps,
    setCategoryProps: ( cat: CategoryProps ) => set( {categoryProps: cat}),

    matchProps: {} as MatchCardProps,
    setMatchProps: (m : MatchCardProps) => set( {matchProps: m}),

    selectedMatches: {} as MatchCardProps [],
    setSelectedMatches: (m: MatchCardProps[]) => set( {selectedMatches: m}),

    selectedPlateaux: {} as PlateauCardProps [],
    setSelectedPlateaux: (p: PlateauCardProps[]) => set( {selectedPlateaux: p})

}));


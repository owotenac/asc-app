import { create } from "zustand";

type FilterState = {
    category: string;
    setCategory: (name: string) => void;
    date: Date;
    setDate: (date: Date) => void;
    cpId: string;
    setCompetitionId: ( id: string) => void;
};

export const useAppStore = create<FilterState>((set) => ({
    category: "",
    setCategory: (name: string) => set({ category: name }),
    date: new Date(),
    setDate: (_date: Date) => set({ date: _date }),
    cpId: "",
    setCompetitionId: (_cpId: string) => set( {cpId: _cpId}),
}));


import { create } from "zustand";

export type Action = {
    label: string;
    icon: () => React.ReactNode;
    onPress: () => void;
};

type ToolbarActions = {
    actions: Action[];
    setActions: ( a: Action[]) => void;
};

export const useToolBarStore = create<ToolbarActions>((set) => ({
    actions: [],
    setActions: (a: Action[]) => set({actions: a})
}));

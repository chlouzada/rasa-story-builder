import create from 'zustand';

type Step = Intent | Action;

type Intent = {
  type: 'INTENT';
  name: string;
  // examples: string[];
};

type Action = {
  type: 'ACTION';
  name: string;
};

type Store = {
  steps: Step[];
  showContent: boolean;
  toggleContent: () => void;
  clear: () => void;
  addStep: (step: Step) => void;
  removeStep: (index: number) => void;
};

export const useStoryStore = create<Store>((set) => ({
  steps: [],
  showContent: false,
  toggleContent: () => {
    set((state) => ({ showContent: !state.showContent }));
  },
  clear: () => set({ steps: [] }),
  addStep: (step: Step) =>
    set((state) => ({
      steps: [...state.steps, { name: step.name, type: step.type }],
    })),
  removeStep: (index: number) =>
    set((state) => ({
      steps: state.steps.filter((_, i) => i !== index),
    })),
}));

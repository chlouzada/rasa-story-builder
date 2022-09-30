import create from 'zustand';

type Step = Intent | Action;

type Intent = {
  name: string;
  // examples: string[];
};

type Action = {
  name: string;
};

type Store = {
  steps: Step[];
  addStep: (step: Step) => void;
  removeStep: (index: number) => void;
};

export const useStoryStore = create<Store>((set) => ({
  steps: [],
  addStep: (step: Step) =>
    set((state) => ({ steps: [...state.steps, { name: step.name }] })),
  removeStep: (index: number) =>
    set((state) => ({
      steps: state.steps.filter((_, i) => i !== index),
    })),
}));

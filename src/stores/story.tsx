import create from 'zustand';

type Step = Intent | Action;

type Intent = {
  type: 'ACTION';
  name: string;
  // examples: string[];
};

type Action = {
  type: 'ACTION';
  name: string;
};

type Store = {
  steps: Step[];
  addStep: (step: Step) => void;
  removeStep: (index: number) => void;
  moveStep: (from: number, to: number) => void;
};

export const useStoryStore = create<Store>((set) => ({
  steps: [],
  addStep: (step: Step) =>
    set((state) => ({
      steps: [...state.steps, { name: step.name, type: step.type }],
    })),
  removeStep: (index: number) =>
    set((state) => ({
      steps: state.steps.filter((_, i) => i !== index),
    })),

   moveStep: (from: number, to: number) =>
    set((state) => {
      const steps = [...state.steps];
      const [removed] = steps.splice(from, 1);
      steps.splice(to, 0, removed);
      return { steps };
    }),
}));

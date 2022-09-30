import create from 'zustand';

export type Intent = {
  type: 'INTENT';
  name: string;
  examples: string[];
};

type IntentStore = {
  intents: Intent[];
  setIntents: (intents: Intent[]) => void;
};

export const useIntentsStore = create<IntentStore>((set) => ({
  intents: [],
  setIntents: (intents: Intent[]) => set({ intents }),
}));

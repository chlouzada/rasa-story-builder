import create from 'zustand';

export type Actions = {
  responses: Response[]; // TODO: responses com mg e text
  customActions: CustomAction[];
};

export enum ActionTypeEnum {
  RESPONSE = 'RESPONSE',
  CUSTOM_ACTION = 'CUSTOM_ACTION',
}

export type Response = {
  type: ActionTypeEnum.RESPONSE;
  name: string;
  texts: string[];
};

export type CustomAction = {
  type: ActionTypeEnum.CUSTOM_ACTION;
  name: string;
};

type ActionStore = {
  actions: Actions;
  setActions: (actions: Actions) => void;
};

export const useActionsStore = create<ActionStore>((set) => ({
  actions: {
    responses: [],
    customActions: [],
  },
  setActions: (actions: Actions) => set({ actions }),
}));

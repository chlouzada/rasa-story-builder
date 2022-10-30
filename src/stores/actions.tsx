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
  addAction: (action: Response | CustomAction) => void;
};

export const useActionsStore = create<ActionStore>((set) => ({
  actions: {
    responses: [],
    customActions: [],
  },
  setActions: (actions: Actions) => set({ actions }),
  addAction: (action: Response | CustomAction) => {
    set((state) => {
      if (action.type === ActionTypeEnum.RESPONSE) {
        return {
          actions: {
            ...state.actions,
            responses: [...state.actions.responses, action],
          },
        };
      }
      return {
        actions: {
          ...state.actions,
          customActions: [...state.actions.customActions, action],
        },
      };
    });
  },
}));

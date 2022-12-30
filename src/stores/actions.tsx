import create from 'zustand';

type Action = Response | CustomAction;

export type Actions = {
  responses: Response[];
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
  addAction: (action: Action) => void;
};

export const useActionsStore = create<ActionStore>((set) => ({
  actions: {
    responses: [],
    customActions: [],
  },
  setActions: (actions: Actions) => set({ actions }),
  addAction: (action: Action) => {
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

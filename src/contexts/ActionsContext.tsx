import React, { createContext, useContext, useEffect, useState } from "react";
import { IActionsResponse, INluResponse } from "../utils/parser";

interface IActions {
  actions: IActionsResponse;
  setActions: React.Dispatch<
    React.SetStateAction<IActionsResponse | undefined>
  >;
}

const ActionsContext = createContext<IActions | undefined>(undefined);

export function useActions() {
  return useContext(ActionsContext) as IActions;
}

export function ActionsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [actions, setActions] = useState<IActionsResponse>();

  const value = {
    actions: actions as IActionsResponse,
    setActions,
  };

  return (
    <ActionsContext.Provider value={value}>{children}</ActionsContext.Provider>
  );
}

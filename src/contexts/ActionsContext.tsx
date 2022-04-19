import React, { createContext, useContext, useEffect, useState } from "react";

interface IActionsContext {
  actions: IActions;
  setActions: React.Dispatch<React.SetStateAction<IActions | undefined>>;
}

interface IActions {
  reponses: { name: string; texts: string[] }[]; // TODO: responses com img e text
  customActions: { name: string }[];
}

const ActionsContext = createContext<IActionsContext | undefined>(undefined);

export function useActions() {
  return useContext(ActionsContext) as IActionsContext;
}

export function ActionsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [actions, setActions] = useState<IActions>();

  useEffect(() => {
    const localStorageContent = localStorage.getItem("actions");
    if (!localStorageContent) return;
    const data = JSON.parse(localStorageContent) as IActions;
    setActions(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("actions", JSON.stringify(actions));
  }, [actions]);

  const value = {
    actions: actions as IActions,
    setActions,
  };

  return (
    <ActionsContext.Provider value={value}>{children}</ActionsContext.Provider>
  );
}

import React, { createContext, useContext, useEffect, useState } from "react";
import { IActionResponse, ICustomActionResponse } from "./ActionsContext";
import { INluEntry } from "./NluContext";

interface IStoryBuilderContext {
  steps: (INluEntry | IActionResponse | ICustomActionResponse)[] | undefined;
  clear: () => void;
  addStep: (step: INluEntry | IActionResponse | ICustomActionResponse) => void;
}

interface IStoryBuilder {}

const StoryBuilderContext = createContext<IStoryBuilderContext | undefined>(
  undefined
);

export function useStoryBuilder() {
  return useContext(StoryBuilderContext) as IStoryBuilderContext;
}

export function StoryBuilderContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [steps, setSteps] =
    useState<(INluEntry | IActionResponse | ICustomActionResponse)[]>();

  const addStep = (
    step: INluEntry | IActionResponse | ICustomActionResponse
  ) => {
    if (!steps) return;

    setSteps([...steps, step]);
  };

  const clear = () => {
    setSteps([]);
  };

  const value = {
    steps,
    clear,
    addStep,
  };

  return (
    <StoryBuilderContext.Provider value={value}>
      {children}
    </StoryBuilderContext.Provider>
  );
}

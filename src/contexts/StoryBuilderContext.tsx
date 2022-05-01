import React, { createContext, useContext, useEffect, useState } from "react";
import { IActionResponse, ICustomActionResponse } from "./ActionsContext";
import { INluIntent } from "./NluContext";

interface IStoryBuilderContext {
  steps: (INluIntent | IActionResponse | ICustomActionResponse)[];
  clear: () => void;
  addStep: (step: INluIntent | IActionResponse | ICustomActionResponse) => void;
}

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
  const [steps, setSteps] = useState<
    (INluIntent | IActionResponse | ICustomActionResponse)[]
  >([]);

  const addStep = (
    step: INluIntent | IActionResponse | ICustomActionResponse
  ) => {
    if (steps.length === 0) setSteps([step]);

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

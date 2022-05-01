import React, { createContext, useContext, useEffect, useState } from "react";

interface INluContext {
  nlu: INlu;
  setNlu: React.Dispatch<React.SetStateAction<INlu | undefined>>;
}

interface INlu {
  intents?: INluEntry[];
  lookups?: INluEntry[];
  regexs?: INluEntry[];
}

export interface INluEntry {
  name: string;
  examples: string[];
}

const NluContext = createContext<INluContext | undefined>(undefined);

export function useNlu() {
  return useContext(NluContext) as INluContext;
}

export function NluContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [nlu, setNlu] = useState<INlu>();

  useEffect(() => {
    const localStorageContent = localStorage.getItem("nlu");
    if (!localStorageContent) return;
    if (localStorageContent === "undefined") return;
    const data = JSON.parse(localStorageContent) as INlu;
    setNlu(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("nlu", JSON.stringify(nlu));
  }, [nlu]);

  const value = {
    nlu: nlu as INlu,
    setNlu,
  };

  return <NluContext.Provider value={value}>{children}</NluContext.Provider>;
}

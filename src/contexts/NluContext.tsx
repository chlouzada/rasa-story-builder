import React, { createContext, useContext, useEffect, useState } from "react";
import parser, { INluResponse } from "../utils/parser";

interface INlu {
  nlu: INluResponse;
  setNlu: React.Dispatch<React.SetStateAction<INluResponse | undefined>>;
}

const NluContext = createContext<INlu | undefined>(undefined);

export function useNlu() {
  return useContext(NluContext) as INlu;
}

export function NluContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [nlu, setNlu] = useState<INluResponse>();

  useEffect(() => {
    const localStorageContent = localStorage.getItem("nlu");
    if (!localStorageContent) return;
    const data = JSON.parse(localStorageContent) as INluResponse;
    setNlu(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("nlu", JSON.stringify(nlu));
  }, [nlu]);

  const value = {
    nlu: nlu as INluResponse,
    setNlu,
  };

  return <NluContext.Provider value={value}>{children}</NluContext.Provider>;
}
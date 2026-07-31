"use client";

import {
  createContext,
  useContext,
} from "react";

import {
  AnalysisData,
  useAnalysis,
} from "../hooks/useAnalysis";

interface AnalysisContextType {
  data: AnalysisData | null;
  loading: boolean;
}

const AnalysisContext =
  createContext<AnalysisContextType>({
    data: null,
    loading: true,
  });

export function AnalysisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const analysis = useAnalysis();

  return (
    <AnalysisContext.Provider value={analysis}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysisContext() {
  return useContext(AnalysisContext);
}
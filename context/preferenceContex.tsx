"use client";
import { createContext, useState, useContext, ReactNode } from "react";
import { PreferenceType } from "@/types/PreferenceTypes";

interface MessageContextType {
  preference: PreferenceType;
  setPreference: React.Dispatch<React.SetStateAction<PreferenceType>>;
}

// Create Context with Default Values
const preferenceContext = createContext<MessageContextType | undefined>(undefined);

// Provider Component
export const PreferenceContextProvider = ({ children }: { children: ReactNode }) => {
  const [preference, setPreference] = useState<PreferenceType>({
    Tone: "",
    WordLength: 0,
    WritingStyle: [""],
    Complexity: "",
    FormattingPreferences: [""],
    AICreativityLevel: "",
  });

  return <preferenceContext.Provider value={{ preference, setPreference }}>{children}</preferenceContext.Provider>;
};

// Custom Hook to Use Context
export const usePreference = () => {
  const context = useContext(preferenceContext);
  if (!context) {
    throw new Error("useMessage must be used within a GeminiOutputContextProvider");
  }
  return context;
};

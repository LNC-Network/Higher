import Editor from "./editor";
import { GeminiOutputContextProvider } from "@/context/GeminiOutput";
import { PreferenceContextProvider } from "@/context/preferenceContex";
import React from "react";

const page = () => {
  return (
    <div className="flex-1 overflow-auto h-screen">
      <GeminiOutputContextProvider>
        <PreferenceContextProvider>
          <Editor />
        </PreferenceContextProvider>
      </GeminiOutputContextProvider>
    </div>
  );
};

export default page;

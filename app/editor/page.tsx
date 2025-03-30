import ContentWindow from "@/components/ContentWindow";
import Navbar from "@/components/Navbar";
import { GeminiOutputContextProvider } from "@/context/GeminiOutput";
import { PreferenceContextProvider } from "@/context/preferenceContex";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="flex-1 overflow-auto h-screen">
        <GeminiOutputContextProvider>
          <PreferenceContextProvider>
            <ContentWindow />
          </PreferenceContextProvider>
        </GeminiOutputContextProvider>
      </div>
    </>
  );
};

export default page;

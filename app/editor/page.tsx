"use client";
import { GeminiOutputContextProvider } from "@/context/GeminiOutput";
import { PreferenceContextProvider } from "@/context/preferenceContex";
import React from "react";
import GenerateButton from "./GenerateButton";
import PreferenceButton from "./PreferenceButton";
import SaveButton from "./SaveButton";
import ConnectWallet from "@/components/ui/ConnectWallet";
import { useRef } from "react";
import { useMessage } from "@/context/GeminiOutput";
import { MilkdownEditor } from "./editor";
const page = () => {
  const { message, setMessage } = useMessage("");
  const sourceRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex-1 overflow-auto h-screen">
      <GeminiOutputContextProvider>
        <PreferenceContextProvider>
          <div className="w-full h-full flex flex-col items-center px-6 py-2 bg-slate-900 text-white">
            {/* Navbar */}
            <nav className="flex justify-center bg-slate-900 w-full my-4 px-2">
              <div className="w-full flex justify-between items-center mx-auto">
                <h1 className="bg-gradient-to-r from-[#bc00ff] to-[#00f3ff] bg-clip-text text-transparent text-3xl leading-none pb-1">Higher</h1>
                <div className="flex gap-2">
                  <GenerateButton />
                  <PreferenceButton />
                  <SaveButton />
                  <ConnectWallet />
                </div>
              </div>
            </nav>

            {/* Markdown Editor */}
            <div ref={sourceRef} className="w-full flex-1 h-[50vh] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.3)] border border-white/10 bg-slate-800">
              <MilkdownEditor />
            </div>
          </div>
        </PreferenceContextProvider>
      </GeminiOutputContextProvider>
    </div>
  );
};

export default page;

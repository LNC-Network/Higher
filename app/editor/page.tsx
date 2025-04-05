"use client";

import React, { useState } from "react";
import { GeminiOutputContextProvider } from "@/context/GeminiOutput";
import { PreferenceContextProvider } from "@/context/preferenceContex";
import GenerateButton from "./GenerateButton";
import PreferenceButton from "./PreferenceButton";
import SaveButton from "./SaveButton";
import ConnectWallet from "@/components/ui/ConnectWallet";
import MarkdownEditor from "./editor";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex-1 overflow-auto h-screen">
      <GeminiOutputContextProvider>
        <PreferenceContextProvider>
          <div className="w-full h-full flex flex-col items-center px-6 py-2 bg-slate-900 text-white">
            {/* Navbar */}
            <header className="w-full py-4 px-4 md:px-8 z-50 relative bg-slate-900">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <h1 className="bg-gradient-to-r from-[#bc00ff] to-[#00f3ff] bg-clip-text text-transparent text-2xl font-bold">Higher Writer</h1>

                {/* Desktop Buttons */}
                <div className="hidden md:flex gap-2">
                  <GenerateButton />
                  <PreferenceButton />
                  <SaveButton />
                  <ConnectWallet />
                </div>

                {/* Mobile Menu Icon */}
                <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              {/* Mobile Menu */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="md:hidden absolute top-full left-0 right-0 bg-[#0f172a] border-t border-[#00f3ff]/10 shadow-lg">
                    <div className="flex flex-col p-4 space-y-4">
                      <GenerateButton />
                      <PreferenceButton />
                      <SaveButton />
                      <ConnectWallet />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </header>

            {/* Editor */}
            <MarkdownEditor />
          </div>
        </PreferenceContextProvider>
      </GeminiOutputContextProvider>
    </div>
  );
};

export default Page;

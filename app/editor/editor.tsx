"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useMessage } from "@/context/GeminiOutput";
import GenerateButton from "./GenerateButton";
import PreferenceButton from "./PreferenceButton";
import SaveButton from "./SaveButton";
import ConnectWallet from "@/components/ui/ConnectWallet";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

const Editor = () => {
  const { message, setMessage } = useMessage("");
  const sourceRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Update editor height on resize
  useEffect(() => {
    const updateHeight = () => {
      const sourceHeight = sourceRef.current?.getBoundingClientRect().height;
      if (sourceHeight) setHeight(sourceHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Sync theme mode for MDEditor
  useEffect(() => {
    const html = document.documentElement;
    const mode = html.classList.contains("dark") ? "dark" : "light";
    sourceRef.current?.setAttribute("data-color-mode", mode);
  }, []);

  return (
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
      <div ref={sourceRef} data-color-mode="dark" className="w-full flex-1 h-[50vh] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.3)] border border-white/10 bg-slate-800">
        <div className="wmde-markdown-var">
          <MDEditor value={message} height={height} onChange={(val) => setMessage(val || "")} visiableDragbar={false} />
        </div>
      </div>
    </div>
  );
};

export default Editor;

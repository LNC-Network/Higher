"use client";
import { CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useEffect, useRef, useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import GenerateSection from "./GenerateSection";
import dynamic from "next/dynamic";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});
import { useMessage } from "@/context/GeminiOutput";
import PreferenceDialouge from "./preference";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import FileUpload from "./nftIntegration";

const ContentWindow = () => {
  const { message, setMessage } = useMessage("**Hello world!!!**");

  const sourceRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      const sourceHeight = sourceRef.current?.getBoundingClientRect().height;
      if (sourceHeight) {
        setHeight(sourceHeight);
      }
    };

    updateHeight();

    // Optional: Add resize listener to handle window resizing
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []); // Remove sourceRef.current from dependency array

  return (
    <div className="w-full flex flex-col justify-center items-center h-full p-4 gap-4 bg-slate-900">
      {/* Buttons */}
      <div className="w-full mx-auto flex gap-2">
        <GenerateSection />
        <div className="flex justify-center gap-2">
          {/* Analyse SEO ..................................... */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center h-12 gap-2 border bg-emerald-600 text-white font-semibold rounded-md  hover:bg-emerald-700 text-sm text-center p-6">
                <CircleAlert size={20} /> Preferences
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[50vw] h-[80vh] max-h-5xl max-w-5xl backdrop-blur-3xl shadow-2xl p-0 sm:max-w-6xl">
              <VisuallyHidden>
                <DialogTitle>Preferences</DialogTitle>
              </VisuallyHidden>
              <PreferenceDialouge />
            </DialogContent>
          </Dialog>
          <FileUpload message={message} />
        </div>
      </div>

      {/* Full-Screen Editor */}
      <div
        ref={sourceRef}
        className="w-full flex-1 shadow-[0_10px_50px_rgba(107,114,128,0.2)] shadow-gray-300 overflow-hidden flex rounded-2xl"
      >
        <MDEditor
          className="w-full text-2xl"
          value={message}
          height={height}
          onChange={(val) => setMessage(val || "")}
          visiableDragbar={false}
        />
      </div>
    </div>
  );
};

export default ContentWindow;

import { Sparkles, CircleX } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Gemini from "@/lib/Gemini";
import { useMessage } from "@/context/GeminiOutput";
import { usePreference } from "@/context/preferenceContex";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogOverlay } from "@/components/ui/dialog";

const GenerateButton = () => {
  const [prompt, setPrompt] = useState("");
  const [message, setMessageInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { setMessage } = useMessage("");
  const { preference } = usePreference();

  const handleGenerate = async (close: () => void) => {
    if (!message.trim()) return;
    setLoading(true);

    try {
      const response = await Gemini({
        Prompt: prompt,
        Preference: preference,
        Message: message,
      });

      const parts = response?.candidates?.[0]?.content?.parts || [];
      const generated = parts.map((p) => p.text).join(" ") || "No output generated.";
      setMessage(generated);
      close();
    } catch (err) {
      console.error("Generation error:", err);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  const ClearInput = () => {
    setPrompt("");
    setMessageInput("");
  };

  return (
    <div className="flex justify-end w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="p-4 bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]">
            <Sparkles className="w-5 h-5" />
            Use AI
          </Button>
        </DialogTrigger>
        <DialogOverlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" />
        <DialogContent
          className="w-full max-w-md
            bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border border-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-6 text-white"
        >
          <DialogTitle className="text-2xl font-semibold mb-4">Write message</DialogTitle>

          <div className="space-y-4">
            {/* Prompt Input */}
            <div className="relative">
              <input type="text" placeholder="Enter your Prompt..." value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full p-3 pr-10 rounded-lg  backdrop-blur border  placeholder:text-gray-300 text-white focus:ring-1 outline-none" />
              {prompt && (
                <button className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-300 hover:text-red-400" onClick={() => setPrompt("")}>
                  <CircleX className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Message Input */}
            <div className="relative">
              <input type="text" placeholder="Enter your message..." value={message} onChange={(e) => setMessageInput(e.target.value)} className="w-full p-3 pr-10 rounded-lg  backdrop-blur border  placeholder:text-gray-300 text-white focus:ring-1 outline-none" />
              {message && (
                <button className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-300 hover:text-red-400" onClick={() => setMessageInput("")}>
                  <CircleX className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Generate Button */}
            <div className="flex justify-evenly">
              <Button variant="destructive" onClick={ClearInput} className="rounded-xl shadow-lg w-1/3">
                Clear
              </Button>
              <Button disabled={loading || !message.trim()} onClick={() => handleGenerate(() => {})} className="w-1/3 bg-gradient-to-br from-purple-600 to-indigo-600 hover:brightness-110 text-white font-semibold rounded-xl shadow-lg">
                {loading ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GenerateButton;

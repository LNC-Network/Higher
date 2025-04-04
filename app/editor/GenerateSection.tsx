import { WandSparkles, CircleX } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import Gemini from "@/lib/Gemini";
import { GeminiResponse } from "@/types/GeminiTypes";
import { useMessage } from "@/context/GeminiOutput";
import { usePreference } from "@/context/preferenceContex";

const GenerateSection = () => {
  const [MessageValue, setMessageValue] = useState("");
  const [PromptValue, setPromptValue] = useState("");
  const { setMessage } = useMessage("");
  const { preference } = usePreference();

  const handleClick = async () => {
    if (!MessageValue.trim()) return;

    try {
      const response: GeminiResponse | null = await Gemini({
        Prompt: PromptValue,
        Preference: preference,
        Message: MessageValue,
      });

      if (!response?.candidates?.length) {
        console.error("No candidates found in Gemini response");
        return;
      }

      const parts = response.candidates[0]?.content?.parts ?? [];
      const generatedText =
        parts.map((p) => p.text).join(" ") || "No response generated.";
      setMessage(generatedText);
    } catch (error) {
      console.error("Error generating response:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4 rounded-lg">
      {/* Input Section */}
      <div className="flex w-full gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            className="border border-gray-300 bg-white text-black w-full p-3 pr-10 rounded-md focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter your Prompt..."
            value={PromptValue}
            onChange={(e) => setPromptValue(e.target.value)}
          />
          {PromptValue && (
            <button
              onClick={() => setPromptValue("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
            >
              <CircleX className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="relative flex-grow">
          <input
            type="text"
            className="border border-gray-300 bg-white text-black w-full p-3 pr-10 rounded-md focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter your message..."
            value={MessageValue}
            onChange={(e) => setMessageValue(e.target.value)}
          />
          {MessageValue && (
            <button
              onClick={() => setMessageValue("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
            >
              <CircleX className="w-5 h-5" />
            </button>
          )}
        </div>
        <Button
          onClick={handleClick}
          className=" flex items-center gap-2 border border-gray-400 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md px-4 py-6"
        >
          <WandSparkles className="w-5 h-5" /> Generate
        </Button>
      </div>
    </div>
  );
};

export default GenerateSection;

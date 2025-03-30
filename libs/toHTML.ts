import { GeminiResponse } from "@/types/GeminiTypes";
import { marked } from "marked";

export function toHTML(response: GeminiResponse) {
  if (!response.candidates || response.candidates.length === 0) {
    return "";
  }

  return response.candidates
    .map((candidate) => {
      const text = candidate.content?.parts?.[0]?.text || "";
      return marked.parse(text);
    })
    .join("\n");
}

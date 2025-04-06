import {
  GeminiResponse,
  GeminiRequest,
  GeminiInput,
} from "@/types/GeminiTypes";
import { PreferenceType } from "@/types/PreferenceTypes";

type ResponsePromise = Promise<GeminiResponse | null>;

export default async function Gemini({
  Prompt,
  Message,
  Preference,
}: GeminiInput & { Preference?: PreferenceType }): ResponsePromise {
  const finalPrompt = Prompt && Prompt.trim() !== "" ? Prompt : "";

  const preferenceText = Preference
    ? `
      Tone: ${Preference.Tone || "Default"}
      Word Length: ${Preference.WordLength || "Not specified"}
      Writing Style: ${Preference.WritingStyle || "Default"}
      Complexity: ${Preference.Complexity || "Default"}
      Formatting Preferences: ${Preference.FormattingPreferences || "Default"}
      AI Creativity Level: ${Preference.AICreativityLevel || "Default"}
    `
    : "";

  // Combine user input and preferences
  const combinedMessage = `${finalPrompt} \n ${preferenceText} \n Don't write anything else except the actual content \n ${Message}`;

  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: combinedMessage
      }),
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }

    const data: GeminiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Internal server error:", error);
    return null;
  }
}

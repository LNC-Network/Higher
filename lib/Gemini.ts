import {
  GeminiResponse,
  GeminiRequest,
  GeminiInput,
} from "@/types/GeminiTypes";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const URL = process.env.NEXT_PUBLIC_URL;
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
    const requestBody: GeminiRequest = {
      contents: [
        {
          role: "user",
          parts: [{ text: combinedMessage }],
        },
      ],
    };

    const response = await fetch(`${URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }
    console.log(combinedMessage);
    const data: GeminiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Internal server error:", error);
    return null;
  }
}

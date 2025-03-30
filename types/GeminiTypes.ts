interface GeminiRequest {
  contents: {
    role: string;
    parts: {
      text: string;
    }[];
  }[];
}

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text?: string }[];
    };
  }[];
}

interface GeminiInput {
  Prompt?: string;
  Message: string;
}

export type { GeminiResponse, GeminiRequest, GeminiInput };

interface GeminiRequest {
	contents: {
		role: string;
		parts: {
			text: string;
		}[];
	}[];
}

interface GeminiResponse {
	content?: string;
	tags?: string[];
}

interface GeminiInput {
	Prompt?: string;
	Message: string;
}

export type { GeminiResponse, GeminiRequest, GeminiInput };

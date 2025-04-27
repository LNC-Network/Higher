import { GeminiResponse, GeminiInput } from '@/types/GeminiTypes';
import { PreferenceType } from '@/types/PreferenceTypes';

type ResponsePromise = Promise<GeminiResponse | null>;

// Utility to strip invalid JSON control characters
function removeInvalidJsonChars(s: string): string {
	return s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]+/g, '');
}
export default async function Gemini({
	Prompt,
	Message,
	Preference,
}: GeminiInput & { Preference?: PreferenceType }): ResponsePromise {
	const finalPrompt = Prompt && Prompt.trim() !== '' ? Prompt : '';

	const preferenceText = Preference
		? `
      Tone: ${Preference.Tone || 'Default'}
      Word Length: ${Preference.WordLength || 'Not specified'}
      Writing Style: ${Preference.WritingStyle || 'Default'}
      Complexity: ${Preference.Complexity || 'Default'}
      Formatting Preferences: ${Preference.FormattingPreferences || 'Default'}
      AI Creativity Level: ${Preference.AICreativityLevel || 'Default'}
    `
		: '';

	// Combine user input and preferences
	const combinedMessage = `
	${finalPrompt}

	${preferenceText}

	Please do the following:
	1. Generate high-quality content based on the above input **as Markdown** (use headings, lists, code fences, bold/italics, etc.).
	2. Generate exactly **7-10** SEO-friendly tags for the content with these rules:
   		• **lowercase only**
   		• **single words** for broad topics (e.g., "story", "fantasy", "tech", "ai") also mention which **category** it belongs to (e.g., "story", "web3", "tech", "ai")
   		• **hyphenate** multi-word phrases (e.g., "liquid-cats", "decentralized-marketplace")
   		• **no stop-words** (and, the, of)

   	Provide tags as a JSON array **without any extra commentary**.

	Respond **exactly** in this JSON shape (nothing else):

	\`\`\`json
	{
	"content": "<RAW MARKDOWN HERE>",
	"tags": ["tag1", "tag2", "tag3", …]
	}
	\`\`\`

	Don’t write anything else.

	${Message}
	`.trim();

	try {
		const response = await fetch('/api/gemini', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				prompt: combinedMessage,
			}),
		});

		if (!response.ok) {
			console.error(`HTTP error! status: ${response.status}`);
			return null;
		}

		const data = await response.json();
		console.log('Gemini response:', data);

		let rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

		// 1) Clean out bad control characters
		rawText = removeInvalidJsonChars(rawText);
		// 2) Remove only the outer JSON code-fences
		const jsonBlock = rawText.replace(/^\s*```json[\r\n]?/, '').replace(/[\r\n]?```\s*$/, '');
		// 3) Safely parse
		let parsed: { content: string; tags: string[] };
		try {
			parsed = JSON.parse(jsonBlock);
		} catch (e) {
			console.error('Failed to parse JSON from Gemini:', jsonBlock, e);
			return null;
		}

		const content = parsed.content || 'No content generated.';
		const tags = parsed.tags || [];

		console.log('text generated : ', content);
		console.log('tag generated : ', tags);

		return { content: content, tags: tags };
	} catch (error) {
		console.error('Internal server error:', error);
		return null;
	}
}

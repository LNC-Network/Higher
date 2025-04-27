import { NextResponse } from 'next/server';
export async function POST(req: Request) {
	try {
		const { prompt } = await req.json();

		const response = await fetch(process.env.GEMINI_API_URL || '', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-goog-api-key': process.env.GEMINI_API_KEY || '',
			},
			body: JSON.stringify({
				contents: [
					{
						parts: [
							{
								text: prompt,
							},
						],
					},
				],
			}),
		});

		if (!response.ok) {
			throw new Error('Failed to fetch from Gemini API');
		}

		const data = await response.json();
		console.log('Gemini response:', data);
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		console.error('Error in Gemini API route:', error);
		return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
	}
}

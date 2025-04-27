import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';



export async function GET(req: NextRequest) {
	try {
		const result = await conn.query(
			'SELECT key, title, description, content FROM project_higher ORDER BY key DESC'
		);

		const structured = result.rows.map((row) => ({
			id: row.key,
			title: row.title,
			description: row.description,
			content: row.content,
		}));

		return NextResponse.json({ projects: structured }, { status: 200 });
	} catch (err) {
		console.error('Error fetching data:', err);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

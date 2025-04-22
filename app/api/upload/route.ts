import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';

const conn = new Client({
	user: 'postgres',
	database: 'LNC',
	password: 'admin',
	port: 5432,
});

await conn.connect();

await conn.query(`
	CREATE TABLE IF NOT EXISTS project_higher (
		key SERIAL PRIMARY KEY,
		title VARCHAR,
		description TEXT,
		content TEXT
	)
`);

export async function POST(req: NextRequest) {
	try {
		const { title, description, content } = await req.json();

		if (!title || !description || !content) {
			return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
		}

		await conn.query(
			`INSERT INTO project_higher (title, description, content) VALUES ($1, $2, $3)`,
			[title, description, content]
		);

		return NextResponse.json({ success: true }, { status: 201 });
	} catch (err) {
		console.error('Error in POST /project_higher:', err);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

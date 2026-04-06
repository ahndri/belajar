import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM photos ORDER BY uploaded_at DESC`;
    return NextResponse.json(rows);
  } catch (error) {
    // If table doesn't exist yet, return empty array (initial state)
    console.error("Database error:", error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  const { url, title, size } = await request.json();

  try {
    // Create table if not exists
    await sql`
      CREATE TABLE IF NOT EXISTS photos (
        id SERIAL PRIMARY KEY,
        url TEXT NOT NULL,
        title TEXT NOT NULL,
        size INTEGER NOT NULL,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const result = await sql`
      INSERT INTO photos (url, title, size)
      VALUES (${url}, ${title}, ${size})
      RETURNING *;
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

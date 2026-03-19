import { NextResponse } from "next/server";
import db from "@/lib/puck-db";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Slug is required" },
        { status: 400 }
      );
    }

    const stmt = db.prepare("SELECT * FROM pages WHERE slug = ?");
    const page = stmt.get(slug) as any;

    if (!page) {
      return NextResponse.json({
        success: true,
        data: null,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        ...page,
        content: JSON.parse(page.content),
      },
    });
  } catch (error: any) {
    console.error("DB Error:", error);
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug, content } = body;

    if (!slug || !content) {
      return NextResponse.json(
        { success: false, error: "Slug and content are required" },
        { status: 400 }
      );
    }

    const contentString = JSON.stringify(content);

    // UPSERT using ON CONFLICT (for modern SQLite)
    const stmt = db.prepare(`
      INSERT INTO pages (slug, content, updated_at) 
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(slug) DO UPDATE SET 
        content = excluded.content,
        updated_at = CURRENT_TIMESTAMP
    `);

    stmt.run(slug, contentString);

    return NextResponse.json({
      success: true,
      message: "Page saved successfully",
    });
  } catch (error: any) {
    console.error("DB Error:", error);
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 }
    );
  }
}

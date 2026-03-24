import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  
  if (slug) {
    const page = db.pages.getBySlug(slug);
    return page ? NextResponse.json(page) : NextResponse.json({ error: 'Page not found' }, { status: 404 });
  }
  
  return NextResponse.json(db.pages.getAll());
}

export async function PUT(req: Request) {
  const data = await req.json();
  db.pages.update(data.slug, data);
  return NextResponse.json({ success: true });
}

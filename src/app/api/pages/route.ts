import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  
  if (slug) {
    // Return populated page data for easier frontend consumption
    const page = db.pages.getBySlug(slug, true);
    return page 
      ? NextResponse.json(page) 
      : NextResponse.json({ error: 'Page not found' }, { status: 404 });
  }
  
  return NextResponse.json(db.pages.getAll());
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    if (!data.id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    db.pages.update(data.id, data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const ADMIN_KEY = "admin123";

function isAuthorized(req: Request) {
  const authHeader = req.headers.get('Authorization');
  return authHeader === `Bearer ${ADMIN_KEY}`;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  
  if (slug) {
    const page = db.pages.getBySlug(slug, true);
    return page 
      ? NextResponse.json(page) 
      : NextResponse.json({ error: 'Page not found' }, { status: 404 });
  }
  
  return NextResponse.json(db.pages.getAll());
}

export async function PUT(req: Request) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const data = await req.json();
    if (!data.id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    db.pages.update(data.id, data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}

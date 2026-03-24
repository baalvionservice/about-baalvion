import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const ADMIN_KEY = "admin123";

function isAuthorized(req: Request) {
  const authHeader = req.headers.get('Authorization');
  return authHeader === `Bearer ${ADMIN_KEY}`;
}

export async function GET() {
  return NextResponse.json(db.sections.getAll());
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await req.json();
  const newSection = db.sections.add(data);
  return NextResponse.json(newSection);
}

export async function PUT(req: Request) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await req.json();
  const { id, ...updates } = data;
  const updated = db.sections.update(id, updates);
  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (id) db.sections.delete(id);
  return NextResponse.json({ success: true });
}

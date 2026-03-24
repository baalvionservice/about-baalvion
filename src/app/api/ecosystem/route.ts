import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  return NextResponse.json(db.ecosystem.getAll());
}

export async function PUT(req: Request) {
  const data = await req.json();
  const { id, ...updates } = data;
  db.ecosystem.update(id, updates);
  return NextResponse.json({ success: true });
}

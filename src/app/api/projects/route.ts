import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  return NextResponse.json(db.projects.getAll());
}

export async function POST(req: Request) {
  const data = await req.json();
  const newProject = db.projects.add(data);
  return NextResponse.json(newProject);
}

export async function PUT(req: Request) {
  const data = await req.json();
  const { id, ...updates } = data;
  const updated = db.projects.update(id, updates);
  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (id) db.projects.delete(id);
  return NextResponse.json({ success: true });
}

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  return NextResponse.json(db.inquiries.getAll());
}

export async function POST(req: Request) {
  const data = await req.json();
  const newInquiry = db.inquiries.add(data);
  return NextResponse.json(newInquiry);
}

export async function PATCH(req: Request) {
  const data = await req.json();
  db.inquiries.updateStatus(data.id, data.status);
  return NextResponse.json({ success: true });
}

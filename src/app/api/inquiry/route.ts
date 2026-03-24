import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const ADMIN_KEY = "admin123";

function isAuthorized(req: Request) {
  const authHeader = req.headers.get('Authorization');
  return authHeader === `Bearer ${ADMIN_KEY}`;
}

export async function GET() {
  return NextResponse.json(db.inquiries.getAll());
}

export async function POST(req: Request) {
  // Public endpoint for visitors to contact
  const data = await req.json();
  const newInquiry = db.inquiries.add(data);
  return NextResponse.json(newInquiry);
}

export async function PATCH(req: Request) {
  if (!isAuthorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await req.json();
  db.inquiries.updateStatus(data.id, data.status);
  return NextResponse.json({ success: true });
}

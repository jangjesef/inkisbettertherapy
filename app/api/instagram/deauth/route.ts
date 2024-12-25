import { NextResponse } from 'next/server';

export async function POST() {
  // Zde by měla být logika pro odstranění tokenu
  return NextResponse.json({ status: 'success' });
} 
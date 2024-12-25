import { NextResponse } from 'next/server';

export async function POST() {
  // Zde by měla být logika pro smazání uživatelských dat
  return NextResponse.json({ status: 'success' });
} 
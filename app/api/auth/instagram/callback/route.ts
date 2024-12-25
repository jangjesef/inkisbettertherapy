import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  // Zde implementujeme výměnu kódu za access token
  // a uložení tokenu do databáze

  return NextResponse.redirect(new URL('/', request.url));
} 
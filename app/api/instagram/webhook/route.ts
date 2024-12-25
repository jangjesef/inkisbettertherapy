import { NextResponse } from 'next/server';
import { getInstagramToken } from '@/lib/instagram';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const accessToken = await getInstagramToken(code);
    
    // Zde byste měli token uložit do databáze
    // Pro testovací účely můžete použít environment proměnnou
    process.env.INSTAGRAM_ACCESS_TOKEN = accessToken;

    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('Error getting Instagram token:', error);
    return NextResponse.json(
      { error: 'Failed to get Instagram token' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.INSTAGRAM_VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }

  return new Response('Forbidden', { status: 403 });
} 
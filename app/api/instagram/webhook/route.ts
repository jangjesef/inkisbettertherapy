import { NextResponse } from 'next/server';

// Funkce pro GET požadavky - verifikace webhooků
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // Ověření tokenu
  if (mode === 'subscribe' && token === process.env.INSTAGRAM_VERIFY_TOKEN) {
    console.log('Webhook byl úspěšně ověřen');
    return new NextResponse(challenge);
  }

  return new NextResponse('Neplatný token', { status: 403 });
}

// Funkce pro POST požadavky - příjem aktualizací
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Zde můžete zpracovat příchozí data z Instagramu
    console.log('Přijata nová data z Instagramu:', body);
    
    return NextResponse.json({ status: 'OK' });
  } catch (error) {
    console.error('Chyba při zpracování Instagram webhooků:', error);
    return NextResponse.json(
      { error: 'Chyba při zpracování požadavku' },
      { status: 500 }
    );
  }
} 
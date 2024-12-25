import { NextResponse } from 'next/server';
import { getInstagramToken } from '@/lib/instagram';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const token = await getInstagramToken(code);
    
    // In a production environment, you should securely store this token
    // For now, we'll just return it
    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error getting Instagram token:', error);
    return NextResponse.json(
      { error: 'Failed to get Instagram token' },
      { status: 500 }
    );
  }
} 
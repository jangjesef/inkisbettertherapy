import { NextResponse } from 'next/server';

export async function GET() {
  const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${
    process.env.INSTAGRAM_APP_ID
  }&redirect_uri=${encodeURIComponent(
    process.env.INSTAGRAM_CALLBACK_URL!
  )}&scope=user_profile,user_media&response_type=code`;

  return NextResponse.redirect(instagramAuthUrl);
} 
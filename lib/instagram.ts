import { InstagramApiResponse, InstagramMedia } from '@/types/instagram';

const INSTAGRAM_API_URL = 'https://graph.instagram.com';
const INSTAGRAM_BASIC_DISPLAY_URL = 'https://api.instagram.com';

export async function getInstagramToken(code: string): Promise<string> {
  const response = await fetch(
    `${INSTAGRAM_BASIC_DISPLAY_URL}/oauth/access_token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.INSTAGRAM_APP_ID!,
        client_secret: process.env.INSTAGRAM_APP_SECRET!,
        grant_type: 'authorization_code',
        redirect_uri: process.env.INSTAGRAM_CALLBACK_URL!,
        code,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to get Instagram token');
  }

  const data = await response.json();
  return data.access_token;
}

export async function getInstagramPosts(token: string, limit = 9): Promise<InstagramMedia[]> {
  const response = await fetch(
    `${INSTAGRAM_API_URL}/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=${limit}&access_token=${token}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch Instagram posts');
  }

  const data: InstagramApiResponse = await response.json();
  return data.data;
} 
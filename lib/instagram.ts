import axios from 'axios';
import { InstagramApiResponse, InstagramMedia } from '@/types/instagram';

const INSTAGRAM_API_URL = 'https://graph.instagram.com';

export async function getInstagramToken(code: string): Promise<string> {
  const params = new URLSearchParams({
    client_id: process.env.INSTAGRAM_APP_ID!,
    client_secret: process.env.INSTAGRAM_APP_SECRET!,
    grant_type: 'authorization_code',
    redirect_uri: process.env.INSTAGRAM_REDIRECT_URI!,
    code,
  });

  const response = await axios.post(
    `${INSTAGRAM_API_URL}/oauth/access_token`,
    params
  );

  return response.data.access_token;
}

export async function getInstagramPosts(token: string): Promise<InstagramMedia[]> {
  try {
    const response = await axios.get<InstagramApiResponse>(
      `${INSTAGRAM_API_URL}/me/media`,
      {
        params: {
          access_token: token,
          fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username',
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return [];
  }
} 
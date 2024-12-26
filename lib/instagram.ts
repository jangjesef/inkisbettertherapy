import { InstagramFeed, InstagramMedia } from "@/types/instagram";

const INSTAGRAM_API_URL = 'https://graph.instagram.com';

export async function getInstagramFeed(): Promise<InstagramMedia[]> {
  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username,children{media_url,thumbnail_url},like_count,comments_count&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}&limit=100`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch Instagram feed');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching Instagram feed:', error);
    return [];
  }
} 
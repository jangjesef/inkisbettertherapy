import { InstagramFeed, InstagramMedia } from "@/types/instagram";

const INSTAGRAM_API_URL = 'https://graph.instagram.com';

export async function getInstagramFeed(): Promise<InstagramMedia[]> {
  if (!process.env.INSTAGRAM_ACCESS_TOKEN) {
    throw new Error('Instagram access token is not configured');
  }

  const params = new URLSearchParams({
    access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
    fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username,like_count,comments_count,children{media_type,media_url}',
    limit: '12',
  });

  const response = await fetch(
    `${INSTAGRAM_API_URL}/me/media?${params.toString()}`,
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch Instagram feed');
  }

  const feed: InstagramFeed = await response.json();
  return feed.data;
} 
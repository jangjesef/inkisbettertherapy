import { InstagramFeed, InstagramMedia } from "@/types/instagram";

const INSTAGRAM_API_URL = 'https://graph.instagram.com';

export async function getInstagramFeed(): Promise<InstagramMedia[]> {
  try {
    const response = await fetch(
      `${INSTAGRAM_API_URL}/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username,children{media_url,media_type,thumbnail_url},like_count,comments_count&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}&limit=100`,
      {
        cache: 'no-store'
      }
    );
    
    if (!response.ok) {
      console.error('Instagram API response not OK:', await response.text());
      throw new Error('Failed to fetch Instagram feed');
    }

    const data: InstagramFeed = await response.json();
    
    return data.data.map(post => ({
      ...post,
      media_url: post.media_url,
      children: post.children ? {
        data: post.children.data.map(child => ({
          ...child,
          media_url: child.media_url
        }))
      } : undefined
    }));
  } catch (error) {
    console.error('Error fetching Instagram feed:', error);
    return [];
  }
} 
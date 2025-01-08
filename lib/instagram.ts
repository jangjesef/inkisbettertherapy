import { InstagramFeed, InstagramMedia, InstagramMediaChild } from "@/types/instagram";

const INSTAGRAM_API_URL = 'https://graph.instagram.com';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

interface RawMediaResponse {
  id: string;
  media_url?: string;
  thumbnail_url?: string;
  children?: {
    data: Array<{
      media_url?: string;
      thumbnail_url?: string;
    }>;
  };
}

async function refreshMediaUrls(posts: InstagramMedia[]): Promise<InstagramMedia[]> {
  try {
    const mediaIds = posts.map(post => post.id);
    const response = await fetch(
      `${INSTAGRAM_API_URL}/me/media?ids=${mediaIds.join(',')}&fields=id,media_url,thumbnail_url,children{media_url,thumbnail_url}&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`,
      {
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to refresh media URLs');
    }

    const freshData = await response.json();
    const freshMediaMap = new Map<string, RawMediaResponse>(freshData.data.map((item: RawMediaResponse) => [item.id, item]));

    return posts.map(post => {
      const freshPost = freshMediaMap.get(post.id);
      if (!freshPost) return post;

      const updatedPost: InstagramMedia = {
        ...post,
        media_url: freshPost.media_url || post.media_url,
        thumbnail_url: freshPost.thumbnail_url || post.thumbnail_url
      };

      // Handle children media only if both fresh and original post have children
      if (freshPost.children && post.children?.data) {
        updatedPost.children = {
          data: freshPost.children.data.map((child, index) => {
            const originalChild = post.children!.data[index];
            return {
              ...originalChild,
              media_url: child.media_url || originalChild.media_url,
              thumbnail_url: child.thumbnail_url || originalChild.thumbnail_url
            };
          })
        };
      }

      return updatedPost;
    });
  } catch (error) {
    console.error('Error refreshing media URLs:', error);
    return posts;
  }
}

async function fetchWithRetry(url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      if (retries > 0) {
        console.warn(`Instagram API request failed, retrying... (${retries} attempts left)`);
        await delay(RETRY_DELAY);
        return fetchWithRetry(url, options, retries - 1);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Instagram API request failed, retrying... (${retries} attempts left)`);
      await delay(RETRY_DELAY);
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}

export async function getInstagramFeed(): Promise<InstagramMedia[]> {
  try {
    const response = await fetchWithRetry(
      `${INSTAGRAM_API_URL}/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username,children{media_url,media_type,thumbnail_url},like_count,comments_count&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}&limit=100`,
      {
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
        },
      }
    );
    
    const data: InstagramFeed = await response.json();
    
    // Filter and validate posts
    let posts = data.data
      .filter(post => {
        const isValid = Boolean(post.media_url);
        if (!isValid) {
          console.warn(`Skipping post ${post.id} due to missing media_url`);
        }
        return isValid;
      });

    // If we have posts with media URLs, try to refresh them
    if (posts.length > 0) {
      posts = await refreshMediaUrls(posts);
    }

    return posts;
  } catch (error) {
    console.error('Error fetching Instagram feed:', error);
    return [];
  }
} 
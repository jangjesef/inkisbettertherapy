import { InstagramFeed, InstagramMedia } from "@/types/instagram";

const INSTAGRAM_API_URL = 'https://graph.instagram.com';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
    
    // Filter out posts with invalid media_url
    return data.data
      .filter(post => {
        const isValid = Boolean(post.media_url);
        if (!isValid) {
          console.warn(`Skipping post ${post.id} due to missing media_url`);
        }
        return isValid;
      })
      .map(post => ({
        ...post,
        media_url: post.media_url,
        children: post.children ? {
          data: post.children.data
            .filter(child => Boolean(child.media_url))
            .map(child => ({
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
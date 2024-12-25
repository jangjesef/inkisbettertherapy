import { configure } from 'agentql';

// Konfigurace AgentQL
configure({ apiKey: process.env.AGENTQL_API_KEY! });

// Query pro získání Instagram příspěvků
export const INSTAGRAM_POSTS_QUERY = `
{
  posts(from Instagram profile @ink_is_better_than_therapy)[] {
    image_url
    caption
    permalink
    timestamp
  }
}
`;

export async function getInstagramPosts() {
  const response = await fetch('https://api.agentql.com/v1/query-data', {
    method: 'POST',
    headers: {
      'X-API-Key': process.env.AGENTQL_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: INSTAGRAM_POSTS_QUERY,
      url: 'https://www.instagram.com/ink_is_better_than_therapy/',
      params: {
        wait_for: 5,
        is_scroll_to_bottom_enabled: true
      }
    })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Instagram posts');
  }

  const data = await response.json();
  return data.data.posts;
} 
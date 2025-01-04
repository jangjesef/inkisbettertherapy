import useSWR from 'swr'
import type { InstagramMedia } from '@/types/instagram'

const fetcher = async (): Promise<InstagramMedia[]> => {
  const response = await fetch('/api/instagram')
  if (!response.ok) {
    throw new Error('Failed to fetch Instagram feed')
  }
  return response.json()
}

export function useInstagramFeed(refreshInterval = 60000) {
  const { data, error, isLoading } = useSWR<InstagramMedia[]>(
    'instagram-feed',
    fetcher,
    {
      refreshInterval,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  )

  return {
    posts: data ?? [],
    isLoading,
    isError: error
  }
} 
import useSWR from 'swr'
import type { InstagramMedia } from '@/types/instagram'

const fetcher = async (): Promise<InstagramMedia[]> => {
  const response = await fetch('/api/instagram')
  if (!response.ok) {
    throw new Error('Failed to fetch Instagram feed')
  }
  return response.json()
}

export function useInstagramFeed(refreshInterval = 30000) {
  const { data, error, isLoading, mutate } = useSWR<InstagramMedia[]>(
    'instagram-feed',
    fetcher,
    {
      refreshInterval,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshWhenHidden: true,
      dedupingInterval: 10000,
    }
  )

  return {
    posts: data ?? [],
    isLoading,
    isError: error,
    refresh: mutate
  }
} 
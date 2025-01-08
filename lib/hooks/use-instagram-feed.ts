import useSWR from 'swr'
import type { InstagramMedia } from '@/types/instagram'

const fetcher = async (): Promise<InstagramMedia[]> => {
  try {
    const response = await fetch('/api/instagram')
    if (!response.ok) {
      throw new Error('Failed to fetch Instagram feed')
    }
    const data = await response.json()
    if (!Array.isArray(data)) {
      console.error('Invalid response format:', data)
      return []
    }
    return data
  } catch (error) {
    console.error('Error in Instagram feed fetcher:', error)
    return []
  }
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
      errorRetryCount: 3,
      errorRetryInterval: 5000,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Neretryovat při některých chybách
        if (error.status === 404 || error.status === 403) return
        
        // Maximálně 3 retries
        if (retryCount >= 3) return
        
        // Retry po 5 sekundách
        setTimeout(() => revalidate({ retryCount }), 5000)
      },
      fallbackData: [], // Prázdné pole jako fallback
    }
  )

  return {
    posts: data ?? [],
    isLoading,
    isError: error,
    refresh: mutate
  }
} 
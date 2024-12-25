'use client'

import { useEffect, useState } from 'react'
import { InstagramMedia } from '@/types/instagram'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

export function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramMedia[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/instagram/posts')
        if (!response.ok) {
          throw new Error('Nepodařilo se načíst příspěvky')
        }
        const data = await response.json()
        setPosts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Nastala chyba při načítání')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return <div className="text-center p-4">Načítám příspěvky...</div>
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-sm truncate">{post.caption || 'Instagram příspěvek'}</CardTitle>
          </CardHeader>
          <CardContent>
            {post.media_type === 'IMAGE' && (
              <div className="relative aspect-square">
                <Image
                  src={post.media_url}
                  alt={post.caption || 'Instagram obrázek'}
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            {post.media_type === 'VIDEO' && (
              <video
                src={post.media_url}
                controls
                className="w-full rounded-md"
                poster={post.thumbnail_url}
              />
            )}
            <div className="mt-2 text-sm text-gray-500">
              {new Date(post.timestamp).toLocaleDateString('cs-CZ')}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 
'use client'

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getInstagramPosts } from "@/lib/instagram-agentql";

export function InstagramFeed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getInstagramPosts();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load posts');
        console.error('Error fetching Instagram posts:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {Array(6).fill(0).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <Skeleton className="aspect-square w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {posts.map((post, index) => (
        <Card key={index} className="overflow-hidden bg-white">
          <CardContent className="p-0">
            <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="block">
              <div className="relative aspect-square">
                <img
                  src={post.image_url}
                  alt={post.caption || 'Instagram post'}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              {post.caption && (
                <div className="p-4">
                  <p className="text-sm text-gray-600 line-clamp-2">{post.caption}</p>
                </div>
              )}
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 
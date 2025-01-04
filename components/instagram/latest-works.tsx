"use client";

import { InstagramMedia } from "@/types/instagram";
import { PostCarousel } from "./post-carousel";
import Link from "next/link";
import { Heart, MessageCircle, Images } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useInstagramFeed } from "@/lib/hooks/use-instagram-feed";
import { InstagramImage } from "./instagram-image";

interface LatestWorksProps {
  posts: InstagramMedia[];
}

export function LatestWorks({ posts: initialPosts }: LatestWorksProps) {
  const { posts: livePosts } = useInstagramFeed(30000); // Refresh every 30 seconds
  
  // Use live posts if available, otherwise fall back to initial posts
  const posts = livePosts.length > 0 ? livePosts : initialPosts;
  
  // Zobrazíme jen první 4 příspěvky
  const latestPosts = posts.slice(0, 4);

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-6xl font-medium mb-4">Latest Works</h1>
            <p className="text-xl text-gray-600">Check out my recent tattoo projects</p>
          </div>

          {/* Instagram grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform"
              >
                <div className="p-8">
                  {post.media_type === 'CAROUSEL_ALBUM' && post.children ? (
                    <PostCarousel
                      media_url={post.media_url}
                      children_media={post.children.data}
                      caption={post.caption}
                    />
                  ) : (
                    <div className="aspect-video relative rounded-2xl overflow-hidden mb-6">
                      <InstagramImage
                        src={post.media_url}
                        alt={post.caption || "Instagram post"}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="space-y-4">
                    {post.caption && (
                      <p className="text-lg text-gray-700 line-clamp-2">{post.caption}</p>
                    )}
                    <div className="flex items-center justify-between text-gray-500">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Heart className="w-5 h-5 fill-current" />
                          <span>{post.like_count}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments_count}</span>
                        </div>
                        {post.media_type === 'CAROUSEL_ALBUM' && (
                          <div className="flex items-center gap-2">
                            <Images className="w-5 h-5" />
                            <span>{post.children?.data.length}</span>
                          </div>
                        )}
                      </div>
                      <time className="text-sm">{formatDate(post.timestamp)}</time>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Link
              href="/portfolio"
              className="inline-block bg-black text-white px-8 py-3 rounded-full hover:opacity-90 transition text-lg"
            >
              View All Works
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
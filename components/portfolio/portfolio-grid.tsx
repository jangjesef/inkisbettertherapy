"use client";
import { useState } from 'react';
import { Heart, MessageCircle, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { InstagramMedia } from "@/types/instagram";

const CARD_COLORS = [
  'bg-yellow-300',
  'bg-red-500',
  'bg-blue-400',
  'bg-purple-400',
  'bg-green-400',
  'bg-orange-400',
  'bg-pink-400',
  'bg-indigo-400',
];

interface PortfolioGridProps {
  initialPosts: InstagramMedia[];
}

export function PortfolioGrid({ initialPosts }: PortfolioGridProps) {
  const [displayCount, setDisplayCount] = useState(10);
  
  const getRandomColor = (() => {
    let lastColorIndex = -1;
    
    return () => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * CARD_COLORS.length);
      } while (newIndex === lastColorIndex);
      
      lastColorIndex = newIndex;
      return CARD_COLORS[newIndex];
    };
  })();

  const postColors = initialPosts.map(() => getRandomColor());

  const handleShare = async (permalink: string, caption: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ink is Better than Therapy',
          text: caption,
          url: permalink,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(permalink);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {initialPosts.slice(0, displayCount).map((post, index) => (
          <Link
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${postColors[index]} rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform`}
          >
            <div className="p-8">
              <div className="aspect-square relative rounded-2xl overflow-hidden mb-6">
                <Image
                  src={post.media_url}
                  alt={post.caption || "Instagram post"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">{post.caption?.split('\n')[0] || ''}</h2>
                
                {/* Datum a interakce */}
                <div className="flex items-center justify-between text-black/80">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Heart className="w-5 h-5" />
                      <span>{post.like_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments_count}</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        handleShare(post.permalink, post.caption || '');
                      }}
                      className="flex items-center gap-1 hover:opacity-70 transition-opacity"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                  <time className="text-sm">{formatDate(post.timestamp)}</time>
                </div>
                
                {/* Popis */}
                <p className="text-lg text-black/80 line-clamp-3">
                  {post.caption}
                </p>

                {/* Hashtagy */}
                <div className="flex flex-wrap gap-2">
                  {post.caption?.split('\n')[1]?.split('#').filter(Boolean).map((tag, i) => (
                    <span key={i} className="text-lg">#{tag.trim()}</span>
                  ))}
                </div>

                {/* Username */}
                <div className="bg-black text-white rounded-full px-6 py-2 inline-block">
                  @{post.username}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {displayCount < initialPosts.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setDisplayCount(prev => prev + 10)}
            className="bg-black text-white px-8 py-3 rounded-full hover:opacity-90 transition"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
} 
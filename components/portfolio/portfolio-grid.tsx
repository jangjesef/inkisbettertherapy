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
          // ... kód pro kartu příspěvku zůstává stejný ...
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
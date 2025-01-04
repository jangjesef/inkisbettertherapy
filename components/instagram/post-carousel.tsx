"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { InstagramMedia } from "./instagram-media";

interface PostCarouselProps {
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO';
  thumbnail_url?: string;
  children_media: {
    media_url: string;
    media_type: 'IMAGE' | 'VIDEO';
    thumbnail_url?: string;
  }[];
  caption: string;
}

export function PostCarousel({ media_url, media_type, thumbnail_url, children_media, caption }: PostCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const media = [{ media_url, media_type, thumbnail_url }, ...children_media];

  const nextSlide = () => {
    setCurrentIndex((current) => (current + 1) % media.length);
  };

  const prevSlide = () => {
    setCurrentIndex((current) => (current - 1 + media.length) % media.length);
  };

  return (
    <div className="relative aspect-square rounded-2xl overflow-hidden">
      {media.map((item, index) => (
        <div
          key={item.media_url}
          className={`absolute inset-0 transition-opacity duration-300 ${
            index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <InstagramMedia
            src={item.media_url}
            type={item.media_type}
            thumbnail_url={item.thumbnail_url}
            alt={caption || "Instagram post"}
            className="object-cover"
          />
        </div>
      ))}
      
      {media.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              prevSlide();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              nextSlide();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {media.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
} 
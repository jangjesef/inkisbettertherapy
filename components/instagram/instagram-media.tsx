"use client";

import Image from "next/image";
import { useState } from "react";

interface InstagramMediaProps {
  src: string;
  alt: string;
  type: 'IMAGE' | 'VIDEO';
  className?: string;
  thumbnail_url?: string;
}

export function InstagramMedia({ src, alt, type, thumbnail_url, className = "" }: InstagramMediaProps) {
  const [error, setError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  if (error) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <p className="text-gray-500 text-sm">Media unavailable</p>
      </div>
    );
  }

  if (type === 'VIDEO') {
    return (
      <div className="relative w-full h-full">
        {!isPlaying && thumbnail_url && (
          <div className="absolute inset-0 z-10">
            <Image
              src={thumbnail_url}
              alt={alt}
              fill
              className={className}
              onError={() => setError(true)}
            />
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
            >
              <svg
                className="w-16 h-16 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        )}
        {(isPlaying || !thumbnail_url) && (
          <video
            src={src}
            controls
            autoPlay={isPlaying}
            className={`w-full h-full ${className}`}
            onError={() => setError(true)}
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      onError={() => setError(true)}
    />
  );
} 
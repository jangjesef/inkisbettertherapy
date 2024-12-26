"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface PostCarouselProps {
  media_url: string;
  children_media: { media_url: string }[];
  caption: string;
}

export function PostCarousel({ media_url, children_media, caption }: PostCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [{ media_url }, ...children_media];

  const nextSlide = () => {
    setCurrentIndex((current) => (current + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((current) => (current - 1 + images.length) % images.length);
  };

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden">
      {images.map((image, index) => (
        <div
          key={image.media_url}
          className={`absolute inset-0 transition-opacity duration-300 ${
            index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={image.media_url}
            alt={caption || "Instagram post"}
            fill
            className="object-cover"
          />
        </div>
      ))}
      
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              prevSlide();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              nextSlide();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
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
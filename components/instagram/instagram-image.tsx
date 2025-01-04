"use client";

import Image from "next/image";
import { useState } from "react";

interface InstagramImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function InstagramImage({ src, alt, className = "" }: InstagramImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <p className="text-gray-500 text-sm">Image unavailable</p>
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
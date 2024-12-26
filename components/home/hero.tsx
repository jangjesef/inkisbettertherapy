"use client";
import React from "react";
import { Droplet } from "lucide-react";

export default function Hero() {
  return (
    <div className="w-full h-screen bg-pink-500 flex flex-col items-center justify-between">
      {/* Center Logo Section */}
      <div className="flex-grow flex items-center justify-center w-full px-8">
        <div className="flex items-center gap-1">
          <Droplet className="w-40 h-40 text-black transform rotate-12" />
          <div className="flex flex-col -ml-6 translate-x-2">
            <span className="text-black text-5xl font-bold">Ink is Better</span>
            <span className="text-black/70 text-4xl">than therapy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
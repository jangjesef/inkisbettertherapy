"use client";
import React from "react";
import { Droplet } from "lucide-react";

export default function Hero() {
  return (
    <div className="w-full h-screen bg-pink-500 flex flex-col items-center justify-between">
      <div className="flex-grow flex items-center justify-center w-full px-4 sm:px-8">
        <div className="flex items-center gap-1">
          <Droplet className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 text-black transform rotate-12" />
          <div className="flex flex-col -ml-3 sm:-ml-4 md:-ml-6 translate-x-1 sm:translate-x-2">
            <span className="text-black text-3xl sm:text-4xl md:text-5xl font-bold">Ink is Better</span>
            <span className="text-black/70 text-2xl sm:text-3xl md:text-4xl">than therapy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
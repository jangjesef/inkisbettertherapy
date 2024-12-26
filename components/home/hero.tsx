"use client";
import React from "react";
import { Droplet } from "lucide-react";

export default function Hero() {
  return (
    <div className="w-full h-screen bg-pink-500 flex flex-col items-center justify-between">
      {/* Center Logo Section */}
      <div className="flex-grow flex items-center justify-center w-full px-8">
        <div className="flex items-center gap-8">
          <Droplet className="w-24 h-24 text-black transform -rotate-12" />
          <div className="flex flex-col">
            <span className="text-black text-6xl font-bold">Ink is Better</span>
            <span className="text-black/70 text-6xl">than therapy</span>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="w-full bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-start justify-between">
            <p className="text-black max-w-xl">
              Najdete nás na Mášova 8 v Brně. Jsme soukromé tetovací studio, kde tvoří Gabriela Gajdošová. Mrkněte na náš{' '}
              <a 
                href="https://instagram.com/ink_is_better_than_therapy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                Instagram
              </a>
              {' '}nebo nám napište{' '}
              <a 
                href="https://instagram.com/ink_is_better_than_therapy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                DM
              </a>.
            </p>
            <p className="text-black">Click and drag to draw</p>
          </div>
        </div>
      </div>
    </div>
  );
}
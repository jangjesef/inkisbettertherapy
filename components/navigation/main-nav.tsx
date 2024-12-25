"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Droplet } from "lucide-react";

export function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-neutral-100/50 backdrop-blur-md' : 'bg-neutral-100'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo left */}
        <Link href="/" className="flex items-center">
          <div className="w-8 h-8">
            <Droplet className="w-full h-full" />
          </div>
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center space-x-12">
          <Link
            href="/studio"
            className="text-xl text-black hover:opacity-70 transition"
          >
            Studio
          </Link>
          <Link
            href="/portfolio"
            className="text-xl text-black hover:opacity-70 transition"
          >
            Portfolio
          </Link>
          <Link 
            href="/" 
            className="text-2xl font-medium px-8 py-2 bg-black text-white rounded-full hover:opacity-90 transition flex flex-col items-center"
          >
            <span className="whitespace-nowrap text-lg">Ink is Better</span>
            <span className="text-sm opacity-70">than therapy</span>
          </Link>
          <Link
            href="/about"
            className="text-xl text-black hover:opacity-70 transition"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-xl text-black hover:opacity-70 transition"
          >
            Contact
          </Link>
        </div>

        {/* Logo right - hidden on mobile */}
        <Link href="/" className="hidden lg:flex items-center">
          <div className="w-8 h-8">
            <Droplet className="w-full h-full" />
          </div>
        </Link>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-neutral-100 px-6 py-4 space-y-4">
          <Link 
            href="/studio" 
            className="block text-xl text-black hover:opacity-70 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Studio
          </Link>
          <Link 
            href="/portfolio" 
            className="block text-xl text-black hover:opacity-70 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Portfolio
          </Link>
          <Link 
            href="/" 
            className="block text-xl text-black hover:opacity-70 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="font-medium">Ink is Better</span>
            <span className="text-sm opacity-70 ml-2">than therapy</span>
          </Link>
          <Link 
            href="/about" 
            className="block text-xl text-black hover:opacity-70 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="block text-xl text-black hover:opacity-70 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
} 
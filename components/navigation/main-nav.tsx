"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Droplet } from "lucide-react";
import { Logo } from "../logo";

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
        {/* Left droplet */}
        <div className="w-8 h-8">
          <Droplet className="w-full h-full" />
        </div>

        {/* Mobile menu button */}
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

        {/* Center content with navigation */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex items-center space-x-6">
            <Link
              href="/studio"
              className="text-lg text-black hover:text-black/70 transition-colors"
            >
              Studio
            </Link>
            <Link
              href="/portfolio"
              className="text-lg text-black hover:text-black/70 transition-colors"
            >
              Portfolio
            </Link>
          </div>
          
          <Link 
            href="/" 
            className="mx-8 text-2xl font-medium px-8 py-2 bg-black text-white rounded-full hover:opacity-90 transition"
          >
            <Logo size="sm" className="text-white" />
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link
              href="/about"
              className="text-lg text-black hover:text-black/70 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-lg text-black hover:text-black/70 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Right droplet */}
        <div className="w-8 h-8">
          <Droplet className="w-full h-full" />
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-neutral-100 px-6 py-4 space-y-4">
          <Link 
            href="/studio" 
            className="block text-xl text-black hover:text-black/70 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Studio
          </Link>
          <Link 
            href="/portfolio" 
            className="block text-xl text-black hover:text-black/70 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Portfolio
          </Link>
          <Link 
            href="/about" 
            className="block text-xl text-black hover:text-black/70 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="block text-xl text-black hover:text-black/70 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
} 
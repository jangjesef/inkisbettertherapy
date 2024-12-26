"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Droplet } from "lucide-react";
import { usePathname } from 'next/navigation';
import { Logo } from "../logo";

export function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isHomePage 
          ? 'bg-transparent' 
          : isScrolled 
            ? 'bg-white/50 backdrop-blur-md' 
            : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          {/* Left droplet as home button - visible on all screens */}
          <Link href="/" className="w-8 h-8 hover:opacity-70 transition-opacity relative z-[102]">
            <Droplet className="w-full h-full" />
          </Link>

          {/* Center content with navigation - hidden on mobile */}
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

          {/* Right droplet - only visible on desktop */}
          <div className="hidden lg:block w-8 h-8">
            <Droplet className="w-full h-full" />
          </div>

          {/* Mobile menu button - only visible on mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 relative z-[102]"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[98] lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile menu */}
      <div 
        className={`
          fixed top-0 right-0 bottom-0 w-[300px] bg-white shadow-lg z-[101]
          transform transition-transform duration-300 ease-in-out lg:hidden
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 p-6 pt-0 space-y-6">
            <Link 
              href="/" 
              className="block text-xl text-black hover:text-black/70 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
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
        </div>
      </div>
    </>
  );
} 
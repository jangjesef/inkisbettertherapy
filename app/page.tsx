"use client";
import { MainNav } from "@/components/navigation/main-nav";
import Hero from "@/components/home/hero";
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const heroElement = heroRef.current;
    if (!canvas || !heroElement) return;

    const updateCanvasSize = () => {
      const rect = heroElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      canvas.style.top = `${rect.top}px`;
      setCanvasSize({ width: rect.width, height: rect.height });
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 3;

    function draw(e: MouseEvent) {
      if (!isDrawingRef.current || !ctx || !canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();

      lastPosRef.current = { x, y };
    }

    function startDrawing(e: MouseEvent) {
      if (!canvas) return;
      isDrawingRef.current = true;
      const rect = canvas.getBoundingClientRect();
      lastPosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }

    function stopDrawing() {
      isDrawingRef.current = false;
    }

    function handleTouchStart(e: TouchEvent) {
      if (!canvas) return;
      isDrawingRef.current = true;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      lastPosRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    }

    function handleTouchMove(e: TouchEvent) {
      if (!isDrawingRef.current || !ctx || !canvas) return;
      e.preventDefault();

      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();

      lastPosRef.current = { x, y };
    }

    function handleTouchEnd() {
      isDrawingRef.current = false;
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#FF6EC7]">
      <div className="fixed top-0 left-0 right-0 z-50">
        <MainNav />
      </div>
      <div ref={heroRef} className="relative">
        <div className="relative z-20">
          <Hero />
        </div>
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="fixed z-30 tattoo-machine-cursor"
          style={{
            width: canvasSize.width,
            height: canvasSize.height,
            pointerEvents: 'all',
            top: '0px',
            bottom: '80px'
          }}
        />
        <div className="fixed bottom-0 left-0 right-0 z-40 no-drawing">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 sm:gap-6 lg:gap-0">
              <p className="text-black text-sm sm:text-base max-w-xl">
                Najdete nás na Mášova 8 v Brně. Jsme soukromé tetovací studio, kde tvoří Gabriela Gajdošová. Mrkněte na náš{' '}
                <a 
                  href="https://instagram.com/ink_is_better_than_therapy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-black hover:text-black/70"
                >
                  Instagram
                </a>
                {' '}nebo nám napište{' '}
                <a 
                  href="https://instagram.com/ink_is_better_than_therapy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-black hover:text-black/70"
                >
                  DM
                </a>.
              </p>
              <p className="text-black text-sm sm:text-base">
                {isMobile ? 'Touch and drag to draw' : 'Click and drag to draw'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

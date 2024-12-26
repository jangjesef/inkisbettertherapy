"use client";
import { MainNav } from "@/components/navigation/main-nav";
import Hero from "@/components/home/hero";
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Nastavení velikosti canvasu
    const updateCanvasSize = () => {
      const main = document.querySelector('main');
      if (!main) return;
      const { width, height } = main.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      setCanvasSize({ width, height });
    };

    updateCanvasSize();
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(document.querySelector('main')!);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Nastavení stylu čáry
    ctx.strokeStyle = '#000';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 2;

    function draw(e: MouseEvent) {
      if (!isDrawingRef.current || !ctx) return;

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

    // Event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-neutral-100">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="absolute inset-0 z-10 cursor-crosshair w-full h-full"
      />
      <div className="relative z-20">
        <MainNav />
        <Hero />
      </div>
    </main>
  );
}

"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
  alpha: number;
  radius: number;
  decay: number;
  growth: number;
}

export default function RainbowCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const hue = useRef(0);
  const raf = useRef<number | null>(null);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Resize canvas to full viewport ─────────────────────────────────
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── Spawn particles on mouse move ──────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      lastPos.current = { x: e.clientX, y: e.clientY };

      // More particles = faster movement
      const count = Math.min(Math.max(Math.floor(speed / 2), 2), 8);

      for (let i = 0; i < count; i++) {
        hue.current = (hue.current + 7) % 360;

        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          // Inherit some of the cursor velocity for trailing
          vx: (Math.random() - 0.5) * 1.8 + dx * 0.04,
          vy: -Math.random() * 2.5 - 0.8 + dy * 0.04,
          hue: hue.current,
          alpha: 0.75 + Math.random() * 0.25,
          radius: 2.5 + Math.random() * 4.5,
          // Slower decay = longer smoke trail
          decay: 0.012 + Math.random() * 0.012,
          // Particles grow slightly as they rise (smoke expansion)
          growth: 0.04 + Math.random() * 0.06,
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // ── Animation loop ─────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Remove dead particles
      particles.current = particles.current.filter((p) => p.alpha > 0.01);

      for (const p of particles.current) {
        // Physics
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.06;   // rising acceleration (smoke rises)
        p.vx *= 0.97;   // horizontal drag
        p.vy *= 0.98;   // vertical drag
        p.alpha -= p.decay;
        p.radius += p.growth; // expand as it rises

        if (p.alpha <= 0.01 || p.radius <= 0.1) continue;

        // ── Draw with rainbow radial gradient ─────────────────────────
        const grad = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.radius
        );
        grad.addColorStop(
          0,
          `hsla(${p.hue}, 100%, 68%, ${Math.min(p.alpha, 0.9)})`
        );
        grad.addColorStop(
          0.45,
          `hsla(${(p.hue + 40) % 360}, 100%, 62%, ${p.alpha * 0.55})`
        );
        grad.addColorStop(
          1,
          `hsla(${(p.hue + 80) % 360}, 100%, 68%, 0)`
        );

        // Soft glow for visibility on any background
        ctx.shadowBlur = p.radius * 1.5;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 65%, ${p.alpha * 0.4})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      raf.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
      aria-hidden
    />
  );
}

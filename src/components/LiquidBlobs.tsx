"use client";

import { motion } from "framer-motion";

// Matching the colorful paint/liquid blobs visible on toukoum.fr
// Pink-magenta, blue-violet, orange-coral, cyan-teal, yellow
const BLOBS = [
  {
    size: { w: 290, h: 260 },
    gradient: "radial-gradient(circle at 40% 40%, #fda4af 0%, #f43f5e 55%, #be123c 100%)",
    pos: { x: -150, y: 20 },
    anim: { x: [-150, -110, -175, -150], y: [20, -15, 45, 20] },
    duration: 9,
    delay: 0,
    opacity: { light: 0.55, dark: 0.3 },
  },
  {
    size: { w: 310, h: 280 },
    gradient: "radial-gradient(circle at 60% 30%, #c4b5fd 0%, #8b5cf6 50%, #5b21b6 100%)",
    pos: { x: 120, y: -70 },
    anim: { x: [120, 160, 100, 120], y: [-70, -110, -50, -70] },
    duration: 11,
    delay: 1.2,
    opacity: { light: 0.5, dark: 0.28 },
  },
  {
    size: { w: 230, h: 230 },
    gradient: "radial-gradient(circle at 50% 50%, #fdba74 0%, #fb923c 50%, #c2410c 100%)",
    pos: { x: 170, y: 80 },
    anim: { x: [170, 210, 150, 170], y: [80, 110, 60, 80] },
    duration: 8,
    delay: 2.1,
    opacity: { light: 0.5, dark: 0.28 },
  },
  {
    size: { w: 210, h: 210 },
    gradient: "radial-gradient(circle at 40% 60%, #a5f3fc 0%, #22d3ee 50%, #0e7490 100%)",
    pos: { x: -120, y: -85 },
    anim: { x: [-120, -80, -145, -120], y: [-85, -115, -65, -85] },
    duration: 10,
    delay: 0.6,
    opacity: { light: 0.45, dark: 0.25 },
  },
  {
    size: { w: 190, h: 190 },
    gradient: "radial-gradient(circle at 50% 50%, #fde68a 0%, #fbbf24 50%, #d97706 100%)",
    pos: { x: 60, y: 100 },
    anim: { x: [60, 100, 40, 60], y: [100, 130, 80, 100] },
    duration: 7.5,
    delay: 3,
    opacity: { light: 0.45, dark: 0.2 },
  },
];

interface LiquidBlobsProps {
  darkMode?: boolean;
}

export default function LiquidBlobs({ darkMode = false }: LiquidBlobsProps) {
  return (
    <div className="absolute inset-0 overflow-visible pointer-events-none" aria-hidden>
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 blur-[40px]"
          style={{
            width: blob.size.w,
            height: blob.size.h,
            background: blob.gradient,
            opacity: darkMode ? blob.opacity.dark : blob.opacity.light,
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            x: blob.anim.x,
            y: blob.anim.y,
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "40% 60% 60% 40% / 30% 60% 40% 70%",
              "30% 70% 70% 30% / 50% 40% 60% 50%",
              "70% 30% 40% 60% / 40% 70% 30% 60%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
            ],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            delay: blob.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

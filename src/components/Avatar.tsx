"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export type AvatarState = "idle" | "thinking" | "happy" | "talking";

interface AvatarProps {
  state?: AvatarState;
  size?: number;
}

// ── MEMOJI SETUP ────────────────────────────────────────────────────────────
// Drop your Memoji PNG at /public/memoji.png — auto-detected.
// Until then, the gradient orb placeholder is shown.
// ────────────────────────────────────────────────────────────────────────────

export default function Avatar({ state = "idle", size = 220 }: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className="relative select-none z-10 flex items-center justify-center"
      style={{ width: size, height: size }}
      animate={{
        y:
          state === "idle"
            ? [0, -12, 0]
            : state === "thinking"
            ? [0, -6, 0]
            : state === "happy"
            ? [0, -14, 0]
            : 0,
        rotate: state === "thinking" ? [-3, 3, -3] : 0,
        scale: state === "happy" ? [1, 1.06, 1.03] : 1,
      }}
      transition={{
        y: {
          duration: state === "happy" ? 2 : 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          duration: 1.5,
          repeat: state === "thinking" ? Infinity : 0,
          ease: "easeInOut",
        },
        scale: { duration: 0.5 },
      }}
    >
      {/* Thinking pulse ring */}
      {state === "thinking" && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: "2px solid rgba(99,102,241,0.5)" }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.7, 0.15, 0.7] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      )}

      {!imgError ? (
        // ── Real Memoji ─────────────────────────────────────────────────────
        <img
          src="/projects/me.png"
          alt="Lance's Memoji Avatar"
          onError={() => setImgError(true)}
          className="w-full h-full object-contain"
          style={{ filter: "drop-shadow(0px 16px 40px rgba(0,0,0,0.22))" }}
          draggable={false}
        />
      ) : (
        // ── Gradient orb placeholder ────────────────────────────────────────
        <div
          className="rounded-full flex items-center justify-center relative overflow-hidden"
          style={{
            width: size,
            height: size,
            background:
              "linear-gradient(135deg, #6366f1 0%, #8b5cf6 40%, #a855f7 72%, #ec4899 100%)",
            boxShadow: [
              `0 ${Math.round(size * 0.1)}px ${Math.round(size * 0.3)}px rgba(139,92,246,0.5)`,
              `0 ${Math.round(size * 0.02)}px ${Math.round(size * 0.08)}px rgba(0,0,0,0.2)`,
              "inset 0 1px 0 rgba(255,255,255,0.22)",
            ].join(", "),
          }}
        >
          {/* Top-left highlight shimmer */}
          <div
            className="absolute rounded-full bg-white/30"
            style={{
              width: size * 0.58,
              height: size * 0.28,
              top: size * 0.08,
              left: size * 0.1,
              filter: "blur(14px)",
            }}
          />
          {/* Initials */}
          <span
            className="relative z-10 font-black text-white select-none"
            style={{
              fontSize: size * 0.3,
              textShadow: "0 2px 18px rgba(0,0,0,0.3)",
              letterSpacing: "-0.03em",
            }}
          >
            LG
          </span>
          {/* Bottom shadow */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}
    </motion.div>
  );
}

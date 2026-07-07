"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, GraduationCap } from "lucide-react";

// ── DROP YOUR GRAD PIC ───────────────────────────────────────────────────────
// Save your photo as: /public/projects/grad pic.jpeg
// ────────────────────────────────────────────────────────────────────────────

const TAGS = [
  "Web Developer",
  "CS Student",
  "ML Engineer",
  "IoT",
  "Freelancer",
  "React.js",
];

export default function AboutCard() {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      className="w-full rounded-2xl overflow-hidden my-2
        bg-white dark:bg-zinc-900
        border border-black/[0.06] dark:border-zinc-800
        shadow-lg shadow-black/[0.06] dark:shadow-none"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
    >
      <div className="flex gap-4 p-4">
        {/* ── Grad Photo ─────────────────────────────────────────────── */}
        <div className="w-28 h-36 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-zinc-800">
          {!imgError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/P.jpeg"
              alt="Lance Geeffrey De Castro"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top"
              draggable={false}
            />
          ) : (
            /* Gradient placeholder if photo not found */
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
              }}
            >
              <span className="text-white font-black text-3xl opacity-40">LG</span>
            </div>
          )}
        </div>

        {/* ── Info ───────────────────────────────────────────────────── */}
        <div className="flex flex-col justify-center gap-2 min-w-0 flex-1">
          {/* Name */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-zinc-50 leading-tight">
              Lance Geeffrey S. De Castro
            </h3>

            {/* Age + Location */}
            <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 mt-1">
              <span className="text-xs text-gray-400 dark:text-zinc-500">
                23 years old
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-zinc-600" />
              <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-zinc-500">
                <MapPin size={10} />
                <span>Los Baños, Laguna, PH</span>
              </div>
            </div>

            {/* Education */}
            <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-400 dark:text-zinc-500">
              <GraduationCap size={10} />
              <span>BS Computer Science · LSPU 2026</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full leading-none
                  bg-indigo-50 dark:bg-indigo-950/40
                  text-indigo-600 dark:text-indigo-400
                  border border-indigo-100 dark:border-indigo-900/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom accent ─────────────────────────────────────────────── */}
      <div
        className="h-[3px] w-full"
        style={{
          background:
            "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, transparent 100%)",
        }}
      />
    </motion.div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

// ── HOW TO ADD YOUR SCREENSHOTS ─────────────────────────────────────────────
// 1. Create a folder: /public/projects/
// 2. Drop your screenshots there named exactly:
//      screenshot-1.jpg  ← Smart Parking System
//      screenshot-2.jpg  ← Tomato Disease Detection
//      screenshot-3.jpg  ← GoClinic Healthcare
// 3. The component will auto-detect and replace the gradient placeholder.
// ────────────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: 1,
    title: "Smart Parking System",
    category: "IoT · Real-Time",
    description:
      "IoT-based parking management with real-time sensor tracking and automated space allocation. Live occupancy dashboard.",
    screenshot: "/projects/smart parking.png",
    gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    gradientHover: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    badges: ["25–30 hrs saved/week", "Real-Time IoT", "Automated"],
    accent: "#6366f1",
    link: "#",
  },
  {
    id: 2,
    title: "Tomato Disease Detection",
    category: "Machine Learning · CV",
    description:
      "ML model for automated detection and classification of tomato plant diseases using computer vision. 92%+ accuracy.",
    screenshot: "/projects/tomato disease.png",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #c026d3 100%)",
    gradientHover: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
    badges: ["100% Automated", "92%+ Accuracy", "Python · TF"],
    accent: "#a855f7",
    link: "#",
  },
  {
    id: 3,
    title: "GoClinic Healthcare",
    category: "Full-Stack · Healthcare",
    description:
      "Full-stack healthcare platform for clinics and patients — appointment booking, patient management, provider dashboards.",
    screenshot: "/projects/goclinic.png",
    gradient: "linear-gradient(135deg, #047857 0%, #059669 100%)",
    gradientHover: "linear-gradient(135deg, #059669 0%, #34d399 100%)",
    badges: ["Live in Production", "Full-Stack", "React · PHP"],
    accent: "#10b981",
    link: "https://goclinic.ph/",
  },
];

type Project = (typeof PROJECTS)[0];

// ── Single card — uses hook for image error state ───────────────────────────
function ProjectCard({ p, i }: { p: Project; i: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.a
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl overflow-hidden cursor-pointer
        bg-white dark:bg-zinc-900/80
        border border-black/[0.06] dark:border-zinc-800
        hover:border-indigo-200/70 dark:hover:border-indigo-500/30
        hover:shadow-2xl hover:shadow-black/[0.08] dark:hover:shadow-none
        transition-all duration-300"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.09, type: "spring", stiffness: 280, damping: 28 }}
      whileHover={{ scale: 1.025, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* ── Screenshot / Gradient Placeholder ───────────────────────────── */}
      <div className="relative h-36 overflow-hidden bg-gray-100 dark:bg-zinc-800 flex-shrink-0">
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.screenshot}
            alt={p.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
          />
        ) : (
          /* Beautiful gradient placeholder — replace with your screenshot */
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: p.gradient }}
          >
            {/* Large faint number as texture */}
            <span
              className="font-black text-white/[0.12] select-none"
              style={{ fontSize: 88 }}
            >
              {String(p.id).padStart(2, "0")}
            </span>
            {/* Shimmer overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)",
              }}
            />
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Category badge */}
        <span className="absolute top-2.5 left-2.5 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-black/50 text-white/90 backdrop-blur-sm leading-none">
          {p.category}
        </span>

        {/* Add screenshot hint (only visible when placeholder is showing) */}
        {imgError && (
          <span className="absolute bottom-2.5 right-2.5 text-[9px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/60 backdrop-blur-sm border border-white/15">
            Add screenshot
          </span>
        )}
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[13px] font-bold text-gray-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug flex-1">
            {p.title}
          </h3>
          <ExternalLink
            size={11}
            className="text-gray-300 dark:text-zinc-600 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-0.5"
          />
        </div>

        <p className="text-[11px] text-gray-400 dark:text-zinc-500 leading-relaxed line-clamp-2">
          {p.description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-1 mt-auto pt-1.5">
          {p.badges.map((b) => (
            <span
              key={b}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full leading-none"
              style={{
                backgroundColor: `${p.accent}14`,
                color: p.accent,
                border: `1px solid ${p.accent}22`,
              }}
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* ── Bottom accent bar ─────────────────────────────────────────────── */}
      <div
        className="h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out flex-shrink-0"
        style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }}
      />
    </motion.a>
  );
}

// ── Main export ─────────────────────────────────────────────────────────────
export default function ProjectCards() {
  return (
    <motion.div
      className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 my-2"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {PROJECTS.map((p, i) => (
        <ProjectCard key={p.id} p={p} i={i} />
      ))}
    </motion.div>
  );
}

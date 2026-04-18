"use client";

import { motion } from "framer-motion";

const SHORTCUTS = [
  {
    id: "me",
    label: "About Me",
    emoji: "😊",
    message:
      "Tell me about yourself — who are you, what you do, and what makes you unique? SHOW_ABOUT",
  },
  {
    id: "projects",
    label: "Projects",
    emoji: "🚀",
    message: "Show me your best projects SHOW_PROJECTS",
  },
  {
    id: "skills",
    label: "Skills",
    emoji: "⚡",
    message: "What are your technical skills and what's your main tech stack?",
  },
  {
    id: "experience",
    label: "Experience",
    emoji: "💼",
    message:
      "Tell me about your work experience and what you've built professionally.",
  },
  {
    id: "contact",
    label: "Contact",
    emoji: "✉️",
    message:
      "How can I contact you or work with you? I'm interested in collaborating. SHOW_CONTACT",
  },
];

interface SuggestionChipsProps {
  onSelect: (message: string) => void;
  compact?: boolean;
}

export default function SuggestionChips({
  onSelect,
  compact = false,
}: SuggestionChipsProps) {
  return (
    <div
      className={`flex items-center justify-center flex-wrap gap-2 ${
        compact ? "px-2" : "px-4"
      }`}
    >
      {SHORTCUTS.map((s, i) => (
        <motion.button
          key={s.id}
          onClick={() => onSelect(s.message)}
          className={[
            "group flex flex-col items-center justify-center gap-1.5",
            "relative overflow-hidden",
            // Glass surface
            "backdrop-blur-md",
            "bg-white/75 dark:bg-zinc-900/50",
            "border border-black/[0.06] dark:border-white/[0.07]",
            "rounded-2xl cursor-pointer select-none",
            "shadow-sm shadow-black/[0.05] dark:shadow-none",
            // Hover
            "hover:bg-white dark:hover:bg-zinc-800/70",
            "hover:border-indigo-200/80 dark:hover:border-indigo-500/30",
            "hover:shadow-lg hover:shadow-indigo-500/[0.07]",
            // Tap
            "active:scale-[0.96]",
            // Transition
            "transition-all duration-200",
            compact
              ? "px-3 py-2 min-w-[56px]"
              : "px-5 py-3.5 min-w-[88px]",
          ].join(" ")}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.07,
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
        >
          <span
            className={
              compact ? "text-lg leading-none" : "text-2xl leading-none"
            }
          >
            {s.emoji}
          </span>
          <span
            className={[
              "font-semibold leading-none mt-0.5",
              "text-gray-500 dark:text-zinc-500",
              "group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
              "transition-colors duration-150",
              compact ? "text-[10px]" : "text-xs",
            ].join(" ")}
          >
            {s.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

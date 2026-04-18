"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer
        backdrop-blur-md
        bg-white/80 dark:bg-zinc-900/60
        border border-black/[0.06] dark:border-white/[0.08]
        hover:bg-white dark:hover:bg-zinc-800/80
        hover:border-indigo-200/70 dark:hover:border-indigo-500/30
        hover:shadow-md hover:shadow-black/[0.06]
        shadow-sm shadow-black/[0.04] dark:shadow-none
        transition-all duration-200"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        key={isDark ? "sun" : "moon"}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {isDark ? (
          <Sun size={15} className="text-amber-400" />
        ) : (
          <Moon size={15} className="text-indigo-500" />
        )}
      </motion.div>
    </motion.button>
  );
}

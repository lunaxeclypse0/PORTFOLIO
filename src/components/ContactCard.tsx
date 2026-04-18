"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Globe, Download } from "lucide-react";

const CONTACTS = [
  {
    id: "email",
    icon: Mail,
    label: "Email",
    value: "lancedecastro00000@gmail.com",
    href: "mailto:lancedecastro00000@gmail.com",
    color: "#6366f1",
  },
  {
    id: "linkedin",
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/lancedc",
    href: "https://www.linkedin.com/in/lancedc/",
    color: "#0a66c2",
  },
  {
    id: "portfolio",
    icon: Globe,
    label: "Portfolio",
    value: "lancedecastro.netlify.app",
    href: "https://lancedecastro.netlify.app",
    color: "#10b981",
  },
];

export default function ContactCard() {
  return (
    <motion.div
      className="w-full max-w-sm"
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
    >
      <div
        className="rounded-2xl overflow-hidden
          bg-white/90 dark:bg-zinc-800/70
          backdrop-blur-xl
          border border-black/[0.06] dark:border-white/[0.08]
          shadow-lg shadow-black/[0.06] dark:shadow-black/30"
      >
        {/* Header */}
        <div
          className="px-4 py-3 flex items-center gap-2"
          style={{
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          }}
        >
          <div className="w-8 h-8 rounded-xl overflow-hidden flex-shrink-0 bg-white/20 flex items-center justify-center">
            <span className="text-white font-black text-sm">LG</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">
              Lance Geeffrey De Castro
            </p>
            <p className="text-white/70 text-[11px]">
              Web Developer · Freelancer
            </p>
          </div>
        </div>

        {/* Contact links */}
        <div className="px-3 py-2 space-y-1">
          {CONTACTS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.a
                key={c.id}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl
                  hover:bg-black/[0.04] dark:hover:bg-white/[0.05]
                  transition-colors duration-150 group cursor-pointer"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${c.color}18` }}
                >
                  <Icon size={15} style={{ color: c.color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-medium uppercase tracking-wide leading-none mb-0.5">
                    {c.label}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-zinc-200 font-medium truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {c.value}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* CV Download */}
        <div className="px-3 pb-3">
          <motion.a
            href="/resume.pdf"
            download="Lance-De-Castro-CV.pdf"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4
              rounded-xl text-sm font-semibold text-white
              transition-all duration-200
              hover:opacity-90 active:scale-[0.97] cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
              boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={14} />
            Download CV / Resume
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

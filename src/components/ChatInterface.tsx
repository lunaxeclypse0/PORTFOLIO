"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ArrowUp, ArrowDown, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTheme } from "next-themes";
import Avatar, { AvatarState } from "./Avatar";
import LiquidBlobs from "./LiquidBlobs";
import SuggestionChips from "./SuggestionChips";
import ProjectCards from "./ProjectCards";
import AboutCard from "./AboutCard";
import ThemeToggle from "./ThemeToggle";
import {
  containsProjectTrigger,
  containsAboutTrigger,
  containsContactTrigger,
  cleanMessage,
} from "@/lib/utils";
import ContactCard from "./ContactCard";

const ROLES = ["Web Developer", "CS Student", "ML Engineer", "Problem Solver"];

// ── Typing indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <motion.div
      className="flex items-end gap-2.5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-[11px] font-black flex-shrink-0 shadow-md"
        style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
      >
        L
      </div>
      <div
        className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-sm
          bg-white/90 dark:bg-zinc-800/70
          backdrop-blur-md border border-black/[0.05] dark:border-zinc-800 shadow-sm"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-indigo-400"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── Message bubble ────────────────────────────────────────────────────────────
function MessageBubble({
  role,
  content,
  showProjects,
  showAbout,
  showContact,
}: {
  role: "user" | "assistant";
  content: string;
  showProjects?: boolean;
  showAbout?: boolean;
  showContact?: boolean;
}) {
  const isUser = role === "user";
  const clean = cleanMessage(content);
  if (!clean && !showProjects && !showAbout && !showContact) return null;

  return (
    <motion.div
      className={`flex items-end gap-2.5 w-full ${isUser ? "flex-row-reverse" : ""}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
    >
      {/* AI avatar badge */}
      {!isUser && (
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-[11px] font-black flex-shrink-0 mb-0.5 shadow-md"
          style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
        >
          L
        </div>
      )}

      <div
        className={`flex flex-col gap-2 ${
          isUser ? "items-end max-w-[78%]" : "items-start flex-1 min-w-0"
        }`}
      >
        {/* About card (shown before text) */}
        {showAbout && (
          <div className="w-full">
            <AboutCard />
          </div>
        )}

        {clean && (
          <div
            className={`px-4 py-3 text-sm leading-relaxed ${
              isUser
                ? "text-white rounded-2xl rounded-br-sm shadow-md"
                : "bg-white/90 dark:bg-zinc-800/70 backdrop-blur-md border border-black/[0.05] dark:border-zinc-800 text-gray-800 dark:text-zinc-100 rounded-2xl rounded-bl-sm shadow-sm"
            }`}
            style={
              isUser
                ? { background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" }
                : undefined
            }
          >
            <div className="prose-chat dark:text-zinc-100">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{clean}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* Project cards */}
        {showProjects && (
          <div className="w-full">
            <ProjectCards />
          </div>
        )}

        {/* Contact card */}
        {showContact && (
          <div className="w-full">
            <ContactCard />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Error banner ──────────────────────────────────────────────────────────────
function ErrorBanner({ message }: { message: string }) {
  return (
    <motion.div
      className="flex items-start gap-2.5 ml-9"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-2xl rounded-bl-sm
          backdrop-blur-md border border-red-200/60 dark:border-red-900/40
          text-sm text-red-600 dark:text-red-400 shadow-sm"
        style={{ background: "rgba(254,242,242,0.8)" }}
      >
        <AlertCircle size={14} className="flex-shrink-0" />
        <span>
          {message.includes("404") || message.includes("model")
            ? "AI model unavailable — check your API key and try again."
            : `Something went wrong: ${message}`}
        </span>
      </div>
    </motion.div>
  );
}

// ── Main ChatInterface ────────────────────────────────────────────────────────
export default function ChatInterface() {
  const { theme, resolvedTheme } = useTheme();
  const isDark = (resolvedTheme ?? theme) === "dark";

  const [avatarState, setAvatarState] = useState<AvatarState>("idle");
  const [isChat, setIsChat] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    append,
  } = useChat({
    api: "/api/chat",
    onResponse: () => setAvatarState("talking"),
    onFinish: () => {
      setAvatarState("happy");
      setTimeout(() => setAvatarState("idle"), 2500);
    },
    onError: () => setAvatarState("idle"),
  });

  // Role cycling
  useEffect(() => {
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 3200);
    return () => clearInterval(t);
  }, []);

  // Switch to chat view
  useEffect(() => {
    if (messages.length > 0 && !isChat) setIsChat(true);
  }, [messages, isChat]);

  // Avatar while streaming
  useEffect(() => {
    if (isLoading) setAvatarState("thinking");
  }, [isLoading]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Scroll button visibility
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const h = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 100);
    };
    el.addEventListener("scroll", h, { passive: true });
    return () => el.removeEventListener("scroll", h);
  }, [isChat]);

  // FIXED: append for shortcuts — no React state timing race
  const handleShortcut = useCallback(
    (message: string) => {
      append({ role: "user", content: message });
    },
    [append]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    setIsTyping(e.target.value.length > 0);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    setIsTyping(false);
    handleSubmit(e);
  };

  // ── Shared glassmorphism input bar ──────────────────────────────────────
  const InputBar = (
    <form onSubmit={onSubmit} className="w-full">
      <div
        className="flex items-center gap-3 rounded-2xl px-5 py-3
          backdrop-blur-xl
          border border-black/[0.06] dark:border-white/[0.08]
          shadow-lg shadow-black/[0.04] dark:shadow-none
          focus-within:shadow-xl focus-within:shadow-indigo-500/[0.07]
          focus-within:border-indigo-300/70 dark:focus-within:border-indigo-500/30
          transition-all duration-300"
        style={{
          background: isDark
            ? "rgba(18,18,18,0.75)"
            : "rgba(255,255,255,0.82)",
        }}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={onInputChange}
          onFocus={() => setIsTyping(input.length > 0)}
          onBlur={() => setIsTyping(false)}
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent text-sm text-gray-800 dark:text-zinc-100
            placeholder:text-gray-400 dark:placeholder:text-zinc-500 outline-none min-w-0"
          disabled={isLoading}
          autoComplete="off"
        />
        <motion.button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0
            text-white cursor-pointer
            disabled:opacity-25 disabled:cursor-not-allowed
            transition-opacity duration-150"
          style={{
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            boxShadow: "0 4px 14px rgba(99,102,241,0.45)",
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          {isChat
            ? <ArrowUp size={15} />
            : <Send size={14} className="translate-x-[1px]" />
          }
        </motion.button>
      </div>
    </form>
  );

  // ══════════════════════════════════════════════════════════════════════════
  // HERO VIEW
  // ══════════════════════════════════════════════════════════════════════════
  if (!isChat) {
    return (
      <div
        className="relative min-h-[100dvh] flex flex-col items-center overflow-hidden"
        style={{
          background: isDark
            ? `radial-gradient(ellipse 120% 50% at 50% -10%, rgba(99,102,241,0.14) 0%, transparent 60%), #0a0a0a`
            : `radial-gradient(ellipse 120% 50% at 50% -10%, rgba(99,102,241,0.08) 0%, rgba(255,255,255,1) 60%)`,
        }}
      >
        {/* Watermark */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden"
          aria-hidden
        >
          <p
            className="text-center font-black leading-[0.85] tracking-tighter whitespace-nowrap"
            style={{
              fontSize: "clamp(72px, 18vw, 200px)",
              color: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.032)",
            }}
          >
            DE&nbsp;CASTRO
          </p>
        </div>

        {/* ── Top bar ──────────────────────────────────────────────────── */}
        <div className="w-full max-w-lg flex items-center justify-between px-5 pt-5 z-10">
          <div className="w-9" />
          {/* Gradient monogram logo */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center select-none"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              boxShadow: "0 4px 16px rgba(99,102,241,0.38)",
            }}
          >
            <span className="text-white font-black text-sm tracking-tight">L</span>
          </div>
          <ThemeToggle />
        </div>

        {/* ── Greeting + Cycling title ─────────────────────────────────── */}
        <div className="text-center mt-5 px-4 z-10">
          <motion.p
            className="text-base font-medium text-gray-500 dark:text-zinc-400"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Hey, I&apos;m Lance 👋
          </motion.p>

          <div
            className="font-black text-gray-900 dark:text-white tracking-tighter overflow-hidden mt-0.5"
            style={{
              fontSize: "clamp(2.6rem, 9vw, 5.5rem)",
              lineHeight: 1.05,
              height: "1.1em",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                className="block"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Avatar + Blobs + Golden glow ─────────────────────────────── */}
        <div className="relative w-full max-w-lg h-[260px] md:h-[300px] flex items-center justify-center mt-2 z-10">
          <LiquidBlobs darkMode={isDark} />

          {/* Golden glow when typing */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: 180,
              height: 180,
              background:
                "radial-gradient(circle, rgba(251,191,36,0.95) 0%, rgba(245,158,11,0.45) 55%, transparent 75%)",
              filter: "blur(26px)",
            }}
            animate={{ opacity: isTyping ? 1 : 0, scale: isTyping ? 1.6 : 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          <Avatar state={avatarState} size={210} />
        </div>

        {/* ── Input ────────────────────────────────────────────────────── */}
        <div className="w-full max-w-[490px] px-4 mt-2 z-10">
          {InputBar}
        </div>

        {/* ── Shortcut cards ───────────────────────────────────────────── */}
        <div className="mt-4 pb-10 z-10 w-full">
          <SuggestionChips onSelect={handleShortcut} />
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // CHAT VIEW  — smokey purple background, minimal floating header
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div
      className="flex flex-col h-[100dvh]"
      style={{
        background: isDark
          ? `radial-gradient(ellipse 120% 45% at 50% 0%, rgba(99,102,241,0.13) 0%, transparent 65%),
             radial-gradient(ellipse 70% 40% at 90% 100%, rgba(139,92,246,0.08) 0%, transparent 60%),
             #0d0d0d`
          : `radial-gradient(ellipse 120% 45% at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 65%),
             radial-gradient(ellipse 70% 40% at 90% 100%, rgba(139,92,246,0.05) 0%, transparent 60%),
             #f8f8ff`,
      }}
    >
      {/* ── Header — memoji + toggle only, no text, smokey ───────────── */}
      <motion.header
        className="flex-shrink-0 z-20"
        style={{
          background: isDark
            ? "linear-gradient(180deg, rgba(13,13,13,0.88) 0%, rgba(13,13,13,0.0) 100%)"
            : "linear-gradient(180deg, rgba(248,248,255,0.9) 0%, rgba(248,248,255,0.0) 100%)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3">
          {/* Memoji — no text, no label */}
          <div
            className="w-10 h-10 rounded-full overflow-hidden shadow-lg flex-shrink-0"
            style={{
              boxShadow: "0 0 0 2px rgba(255,255,255,0.18), 0 4px 16px rgba(0,0,0,0.18)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/projects/mem.jpg"
              alt="Lance"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
          <ThemeToggle />
        </div>
      </motion.header>

      {/* ── Messages ─────────────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="max-w-3xl mx-auto px-4 py-5 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                role={msg.role as "user" | "assistant"}
                content={msg.content}
                showAbout={
                  msg.role === "assistant" && containsAboutTrigger(msg.content)
                }
                showProjects={
                  msg.role === "assistant" && containsProjectTrigger(msg.content)
                }
                showContact={
                  msg.role === "assistant" && containsContactTrigger(msg.content)
                }
              />
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {isLoading && <TypingIndicator key="typing" />}
          </AnimatePresence>

          <AnimatePresence>
            {error && <ErrorBanner key="error" message={error.message} />}
          </AnimatePresence>

          <div ref={messagesEndRef} className="h-1" />
        </div>
      </div>

      {/* Scroll-to-bottom */}
      <AnimatePresence>
        {showScrollBtn && (
          <motion.button
            onClick={() =>
              messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="absolute bottom-40 right-6 w-8 h-8 rounded-full
              backdrop-blur-md
              border border-black/[0.06] dark:border-zinc-800
              shadow-md flex items-center justify-center
              text-gray-400 hover:text-indigo-500
              transition-colors cursor-pointer z-20"
            style={{
              background: isDark
                ? "rgba(18,18,18,0.8)"
                : "rgba(255,255,255,0.85)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <ArrowDown size={13} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Bottom bar — glassmorphism ────────────────────────────────── */}
      <div
        className="flex-shrink-0 z-20 backdrop-blur-2xl
          border-t border-black/[0.04] dark:border-white/[0.04]"
        style={{
          background: isDark
            ? "rgba(13,13,13,0.85)"
            : "rgba(248,248,255,0.88)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 pt-3 pb-4 space-y-3">
          {InputBar}
          <SuggestionChips onSelect={handleShortcut} compact />
        </div>
      </div>
    </div>
  );
}

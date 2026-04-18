# Lance Geeffrey — Interactive AI Portfolio

AI-powered interactive portfolio website. Visitors chat with an AI avatar
that answers questions about Lance's projects, skills, and experience.

Inspired by the "AI-native portfolio" style of [toukoum.fr](https://www.toukoum.fr/).

---

## Features

- **AI Avatar** — Animated SVG character with idle breathing, blink, thinking, and happy states
- **Streaming Chat** — Vercel AI SDK with Groq Llama-3.1-70B or OpenAI GPT-4o-mini
- **Inline Project Cards** — Auto-displayed when projects are mentioned
- **Suggestion Chips** — Quick-start prompts on load
- **Mouse Gradient** — Rainbow liquid gradient following cursor, fades on inactivity
- **Liquid Splash** — Click anywhere for a colorful splash effect
- **Light / Dark Mode** — Toggle with smooth transition
- **Fully Responsive** — Works on mobile, tablet, desktop

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure your AI key

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API key:

```env
# Groq (recommended — free tier, fastest)
GROQ_API_KEY=your_groq_api_key_here

# OR OpenAI fallback
# OPENAI_API_KEY=your_openai_api_key_here
```

Get a free Groq key at: https://console.groq.com/keys

### 3. Run locally

```bash
npm run dev
```

Open http://localhost:3000

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          — Root layout with ThemeProvider + fonts
│   ├── page.tsx            — Entry point (Server Component)
│   ├── globals.css         — Design tokens, scrollbar, grain overlay
│   └── api/chat/
│       └── route.ts        — Streaming AI endpoint (Groq / OpenAI)
├── components/
│   ├── ChatInterface.tsx   — Main chat UI with all states
│   ├── Avatar.tsx          — Animated SVG avatar character
│   ├── ProjectCards.tsx    — Inline project cards (shown in chat)
│   ├── SuggestionChips.tsx — Quick-start prompt chips
│   ├── ThemeToggle.tsx     — Light/dark mode button
│   └── MouseGradient.tsx   — Rainbow gradient + splash effects
└── lib/
    ├── prompt.ts           — Full AI system prompt (Lance's knowledge base)
    └── utils.ts            — cn() helper + project trigger detection
```

---

## Customization

### Update the AI Knowledge Base
Edit `src/lib/prompt.ts` — update Lance's info, projects, contact links, etc.

### Swap Project Screenshots
In `src/components/ProjectCards.tsx`, replace `picsum.photos` URLs with your
actual screenshot URLs:

```tsx
image: "/screenshots/smart-parking.png",  // place in /public/screenshots/
```

### Change the Accent Color
In `src/app/globals.css`:
```css
:root {
  --accent: #22d3ee;  /* swap to your color */
}
```

### Add Your Calendly Link
In `src/lib/prompt.ts`, update the Contact section:
```
Book a call: https://calendly.com/your-link
```

---

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Then add your environment variable in Vercel Dashboard:
- `GROQ_API_KEY` or `OPENAI_API_KEY`

---

## Deploy to Render (alternative)

1. Push to GitHub
2. New Web Service → connect repo
3. Build Command: `npm install && npm run build`
4. Start Command: `npm start`
5. Add Environment Variable: `GROQ_API_KEY`
6. Deploy

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 15 (App Router) |
| AI Streaming | Vercel AI SDK v4 |
| LLM | Groq Llama-3.1-70B / OpenAI GPT-4o-mini |
| Animations | Framer Motion |
| Styling | Tailwind CSS v3 |
| Theming | next-themes |
| Icons | Lucide React |
| Markdown | react-markdown + remark-gfm |

---

## Design Guidelines

See `CLAUDE.md` at the project root for complete design system rules
(typography, color, motion, layout, forbidden patterns).

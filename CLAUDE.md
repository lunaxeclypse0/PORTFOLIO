# CLAUDE.md — Project Design & Engineering Guidelines

This file defines the design system, aesthetic standards, and engineering rules for this project. All frontend work must adhere to these guidelines without exception.

---

## 1. Active Baseline Configuration

These values drive all design decisions globally. Do not deviate unless the user explicitly overrides them.

| Variable | Value | Scale |
|---|---|---|
| `DESIGN_VARIANCE` | **8** | 1 = Perfect Symmetry → 10 = Artsy Chaos |
| `MOTION_INTENSITY` | **6** | 1 = Static → 10 = Cinematic/Magic Physics |
| `VISUAL_DENSITY` | **4** | 1 = Art Gallery/Airy → 10 = Pilot Cockpit/Packed |

---

## 2. Design Thinking — Before Every Component

Before writing a single line of code, answer these:

- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Commit to a bold aesthetic direction — brutally minimal, editorial, industrial, retro-futuristic, organic, etc. No hedging.
- **Differentiation**: What is the one thing someone will remember about this UI?

**CRITICAL**: Execute the chosen direction with precision and intentionality. Bold maximalism and refined minimalism both work — the key is full commitment.

---

## 3. Default Architecture & Conventions

### Stack
- **Framework**: React or Next.js. Default to Server Components (RSC).
  - `'use client'` is required for all interactive components (motion, state, event handlers).
  - Wrap providers in a dedicated `'use client'` component — never pollute RSC trees.
- **Styling**: Tailwind CSS (v3 or v4 — check `package.json` before assuming version).
  - v4 projects: use `@tailwindcss/postcss` in PostCSS config, NOT the `tailwindcss` plugin.
- **State**: `useState`/`useReducer` for local UI. Global state only to prevent deep prop-drilling.
- **Icons**: `@phosphor-icons/react` or `@radix-ui/react-icons`. Standardize `strokeWidth` to `1.5` or `2.0` globally.

### Dependency Rule — MANDATORY
Before importing any third-party library, check `package.json`. If the package is absent, output the install command before the code. Never assume a library is installed.

### Layout & Spacing
- Page containers: `max-w-[1400px] mx-auto` or `max-w-7xl`.
- Full-height hero sections: always `min-h-[100dvh]` — **never** `h-screen` (breaks iOS Safari).
- Multi-column layouts: always CSS Grid (`grid grid-cols-1 md:grid-cols-3 gap-6`) — never flex percentage math (`w-[calc(33%-1rem)]`).
- Asymmetric layouts above `md:` must collapse to single-column (`w-full`, `px-4`, `py-8`) on mobile.

---

## 4. Typography Rules

### Headlines / Display
- Size: `text-4xl md:text-6xl tracking-tighter leading-none`
- Approved fonts: `Geist`, `Outfit`, `Cabinet Grotesk`, `Satoshi`
- **Banned**: `Inter`, `Roboto`, `Arial`, system fonts — no exceptions

### Body / Paragraphs
- `text-base text-gray-600 leading-relaxed max-w-[65ch]`

### Dashboard / Software UI
- Serif fonts are **strictly banned**. Use exclusively: `Geist` + `Geist Mono`, or `Satoshi` + `JetBrains Mono`
- Numbers in high-density views (`VISUAL_DENSITY > 7`): `font-mono` mandatory

### Forbidden Typography Patterns
- No oversized H1s that "scream" — control hierarchy with weight and color contrast
- No gradient text fills on large headers
- No generic copywriting: "Elevate", "Seamless", "Unleash", "Next-Gen" — use concrete verbs

---

## 5. Color & Theme Rules

- Maximum **1 accent color** per project. Saturation < 80%.
- Base palette: absolute neutrals (Zinc/Slate) with a single high-contrast accent (Emerald, Electric Blue, or Deep Rose).
- **Banned** — the AI purple/blue aesthetic: no purple button glows, no neon gradients.
- Never use pure `#000000`. Use `zinc-950`, off-black, or charcoal.
- No oversaturated accents — desaturate to blend with neutrals.
- Warm and cool grays must not be mixed within the same project. Pick one and stick.
- Use CSS variables for all theme tokens to enforce consistency.

---

## 6. Layout Diversification

- **Centered hero sections are banned** when `DESIGN_VARIANCE > 4`. Use instead:
  - Split Screen (50/50)
  - Left content / Right asset
  - Asymmetric whitespace
- **3-equal-card horizontal rows are banned**. Use instead:
  - 2-column zig-zag
  - Asymmetric grid
  - Horizontal scrolling strip
- Cards should communicate elevation and hierarchy — not act as default containers for every element. Use `border-t`, `divide-y`, or negative space instead.

---

## 7. Motion & Animation

### CSS Motion (MOTION_INTENSITY 4–7)
- Default easing: `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`
- Load-in cascades: `animation-delay: calc(var(--index) * 100ms)`
- Animate only `transform` and `opacity` — never `top`, `left`, `width`, `height`
- Use `will-change: transform` sparingly

### Framer Motion (MOTION_INTENSITY ≥ 6)
- All interactive elements: `type: "spring", stiffness: 100, damping: 20` — no linear easing
- Use `layout` and `layoutId` for smooth re-ordering and shared element transitions
- Staggered lists: use `staggerChildren` — parent and children must live in the same Client Component tree
- Infinite/perpetual animations must be isolated in their own `React.memo` Client Components — never trigger parent re-renders
- Magnetic buttons: use `useMotionValue` + `useTransform` — **never** `useState` for cursor tracking

### Performance Rules
- Grain/noise filters: apply only to `fixed`, `pointer-events-none` pseudo-elements — never on scrolling containers
- `useEffect` animations must include strict cleanup functions
- Never use `window.addEventListener('scroll')` — use Framer Motion scroll hooks
- GSAP/ThreeJS and Framer Motion must never coexist in the same component tree

---

## 8. Interactive States — Mandatory

Never ship a component in only its "success" state. Every component requires:

- **Loading**: Skeletal loaders matching actual layout proportions (no generic spinners)
- **Empty**: A beautifully composed empty state that guides the user to populate data
- **Error**: Clear inline error reporting, especially on forms
- **Tactile Feedback**: On `:active`, apply `-translate-y-[1px]` or `scale-[0.98]`

---

## 9. Forms & Data Patterns

- Label always sits **above** input
- Helper text is optional but must exist in markup
- Error text appears **below** input
- Consistent `gap-2` between label → input → error blocks

---

## 10. Visual Effects & Materiality

### Glassmorphism
- Go beyond `backdrop-blur`: add `border-white/10` inner border + `shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]` for physical edge refraction

### Shadows
- Tint shadows to the background hue — never use default gray box shadows
- Preferred depth: `shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]`
- Z-index is reserved for systemic layers (sticky navbars, modals, overlays) — never `z-50` arbitrarily

### Backgrounds
- Avoid flat solid colors — create atmosphere via gradient meshes, noise textures, geometric patterns, layered transparencies
- Use `rounded-[2.5rem]` for major containers in Bento-style layouts
- Cards in Bento grids: pure white `#ffffff`, `border-slate-200/50` 1px border, labels placed outside and below

---

## 11. Forbidden Patterns ("AI Tells")

These patterns are banned unconditionally:

| Category | Banned |
|---|---|
| Fonts | `Inter`, `Roboto`, `Arial`, system fonts |
| Color | Purple/blue AI gradients, neon glows, pure `#000000` |
| Layout | Centered hero (DESIGN_VARIANCE > 4), 3-equal-card rows |
| Motion | Linear easing, `useState` for magnetic hover, `window.scroll` |
| Shadow | Default outer box-shadow glows |
| Typography | Gradient text on large headers, oversized screaming H1s |
| Cursors | Custom mouse cursors (performance + accessibility) |
| Placeholder data | "John Doe", "Acme", `99.99%`, generic SVG avatar icons |
| Images | Unsplash links — use `https://picsum.photos/seed/{string}/800/600` instead |
| Emojis | **Completely banned** — use Phosphor/Radix icons or clean SVG |
| Components | Generic shadcn/ui without customized radii, colors, and shadows |

---

## 12. Bento Grid / SaaS Dashboard Paradigm

When building dashboards or feature sections:

- Background: `#f9fafb`, cards: `#ffffff`
- Borders: `border-slate-200/50` at 1px
- Containers: `rounded-[2.5rem]`, padding: `p-8` or `p-10`
- Diffusion shadow: `shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]`
- Every card must have a perpetual micro-animation (Pulse, Typewriter, Float, or Carousel)
- Typography: `Geist`, `Satoshi`, or `Cabinet Grotesk` with `tracking-tight` headers
- Titles and descriptions: placed **outside and below** cards, not inside

### Card Archetypes (5 Core Patterns)
1. **Intelligent List**: Infinite auto-sorting with `layoutId` position swaps
2. **Command Input**: Typewriter cycling through prompts with blinking cursor + shimmer loading
3. **Live Status**: Breathing indicators + overshoot-spring notification badge
4. **Data Stream**: Seamless infinite horizontal carousel (`x: ["0%", "-100%"]`)
5. **Focus Mode**: Staggered text highlight + float-in action toolbar

---

## 13. Pre-Flight Checklist

Before every output, verify:

- [ ] Global state is used only to prevent deep prop-drilling, not arbitrarily
- [ ] Mobile layout collapse (`w-full`, `px-4`, `max-w-7xl mx-auto`) guaranteed for DESIGN_VARIANCE ≥ 4
- [ ] Full-height sections use `min-h-[100dvh]`, not `h-screen`
- [ ] `useEffect` animations have cleanup functions
- [ ] Empty, loading, and error states are all implemented
- [ ] Cards are omitted in favor of spacing where elevation is not functionally needed
- [ ] Perpetual animations are isolated in memoized Client Components
- [ ] No banned fonts, colors, layout patterns, or placeholder data used
- [ ] All third-party dependencies verified against `package.json`

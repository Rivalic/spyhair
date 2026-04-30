## Goal

Revert from the stark black & white palette back to the original premium dark + gold aesthetic, then layer in a small, curated set of complementary accent colors so the brutalist blocks feel rich and intentional instead of plain.

## Palette

Base (restored from original):
- Background: deep near-black (`0 0% 4%`)
- Foreground / text: warm ivory (`45 20% 95%`)
- Card surface: charcoal (`0 0% 7%`)
- Borders: gold (`43 74% 49%`) — replacing pure black so brutalist borders glow against the dark bg

New aesthetic accents (used sparingly on blocks, badges, tags):
- Primary gold: `43 74% 49%` (signature)
- Champagne: `38 45% 78%` (soft warm highlight)
- Burgundy / oxblood: `350 55% 32%` (deep counterpoint)
- Forest emerald: `155 40% 30%` (cool balance)
- Dusty terracotta: `15 55% 55%` (warm accent)

These five form a small, cohesive palette — not rainbow brutalism. Each has a paired foreground (ivory or deep-black) for contrast.

## Changes

1. **`src/index.css`** — replace the black/white `:root` tokens with the dark + gold palette above. Add new tokens: `--champagne`, `--burgundy`, `--emerald`, `--terracotta` (plus `-foreground` pairs). Update `--shadow-brutal*` to cast in gold (`hsl(43 74% 49%)`) on dark backgrounds so shadows read against the near-black bg. Keep `--radius: 0`, keep brutalist utilities (`.shadow-brutal`, `.border-brutal`, `.bg-dots`, `.bg-stripes`).

2. **`tailwind.config.ts`** — extend `colors` with the new accent tokens (`champagne`, `burgundy`, `emerald`, `terracotta`) so they're usable as `bg-burgundy`, `text-champagne`, etc.

3. **`src/components/HeroSection.tsx`** — re-color the three stat blocks and badges using the new palette (e.g. gold / burgundy / emerald instead of pink / cyan / yellow). Headline highlight block becomes gold; "NEW DROP" tag becomes champagne.

4. **`src/components/ProductsSection.tsx`** — rotate product card backgrounds through `bg-card`, `bg-burgundy`, `bg-emerald`, `bg-terracotta` (with appropriate ivory text) instead of the old neon set. Section background goes back to deep dark.

5. **Buttons (`src/components/ui/button.tsx`)** — keep brutalist press behavior; switch `gold` variant back to solid gold on dark, `goldOutline` to ivory border on transparent. Default variant uses gold.

No other files need edits — every other section reads from the design tokens and will inherit the new palette automatically.

## Result

Dark luxurious base returns. Brutalist structure (chunky borders, hard offset shadows, Archivo Black headings, sharp corners) is preserved. The five-color accent set gives variety without looking chaotic — gold leads, with burgundy / emerald / terracotta / champagne as supporting blocks.
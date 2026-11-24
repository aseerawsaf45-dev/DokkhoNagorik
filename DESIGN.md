# DESIGN.md — DokkhoNagorik Design System

## Atmosphere & Philosophy
- **Density:** Cockpit Balanced (6/10). Dense, information-rich tables and metrics, but with breathable micro-whitespace.
- **Variance:** Offset Asymmetric (7/10). Creative grid hierarchy, inline image typography in hero, editorial section headers.
- **Motion:** Spring Physics Micro-Interactions (6/10). Perpetual pulse on live statuses, smooth tab transitions, zero gaudy glows.

## Color Calibration (Zinc Neutral + Electric Cobalt)
- **Primary Background:** `#FAF9F6` (Warm Paper) & `#FFFFFF` (Surface)
- **Secondary Surface:** `#F3F4F6` (Zinc Raised)
- **Hairlines & Borders:** `rgba(15, 23, 42, 0.08)` (Tactile, crisp)
- **Primary Text:** `#0F172A` (Slate 900)
- **Secondary Text:** `#475569` (Slate 600)
- **Muted Text:** `#64748B` (Slate 500)
- **Brand Accent:** `#3B82F6` / `#2563EB` (Cobalt Blue, 75% saturation, AA contrast compliant)
- **Success / Escrow Verified:** `#059669` (Emerald 600)
- **Banned:** Neon gradients, violet/pink glows, purple buttons, low-contrast gray-on-gray.

## Typography Architecture
- **Display & Headlines:** Geist / Cabinet Grotesk (tracking -0.03em, tight leading 1.05). Inline micro-images between headline words.
- **Body:** Geist Sans (14px, leading 1.6, max 65ch per line).
- **Data & Numbers:** Geist Mono / JetBrains Mono (tabular figures for all currencies, timelines, and match scores).

## Component Directives
- **Buttons:** 44px hero buttons, 36px interface buttons. Tactile top hairline `inset 0 1px 0 rgba(255,255,255,0.15)`.
- **Cards:** Hairline border `border-slate-200/80`, 14px radius, subtle 1px depth shadow.
- **Keycaps & Tags:** Monospace pills with 1px border.

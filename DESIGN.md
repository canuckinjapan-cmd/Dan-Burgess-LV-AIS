# Design System Specification (DESIGN.md)

## 🎯 Brand Identity
**"Bridging Western minimalism and Japanese trust-based design."**
The "Ver. 2" aesthetic is inspired by high-end editorial layouts—think premium broadsheet newspapers or architectural monographs. It balances the warmth of tactile paper with the precision of digital ink.

## 🎨 Color Tokens
| Token | HSL / Hex | Usage |
| :--- | :--- | :--- |
| `--background` | `36 25% 96%` (#F7F3EC) | Warm paper base. |
| `--foreground` | `220 15% 9%` | Primary ink color for text and borders. |
| `--accent-brand`| `19 100% 56%` (#FF6A1F) | Signature orange for CTAs, highlights, and drop-caps. |
| `--surface-elevated`| `0 0% 100%` | High-contrast card backgrounds. |
| `--rule` | `220 15% 9%` / 12% opacity | Hairline borders for structure. |

## 🖋️ Typography
| Role | Family | Weights | Details |
| :--- | :--- | :--- | :--- |
| **Display (Serif)** | `Fraunces` | 100-900 | Soft, high-personality headers. Often paired with `tracking-tight`. |
| **Body (Sans)** | `Inter` | 100-900 | High legibility for bilingual content. Handles EN/JP pairing gracefully. |
| **Monospace** | `JetBrains Mono`| 400-800 | Technical data, tool stacks, and "Plate" identification labels. |
| **Japanese** | `Noto Sans JP` | 100-900 | Matched with Inter for a unified sans-serif look. |

## 📐 Layout & Spacing
- **Grid Strategy**: 12-column desktop grid with a `max-w-7xl` container.
- **Borders**: Sharp 0.25rem radius (`--radius`) for cards, combined with `rule` (12% ink) borders.
- **Paper Texture**: A subtle radial gradient grain is applied via `.bg-paper` for tactile depth.
- **Drop-cap**: Editorial start for the "About" section using `Fraunces` and `accent-brand` color.

## 🎞️ Component Patterns

### 1. Portrait Plate
- **Interaction**: Features a timed transition from photo to manga illustration.
- **Hover**: Subject to a clockwise rotation (2 degrees) with a smooth `easeInOut` transition.

### 2. Case Study Cards
- **Content**: Displays rich project data including summary, specific roles, and tech stack.
- **Action**: Hover states feature subtle scaling (`scale-[1.01]`) and shadow enhancement.

### 3. Kinetic Wordmark (Marquee)
- **Velocity**: 38s linear cycle.
- **Optimization**: Uses `translateZ(0)` and `-webkit-optimize-contrast` for sharp rendering in Chromium browsers.

## 🏗️ Motion Guidelines
- **Ease**: Prefer `cubic-bezier(0.16, 1, 0.3, 1)` for entrances (the "fade-up" effect).
- **Subtlety**: Animations should feel authoritative and smooth, never "bouncy" or distracting.
- **Responsive**: Complex hover effects are maintained through the `motion` library's `whileHover` prop.

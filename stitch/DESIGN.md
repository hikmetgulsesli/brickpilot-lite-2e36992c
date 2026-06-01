---
name: Cyber-Arcade Kinetic
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f21'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#ecb2ff'
  on-secondary: '#520071'
  secondary-container: '#cf5cff'
  on-secondary-container: '#480063'
  tertiary: '#fff3ed'
  on-tertiary: '#4e2600'
  tertiary-container: '#ffd0ae'
  on-tertiary-container: '#924c00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#f8d8ff'
  secondary-fixed-dim: '#ecb2ff'
  on-secondary-fixed: '#320047'
  on-secondary-fixed-variant: '#74009f'
  tertiary-fixed: '#ffdcc4'
  tertiary-fixed-dim: '#ffb77f'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6f3900'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  display-arcade:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  stats-md:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: 0.05em
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
spacing:
  unit: 4px
  playfield-margin: 16px
  gutter: 8px
  hud-padding: 12px
  safe-area: 24px
---

## Brand & Style
This design system captures a retro-modern arcade aesthetic, blending 80s neon nostalgia with high-performance digital precision. The target audience includes gamers and enthusiasts seeking a high-energy, immersive "deep space" experience.

The style is a hybrid of **Cyberpunk Minimalism** and **Neon-Retro**. It utilizes deep charcoal foundations to allow vibrant, glowing accents to pop. The emotional response should be one of focused intensity, digital speed, and high-stakes excitement. Visuals are defined by high-contrast lighting, semi-transparent HUD overlays, and sharp, responsive geometry that prioritizes the gameplay field while maintaining a sophisticated technical edge.

## Colors
The palette is rooted in a "Deep Space" charcoal neutral to maximize the perceived luminosity of neon accents. 

- **Primary (Electric Blue):** Reserved for the paddle, ball, and critical interactive elements. It represents the player's agency.
- **Secondary (Vibrant Purple):** Used for advanced power-ups, high-tier bricks, and secondary HUD highlights.
- **Tertiary (Energetic Orange):** A high-alert color for critical warnings, speed boosts, or breaking records.
- **Gradients:** Bricks should utilize multi-color neon gradients (Blue to Purple, Purple to Orange) to create a sense of depth and energy within the playfield. 
- **Functional States:** Use the Primary Blue for active states and a dimmed, desaturated version of Charcoal for disabled elements.

## Typography
Typography balances "Arcade Vibes" with "Technical Precision."

- **Headlines:** Space Grotesk provides a bold, geometric, and futuristic feel. Use this for game titles, level starts, and "Game Over" screens.
- **Stats & Labels:** JetBrains Mono is used for all numerical data (score, lives, speed) and technical labels. The monospaced nature ensures that numbers do not jump or jitter during rapid score accumulation.
- **Styling:** Headlines should occasionally use a subtle outer glow (0px 0px 8px) in the primary color to mimic neon tubing. Stats should remain sharp and high-contrast for immediate readability.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy centered on the game playfield. 

- **Playfield:** The central stage is framed by a 2px neon border. All gameplay action is contained here.
- **HUD (Heads-Up Display):** Positioned at the top or sides, utilizing a compact layout with 12px internal padding. 
- **Mobile:** The layout shifts to a vertical stack where the HUD occupies the top 15% of the screen, the playfield 70%, and touch controls the bottom 15%.
- **Spacing Rhythm:** Based on a 4px modular scale to ensure technical alignment. Elements within the HUD use 8px gutters to maintain a "dense" information feel without clutter.

## Elevation & Depth
This design system avoids traditional drop shadows in favor of **Luminous Depth**.

- **Surface Tiers:** The base background is the darkest layer. The playfield is a slightly lighter charcoal. HUD overlays use a semi-transparent blur (Backdrop Filter: 12px blur) to create a "glass cockpit" effect.
- **Glowing Borders:** Depth is defined by light-emitting borders rather than shadows. Interactive containers use 1px solid borders with a 4px-8px outer glow.
- **Z-Axis:** The ball and paddle exist on the highest plane, indicated by the strongest glow and 100% opacity. Bricks exist on a mid-plane, and the HUD background on the lowest elevated plane.

## Shapes
The design system employs a **Sharp** (0px) aesthetic to reinforce the digital, pixel-perfect nature of an arcade machine. 

- **Hard Edges:** All bricks, buttons, and HUD panels use 90-degree corners. 
- **Exceptions:** The ball is the only perfectly circular element to distinguish it as a dynamic, physics-based object. 
- **Visual Interest:** Use 45-degree chamfered corners on large container panels (like the "Game Over" modal) to lean into the cyberpunk/mechanical theme.

## Components
- **Buttons:** Rectangular with a 1px Primary Blue border. On hover/active, the background fills with a 10% Blue tint and the border glow intensifies. Text is always uppercase.
- **HUD Chips:** Small, semi-transparent rectangles containing a label and a value (e.g., "LVL // 04"). Use JetBrains Mono for the value.
- **Progress Bars:** Used for boss health or power-up duration. Features a segmented "pixel" look rather than a smooth fill.
- **Cards/Modals:** Used for level selection or settings. Background is `surface_charcoal` with 80% opacity and a 1px Electric Blue top-border.
- **Input Fields:** Minimalist under-lines or full 1px outlines. The caret should be a solid blue block that blinks in a 500ms cycle.
- **The Paddle:** A solid Electric Blue bar with a high-intensity "core" (white) and a soft blue outer glow.
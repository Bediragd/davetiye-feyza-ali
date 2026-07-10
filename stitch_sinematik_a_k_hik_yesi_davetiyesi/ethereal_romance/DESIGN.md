---
name: Ethereal Romance
colors:
  surface: '#faf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#faf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f0'
  surface-container: '#efeeea'
  surface-container-high: '#e9e8e4'
  surface-container-highest: '#e3e2df'
  on-surface: '#1b1c1a'
  on-surface-variant: '#4d4635'
  inverse-surface: '#2f312e'
  inverse-on-surface: '#f2f1ed'
  outline: '#7f7663'
  outline-variant: '#d0c5af'
  surface-tint: '#735c00'
  primary: '#735c00'
  on-primary: '#ffffff'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#e9c349'
  secondary: '#645e49'
  on-secondary: '#ffffff'
  secondary-container: '#e8dfc5'
  on-secondary-container: '#68634d'
  tertiary: '#7c5357'
  on-tertiary: '#ffffff'
  tertiary-container: '#d9a6aa'
  on-tertiary-container: '#603b3e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#ebe2c8'
  secondary-fixed-dim: '#cec6ad'
  on-secondary-fixed: '#1f1c0b'
  on-secondary-fixed-variant: '#4c4733'
  tertiary-fixed: '#ffdadc'
  tertiary-fixed-dim: '#eeb9bd'
  on-tertiary-fixed: '#301216'
  on-tertiary-fixed-variant: '#623c40'
  background: '#faf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e3e2df'
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
    letterSpacing: 0.05em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0.03em
  body-lg:
    fontFamily: Source Sans 3
    fontSize: 18px
    fontWeight: '300'
    lineHeight: 28px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Source Sans 3
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Source Sans 3
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.2em
  italic-serif:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 28px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-margin: 2rem
  section-gap: 5rem
  element-gap: 1.5rem
  grid-gutter: 1rem
---

## Brand & Style

The design system is centered on the concept of an unfolding narrative—a digital editorial experience that mirrors the tactility of a high-end wedding monograph. The aesthetic blends **Luxury Editorial** with **Cinematic Minimalism**, prioritizing emotional resonance over utility.

The target audience consists of guests expecting a premium, intimate experience. The UI must feel curated and deliberate, utilizing heavy whitespace to create a sense of "breath" and prestige. Visuals should evoke the feeling of fine-art photography, using soft focus and organic textures to move away from the coldness of digital screens.

**Style Directives:**
- **Cinematic Pacing:** Use generous vertical scrolling and staggered entrance animations to mimic the turning of pages.
- **Textural Depth:** Integrate subtle noise and paper-grain overlays on container backgrounds to simulate premium cotton paper.
- **Refinement:** Avoid loud interactions. Transitions should be slow, easing into view like a film dissolve.

## Colors

The palette is a sophisticated interplay of warm whites and muted botanicals. The primary objective is to create a "glow" effect rather than flat blocks of color.

- **Ivory & Cream (#FDFCF8, #F4EBD0):** Used for the primary canvas to provide a warm, inviting foundation that feels softer than pure white.
- **Champagne Gold (#D4AF37):** Reserved for interactive elements, monograms, and hairline borders. Use with a subtle linear gradient to simulate gold foil.
- **Soft Rose (#E8B4B8):** Used for accents and soft washes of color to evoke romance without becoming saccharine.
- **Sage Green (#8A9A5B):** A grounding neutral used for secondary text or botanical iconography.

## Typography

Typography is the cornerstone of this design system. It utilizes a high-contrast pairing between an authoritative serif and a functional, light-weight sans-serif.

- **Playfair Display:** Used for headlines and names. For names (e.g., "Merve & Can"), use the `italic-serif` variant to simulate the fluidity of a script without sacrificing legibility.
- **Source Sans 3:** Provides a clean, modern counterpoint for logistics (RSVP forms, addresses, timelines).
- **Letter Spacing:** Apply `0.2em` to uppercase labels to achieve an editorial, high-fashion look.
- **Language Note:** Ensure Turkish character support (ğ, ü, ş, İ, ö, ç) is maintained across all weights.

## Layout & Spacing

The layout is a **fixed-width mobile-first** approach that centers the experience on the viewport. 

- **Generous Gutters:** Use a 32px (2rem) margin on both sides of the screen to prevent content from touching the edges, reinforcing the "framed" editorial look.
- **Vertical Rhythm:** Sections should be separated by significant vertical gaps (80px+) to allow the user to focus on one "chapter" of the love story at a time.
- **Asymmetry:** Occasionally break the grid with images that offset slightly to the left or right, mimicking the layout of a physical photography book.

## Elevation & Depth

Depth is achieved through layering rather than traditional drop shadows.

- **Tonal Layering:** Place content cards on a background that is only one shade different (e.g., Ivory on Cream) to create subtle, sophisticated separation.
- **Ambient Glows:** Where shadows are necessary (e.g., the RSVP button), use a very large blur (24px+) with a low-opacity Rose tint (#E8B4B8 at 15%) to create a soft "aura" rather than a hard shadow.
- **Glassmorphism:** Navigation bars should use a high-saturation backdrop blur (20px) with a semi-transparent Ivory tint to keep the focus on the photography underneath.

## Shapes

The shape language is organic and soft, avoiding all sharp corners to maintain a romantic, approachable feel.

- **Primary Radius:** Standard containers and images use a 16px (1rem) radius.
- **Pill Shapes:** Buttons and RSVP inputs must use fully rounded (pill) ends to emphasize the "soft touch" aesthetic.
- **Dividers:** Use hairline-thin (0.5px) horizontal lines in Champagne Gold, often punctuated in the center with a circular monogram or a leaf icon.

## Components

### Buttons
- **Primary:** Pill-shaped with a soft gradient (Soft Rose to Champagne Gold). Text should be uppercase `label-caps`.
- **Secondary:** Transparent background with a 1px Champagne Gold border and gold text.

### Cards & Containers
- Cards should have a subtle 0.5px border in Gold or Sage Green. 
- Use a slight "inner glow" or "silk" texture overlay on cards to differentiate them from the main background.

### RSVP Input Fields
- Underlined inputs rather than boxed fields to mimic a handwritten guestbook. 
- Use the `body-lg` font for user input to ensure it feels personal.

### Timeline/Program
- A vertical thin gold line with small, Rose-colored circular nodes.
- Each event (e.g., "Nikah", "Yemek", "Eğlence") should be paired with a small, minimalist icon.

### Dividers
- Elegant, thin separators. A specific "monogram divider" should be used between the story and the logistics sections, featuring the couple's initials in a circular gold frame.
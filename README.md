# Creative Worlds United

IMPORTANT - LOGO-DRIVEN BRAND DESIGN

I will provide the actual reference logos for:

Clipzo

Clipzo Academy

Clipzo Studio

DO NOT assume or hardcode any specific brand colours such as blue, red, yellow, green, orange, etc.

The uploaded/reference logos are the source of truth for the visual identity.

Before designing the interface, carefully analyze each provided logo and derive the visual system from it.

1. CLIPZO

Use the provided Clipzo logo as the primary visual reference.

Analyze the logo for:

Primary colours

Secondary colours

Accent colours

Contrast

Logo background

Typography style

Visual character

Brightness

Saturation

Build the Clipzo website palette around the logo.

The chosen colours should be used consistently across:

Navbar

Hero

Buttons

Links

Cards

Borders

Hover states

Gradients

Glows

Sliders

Video overlays

Active navigation

Chatbot

Footer

Loading screen

Forms

CTA sections

Do not introduce random colours that conflict with the logo.

2. CLIPZO ACADEMY

Use the provided Clipzo Academy logo as the visual source of truth.

Do not assume that Academy must use red or any previously suggested colour.

Instead:

Extract and derive the Academy's colour palette from its actual logo.

Create a separate visual identity for Academy based on the logo.

The Academy should feel like an educational/creative brand while remaining connected to Clipzo.

Use the logo-derived palette for:

Navbar

Hero

Buttons

Course cards

Course progress UI

Timeline

Student sections

Testimonials

Forms

CTA

Footer

Chatbot

Hover states

Page transitions

3. CLIPZO STUDIO

Use the provided Clipzo Studio logo as the visual source of truth.

Do not assume that Studio must use yellow or any previously suggested colour.

Analyze the actual Studio logo and derive the appropriate palette from it.

The Studio should feel:

Premium

Cinematic

Professional

Production-focused

Creative

Modern

Use the logo-derived colours throughout:

Navbar

Hero

Equipment section

Studio gallery

Pricing

Booking form

Buttons

Interactive hotspots

Cards

Glows

Footer

Chatbot

Hover interactions

4. IMPORTANT - DO NOT USE PREVIOUSLY ASSIGNED COLOURS

Ignore any previous instructions that specifically assigned:

Clipzo = Blue

Academy = Red

Studio = Yellow

Those were only temporary design references.

The actual uploaded logos take priority.

The final website colours must be determined from the actual logo references.

5. CREATE A DYNAMIC DESIGN TOKEN SYSTEM

Create a theme system using CSS variables.

For example:

:root {
  --brand-primary: ...;
  --brand-secondary: ...;
  --brand-accent: ...;
  --brand-background: ...;
  --brand-surface: ...;
  --brand-text: ...;
  --brand-muted: ...;
  --brand-border: ...;
  --brand-glow: ...;
}


Create separate theme configurations:

clipzoTheme
academyTheme
studioTheme


Each theme must be generated according to the corresponding logo.

Do not duplicate the entire website just to change colours.

Use a shared component system with dynamic themes.

6. LOGO USAGE

Use the actual provided logos.

Do not redraw them.

Do not replace them with text.

Do not modify their proportions.

Do not distort them.

Maintain:

Correct aspect ratio

Proper spacing

Appropriate contrast

Clear visibility

Consistent sizing

Use the correct logo for the corresponding vertical.

7. BACKGROUND COLOUR

Do not automatically make every page pure black.

Choose the background based on what works best with the logo.

Possible backgrounds can include:

Near-black

Charcoal

Deep neutral

Very dark brand shade

Dark gradient

Soft off-black

The exact background should be selected according to the logo and overall visual harmony.

The website should remain premium and cinematic.

8. ACCENT COLOUR SELECTION

The AI should intelligently select accent colours from each logo.

If the logo contains multiple colours:

Identify the dominant colour

Identify secondary colour

Identify accent colour

Determine which colour works best for CTA

Determine which colour works best for hover

Determine which colour works best for subtle glow

Determine which colours should remain limited

Do not use every logo colour everywhere.

Use a refined hierarchy.

9. COLOUR CONTRAST

After deriving the palette, automatically verify:

Text readability

Button readability

Navbar visibility

Mobile readability

Video overlay readability

Card readability

Form readability

Accessibility contrast

If a logo colour is too bright or too dark for text, create a suitable derived shade while preserving the brand identity.

10. THREE BRANDS MUST STILL FEEL DISTINCT

Even though the colours come from the actual logos, the three experiences must visually communicate different purposes.

CLIPZO

Creative content production.

Visual direction:

Cinematic

Fast

Energetic

Reel-focused

Social-media-first

CLIPZO ACADEMY

Education and skill development.

Visual direction:

Creative learning

Structured

Interactive

Modern classroom

Editing/camera focused

CLIPZO STUDIO

Professional production environment.

Visual direction:

Premium

Cinematic

Professional

Equipment-focused

Studio/production aesthetic

11. MAIN BRAND SELECTION PAGE

The first page should introduce all three brands.

Headline:

One Brand. Three Creative Worlds.

Create three large visual sections:

CLIPZO

Reels • Videography • Photography • Editing

CLIPZO ACADEMY

Learn • Create • Master

CLIPZO STUDIO

Shoot • Create • Produce

Each section must use its own logo and logo-derived visual palette.

Do not force all three cards to use the same colour scheme.

12. BRAND TRANSITIONS

When switching between the three verticals, create a smooth visual transition.

The transition should interpolate between the actual palettes.

For example:

Clipzo → Academy

Use a subtle transition between their respective logo-derived accent colours.

Academy → Studio

Transition between the Academy and Studio palettes.

Studio → Clipzo

Transition back to Clipzo.

Do not hardcode colour values into the transition.

Read them from the theme variables.

13. NAVBAR

The navbar should automatically use the active brand's theme.

For example:

When inside Clipzo:
→ Clipzo logo + Clipzo theme

When inside Academy:
→ Academy logo + Academy theme

When inside Studio:
→ Studio logo + Studio theme

The navigation structure can remain consistent, but the visual treatment should change according to the active brand.

14. BUTTONS

Buttons should inherit the active brand theme.

Do not use one universal blue/red/yellow button.

Example:

Primary CTA
→ --brand-primary

Hover
→ --brand-accent

Border
→ --brand-border

Glow
→ --brand-glow


This ensures the entire website automatically follows the provided logos.

15. CHATBOT

The chatbot should also automatically inherit the active brand palette.

Clipzo page:
→ Clipzo logo-derived styling

Academy page:
→ Academy logo-derived styling

Studio page:
→ Studio logo-derived styling

The chatbot design should remain consistent structurally while changing its visual identity.

16. LOADING SCREEN

Use the appropriate logo depending on the current route.

Main entry:

Show the main Clipzo logo.

Academy:

Show Clipzo Academy logo.

Studio:

Show Clipzo Studio logo.

Use a subtle animation derived from the logo's visual style.

Keep the loading animation short and premium.

17. FINAL DESIGN RULE

DO NOT CHOOSE THE BRAND COLOURS YOURSELF BEFORE SEEING THE LOGOS.

I will provide the three reference logos.

Your job is to:

Analyze the logos.

Extract their visual identity.

Create suitable colour tokens.

Create three distinct themes.

Apply those themes consistently.

Keep the three brands visually connected.

Avoid colour combinations that reduce readability.

Preserve the original logo appearance.

Make the final result look professionally art-directed rather than automatically generated.

The uploaded logos are the final authority for the colour direction.

Everything else - layout, typography, spacing, gradients, glow intensity, background treatment, buttons and interactions - should be selected to complement the actual logos.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/60f1774b-8fb8-4a6c-a8d2-8e843384a534).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

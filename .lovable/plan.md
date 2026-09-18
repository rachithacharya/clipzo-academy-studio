# Refine Clipzo brand experience

## What will change
- Replace the mismatched Clipzo and Academy logo assets with the newly supplied originals, preserving transparency and proportions.
- Smooth palette interpolation across backgrounds, surfaces, borders, text, controls, and branded overlays, including mobile navigation and reduced-motion behavior.
- Add unique titles, descriptions, canonical URLs, Open Graph details, and page-matched share images for the home, Clipzo, Academy, and Studio pages.
- Upgrade each enquiry form with clear field labels, length limits, inline validation messages, submission feedback, and accessible focus/error states.
- Audit all three palettes for readable text, controls, borders, focus rings, and touch targets, then correct any failures.

## Technical details
- Keep one shared component system and the existing per-brand CSS variable architecture.
- Use the supplied image files through Lovable Assets; do not redraw or recolor them.
- Resolve absolute social-image URLs at request time so previews work after publishing without hardcoding a domain.
- Validate all form fields with a shared schema and render friendly per-field errors with accessible announcements.
- Verify desktop and mobile pages in-browser, including navigation, form errors, logo fidelity, metadata, and console output.

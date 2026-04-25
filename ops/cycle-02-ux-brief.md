# Cycle 02 UX Brief

## Design direction
Make the pricing section feel like a scoped audit engagement rather than a generic pricing card. Add context above the card, using the existing visual system and without changing the offer.

## Approved changes for this cycle
1. Add a pricing section header above the pricing card.
2. Style the header as a restrained dark-section intro.
3. Preserve all existing card content exactly.

## Exact Hero changes
None.

## Exact pricing changes
Inside `#pricing`, before `.pricing-card`, add:
- Section kicker: `היקף הבדיקה`
- H2: `בדיקת Leadaro ב־₪990`
- Short line: `14 יום, מקור לידים אחד, ודוח ברור על המקומות שבהם הפולואפ מאבד שליטה.`

Do not change the pricing card text, guarantee, price, inclusions, or CTAs.

## Exact thank-you page changes
None.

## Exact form/trust changes
None.

## Exact mobile refinements
Ensure the new pricing intro has comfortable spacing on mobile and does not push the pricing card into an awkward layout.

## Files likely to change
- `index.html`
- `styles.css`
- `ops/cycle-02-dev.md`
- `ops/cycle-02-qa.md`
- `ops/cycle-02-production.md`

## Do-not-change list
- `functions/api/lead.js`
- `assets/js/config.js`
- `privacy/index.html`
- `terms/index.html`
- Form fields
- Price and refund text
- Analytics event names

## Developer instructions
Add the pricing intro using existing typography and CSS variables. Keep it centered, narrow, and visually quieter than the pricing card. Avoid new icons, images, or JavaScript.

## QA focus
Verify heading hierarchy, pricing section readability, mobile spacing, pricing event tracking, and production lead flow.

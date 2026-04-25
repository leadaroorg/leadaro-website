# Cycle 01 UX Brief

## Design direction
Make the existing page feel more like a scoped operational audit without changing the page architecture. Keep the current visual language and logo. Improve the path from understanding to action: the offer should be readable earlier, the mobile CTA should appear before the mockup, and the form should explain the next steps.

## Approved changes for this cycle
1. Add one compact hero scope line after the subtitle and before the CTAs.
2. Reorder mobile hero elements so CTAs appear before the control-room mockup.
3. Add a short "what happens after submission" list beside the contact form.

## Exact Hero changes
Add a single factual scope line after the hero subtitle:
`בדיקת Leadaro — ₪990 ל־14 יום · מקור לידים אחד · דוח ברור בסוף`

Do not change the H1, subtitle, eyebrow, CTA labels, ROI line, trust strip, or hero visual content.

## Exact pricing changes
No pricing copy or structure changes in this cycle.

## Exact thank-you page changes
No thank-you page changes in this cycle unless QA finds a mismatch caused by shared CSS.

## Exact form/trust changes
In the contact section, add a compact ordered list under the existing contact paragraph:
- `01` `קוראים את הפנייה ובודקים התאמה ראשונית.`
- `02` `אם יש התאמה, חוזרים לגבי פיילוט Leadaro.`
- `03` `מתחילים רק אם נפח הפניות מתאים לבדיקה.`

Do not add form fields. Do not change the submit button or endpoint.

## Exact mobile refinements
At `max-width: 900px`, set the hero order so the CTA row appears before the control-room mockup. Recommended order:
1. H1
2. eyebrow
3. subtitle
4. hero scope line
5. CTA row
6. trust strip
7. ROI line
8. control-room mockup

## Files likely to change
- `index.html`
- `styles.css`
- `ops/cycle-01-dev.md`
- `ops/cycle-01-qa.md`
- `ops/cycle-01-production.md`
- `ops/autonomous-final-report.md`

## Do-not-change list
- `functions/api/lead.js`
- `assets/js/config.js`
- `privacy/index.html`
- `terms/index.html`
- Form field names and options
- Price and refund language
- Analytics event names and cookie consent behavior

## Developer instructions
Implement only the three approved changes. Use existing classes and CSS variables. Keep additions compact and in the same premium audit style. Do not introduce images, libraries, or new JS. Make sure the hero scope line does not crowd mobile above the fold.

## QA focus
Verify mobile hero ordering, no horizontal overflow, form submission to `/api/lead`, redirect to `/thank-you`, all dataLayer events, cookie consent, WhatsApp phone, and that `/ops/` does not expose internal Markdown after clean deploy.

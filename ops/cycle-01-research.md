# Cycle 01 Research Report

## Executive diagnosis
The site is functional and already has a more credible audit-oriented identity after the latest logo work. The main conversion risk is not broken infrastructure; it is first-screen hierarchy, especially on mobile. The hero explains the service, but the mobile ordering puts the visual mockup before the CTAs, delaying the action path. The contact section works but asks for details without clearly stating the short operational sequence after submission. Pricing is visible and stable, but the exact offer can be made more immediately legible above the fold without changing price or meaning.

## Biggest design/conversion issues
1. Mobile CTA delay: in the mobile CSS order, the control-room mockup appears before the CTA row. This means a phone visitor sees a horizontally scrolling visual before the conversion action.
2. Offer clarity above the fold: the CTA contains the price, and the eyebrow contains duration and audience, but there is no compact offer line that reads like a scoped audit before the buttons.
3. Form trust: the contact section says the form is for fit checking, but it does not show a clear "what happens next" sequence next to the form.
4. Ops exposure behavior: production `/ops/` currently returns the homepage, not internal files. That is not content exposure, but the direct deploy must use a clean `.deploy/` folder so ops files are not uploaded.

## What feels generic or AI-generated
- The hero visual still reads partly like a generic SaaS dashboard because it uses layered cards and a live dot. It is acceptable now, but should not be expanded or made more animated.
- The contact section is structurally generic: headline, paragraph, form. It would feel more operational with a short process note.
- The offer is split across eyebrow, CTA, and pricing section. A concise "scope line" near the subtitle would make it feel more like a defined audit rather than a landing-page template.

## Strong parts to preserve
- The Hebrew RTL content and narrow mortgage-advisor niche.
- The current price, duration, refund language, and qualification.
- The audit logo system with `AUDIT · A-PILOT` in header/footer.
- The Make/Google Sheets lead flow through `/api/lead`.
- The current legal positioning: no mortgage, financial, legal, credit advice, and no CRM replacement.
- The no-fake-proof stance: no testimonials, no logos, no invented metrics.

## Must-fix now
1. Move mobile hero CTAs above the visual mockup.
2. Add a compact above-fold audit scope line using existing factual offer details.
3. Add a short next-step list in the contact section to improve form trust.

## Should-fix later
- Consider reducing the SaaS feel of the hero visual, but only with a narrow visual pass and only if screenshots show it is still distracting.
- Consider aligning legal pages to the root `styles.css` system in a later pass; not needed for launch conversion.
- Consider a real 404 for `/ops/*` only if Cloudflare routing exposes internal files. Clean deploy is the safer immediate fix.

## Do-not-touch list
- `/api/lead` behavior and payload.
- `assets/js/config.js` values: `WHATSAPP_PHONE` and `FORM_ENDPOINT`.
- Form fields.
- Pricing, offer, refund, and niche.
- Privacy and terms legal meaning.
- Make/Google Sheets integration.
- Cloudflare project settings.

## Research conclusion
Cycle 1 should change code. The focus should be a narrow conversion polish: mobile hero action order, above-fold offer clarity, and form trust. These are concrete, testable, and low-risk. Avoid broader redesign or hero visual replacement in this cycle.

# Cycle 02 Research Report

## Executive diagnosis
After Cycle 1, the homepage is clearer and mobile action order is better. The next highest-impact improvement is the pricing area. It contains the right price, inclusions, guarantee, and CTA, but the section opens directly with a card. This makes the offer feel a little like a standalone landing-page coupon rather than a defined audit scope. A small section heading and framing can improve credibility without changing the offer.

## Biggest design/conversion issues
1. Pricing section has no H2 or section-level explanation. It jumps from the previous section directly into a pricing card.
2. The price is clear, but the section does not explicitly frame why the payment exists: a scoped 14-day audit and basic workflow setup.
3. The page hierarchy is slightly weaker because `pricing` uses an H3 as the primary visible heading for the section.

## What feels generic or AI-generated
- A centered pricing card without section framing is a common SaaS-template pattern.
- The floating chip is useful, but by itself it does not create enough operational-audit context.
- The price block is visually strong, but the surrounding section does not read like a deliberate scope-of-work area.

## Strong parts to preserve
- The `₪990` price and `14 יום` duration.
- The exact inclusion list and guarantee language.
- The primary CTA and WhatsApp link.
- The dark pricing section background and centered card.
- The no-fake-proof approach.

## Must-fix now
Add a narrow pricing section heading and short factual support line above the pricing card. Keep it brief, premium, and audit-oriented.

## Should-fix later
- Consider reducing remaining dashboard-like feeling in the hero visual only if outreach feedback shows trust issues.
- Consider a custom 404 for internal paths in a production hygiene cycle.
- Consider unifying legal-page styling later; not required for outreach conversion.

## Do-not-touch list
- Price, offer, duration, refund text.
- Inclusion list.
- Form fields and lead flow.
- `/api/lead`, Make webhook, Google Sheets.
- WhatsApp configuration.
- Privacy and terms legal meaning.

## Research conclusion
Cycle 2 should change code. The focus should be a small pricing hierarchy improvement: add section framing above the pricing card and preserve all pricing content.

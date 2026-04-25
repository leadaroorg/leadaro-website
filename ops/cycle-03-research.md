# Cycle 03 Research Report

## Executive diagnosis
The site is conversion-ready after Cycles 1 and 2. The remaining concrete issue is production hygiene: internal `ops` reports are not exposed, but `/ops/*` returns homepage fallback. This can confuse verification and is less precise than an explicit 404 for internal paths.

## Biggest design/conversion issues
None that are high-impact and non-subjective after Cycle 2. The visible site is ready enough for outreach validation.

## What feels generic or AI-generated
Further visual critique would now be subjective. No broad design changes are justified in this cycle.

## Strong parts to preserve
- Improved hero CTA order.
- Hero scope line.
- Pricing section intro.
- Contact trust steps.
- Working lead flow.
- Clean deploy process excluding `ops/`.

## Must-fix now
Make `/ops` and `/ops/*` return an explicit non-public 404 response instead of homepage fallback.

## Should-fix later
- Email notification when Gmail OAuth or SMTP credentials are available.
- Real outreach feedback may identify further copy or design changes.

## Do-not-touch list
- Homepage content and design except routing files needed for 404.
- Price, offer, form fields, and legal meaning.
- `/api/lead` and Make payload.
- `assets/js/config.js`.

## Research conclusion
Cycle 3 should change code narrowly by adding a lightweight `404.html` and `_redirects` rules for `/ops` paths. This is a production safety improvement, not a redesign.

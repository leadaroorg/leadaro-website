# Cycle 03 UX Brief

## Design direction
Do not change the main site experience. Add a minimal, brand-consistent not-found page only so internal paths such as `/ops` are explicitly unavailable in production.

## Approved changes for this cycle
1. Add a small `404.html` page using the existing Leadaro visual system.
2. Add `_redirects` rules for `/ops` and `/ops/*` to return `404.html` with status 404.
3. Include `404.html` in clean deploy.

## Exact Hero changes
None.

## Exact pricing changes
None.

## Exact thank-you page changes
None.

## Exact form/trust changes
None.

## Exact mobile refinements
Ensure `404.html` is responsive, but do not spend effort beyond basic readability.

## Files likely to change
- `_redirects`
- `404.html`
- `ops/cycle-03-dev.md`
- `ops/cycle-03-qa.md`
- `ops/cycle-03-production.md`
- `ops/autonomous-final-report.md`

## Do-not-change list
- `index.html`
- `styles.css`
- `main.js`
- `functions/api/lead.js`
- `assets/js/config.js`
- Form fields and lead flow

## Developer instructions
Create `404.html` as a lightweight static page with no new JS and no external images. Add only the redirect rules needed to block `/ops` and `/ops/*`. Do not create a general catch-all 404 unless necessary.

## QA focus
Verify `/ops/` and `/ops/cycle-03-research.md` return 404 in production and do not expose Markdown. Verify main routes and `/api/lead` remain working.

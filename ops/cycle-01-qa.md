# Cycle 01 QA Report

## Result
Pass.

## Tests run
- `node --check main.js`
- `node --check functions/api/lead.js`
- Local route checks returned 200 for `/`, `/privacy`, `/terms`, `/thank-you`, `/robots.txt`, `/sitemap.xml`.
- Searched repository for `leadaro.co.il`, `972500000000`, `skyview`, and `SkyView`; no matches.
- Verified `WHATSAPP_PHONE` remains `972523282905`.
- Verified `FORM_ENDPOINT` remains `/api/lead`.
- Verified homepage has one H1.
- Verified canonical/SEO schema still use `https://leadaro.org/`.
- Verified Service schema and FAQPage schema exist.
- Verified no obvious fake proof strings such as testimonials or trusted-by copy.
- Browser QA with Playwright CLI:
  - Desktop screenshot: `ops/screenshots/cycle-01/home-desktop.png`
  - Mobile screenshot: `ops/screenshots/cycle-01/home-mobile.png`
  - Desktop thank-you screenshot: `ops/screenshots/cycle-01/thank-you-desktop.png`
  - Mobile thank-you screenshot: `ops/screenshots/cycle-01/thank-you-mobile.png`
- Functional browser checks:
  - Successful mocked form POST redirected to `/thank-you`.
  - Failed mocked form POST showed: `לא הצלחנו לשלוח את הטופס. אפשר לפנות ישירות בוואטסאפ.`
  - WhatsApp CTA href uses `972523282905`.
  - Cookie accept pushed `cookie_consent_accepted`.
  - Cookie reject pushed `cookie_consent_rejected`.
  - Primary CTA pushed `primary_cta_click`.
  - WhatsApp click pushed `whatsapp_click`.
  - Pricing event did not fire immediately and did fire after pricing entered viewport.
  - FAQ open pushed `faq_open`.
  - Scroll depth pushed `scroll_75`.
  - Desktop and mobile horizontal overflow checks returned false.

## Bugs found
- No production-blocking bugs.
- Initial event QA script reset `window.dataLayer` by replacing the array, which bypassed the script's captured reference. The QA script was corrected to clear the same array with `length = 0`.

## Fixes made
None after implementation. The code passed QA as implemented.

## Visual assessment
Better. The mobile path now shows the CTA before the visual mockup, reducing friction. The new scope line makes the offer feel more specific and audit-like without changing the pitch. The contact steps make the form feel more trustworthy and less like a generic lead form. Screenshots did not show horizontal overflow or obvious layout regression.

## Remaining risks
- The hero mockup still has some SaaS-dashboard flavor. It is acceptable for outreach validation, but should not be expanded without a focused visual pass.
- Production `/ops/` currently returns the homepage when the path does not exist. The critical check is that no `ops` files are deployed or exposed after the clean deploy.
- Google Sheets row creation cannot be directly inspected from this environment; production API 200 remains the available verification signal.

## Ready to deploy
yes.

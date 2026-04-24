# Leadaro static site

Production domain: https://leadaro.org

## Cloudflare Pages

- Build command: none
- Output directory: root
- Production branch: main

## Config locations

- WhatsApp number: `assets/js/config.js`, `WHATSAPP_PHONE`
- Tracking IDs: `assets/js/config.js`, `GTM_ID`, `GA4_ID`, `META_PIXEL_ID`, `CLARITY_ID`
- Form endpoint: `assets/js/config.js`, `FORM_ENDPOINT`

## Before live traffic

- Verify the WhatsApp CTA opens the correct Leadaro number.
- Connect `FORM_ENDPOINT` to persistent lead delivery.
- Insert analytics IDs if needed.
- Verify consent behavior.
- Test form submit.
- Check `/privacy` and `/terms`.
- Check www redirect.
- Check sitemap and robots.
- Run mobile QA.

## Current launch blockers

- TODO BEFORE LIVE TRAFFIC: Connect `/api/lead` to persistent lead delivery.

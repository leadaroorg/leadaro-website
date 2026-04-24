# Leadaro static site

Production domain: https://leadaro.org

## Cloudflare Pages

- Build command: none
- Output directory: root
- Production branch: main
- Environment variable: `LEAD_WEBHOOK_URL` = Make.com custom webhook URL

## Config locations

- WhatsApp number: `assets/js/config.js`, `WHATSAPP_PHONE`
- Tracking IDs: `assets/js/config.js`, `GTM_ID`, `GA4_ID`, `META_PIXEL_ID`, `CLARITY_ID`
- Form endpoint: `assets/js/config.js`, `FORM_ENDPOINT`

## Before live traffic

- Verify the WhatsApp CTA opens the correct Leadaro number.
- Add `LEAD_WEBHOOK_URL` in Cloudflare Pages.
- Insert analytics IDs if needed.
- Verify consent behavior.
- Test form submit.
- Check `/privacy` and `/terms`.
- Check www redirect.
- Check sitemap and robots.
- Run mobile QA.

## Current launch blockers

- TODO BEFORE LIVE TRAFFIC: Add `LEAD_WEBHOOK_URL` in Cloudflare Pages and test production lead delivery.

## Make scenario

Target flow: Webhook -> Google Sheets row -> Email notification to `info@leadaro.org`.

Required Google Sheet columns:

- `created_at`
- `name`
- `phone`
- `monthly_leads`
- `main_source`
- `page_url`
- `referrer`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `consent_status`
- `user_agent`
- `ip_country`

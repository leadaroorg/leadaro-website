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
- Insert analytics IDs if needed.
- Verify consent behavior.
- Test form submit.
- Check `/privacy` and `/terms`.
- Check www redirect.
- Check sitemap and robots.
- Run mobile QA.

## Production Status

- Domain live: yes
- Form endpoint: `/api/lead`
- Persistent storage: Google Sheets via Make
- Email notification: pending SMTP/Gmail authorization
- Current launch status: ready for manual outreach validation
- Source of truth for new leads: Google Sheet

Until email notification is connected, check the Leadaro Leads Google Sheet directly after outreach or form submissions.

## Make scenario

Target flow: Webhook -> Google Sheets row -> Email notification to `info@leadaro.org`.

Email notification is pending SMTP/Gmail authorization. When credentials are available, connect notification delivery to `info@leadaro.org` with subject: `ליד חדש מ־Leadaro`.

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

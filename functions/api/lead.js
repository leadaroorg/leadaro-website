export async function onRequest(context) {
  const { request } = context;
  const env = context.env || {};

  if (request.method === "OPTIONS") {
    return json({ ok: true }, 200);
  }

  if (request.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  const requiredFields = ["name", "phone", "monthly_leads", "main_source"];
  const missing = requiredFields.filter((field) => !String(payload[field] || "").trim());

  if (missing.length) {
    return json({ ok: false, error: "Missing required fields", missing }, 400);
  }

  const lead = normalizeLead(payload, request);
  const webhookUrl = String(env.LEAD_WEBHOOK_URL || "").trim();

  if (!webhookUrl) {
    console.warn("Lead delivery is not configured", {
      created_at: lead.created_at,
      phone_suffix: maskPhone(lead.phone)
    });
    return json({ ok: false, error: "Lead delivery is not configured" }, 503);
  }

  let response;
  try {
    response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead)
    });
  } catch (error) {
    console.error("Lead delivery request failed", {
      created_at: lead.created_at,
      phone_suffix: maskPhone(lead.phone)
    });
    return json({ ok: false, error: "Lead delivery failed" }, 502);
  }

  if (!response.ok) {
    console.error("Lead delivery returned non-2xx", {
      status: response.status,
      created_at: lead.created_at,
      phone_suffix: maskPhone(lead.phone)
    });
    return json({ ok: false, error: "Lead delivery failed" }, 502);
  }

  return json({ ok: true }, 200);
}

function normalizeLead(payload, request) {
  return {
    name: String(payload.name || "").trim(),
    phone: String(payload.phone || "").trim(),
    name_phone: String(payload.name_phone || "").trim(),
    business_field: String(payload.business_field || "").trim(),
    monthly_leads: String(payload.monthly_leads || "").trim(),
    main_source: String(payload.main_source || "").trim(),
    main_lead_source: String(payload.main_lead_source || payload.main_source || "").trim(),
    page_url: String(payload.page_url || "").trim(),
    page_path: String(payload.page_path || "").trim(),
    referrer: String(payload.referrer || "").trim(),
    utm_source: String(payload.utm_source || "").trim(),
    utm_medium: String(payload.utm_medium || "").trim(),
    utm_campaign: String(payload.utm_campaign || "").trim(),
    utm_content: String(payload.utm_content || "").trim(),
    utm_term: String(payload.utm_term || "").trim(),
    gclid: String(payload.gclid || "").trim(),
    fbclid: String(payload.fbclid || "").trim(),
    consent_status: String(payload.consent_status || "").trim(),
    created_at: String(payload.created_at || new Date().toISOString()).trim(),
    timestamp: String(payload.timestamp || payload.created_at || new Date().toISOString()).trim(),
    user_agent: request.headers.get("User-Agent") || "",
    ip_country: request.cf && request.cf.country ? String(request.cf.country) : ""
  };
}

function maskPhone(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  return digits ? digits.slice(-4).padStart(digits.length, "*") : "";
}

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "https://leadaro.org",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}

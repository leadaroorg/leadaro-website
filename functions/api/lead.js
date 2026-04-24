export async function onRequest(context) {
  const { request } = context;

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

  // Later: integrate lead delivery with Google Sheets, Make, Supabase, or another backend.
  // Later: add spam protection and rate limiting before sending paid traffic.
  console.log("Leadaro lead payload", {
    ...payload,
    received_at: new Date().toISOString()
  });

  return json({ ok: true }, 200);
}

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

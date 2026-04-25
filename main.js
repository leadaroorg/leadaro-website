(() => {
  const cfg = window.LEADARO_CONFIG || {}, dl = window.dataLayer = window.dataLayer || [];
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const key = "leadaro_cookie_consent", ev = (n, p) => dl.push(Object.assign({ event: n }, p || {}));
  const qp = n => new URLSearchParams(location.search).get(n) || "";
  const consent = () => localStorage.getItem(key) || "unset";
  const goodEndpoint = e => e && e !== "FORM_ENDPOINT" && !/^https?:\/\/example\.com/i.test(e);
  const wa = () => "https://wa.me/" + (cfg.WHATSAPP_PHONE || "") + "?text=" + encodeURIComponent(cfg.WHATSAPP_MESSAGE || "");
  function wireHeader() {
    const h = $("[data-header]"), b = $("[data-menu-toggle]"), nav = $("[data-nav]"), waBtn = $("[data-sticky-wa]"), cta = $("[data-sticky-cta]"), contact = $("#contact"), pricing = $("#pricing");
    b?.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open); document.body.classList.toggle("menu-open", open); b.setAttribute("aria-expanded", open);
    });
    $$("[data-nav] a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("is-open"); document.body.classList.remove("menu-open"); b?.setAttribute("aria-expanded", "false"); }));
    addEventListener("scroll", () => {
      const y = scrollY || document.documentElement.scrollTop, cr = contact?.getBoundingClientRect(), pr = pricing?.getBoundingClientRect(), inContact = cr && cr.top < innerHeight && cr.bottom > 0;
      h?.classList.toggle("is-sticky", y > 80);
      waBtn?.classList.toggle("is-visible", y > 600 && !inContact);
      cta?.classList.toggle("is-visible", !!(pr && pr.top < innerHeight && !inContact));
    }, { passive: true });
  }
  function wireAuditToggle() {
    const btn = $("[data-audit-toggle]");
    btn?.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", open); btn.textContent = open ? "הסתר" : "הצג עוד";
      $$("[data-audit-more]").forEach(el => el.classList.toggle("is-visible", open));
    });
  }
  function wireCookie() {
    const box = $("[data-cookie-banner]");
    if (!box || consent() !== "unset") return;
    box.hidden = false;
    $("[data-cookie-accept]", box)?.addEventListener("click", () => { localStorage.setItem(key, "accepted"); box.hidden = true; ev("cookie_consent_accepted"); });
    $("[data-cookie-dismiss]", box)?.addEventListener("click", () => { localStorage.setItem(key, "rejected"); box.hidden = true; ev("cookie_consent_rejected"); });
  }
  function wireEvents() {
    $$("[data-whatsapp-link]").forEach(a => { a.href = wa(); a.addEventListener("click", () => ev("whatsapp_click", { location: a.dataset.location || "page" })); });
    $$("[data-primary-cta]").forEach(a => a.addEventListener("click", () => ev("primary_cta_click", { location: a.dataset.location || "page" })));
    $$("details[data-faq]").forEach(d => d.addEventListener("toggle", () => d.open && ev("faq_open", { question: $("summary", d).textContent.trim() })));
    const pricing = $("[data-pricing]");
    if (pricing && "IntersectionObserver" in window) new IntersectionObserver((e, o) => e[0].isIntersecting && (ev("pricing_view"), o.disconnect()), { threshold: .35 }).observe(pricing);
    let sent = false;
    addEventListener("scroll", () => { const h = document.documentElement.scrollHeight - innerHeight; if (!sent && h > 0 && scrollY / h >= .75) { sent = true; ev("scroll_75"); } }, { passive: true });
  }
  function wireForm() {
    const form = $("[data-lead-form]");
    if (!form) return;
    form.addEventListener("submit", e => {
      e.preventDefault();
      const values = Object.fromEntries(new FormData(form).entries());
      if (values.website) return;
      ev("form_submit");
      const status = $("[data-form-status]", form), btn = $("button[type=submit]", form), endpoint = cfg.FORM_ENDPOINT || "", redirect = form.dataset.successUrl || "/thank-you";
      status.textContent = ""; btn.disabled = true;
      const payload = { name: values.name || "", phone: values.phone || "", monthly_leads: values.monthly_leads || "", main_source: values.main_source || "", page_url: location.href, referrer: document.referrer || "", utm_source: qp("utm_source"), utm_medium: qp("utm_medium"), utm_campaign: qp("utm_campaign"), consent_status: consent(), created_at: new Date().toISOString() };
      if (!goodEndpoint(endpoint)) { console.warn("FORM_ENDPOINT is not configured. Lead was not sent to server."); localStorage.setItem("leadaro_local_qa_leads", JSON.stringify([payload])); location.href = redirect; return; }
      fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).then(r => { if (!r.ok) throw Error(); location.href = redirect; }).catch(() => { btn.disabled = false; status.textContent = "לא הצלחנו לשלוח את הטופס. אפשר לפנות ישירות בוואטסאפ."; });
    });
  }
  document.addEventListener("DOMContentLoaded", () => { wireHeader(); wireAuditToggle(); wireCookie(); wireEvents(); wireForm(); });
})();

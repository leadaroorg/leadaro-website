(() => {
  const cfg = window.LEADARO_CONFIG || {}, dl = window.dataLayer = window.dataLayer || [];
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const key = "leadaro_cookie_consent", ev = (n, p) => dl.push(Object.assign({ event: n }, p || {}));
  const ph = { GTM_ID: "GTM_ID", GA4_ID: "GA4_ID", META_PIXEL_ID: "META_PIXEL_ID", CLARITY_ID: "CLARITY_ID" };
  let trackingLoaded = false;
  const qp = n => new URLSearchParams(location.search).get(n) || "";
  const goodEndpoint = e => e && e !== "FORM_ENDPOINT" && !/^https?:\/\/example\.com/i.test(e);
  const real = k => cfg[k] && cfg[k] !== ph[k];
  const consent = () => localStorage.getItem(key) || "unset";
  const wa = msg => "https://wa.me/" + (cfg.WHATSAPP_PHONE || "") + "?text=" + encodeURIComponent(msg || cfg.WHATSAPP_MESSAGE || "");
  const addScript = src => { const s = document.createElement("script"); s.async = true; s.src = src; document.head.appendChild(s); };
  function loadTracking() {
    if (trackingLoaded) return; trackingLoaded = true;
    if (real("GTM_ID")) { dl.push({ "gtm.start": Date.now(), event: "gtm.js" }); addScript("https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(cfg.GTM_ID)); }
    if (real("GA4_ID") && !real("GTM_ID")) { addScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(cfg.GA4_ID)); window.gtag = function () { dl.push(arguments); }; window.gtag("js", new Date()); window.gtag("config", cfg.GA4_ID, { anonymize_ip: true }); }
    if (real("META_PIXEL_ID")) { !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=true;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=true;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js"); window.fbq("init", cfg.META_PIXEL_ID); window.fbq("track", "PageView"); }
    if (real("CLARITY_ID")) { (function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script",cfg.CLARITY_ID); }
  }
  function wireWhatsApp() {
    $$("[data-whatsapp-link]").forEach(a => {
      a.href = wa(a.dataset.whatsappMessage);
      a.addEventListener("click", () => ev("whatsapp_click", { location: a.dataset.location || "page" }));
    });
  }
  function wireHeader() {
    const h = $("[data-header]"), b = $("[data-menu-toggle]"), nav = $("[data-nav]"), stick = $("[data-sticky-wa]"), contact = $("#contact");
    b?.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open); document.body.classList.toggle("menu-open", open); b.setAttribute("aria-expanded", open);
    });
    $$("[data-nav] a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("is-open"); document.body.classList.remove("menu-open"); b?.setAttribute("aria-expanded", "false"); }));
    const syncHeader = () => {
      const y = scrollY || document.documentElement.scrollTop, r = contact?.getBoundingClientRect();
      const stuck = y > 80;
      h?.classList.toggle("is-sticky", stuck);
      h?.setAttribute("data-stuck", stuck ? "true" : "false");
      stick?.classList.toggle("is-visible", y > 600 && !(r && r.top < innerHeight && r.bottom > 0));
    };
    syncHeader();
    addEventListener("scroll", syncHeader, { passive: true });
  }
  function wireCookie() {
    const box = $("[data-cookie-banner]");
    if (consent() === "accepted") { loadTracking(); return; }
    if (!box || consent() !== "unset") return;
    box.hidden = false;
    $("[data-cookie-accept]", box)?.addEventListener("click", () => { localStorage.setItem(key, "accepted"); box.hidden = true; ev("cookie_consent_accepted"); loadTracking(); });
    $("[data-cookie-dismiss]", box)?.addEventListener("click", () => { localStorage.setItem(key, "rejected"); box.hidden = true; ev("cookie_consent_rejected"); });
  }
  function wireEvents() {
    $$("[data-primary-cta]").forEach(a => a.addEventListener("click", () => ev("primary_cta_click", { location: a.dataset.location || "page" })));
    $$("details[data-faq]").forEach(d => d.addEventListener("toggle", () => d.open && ev("faq_open", { question: $("summary", d).textContent.trim() })));
    const p = $("[data-pricing]");
    if (p && "IntersectionObserver" in window) new IntersectionObserver((e, o) => e[0].isIntersecting && (ev("pricing_view"), o.disconnect()), { threshold: .35 }).observe(p);
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
  document.addEventListener("DOMContentLoaded", () => { wireWhatsApp(); wireHeader(); wireCookie(); wireEvents(); wireForm(); });
})();

(function () {
  var config = window.LEADARO_CONFIG || {};
  var dataLayer = window.dataLayer = window.dataLayer || [];
  var consentKey = "leadaro_cookie_consent";
  var scrollTracked = false;
  var trackingLoaded = false;
  var placeholderIds = {
    GTM_ID: "GTM_ID",
    GA4_ID: "GA4_ID",
    META_PIXEL_ID: "META_PIXEL_ID",
    CLARITY_ID: "CLARITY_ID"
  };

  function hasRealId(key) {
    return config[key] && config[key] !== placeholderIds[key];
  }

  function isConfiguredEndpoint(endpoint) {
    return endpoint && endpoint !== "FORM_ENDPOINT" && !/^https?:\/\/example\.com/i.test(endpoint);
  }

  function pushEvent(name, params) {
    dataLayer.push(Object.assign({ event: name }, params || {}));
  }

  function getConsentStatus() {
    return localStorage.getItem(consentKey) || "unset";
  }

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name) || "";
  }

  function loadScript(src, attrs) {
    var script = document.createElement("script");
    script.async = true;
    script.src = src;
    Object.keys(attrs || {}).forEach(function (key) {
      script.setAttribute(key, attrs[key]);
    });
    document.head.appendChild(script);
  }

  function loadTracking() {
    if (trackingLoaded) return;
    trackingLoaded = true;

    if (hasRealId("GTM_ID")) {
      dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      loadScript("https://www.googletagmanager.com/gtm.js?id=" + encodeURIComponent(config.GTM_ID));
    }

    if (hasRealId("GA4_ID") && !hasRealId("GTM_ID")) {
      loadScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(config.GA4_ID));
      window.gtag = function () { dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", config.GA4_ID, { anonymize_ip: true });
    }

    if (hasRealId("META_PIXEL_ID")) {
      !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = true; n.version = "2.0";
        n.queue = []; t = b.createElement(e); t.async = true; t.src = v;
        s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
      }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      window.fbq("init", config.META_PIXEL_ID);
      window.fbq("track", "PageView");
    }

    if (hasRealId("CLARITY_ID")) {
      (function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
        t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", config.CLARITY_ID);
    }
  }

  function setupCookieBanner() {
    var banner = document.querySelector("[data-cookie-banner]");
    if (!banner) return;

    var consent = localStorage.getItem(consentKey);
    if (consent === "accepted") {
      loadTracking();
      return;
    }
    if (consent === "rejected") return;

    banner.hidden = false;

    var accept = banner.querySelector("[data-cookie-accept]");
    var reject = banner.querySelector("[data-cookie-reject]");

    accept.addEventListener("click", function () {
      localStorage.setItem(consentKey, "accepted");
      banner.hidden = true;
      pushEvent("cookie_consent_accepted");
      loadTracking();
    });

    reject.addEventListener("click", function () {
      localStorage.setItem(consentKey, "rejected");
      banner.hidden = true;
      pushEvent("cookie_consent_rejected");
    });
  }

  function setupWhatsappLinks() {
    var phone = config.WHATSAPP_PHONE || "";
    var message = encodeURIComponent(config.WHATSAPP_MESSAGE || "");
    var href = "https://wa.me/" + phone + "?text=" + message;
    document.querySelectorAll("[data-whatsapp-link]").forEach(function (link) {
      link.href = href;
      link.addEventListener("click", function () {
        pushEvent("whatsapp_click", { location: link.getAttribute("data-location") || "page" });
      });
    });
  }

  function setupCtas() {
    document.querySelectorAll("[data-primary-cta]").forEach(function (link) {
      link.addEventListener("click", function () {
        pushEvent("primary_cta_click", { location: link.getAttribute("data-location") || "page" });
      });
    });
  }

  function setupPricingView() {
    var pricing = document.querySelector("[data-pricing]");
    if (!pricing || !("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          pushEvent("pricing_view");
          observer.disconnect();
        }
      });
    }, { threshold: 0.35 });

    observer.observe(pricing);
  }

  function setupScrollTracking() {
    window.addEventListener("scroll", function () {
      if (scrollTracked) return;
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var height = document.documentElement.scrollHeight - window.innerHeight;
      if (height > 0 && scrollTop / height >= 0.75) {
        scrollTracked = true;
        pushEvent("scroll_75");
      }
    }, { passive: true });
  }

  function setupFaq() {
    document.querySelectorAll("details[data-faq]").forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (item.open) {
          pushEvent("faq_open", { question: item.querySelector("summary").textContent.trim() });
        }
      });
    });
  }

  function setupForm() {
    var form = document.querySelector("[data-lead-form]");
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      pushEvent("form_submit");

      var endpoint = config.FORM_ENDPOINT || "";
      var redirect = form.getAttribute("data-success-url") || "/thank-you";
      var submitButton = form.querySelector("button[type='submit']");
      var status = form.querySelector("[data-form-status]");
      if (submitButton) submitButton.disabled = true;
      if (status) status.textContent = "";

      var values = Object.fromEntries(new FormData(form).entries());
      var payload = {
        name: values.name || "",
        phone: values.phone || "",
        monthly_leads: values.monthly_leads || "",
        main_source: values.main_source || "",
        page_url: window.location.href,
        referrer: document.referrer || "",
        utm_source: getQueryParam("utm_source"),
        utm_medium: getQueryParam("utm_medium"),
        utm_campaign: getQueryParam("utm_campaign"),
        consent_status: getConsentStatus(),
        created_at: new Date().toISOString()
      };

      if (!isConfiguredEndpoint(endpoint)) {
        console.warn("FORM_ENDPOINT is not configured. Lead was not sent to server.");
        try {
          var storedLeads = JSON.parse(localStorage.getItem("leadaro_local_qa_leads") || "[]");
          storedLeads.push(payload);
          localStorage.setItem("leadaro_local_qa_leads", JSON.stringify(storedLeads.slice(-20)));
        } catch (error) {
          console.warn("Could not save Leadaro local QA lead.", error);
        }
        window.location.href = redirect;
        return;
      }

      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).then(function (response) {
        if (!response.ok) throw new Error("Form endpoint failed");
        window.location.href = redirect;
      }).catch(function () {
        if (submitButton) submitButton.disabled = false;
        if (status) status.textContent = "לא הצלחנו לשלוח את הטופס. אפשר לפנות ישירות בוואטסאפ.";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupCookieBanner();
    setupWhatsappLinks();
    setupCtas();
    setupPricingView();
    setupScrollTracking();
    setupFaq();
    setupForm();
  });
})();

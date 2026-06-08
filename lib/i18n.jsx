// lib/i18n.jsx — tiny bilingual layer.
// Usage in any component: t("English text", "中文文本").
// The top-level <App> calls useLang() so the whole tree re-renders on toggle.
window.__lang = window.__lang || (localStorage.getItem("ss_lang") || "en");

function setLang(l) {
  window.__lang = l;
  try { localStorage.setItem("ss_lang", l); } catch (e) {}
  document.documentElement.setAttribute("lang", l === "zh" ? "zh-CN" : "en");
  document.documentElement.setAttribute("data-lang", l);
  window.dispatchEvent(new CustomEvent("ss-langchange", { detail: l }));
}

function useLang() {
  const [lang, setL] = React.useState(window.__lang);
  React.useEffect(() => {
    const h = (e) => setL(e.detail);
    window.addEventListener("ss-langchange", h);
    return () => window.removeEventListener("ss-langchange", h);
  }, []);
  return lang;
}

/* Read the right string for the current language. */
function t(en, zh) {
  return window.__lang === "zh" ? (zh != null ? zh : en) : en;
}

// set initial document attributes
document.documentElement.setAttribute("lang", window.__lang === "zh" ? "zh-CN" : "en");
document.documentElement.setAttribute("data-lang", window.__lang);

Object.assign(window, { setLang, useLang, t });

// Shared i18n toggle for case study pages.
// Each page defines window.CASE_TRANSLATIONS = { en: {...}, fr: {...} } and
// window.CASE_TITLES = { en: "...", fr: "..." } before loading this script.
(function () {
  const supported = ['en', 'fr'];
  const langToggle = document.getElementById('langToggle');
  if (!langToggle) return;

  function detectDefaultLang() {
    const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return supported.includes(nav) ? nav : 'en';
  }

  function setLang(lang) {
    if (!supported.includes(lang)) lang = 'en';
    const dict = (window.CASE_TRANSLATIONS || {})[lang] || {};
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = dict[key];
      if (value !== undefined) el.innerHTML = value;
    });
    if (window.CASE_TITLES) {
      document.title = window.CASE_TITLES[lang] || window.CASE_TITLES.en;
    }
    langToggle.textContent = lang === 'fr' ? 'EN' : 'FR';
    langToggle.setAttribute('aria-label', lang === 'fr' ? 'Switch to English' : 'Passer en français');
    document.documentElement.dataset.currentLang = lang;
  }

  langToggle.addEventListener('click', () => {
    const current = document.documentElement.dataset.currentLang || 'en';
    setLang(current === 'en' ? 'fr' : 'en');
  });

  setLang(detectDefaultLang());
})();

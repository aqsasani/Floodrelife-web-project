(function () {
  var STORAGE_KEY = "frs_theme";
  var root = document.documentElement;

  var themeBtn = document.getElementById("themeToggle");
  var themeIcon = document.getElementById("themeIcon");

  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");
  var navOverlay = document.getElementById("navOverlay");
  var navClose = document.getElementById("navClose");

  function getCurrentPage() {
    var path = window.location.pathname.split('/').pop().toLowerCase();
    return path === '' ? 'index.html' : path;
  }

  function isProtectedPage(page) {
    return [
      'request.html',
      'viewrequests.html',
      'chat.html',
      'reviews.html'
    ].indexOf(page) !== -1;
  }

  function isAuthPage(page) {
    return ['login.html', 'signup.html', 'index.html'].indexOf(page) !== -1;
  }

  function checkAuthentication() {
    var page = getCurrentPage();
    var isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isProtectedPage(page) && !isLoggedIn) {
      window.location.href = 'home.html';
      return true;
    }

    if (isAuthPage(page) && isLoggedIn) {
      window.location.href = 'home.html';
      return true;
    }

    return false;
  }

  // Ensure protected pages require login before anything else
  if (checkAuthentication()) {
    return;
  }

  // Ensure nav isn't stuck open (some mobile browsers may restore previous DOM state)
  if (document.body) document.body.classList.remove("nav-open");

  function setAppHeight() {
    if (!root) return;
    var h =
      window.visualViewport && window.visualViewport.height
        ? window.visualViewport.height
        : window.innerHeight;
    root.style.setProperty("--app-height", h + "px");
  }

  setAppHeight();

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", setAppHeight);
    window.visualViewport.addEventListener("scroll", setAppHeight);
  }

  function preferredTheme() {
    var saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      saved = null;
    }

    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      if (themeIcon) themeIcon.textContent = "☾";
    } else {
      root.removeAttribute("data-theme");
      if (themeIcon) themeIcon.textContent = "☀";
    }
  }

  function toggleTheme() {
    var isDark = root.getAttribute("data-theme") === "dark";
    var next = isDark ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      // ignore
    }
  }

  function openNav() {
    if (!document.body || !nav) return;
    document.body.classList.add("nav-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "true");
  }

  function closeNav() {
    if (!document.body) return;
    document.body.classList.remove("nav-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  function toggleNav() {
    if (!document.body) return;
    if (document.body.classList.contains("nav-open")) closeNav();
    else openNav();
  }

  function setReady() {
    if (!document.body) return;
    setAppHeight();
    document.body.classList.remove("is-leaving");
    document.body.classList.add("is-ready");
    closeNav();
  }

  function isModifiedClick(e) {
    return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
  }

  function shouldAnimateLink(a) {
    if (!a) return false;
    if (a.target && a.target.toLowerCase() === "_blank") return false;
    if (a.hasAttribute("download")) return false;

    var href = a.getAttribute("href") || "";
    if (!href || href.startsWith("#")) return false;
    if (href.startsWith("mailto:") || href.startsWith("tel:")) return false;

    try {
      var url = new URL(a.href, window.location.href);
      if (url.protocol !== window.location.protocol) return false;
      if (!url.pathname.toLowerCase().endsWith(".html")) return false;
      if (url.href === window.location.href) return false;
      return true;
    } catch (e) {
      return false;
    }
  }

  function leaveTo(href) {
    if (!document.body) {
      window.location.href = href;
      return;
    }

    closeNav();

    var reduceMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.body.classList.remove("is-ready");
    document.body.classList.add("is-leaving");
    window.setTimeout(
      function () {
        window.location.href = href;
      },
      reduceMotion ? 0 : 220
    );
  }

  // Theme
  applyTheme(preferredTheme());
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

  // Nav
  if (navToggle && nav) {
    navToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleNav();
    });
  }

  if (navClose) {
    navClose.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeNav();
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener("click", function (e) {
      e.preventDefault();
      closeNav();
    });
  }

  if (nav) {
    nav.addEventListener("click", function (e) {
      var a = e.target && e.target.closest ? e.target.closest("a") : null;
      if (a) closeNav();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  window.addEventListener("resize", function () {
    setAppHeight();
    if (window.innerWidth > 760) closeNav();
  });

  window.addEventListener("orientationchange", setAppHeight);

  // Page load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setReady);
  } else {
    setReady();
  }

  // Back/forward cache
  window.addEventListener("pageshow", setReady);

  // Smooth internal navigation (page transitions)
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a") : null;
    if (!a) return;
    if (isModifiedClick(e)) return;
    if (!shouldAnimateLink(a)) return;

    e.preventDefault();
    leaveTo(a.href);
  });
})();

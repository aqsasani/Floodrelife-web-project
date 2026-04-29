(function () {
  var STORAGE_KEY = "frs_theme";
  var root = document.documentElement;
  root.classList.add("js");

  // Mobile viewport height fix (avoids 100vh extra space)
  try {
    var h =
      window.visualViewport && window.visualViewport.height
        ? window.visualViewport.height
        : window.innerHeight;
    root.style.setProperty("--app-height", h + "px");
  } catch (e) {
    // ignore
  }

  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark") {
      root.setAttribute("data-theme", "dark");
    } else if (saved === "light") {
      root.removeAttribute("data-theme");
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.setAttribute("data-theme", "dark");
    }
  } catch (e) {
    // ignore
  }
})();

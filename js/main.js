// Valora Realty — shared behaviour: sticky nav, mobile menu, cookie banner.
(function () {
  "use strict";

  var nav = document.getElementById("vlrNav");
  if (nav) {
    var setSolid = function () {
      if (window.scrollY > 40) nav.classList.add("vlr-nav-solid");
      else nav.classList.remove("vlr-nav-solid");
    };
    setSolid();
    window.addEventListener("scroll", setSolid, { passive: true });
  }

  var ham = document.getElementById("vlrHam");
  var mobile = document.getElementById("vlrMobile");
  var overlay = document.getElementById("vlrOverlay");
  var closeBtn = document.getElementById("vlrClose");

  function openMenu() {
    mobile.classList.add("is-open");
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    mobile.classList.remove("is-open");
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  if (ham && mobile && overlay) {
    ham.addEventListener("click", openMenu);
    closeBtn && closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);
    mobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  var cookies = document.getElementById("vlrCookies");
  if (cookies) {
    var accept = document.getElementById("vlrCookiesAccept");
    var close = document.getElementById("vlrCookiesClose");
    var STORAGE_KEY = "vlr_cookies_shown";
    var AUTO_HIDE_MS = 10000;

    var alreadyShown = false;
    try { alreadyShown = sessionStorage.getItem(STORAGE_KEY) === "1"; } catch (e) {}

    var autoHideTimer = null;

    function markShown() {
      try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch (e) {}
    }

    function dismiss() {
      cookies.classList.remove("is-visible");
      if (autoHideTimer) clearTimeout(autoHideTimer);
      markShown();
    }

    if (!alreadyShown) {
      setTimeout(function () {
        cookies.classList.add("is-visible");
        markShown();
        autoHideTimer = setTimeout(dismiss, AUTO_HIDE_MS);
      }, 800);
    }

    accept && accept.addEventListener("click", dismiss);
    close && close.addEventListener("click", dismiss);
  }
})();

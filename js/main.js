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
    var STORAGE_KEY = "vlr_cookies_accepted";

    var alreadyAccepted = false;
    try { alreadyAccepted = localStorage.getItem(STORAGE_KEY) === "1"; } catch (e) {}

    if (!alreadyAccepted) {
      setTimeout(function () { cookies.classList.add("is-visible"); }, 800);
    }

    function dismiss() {
      cookies.classList.remove("is-visible");
      try { localStorage.setItem(STORAGE_KEY, "1"); } catch (e) {}
    }

    accept && accept.addEventListener("click", dismiss);
    close && close.addEventListener("click", dismiss);
  }
})();

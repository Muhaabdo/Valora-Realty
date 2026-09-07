// Valora Realty — single project page behaviour: gallery autoplay + budget-match widget.
(function () {
  "use strict";

  /* ---------- Gallery autoplay ---------- */
  var track = document.getElementById("vlrsGalTrack");
  var playBtn = document.getElementById("vlrsGalPlay");
  var video = document.getElementById("vlrsGalVideo");

  if (track && playBtn) {
    var autoplayTimer = null;
    var isPlaying = false;

    function scrollToNext() {
      var items = track.children;
      if (!items.length) return;
      var itemWidth = items[0].getBoundingClientRect().width + 12; // gap
      var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 10;
      track.scrollBy({ left: atEnd ? -track.scrollLeft : -itemWidth, behavior: "smooth" });
      // Note: RTL horizontal scroll moves negative for "next" visually to the left.
    }

    function startAutoplay() {
      isPlaying = true;
      playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      autoplayTimer = setInterval(scrollToNext, 2600);
    }
    function stopAutoplay() {
      isPlaying = false;
      playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      clearInterval(autoplayTimer);
    }

    playBtn.addEventListener("click", function () {
      if (isPlaying) stopAutoplay();
      else startAutoplay();
    });

    track.addEventListener("pointerdown", stopAutoplay);
    video && video.addEventListener("play", stopAutoplay);
  }

  /* ---------- Match-my-budget widget ---------- */
  var matchBtn = document.getElementById("vlrMatchBtn");
  if (matchBtn) {
    var section = matchBtn.closest("[data-wa-number]") || document.querySelector("[data-wa-number]");
    var waNumber = (section && section.getAttribute("data-wa-number")) || "201008200033";
    var projectName = (section && section.getAttribute("data-project-name")) || "this project";

    var downInput = document.getElementById("vlrDown");
    var monthlyInput = document.getElementById("vlrMonthly");
    var errorEl = document.getElementById("vlrMatchError");

    matchBtn.addEventListener("click", function () {
      var down = (downInput.value || "").trim();
      var monthly = (monthlyInput.value || "").trim();

      if (!down || !monthly) {
        errorEl.hidden = false;
        return;
      }
      errorEl.hidden = true;

      var text = "Hello Valora Realty, I'm interested in " + projectName +
        ". My available down payment is " + down + " EGP and comfortable monthly installment is " + monthly + " EGP. Please suggest suitable units.";
      var url = "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(text);
      window.open(url, "_blank", "noopener");
    });
  }
})();

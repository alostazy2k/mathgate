/* ==========================================================================
   LESSON HANDOUT BUTTON  ·  assets/handout.js
   --------------------------------------------------------------------------
   Draws one button above the four collapsible sections of a lesson page:
   "Download the lesson handout (PDF)". The handout is the printable copy of
   the lesson — explanation, worked examples with step-by-step solutions,
   the additional exercises, the quiz and the homework.

   WHERE THE FILE COMES FROM
   The lesson's own data file says whether it has a handout:

       handout: { src: 'handouts/s1-u1-l1.pdf', version: 1, pages: 24 }

   No `handout` field  ->  no button at all (never a dead link).
   `version` is added to the link as ?v=…  — bump it by one whenever the PDF
   is replaced, exactly like `videoVersion` for the videos, so a returning
   student gets the new file instead of the cached one.

   WHO GETS IT
   A lesson in a FREE unit: the button is shown to everyone.
   A lesson in a PAID unit: a short notice is shown instead of the link.
   Opening it for subscribers needs the server (PLATFORM_CONFIG.backend) —
   built here and switched off until then, like the other backend features.
   This hides the link; it does not protect the file, in the same sense that
   the answer hashes are obfuscation and not protection.

   engine.js is not touched: this file only reads window.LESSON after the
   lesson's data file has loaded, and fills the #handout element.
   ========================================================================== */
(function () {
  'use strict';

  var ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function unitIsFree(lessonId) {
    try {
      var place = window.Student && Student.locate ? Student.locate(lessonId) : null;
      if (place && place.entry && place.entry.free === false) return false;
    } catch (e) { /* not in the map: treat as free, like the trial lesson */ }
    return true;
  }

  function build() {
    var host = document.getElementById('handout');
    var L = window.LESSON;
    if (!host) return;

    var h = L && L.handout;
    if (typeof h === 'string') h = { src: h };
    if (!h || !h.src) { host.hidden = true; return; }

    host.className = 'handout-slot';
    host.hidden = false;

    if (!unitIsFree(L.id)) {
      host.innerHTML =
        '<div class="handout-locked">' +
          '<span class="en">The printable handout of this lesson comes with the subscription.</span>' +
          '<span class="ar">ملزمة الدرس المطبوعة متاحة مع الاشتراك.</span>' +
        '</div>';
      return;
    }

    var url = h.src + (h.version ? '?v=' + encodeURIComponent(h.version) : '');
    var name = 'MathGate-' + String(L.id || 'lesson').replace(/[^A-Za-z0-9_-]/g, '') + '.pdf';
    var meta = h.pages ? '<span class="hb-meta">' + esc(h.pages) + ' pages · PDF</span>' : '';

    host.innerHTML =
      '<a class="handout-btn" href="' + esc(url) + '" download="' + esc(name) + '" target="_blank" rel="noopener">' +
        '<span class="hb-icon">' + ICON + '</span>' +
        '<span class="hb-text">' +
          '<span class="hb-en">Download the lesson handout (PDF)</span>' +
          '<span class="hb-ar">حمّل ملزمة الدرس PDF</span>' +
        '</span>' + meta +
      '</a>' +
      '<p class="handout-sub">' +
        '<span class="en">Print it and study with pen and paper.</span>' +
        '<span class="ar">اطبعها وذاكر بالورقة والقلم.</span>' +
      '</p>';
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();

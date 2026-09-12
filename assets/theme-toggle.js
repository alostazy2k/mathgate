/* ==========================================================================
   THEME SWITCH  ·  assets/theme-toggle.js
   --------------------------------------------------------------------------
   One button, three states:

       تلقائي   follow the phone or laptop   (no data-theme attribute)
       فاتح     always light                 (data-theme="light")
       غامق     always dark                  (data-theme="dark")

   WHY THREE AND NOT TWO
   A plain light/dark toggle has a trap: the moment a student touches it he is
   locked out of "follow my device" forever, and his page stops changing with
   the rest of his phone at night. The third state is the way back.

   The palette itself is NOT here — theme.css has carried a full dark set from
   the start, keyed on `data-theme`. This file only decides which one applies.

   The first paint is handled by a four-line script in the <head> of each page,
   not by this file: a stylesheet that loads before the choice is known would
   flash the wrong colours for an instant, which looks like a bug.
   ========================================================================== */

(function () {
  'use strict';

  var KEY = 'wg:theme';
  var ORDER = ['auto', 'light', 'dark'];

  var LABEL = {
    auto:  { ar: 'تلقائي', icon: '◐', title: 'الألوان بتتبع إعداد جهازك' },
    light: { ar: 'فاتح',   icon: '☀', title: 'الوضع الفاتح دايماً' },
    dark:  { ar: 'غامق',   icon: '☾', title: 'الوضع الغامق دايماً' }
  };

  /* the colour the phone paints its status bar with, per mode */
  var BAR = { light: '#F7F5F0', dark: '#101821' };

  function read() {
    try {
      var v = localStorage.getItem(KEY);
      return (v === 'light' || v === 'dark') ? v : 'auto';
    } catch (e) { return 'auto'; }
  }

  function write(mode) {
    try {
      if (mode === 'auto') localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, mode);
    } catch (e) { /* private window — the choice just will not be remembered */ }
  }

  function systemIsDark() {
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  function apply(mode) {
    var root = document.documentElement;
    if (mode === 'auto') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', mode);

    /* Keep the phone's own browser bar in step with the page. Without this the
       top of the screen stays white above a dark page, which reads as broken. */
    var effective = mode === 'auto' ? (systemIsDark() ? 'dark' : 'light') : mode;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', BAR[effective]);
  }

  function paintButton(btn, mode) {
    var l = LABEL[mode];
    btn.innerHTML = '<span class="tt-icon" aria-hidden="true">' + l.icon + '</span>' +
                    '<span class="tt-label">' + l.ar + '</span>';
    btn.setAttribute('title', l.title);
    btn.setAttribute('aria-label', 'وضع الألوان: ' + l.ar + ' — اضغط للتغيير');
    btn.setAttribute('data-mode', mode);
  }

  function build() {
    if (document.querySelector('.theme-toggle')) return;

    var mode = read();
    apply(mode);

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-toggle';
    paintButton(btn, mode);

    btn.addEventListener('click', function () {
      mode = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
      write(mode);
      apply(mode);
      paintButton(btn, mode);
      btn.classList.remove('tt-pop');
      void btn.offsetWidth;            /* restart the animation */
      btn.classList.add('tt-pop');
    });

    document.body.appendChild(btn);

    /* While on «تلقائي», follow the device live — if the phone switches to
       night mode at sunset, the page follows without a reload. */
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function () { if (read() === 'auto') apply('auto'); };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();

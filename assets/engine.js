/* ==========================================================================
   Dr. Wessam Gouda — Math Platform
   engine.js  ·  renders any lesson / homework page from a data file.

   Write this once. Every new lesson is a data file, never a new page.

   Public API
     MathPlatform.renderLesson()    — called by lesson.html
     MathPlatform.renderHomework()  — called by homework.html
     MathPlatform.hashAnswer(str)   — used by tools/hash.html
   ========================================================================== */

window.MathPlatform = (function () {
  'use strict';

  /* ------------------------------------------------------------- version */

  /* Single source of truth: the ?v= on this script's own <src> in the page.
     Bump it in lesson.html and homework.html and the browser is forced to
     fetch the new engine and stylesheet instead of serving a cached one. */
  var VERSION = (function () {
    if (window.__WG_VERSION__) return window.__WG_VERSION__;
    var s = document.currentScript ||
            document.querySelector('script[src*="engine.js"]');
    var m = s && /[?&]v=([^&]+)/.exec(s.getAttribute('src') || '');
    return m ? m[1] : 'dev';
  })();

  /* ---------------------------------------------------------------- utils */

  var AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';

  /**
   * Normalises a typed maths answer so equivalent spellings match.
   * Handles the things Egyptian students actually type: Arabic-Indic digits,
   * the Arabic comma, several dash characters, ℝ, \ for set-minus, ∞.
   */
  function normalizeAnswer(s) {
    var t = String(s == null ? '' : s);
    t = t.replace(/[٠-٩]/g, function (d) { return AR_DIGITS.indexOf(d); });
    t = t.replace(/[،؛]/g, ',');
    t = t.replace(/[−–—―]/g, '-');
    t = t.replace(/[ℝ]/g, 'R');
    t = t.replace(/\\/g, '-');
    t = t.replace(/[∞]/g, 'inf');
    t = t.toLowerCase();
    t = t.replace(/infinity/g, 'inf');
    t = t.replace(/\s+/g, '');
    return t;
  }

  /**
   * Puts an answer into canonical form BEFORE hashing, according to its kind.
   *
   *   'set'      order does not matter — a set is a set.
   *              R-{3,-3} and R-{-3,3} both become r-{-3,3}
   *              "2, 1" and "1, 2" both become 1,2
   *   'interval' order DOES matter — [2,6] is not [6,2]. Left as-is.
   *   'exact'    (default) plain string comparison after normalising.
   */
  function canonical(s, kind) {
    var t = normalizeAnswer(s);
    if (kind !== 'set') return t;

    var m = t.match(/^(.*?)\{(.*)\}$/);      // R-{a,b}  →  prefix "r-", inner "a,b"
    var prefix = m ? m[1] : '';
    var inner = m ? m[2] : t;                // or a bare list: "a,b"

    var parts = inner.split(',').filter(function (x) { return x !== ''; });
    parts.sort(function (a, b) {
      var na = parseFloat(a), nb = parseFloat(b);
      if (!isNaN(na) && !isNaN(nb) && na !== nb) return na - nb;
      return a < b ? -1 : (a > b ? 1 : 0);
    });
    return m ? prefix + '{' + parts.join(',') + '}' : parts.join(',');
  }

  /**
   * FNV-1a, salted. This is OBFUSCATION, not security: it stops a student
   * reading the answers out of the page source, which is the whole threat
   * at this stage. Real protection arrives when grading moves to the server.
   */
  function hashAnswer(s, kind) {
    var str = 'wg1:' + canonical(s, kind);
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h.toString(16);
  }

  function matches(input, hashes, kind) {
    if (!hashes) return false;
    var h = hashAnswer(input, kind);
    for (var i = 0; i < hashes.length; i++) if (hashes[i] === h) return true;
    return false;
  }

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* Renders KaTeX inside a freshly-inserted subtree. */
  function typeset(root) {
    if (typeof renderMathInElement !== 'function') return;
    try {
      renderMathInElement(root || document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '\\[', right: '\\]', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false }
        ],
        throwOnError: false
      });
    } catch (e) { /* never let a bad formula break the page */ }
  }

  var CHEER_COLORS = ['#2F6F6B', '#B4842A', '#1B2A41', '#AA4A32'];

  /* A built-in celebration, so the moment never depends on the internet.

     Until v4.3 this used a library loaded from a CDN, and the whole function
     began `if (typeof confetti !== 'function') return;` — so whenever that
     script was slow, blocked or simply not on the page (homework.html never
     loaded it at all), the celebration silently did not happen. No error, no
     clue. For a student on an Egyptian mobile connection that is not an edge
     case, it is Tuesday.

     This draws the same effect in about forty lines of canvas. The library is
     still used when it happens to be there, because it looks a little better;
     this is what guarantees something always happens. */
  function burst(big) {
    var n = big ? 130 : 45;
    var cv = document.createElement('canvas');
    cv.className = 'cheer-canvas';
    var w = cv.width = window.innerWidth;
    var h = cv.height = window.innerHeight;
    document.body.appendChild(cv);
    var ctx = cv.getContext('2d');

    var bits = [];
    for (var i = 0; i < n; i++) {
      var a = (-Math.PI / 2) + (Math.random() - 0.5) * (big ? 1.5 : 1.1);
      var sp = (big ? 9 : 7) + Math.random() * (big ? 9 : 6);
      bits.push({
        x: w / 2 + (Math.random() - 0.5) * (big ? 220 : 120),
        y: h * (big ? 0.62 : 0.72),
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        s: 4 + Math.random() * 5,
        rot: Math.random() * 6.28,
        vr: (Math.random() - 0.5) * 0.35,
        c: CHEER_COLORS[(Math.random() * CHEER_COLORS.length) | 0],
        life: 1
      });
    }

    var start = Date.now();
    (function frame() {
      ctx.clearRect(0, 0, w, h);
      var alive = false;
      bits.forEach(function (b) {
        b.vy += 0.28;                 /* gravity */
        b.vx *= 0.995;
        b.x += b.vx; b.y += b.vy; b.rot += b.vr;
        b.life = Math.max(0, 1 - (Date.now() - start) / (big ? 2400 : 1800));
        if (b.life <= 0 || b.y > h + 40) return;
        alive = true;
        ctx.save();
        ctx.globalAlpha = b.life;
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);
        ctx.fillStyle = b.c;
        ctx.fillRect(-b.s / 2, -b.s / 2, b.s, b.s * 0.6);
        ctx.restore();
      });
      if (alive) requestAnimationFrame(frame);
      else if (cv.parentNode) cv.parentNode.removeChild(cv);
    })();
  }

  function cheer(big) {
    /* The one case where nothing should move: the student asked his device
       for less motion. That is a setting, not a failure. */
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (typeof confetti === 'function') {
      confetti({
        particleCount: big ? 130 : 45,
        spread: big ? 80 : 55,
        origin: { y: big ? 0.6 : 0.7 },
        colors: CHEER_COLORS
      });
      return;
    }
    burst(big);
  }

  /* ------------------------------------------------------------- progress */

  var Progress = {
    key: function (id) { return 'wg:progress:' + id; },
    load: function (id) {
      try { return JSON.parse(localStorage.getItem(this.key(id))) || {}; }
      catch (e) { return {}; }
    },
    save: function (id, data) {
      try { localStorage.setItem(this.key(id), JSON.stringify(data)); }
      catch (e) { /* private mode — the page still works, it just forgets */ }
    }
  };

  /* ------------------------------------------------------- activity feed */

  /* The one line in the engine that talks to the student record. Everything
     else about the student — progress, gate, attempts — is written through
     the keys Student.js reads. Guarded, so a page that forgot to load
     student.js degrades to a lesson that simply does not log. */
  function track(type, label) {
    if (window.Student && L && L.id) Student.log(type, L.id, label || '');
  }

  /* Where this lesson sits in data/course.js, or null for the trial lesson
     that is not in the map. */
  function place() {
    return (window.Student && Student.locate) ? Student.locate(L.id) : null;
  }

  /* Every video path in every lesson file is relative — `videos/<id>/x.mp4`.
     `videoBase` in config.js is what turns those into absolute URLs the day
     the files move off this server and onto a video host, so no lesson data
     file ever has to be edited. It was declared in v3.7 and never actually
     read; from v4.2 it is. An absolute path or a full URL passes through
     untouched, so a single lesson can be moved on its own. */
  /* Says which file was expected and where. Written for the author, not the
     student — the student never sees it once the files are in place, and when
     he does it still tells him something true instead of nothing. */
  function showVideoError(host, url) {
    clearVideoError(host);
    var d = el('div', 'video-missing');
    d.innerHTML =
      '<span class="vm-title">المقطع ده مش متاح دلوقتي</span>' +
      '<p>المتصفح مش لاقي الملف، أو مش قادر يشغّله.</p>' +
      '<p class="vm-path">المفروض يكون هنا: <code>' + esc(String(url).split('?')[0]) + '</code></p>' +
      '<p class="vm-fix">لو الملف موجود فعلاً في المكان ده، فالمشكلة في ترميز الفيديو — ' +
      'احفظه <strong>MP4 بترميز H.264</strong> وهو الترميز الوحيد اللي كل المتصفحات بتفتحه.</p>';
    host.appendChild(d);
  }

  function clearVideoError(host) {
    var old = host.querySelector('.video-missing');
    if (old) old.parentNode.removeChild(old);
  }

  function mediaUrl(src) {
    if (!src) return src;

    var url = src;
    if (!/^(https?:)?\/\//.test(src) && src.charAt(0) !== '/') {
      var base = (window.PLATFORM_CONFIG && window.PLATFORM_CONFIG.videoBase) || '';
      if (base) {
        if (base.charAt(base.length - 1) !== '/') base += '/';
        url = base + src;
      }
    }

    /* Re-record a clip, keep the same file name, and a browser that has already
       seen it will go on playing the OLD one — through a reload, through
       closing the browser, and no matter what the server's cache headers say.
       Verified: replacing the file and reloading still served the old video
       even with `Cache-Control: no-store`; adding a new query string served the
       new one instantly.

       So every video URL carries `videoVersion` from config.js. Bump that one
       number whenever you replace a video file, and every student gets the new
       clip on his next visit. Without it, only students who have never opened
       the lesson would ever see the re-recorded version. */
    var v = window.PLATFORM_CONFIG && window.PLATFORM_CONFIG.videoVersion;
    if (v) url += (url.indexOf('?') < 0 ? '?' : '&') + 'v=' + encodeURIComponent(v);

    return url;
  }

  function lessonUrl(id) {
    return (window.Student && Student.href) ? Student.href('lesson', id) : 'lesson.html?id=' + id;
  }
  function homeworkUrl(id) {
    return (window.Student && Student.href) ? Student.href('homework', id) : 'homework.html?id=' + id;
  }

  /* --------------------------------------------------------- Arabic notes */

  /* ------------------------------------------------- storage availability */

  /* Private windows, strict tracking protection and file:// pages all block
     localStorage. Everything still renders, but progress, quiz scores and the
     homework gate quietly stop working — so say so instead of letting the
     student think the page is broken. */
  function storageOK() {
    try {
      localStorage.setItem('wg:probe', '1');
      localStorage.removeItem('wg:probe');
      return true;
    } catch (e) { return false; }
  }

  function isDemo() {
    return !!(window.PLATFORM_CONFIG && window.PLATFORM_CONFIG.demoMode);
  }

  /* Says plainly that this link is a preview, so a visitor is not left
     wondering whether his homework actually reached anyone. */
  function demoBanner() {
    if (!isDemo()) return;
    var d = el('div', 'demo-banner');
    d.innerHTML =
      '<span class="db-title">نسخة عرض</span>' +
      '<p>كل حاجة شغّالة عادي، بس <strong>الواجب مش بيتبعت فعلاً</strong> — ' +
      'دي نسخة للاطلاع على شكل المنصة.</p>';
    var wrap = document.querySelector('.wrap');
    if (wrap) wrap.insertBefore(d, wrap.firstChild);
  }

  function storageWarning() {
    if (storageOK()) return;
    var isFile = location.protocol === 'file:';
    var w = el('div', 'storage-warn');
    w.innerHTML =
      '<span class="sw-title">متصفحك مانع حفظ التقدّم</span>' +
      '<p>الدرس والتمارين والواجب كلهم هيشتغلوا عادي، بس تقدّمك ودرجاتك مش هتتسجّل، ' +
      'والدرس التالي مش هيتفتح تلقائياً بعد تسليم الواجب.</p>' +
      (isFile
        ? '<p class="sw-fix">السبب إن الصفحة مفتوحة كملف محلي. شغّل ' +
          '<code>start-server.bat</code> وافتحها من <code>http://localhost:8080</code>.</p>'
        : '<p class="sw-fix">جرّب تفتح الصفحة في نافذة عادية مش تصفح خاص، ' +
          'أو اسمح بحفظ بيانات المواقع لهذا الموقع من إعدادات المتصفح.</p>');
    var wrap = document.querySelector('.wrap');
    if (wrap) wrap.insertBefore(w, wrap.firstChild);
  }

  /* A visible answer to "which version am I actually looking at?" — the
     question that costs the most time when a stale file is being served. */
  function buildStamp() {
    var f = document.querySelector('footer');
    if (!f) return;
    var s = el('span', 'build-stamp', 'engine v' + VERSION + ' · ' + L.id);
    f.appendChild(s);
  }

  function arNote(note) {
    if (!note) return null;
    var tone = note.tone ? ' ' + note.tone : '';
    var n = el('div', 'ar-note' + tone);
    if (note.label) n.appendChild(el('span', 'ar-label', esc(note.label)));
    n.appendChild(el('div', null, note.text));
    return n;
  }

  /* ============================================================== LESSON  */

  var L, BANK, state, lessonRoot;

  function mount(id) { return document.getElementById(id); }

  /* --- masthead ---------------------------------------------------------- */
  function buildMasthead() {
    var h = mount('masthead');
    h.innerHTML =
      '<div class="masthead-text">' +
        '<span class="eyebrow">Unit ' + L.unit + ' · Lesson ' + L.lessonNo + '</span>' +
        '<h1>' + L.title + '</h1>' +
        '<p class="lede">' + L.lede + '</p>' +
        '<p class="author">Prepared by <strong>' + L.author + '</strong></p>' +
      '</div>' +
      '<div class="masthead-art">' + (L.art || '') + '</div>';
  }

  function buildGoal() {
    var g = mount('goal');
    if (!L.goal) { g.hidden = true; return; }
    g.innerHTML =
      '<span class="goal-label">Lesson goal</span>' +
      '<p>' + L.goal.en + '</p>';
    if (L.goal.ar) {
      g.appendChild(arNote({ label: 'الهدف من الدرس', text: L.goal.ar, tone: 'tip' }));
    }
    /* the rule is stated up front, not sprung on the student at the bottom */
    if (L.gateNoticeAr) {
      g.appendChild(arNote({ label: 'قاعدة التقدّم', text: L.gateNoticeAr, tone: 'warn' }));
    }
  }

  /* --- video segments ---------------------------------------------------- */
  function buildVideo() {
    var host = mount('video');
    var v = L.video;
    if (!v || !v.segments || !v.segments.length) { host.hidden = true; return; }

    var intro = el('div', 'video-intro');
    intro.innerHTML = '<span class="dot"></span><p>' + v.intro.en + '</p>';
    host.appendChild(intro);
    if (v.intro.ar) host.appendChild(arNote({ label: 'إرشاد', text: v.intro.ar }));

    var tabs = el('div', 'seg-tabs');
    tabs.setAttribute('role', 'tablist');
    host.appendChild(tabs);

    var frame = el('div', 'video-frame');
    var video = document.createElement('video');
    video.controls = true;
    video.preload = 'none';
    video.setAttribute('playsinline', '');
    frame.appendChild(video);
    host.appendChild(frame);

    var cap = el('div', 'seg-caption');
    host.appendChild(cap);

    state.seg = state.seg || {};

    function paintTabs() {
      Array.prototype.forEach.call(tabs.children, function (b, i) {
        b.querySelector('.seg-done').textContent = state.seg[i] ? '✓' : '';
      });
    }

    function select(i) {
      Array.prototype.forEach.call(tabs.children, function (b, j) {
        b.setAttribute('aria-selected', String(i === j));
      });
      var s = v.segments[i];
      var url = mediaUrl(s.src);
      video.src = url;
      video.poster = posterFor(s.title);
      cap.innerHTML = s.caption ? s.caption : '';
      if (s.ar) { var n = arNote({ label: 'ملخص المقطع', text: s.ar }); cap.appendChild(n); }

      /* A missing or unplayable video file used to fail in complete silence:
         the poster stayed up, pressing play did nothing, and there was no clue
         whether the file was in the wrong folder, misnamed, or encoded in a
         format the browser cannot open. With preload="none" the error arrives
         only when the student presses play, which is exactly when he needs to
         be told. */
      video.onerror = function () { showVideoError(cap, url); };
      video.onloadeddata = function () { clearVideoError(cap); };

      typeset(cap);
    }

    v.segments.forEach(function (s, i) {
      var b = el('button', 'seg-tab');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.innerHTML = '<span class="seg-n">' + (i + 1) + '</span>' +
                    '<span>' + esc(s.title) + '</span>' +
                    '<span class="seg-done"></span>';
      b.addEventListener('click', function () { select(i); });
      tabs.appendChild(b);
    });

    video.addEventListener('ended', function () {
      var i = Array.prototype.findIndex.call(tabs.children, function (b) {
        return b.getAttribute('aria-selected') === 'true';
      });
      if (i > -1) { state.seg[i] = true; persist(); paintTabs(); updateProgress(); }
    });

    select(0);
    paintTabs();
  }

  function posterFor(title) {
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 450'>" +
      "<rect width='800' height='450' fill='#0f1c22'/>" +
      "<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' " +
      "fill='#2F6F6B' font-size='26' font-family='sans-serif'>" + esc(title) + "</text></svg>";
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  }

  /* --- theory ------------------------------------------------------------ */
  function figureRow(figs) {
    var row = el('div', 'figure-row');
    figs.forEach(function (f) {
      var card = el('div', 'fig-card', f.svg);
      var capr = el('div', 'fig-caption');
      capr.innerHTML = '<span class="fig-label">' + f.label + '</span>' +
        (f.verdict ? '<span class="verdict ' + f.verdict + '">' +
          (f.verdict === 'yes' ? 'function' : 'not a function') + '</span>' : '');
      card.appendChild(capr);
      row.appendChild(card);
    });
    return row;
  }

  function workedBlock(w) {
    var box = el('div', 'worked');
    box.appendChild(el('span', 'worked-label', w.label || 'Example'));
    box.appendChild(el('p', null, w.prompt));
    if (w.figures) box.appendChild(figureRow(w.figures));
    box.appendChild(el('span', 'worked-solution-label', 'Solution'));

    if (w.grid) {
      var grid = el('div', 'worked-grid' + (w.grid.reverse ? ' reverse' : ''));
      var textCol = el('div', null, w.grid.text);
      if (w.result) textCol.appendChild(el('div', 'result-box', w.result));
      var figCol = document.createElement('figure');
      figCol.innerHTML = w.grid.figure.svg +
        '<figcaption>' + w.grid.figure.caption + '</figcaption>';
      if (w.grid.reverse) { grid.appendChild(figCol); grid.appendChild(textCol); }
      else { grid.appendChild(textCol); grid.appendChild(figCol); }
      box.appendChild(grid);
    } else {
      box.appendChild(el('div', null, w.solution || ''));
      if (w.result) box.appendChild(el('div', 'result-box', w.result));
    }
    if (w.ar) box.appendChild(arNote({ label: 'بالعربي باختصار', text: w.ar }));
    return box;
  }

  function buildTheory() {
    var host = mount('theory');
    L.sections.forEach(function (sec) {
      var s = el('section', 'theory-block');
      s.innerHTML = '<div class="section-head"><span class="num">' + sec.num +
                    '</span><h2>' + sec.title + '</h2></div>';

      (sec.subs || []).forEach(function (sub) {
        var d = el('div', 'lesson-sub');
        if (sub.kicker) d.appendChild(el('span', 'sub-kicker', sub.kicker));
        d.appendChild(el('h3', 'sub-title', sub.title));
        if (sub.lede) d.appendChild(el('p', 'sub-lede', sub.lede));
        if (sub.ar) d.appendChild(arNote(sub.ar));
        if (sub.figures) d.appendChild(figureRow(sub.figures));
        (sub.worked || []).forEach(function (w) { d.appendChild(workedBlock(w)); });
        if (sub.notice) d.appendChild(el('div', 'result-box', sub.notice));
        s.appendChild(d);
      });

      if (sec.mistakes && sec.mistakes.length) {
        var m = el('div', 'mistakes');
        m.innerHTML = '<h4>Common mistakes <span class="ar-inline">— أشهر الأغلاط</span></h4>';
        var ol = document.createElement('ol');
        sec.mistakes.forEach(function (mi) {
          var li = document.createElement('li');
          li.innerHTML = mi.en + (mi.ar ? '<span class="ar-inline">' + mi.ar + '</span>' : '');
          ol.appendChild(li);
        });
        m.appendChild(ol);
        s.appendChild(m);
      }

      if (sec.recap && sec.recap.length) {
        s.appendChild(el('p', 'recap-heading', 'Quick reference'));
        var grid = el('div', 'theory-grid');
        sec.recap.forEach(function (r) {
          grid.appendChild(el('div', 'theory-box', '<h3>' + r.title + '</h3>' + r.html));
        });
        s.appendChild(grid);
      }
      host.appendChild(s);
    });
  }

  /* --- question renderers ------------------------------------------------ */

  function feedbackNode(row) { return row.querySelector('.feedback'); }

  function markSolved(qid) {
    state.ex = state.ex || {};
    state.ex[qid] = true;
    persist();
    updateProgress();
  }

  function explainNode(q) {
    if (!q.explain && !q.explainAr) return null;
    var d = el('div', 'explain');
    d.hidden = true;
    d.innerHTML = '<span class="explain-label">Why</span>' + (q.explain || '');
    if (q.explainAr) d.appendChild(arNote({ label: 'التوضيح', text: q.explainAr }));
    return d;
  }

  function actionsRow(q, onCheck, expl) {
    var row = el('div', 'ex-actions');
    var check = el('button', 'btn btn-check', 'Check answer');
    check.type = 'button';
    var vid = null;
    if (q.video) {
      vid = el('button', 'btn btn-video', 'Watch solution');
      vid.type = 'button';
      vid.dataset.video = q.video;
    }
    var fb = el('span', 'feedback');
    row.appendChild(check);
    if (vid) row.appendChild(vid);
    row.appendChild(fb);

    check.addEventListener('click', function () {
      var res = onCheck();
      if (res === null) {
        fb.textContent = 'Select or type an answer first';
        fb.className = 'feedback wrong';
        return;
      }
      if (res) {
        fb.textContent = 'Correct';
        fb.className = 'feedback correct';
        cheer(false);
        if (expl) expl.hidden = false;
      } else {
        fb.textContent = 'Not quite — watch the solution';
        fb.className = 'feedback wrong';
        if (vid) { vid.classList.add('highlight'); setTimeout(function () { vid.classList.remove('highlight'); }, 900); }
      }
    });
    return row;
  }

  function renderMCQ(q, qid, body) {
    var opts = el('div', 'options-row');
    q.options.forEach(function (o, i) {
      var lab = document.createElement('label');
      lab.innerHTML = '<input type="radio" name="' + qid + '" value="' + i + '"> ' + o;
      opts.appendChild(lab);
    });
    body.appendChild(opts);
    var expl = explainNode(q);
    body.appendChild(actionsRow(q, function () {
      var sel = opts.querySelector('input:checked');
      if (!sel) return null;
      var ok = matches(qid + ':' + sel.value, q.hashes);
      if (ok) markSolved(qid);
      return ok;
    }, expl));
    if (expl) body.appendChild(expl);
  }

  function renderNumeric(q, qid, body) {
    var row = el('div', 'answer-row');
    var input = el('input', 'answer-input');
    input.type = 'text';
    input.dir = 'ltr';
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.placeholder = q.placeholder || 'your answer';
    row.appendChild(input);
    if (q.inputHint) row.appendChild(el('span', 'input-hint', esc(q.inputHint)));
    body.appendChild(row);
    var expl = explainNode(q);
    body.appendChild(actionsRow(q, function () {
      if (!input.value.trim()) return null;
      var ok = matches(input.value, q.hashes, q.kind);
      input.className = 'answer-input ' + (ok ? 'ok' : 'bad');
      if (ok) markSolved(qid);
      return ok;
    }, expl));
    if (expl) body.appendChild(expl);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); body.querySelector('.btn-check').click(); }
    });
  }

  /* Sequential steps — the auto-gradable replacement for an essay question.
     Each step unlocks only when the one before it is right, so the student
     is walked through the method instead of guessing the final answer. */
  function renderSteps(q, qid, body) {
    var list = el('div', 'steps-list');
    var inputs = [];
    q.steps.forEach(function (st, i) {
      var item = el('div', 'step-item' + (i === 0 ? '' : ' locked'));
      item.innerHTML = '<div class="step-q"><span class="step-n">' + (i + 1) + '</span>' +
                       '<span>' + st.prompt + '</span></div>';
      var row = el('div', 'answer-row');
      var inp = el('input', 'answer-input');
      inp.type = 'text'; inp.dir = 'ltr'; inp.autocomplete = 'off'; inp.spellcheck = false;
      inp.placeholder = st.placeholder || '';
      var btn = el('button', 'btn btn-ghost', 'Check');
      btn.type = 'button';
      var fb = el('span', 'feedback');
      row.appendChild(inp); row.appendChild(btn); row.appendChild(fb);
      item.appendChild(row);
      if (st.ar) item.appendChild(arNote({ label: 'تلميح', text: st.ar, tone: 'tip' }));
      list.appendChild(item);
      inputs.push({ item: item, input: inp, fb: fb, def: st });

      btn.addEventListener('click', function () {
        if (!inp.value.trim()) { fb.textContent = 'Type an answer'; fb.className = 'feedback wrong'; return; }
        var ok = matches(inp.value, st.hashes, st.kind);
        inp.className = 'answer-input ' + (ok ? 'ok' : 'bad');
        fb.textContent = ok ? 'Correct' : 'Try again';
        fb.className = 'feedback ' + (ok ? 'correct' : 'wrong');
        if (!ok) return;
        item.classList.add('done');
        if (inputs[i + 1]) {
          inputs[i + 1].item.classList.remove('locked');
          inputs[i + 1].input.focus();
        } else {
          cheer(false);
          markSolved(qid);
          var e2 = body.querySelector('.explain');
          if (e2) e2.hidden = false;
        }
      });
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); btn.click(); } });
    });
    body.appendChild(list);
    var expl = explainNode(q);
    if (q.video) {
      var row2 = el('div', 'ex-actions');
      var vid = el('button', 'btn btn-video', 'Watch full solution');
      vid.type = 'button'; vid.dataset.video = q.video;
      row2.appendChild(vid);
      body.appendChild(row2);
    }
    if (expl) body.appendChild(expl);
  }

  var TYPE_LABEL = { mcq: 'multiple choice', numeric: 'written answer', steps: 'step by step' };

  function buildExercises() {
    var host = mount('exercises');
    host.innerHTML = '<div class="section-head"><span class="num">§2</span><h2>Interactive examples</h2></div>';
    if (L.exercisesAr) host.appendChild(arNote({ label: 'إرشاد', text: L.exercisesAr }));

    L.exercises.forEach(function (qid, idx) {
      var q = BANK[qid];
      if (!q) return;
      var card = el('div', 'ex-card');
      card.id = 'ex-' + qid;
      card.appendChild(el('div', 'ex-num', String(idx + 1)));
      var body = el('div', 'ex-body');
      body.innerHTML =
        '<div class="ex-title">' + esc(q.title) +
        '<span class="type-chip">' + (TYPE_LABEL[q.type] || q.type) + '</span></div>' +
        '<div class="ex-question">' + q.prompt + '</div>';
      if (q.ar) body.appendChild(arNote({ label: 'المطلوب', text: q.ar }));

      if (q.type === 'mcq') renderMCQ(q, qid, body);
      else if (q.type === 'numeric') renderNumeric(q, qid, body);
      else if (q.type === 'steps') renderSteps(q, qid, body);

      card.appendChild(body);
      host.appendChild(card);
    });
  }

  /* --- quiz -------------------------------------------------------------- */
  function buildQuiz() {
    var host = mount('quiz');
    host.innerHTML =
      '<div class="section-head"><span class="num">§3</span><h2>Self-assessment quiz</h2></div>' +
      '<div class="quiz-panel">' +
        '<div class="quiz-top">' +
          '<h3>' + L.quiz.length + ' questions, ' + L.quiz.length + ' minutes</h3>' +
          '<div class="score-chip"><span class="score-num" id="scoreNum">0/' + L.quiz.length +
          '</span><span class="score-msg" id="scoreMsg">Not attempted yet</span></div>' +
        '</div>' +
        '<div id="quizItems"></div>' +
        '<button type="button" class="submit-quiz" id="submitQuiz">Submit quiz — get your score</button>' +
        '<div class="quiz-feedback" id="quizFb"></div>' +
        '<div class="score-final" id="scoreFinal" hidden>' +
          '<span class="score-num" id="scoreNumB">0/' + L.quiz.length + '</span>' +
          '<span class="score-msg" id="scoreMsgB"></span></div>' +
      '</div>';

    var items = mount('quizItems');
    if (L.quizAr) items.appendChild(arNote({ label: 'قبل ما تبدأ', text: L.quizAr }));

    L.quiz.forEach(function (qid, i) {
      var q = BANK[qid];
      if (!q) return;
      var d = el('div', 'qz');
      d.dataset.qid = qid;
      d.innerHTML =
        '<div class="qz-row">' +
          '<div class="qz-text"><span class="qz-status"></span>' +
          '<span>' + (i + 1) + ') ' + q.prompt + '</span></div>' +
          (q.video ? '<button type="button" class="btn btn-video qz-video-btn" hidden data-video="' +
            esc(q.video) + '">Video</button>' : '') +
        '</div>';
      var opts = el('div', 'qz-options');
      q.options.forEach(function (o, j) {
        var lab = document.createElement('label');
        lab.innerHTML = '<input type="radio" name="qz-' + qid + '" value="' + j + '"> ' + o;
        opts.appendChild(lab);
      });
      d.appendChild(opts);
      items.appendChild(d);
    });

    mount('submitQuiz').addEventListener('click', gradeQuiz);
  }

  function quizMessage(score, total) {
    var r = score / total;
    if (r === 1) return 'Perfect. — ممتاز، الدرس مفهوم بالكامل.';
    if (r >= 0.8) return 'Very good — one small gap to close. — راجع اللي غلطت فيه بس.';
    if (r >= 0.6) return 'Solid start. — كويس، بس محتاج مراجعة.';
    if (r >= 0.4) return 'Watch the videos on the ones you missed. — شوف فيديو الحل للأسئلة الغلط.';
    return 'Worth another pass through the lesson. — الأفضل تعيد الدرس من الأول.';
  }

  function gradeQuiz() {
    var total = L.quiz.length, score = 0;
    Array.prototype.forEach.call(document.querySelectorAll('#quizItems .qz'), function (d) {
      var qid = d.dataset.qid, q = BANK[qid];
      var sel = d.querySelector('input:checked');
      var ok = sel && matches(qid + ':' + sel.value, q.hashes);
      if (ok) score++;
      var st = d.querySelector('.qz-status');
      st.textContent = ok ? '✓' : '✗';
      st.className = 'qz-status ' + (ok ? 'correct' : 'wrong');
      var vb = d.querySelector('.qz-video-btn');
      if (vb) vb.hidden = ok;
    });

    var msg = quizMessage(score, total);
    mount('scoreNum').textContent = score + '/' + total;
    mount('scoreMsg').textContent = score === total ? 'Perfect' : 'Attempted';
    mount('scoreNumB').textContent = score + '/' + total;
    mount('scoreMsgB').textContent = msg;
    mount('scoreFinal').hidden = false;
    mount('quizFb').textContent = 'You scored ' + score + ' out of ' + total + '.';
    if (score === total) cheer(true);

    state.quiz = { score: score, total: total };
    persist();
    updateProgress();
    track('quiz', score + '/' + total);
  }

  /* --- next step + homework gate ----------------------------------------- */

  /* The gate: the next lesson opens once the homework has been SENT.
     Not once it is answered correctly — a student who already understands
     the lesson should not be held back by a wrong answer, only by not
     having handed anything in.
     Phase 1 note: this flag lives in localStorage, so it is a rule the
     student agrees to, not a lock a determined student cannot pick.
     It becomes a real lock in Step 7, when accounts move to the server. */
  function homeworkSent() { return homeworkSentFor(L.id); }

  /* Where the student goes after this lesson is decided by data/course.js
     first, and by the lesson's own `next` only as a fallback. Re-ordering a
     unit in the course map therefore re-points every lesson's button without
     a single lesson file being touched. */
  var NEXT = null;

  function nextStep() {
    var p = place();
    if (p) {
      if (p.next && p.next.data)
        return { href: lessonUrl(p.next.id), ready: true,
                 label: 'Next lesson — ' + p.next.title };
      if (p.next)
        return { href: 'index.html', ready: false,
                 label: 'الدرس الجاي لسه بيتجهّز — ارجع لصفحتك' };
      return { href: 'index.html', ready: true, label: 'خلصت آخر درس — ارجع لصفحتك' };
    }
    var n = L.next || {};
    return { href: n.href || 'index.html', ready: true, label: n.label || 'ارجع لصفحتك' };
  }

  function buildNext() {
    var host = mount('next');
    var p = place();
    var done = p ? p.entry.indexInUnit : L.lessonIndex;
    var all  = p ? p.entry.unitLessons : L.unitLessons;
    var uNo  = p ? p.entry.unitNo : L.unit;
    var uTit = p ? p.entry.unitTitle : L.unitTitle;
    NEXT = nextStep();

    host.innerHTML =
      '<div class="unit-progress">' +
        '<div class="up-label"><span>Unit ' + uNo + ' — ' + esc(uTit) + '</span>' +
        '<span>' + done + ' / ' + all + '</span></div>' +
        '<div class="up-track"><div class="up-fill" style="width:' +
        (done / all * 100) + '%"></div></div>' +
        '<div class="ar-inline" style="font-size:.85rem;color:var(--ink-soft);margin-top:8px">' +
        'أنجزت ' + done + ' من ' + all + ' دروس في الوحدة ' + uNo + '</div>' +
      '</div>' +
      '<div class="next-actions">' +
        '<a class="cta" id="hwCta" href="' + esc(homeworkUrl(L.id)) + '">' +
          'Go to homework page <span class="ar-inline">— الانتقال إلى صفحة الواجب</span> →</a>' +
        '<a class="cta secondary" id="nextCta" href="' + esc(NEXT.href) + '">' +
          esc(NEXT.label) + ' →</a>' +
        '<div class="gate-note" id="gateNote"></div>' +
      '</div>';

    refreshGate();
    /* if the student submits the homework in another tab, unlock on return */
    window.addEventListener('focus', refreshGate);
  }

  function refreshGate() {
    var nextBtn = document.getElementById('nextCta');
    var hwBtn = document.getElementById('hwCta');
    var note = document.getElementById('gateNote');
    if (!nextBtn) return;
    var sent = homeworkSent();

    if (sent) {
      nextBtn.classList.remove('locked');
      nextBtn.classList.remove('secondary');
      nextBtn.removeAttribute('aria-disabled');
      nextBtn.href = (NEXT || nextStep()).href;
      hwBtn.classList.add('secondary');
      hwBtn.innerHTML = 'Homework <span class="ar-inline">— تم التسليم</span> ✓';
      note.innerHTML = '<span class="ar-inline">تم تسليم الواجب. الدرس التالي مفتوح.</span>';
      note.className = 'gate-note open';
    } else {
      nextBtn.classList.add('locked');
      nextBtn.setAttribute('aria-disabled', 'true');
      nextBtn.removeAttribute('href');
      note.innerHTML = '<span class="ar-inline">' +
        (L.gateAr || 'الدرس التالي هيفتح بعد ما تسلّم الواجب. مش لازم كل إجاباتك تكون صح — المهم تسلّم.') +
        '</span>';
      note.className = 'gate-note';
    }
  }

  /* --- shared plumbing --------------------------------------------------- */
  function persist() { Progress.save(L.id, state); }

  function updateProgress() {
    var total = (L.video && L.video.segments ? L.video.segments.length : 0) +
                L.exercises.length + 1;
    var done = Object.keys(state.seg || {}).length +
               Object.keys(state.ex || {}).length +
               (state.quiz ? 1 : 0);

    /* Stamp how many pieces this lesson has into the student's own record.
       The personal page has to show a progress percent for every lesson
       without loading seventeen lesson data files to learn their sizes —
       this one number is what lets Student.lesson(id) do the arithmetic. */
    if (state.parts !== total) { state.parts = total; persist(); }

    var bar = document.getElementById('progressFill');
    if (bar) bar.style.width = Math.min(done / total * 100, 100) + '%';
  }

  function wireModal() {
    var modal = mount('videoModal');
    var video = mount('modalVideo');
    function close() {
      modal.classList.remove('open');
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
    function open(src) {
      var url = mediaUrl(src);
      var box = modal.querySelector('.modal-video-wrap');
      clearVideoError(box);
      video.onerror = function () { showVideoError(box, url); };
      video.onloadeddata = function () { clearVideoError(box); };
      video.src = url;
      modal.classList.add('open');
      video.play().catch(function () {});
    }
    modal.querySelector('.modal-close').addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) close();
    });
    document.addEventListener('click', function (e) {
      var b = e.target.closest('.btn-video');
      if (!b || !b.dataset.video) return;
      e.preventDefault();
      open(b.dataset.video);
    });
  }

  /* A lesson id that has no data file — a typo in a link, or a lesson that is
     listed in the course map but not recorded yet. A blank white page is the
     worst possible answer; say which lesson was asked for and show the way
     back. */
  function missingLesson() {
    var m = /[?&]id=([A-Za-z0-9_-]+)/.exec(location.search);
    var wrap = document.querySelector('.wrap');
    if (!wrap) return;
    wrap.innerHTML =
      '<div class="storage-warn">' +
        '<span class="sw-title">الدرس ده لسه مش متاح</span>' +
        '<p>مفيش محتوى مسجّل للدرس <code>' + esc(m ? m[1] : '—') + '</code> لحد دلوقتي.</p>' +
        '<p class="sw-fix"><a class="cta" href="index.html">ارجع لصفحتك →</a></p>' +
      '</div>';
  }

  /* The registration door, for someone who typed a lesson URL directly or
     followed a link from a friend. The page's own rule has to hold wherever
     the student arrives from, not only when he walks in through the map. */
  function registrationWall() {
    var wrap = document.querySelector('.wrap');
    if (!wrap) return;
    wrap.innerHTML = '<div id="regHost"></div>';
    Access.renderRegistration(document.getElementById('regHost'), {
      lessonId: window.LESSON ? window.LESSON.id : '',
      onDone: function () { location.reload(); }
    });
  }

  function gateByRegistration() {
    return !!(window.Access && window.LESSON && Access.needsRegistration(window.LESSON.id));
  }

  function renderLesson() {
    if (!window.LESSON) return missingLesson();
    if (gateByRegistration()) return registrationWall();
    L = window.LESSON; BANK = window.QUESTION_BANK;
    document.title = L.title + ' — Unit ' + L.unit + ' Lesson ' + L.lessonNo + ' | ' + L.author;
    state = Progress.load(L.id);
    lessonRoot = document.body;
    track('open');

    demoBanner();
    storageWarning();
    buildMasthead();
    buildGoal();
    buildVideo();
    buildTheory();
    buildExercises();
    buildQuiz();
    buildNext();
    wireModal();
    devTools();
    buildStamp();
    typeset(document.body);
    updateProgress();
    document.addEventListener('change', updateProgress);
  }

  /* ============================================================ HOMEWORK  */

  /* Every answerable thing on the page becomes one entry here, so the
     completion panel, the inline Arabic errors and the submit check all read
     from a single list instead of each re-deriving what "complete" means. */
  var FIELDS = [];

  function addField(f) { FIELDS.push(f); return f; }

  var AR_LETTERS = /[؀-ۿ]/;

  /* --- per-entry rules. Each returns '' when valid, or an Arabic message. --- */
  var RULES = {
    name: function (v) {
      v = v.trim();
      if (!v) return 'اكتب اسمك.';
      if (v.replace(/\s+/g, ' ').split(' ').length < 2) return 'اكتب اسمك ثنائي على الأقل.';
      return '';
    },
    phone: function (v) {
      v = normalizeAnswer(v);
      if (!v) return 'اكتب رقم موبايلك.';
      if (!/^\d+$/.test(v)) return 'الرقم لازم يكون أرقام بس، من غير مسافات أو رموز.';
      if (v.length !== 11) return 'رقم الموبايل لازم يكون 11 رقم — انت كتبت ' + v.length + '.';
      if (!/^01/.test(v)) return 'رقم الموبايل لازم يبدأ بـ 01.';
      return '';
    },
    email: function (v) {
      v = v.trim();
      if (!v) return '';                                   /* optional */
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) return 'الإيميل شكله مش مظبوط.';
      return '';
    },
    radio: function (v) { return v == null ? 'ما اخترتش إجابة.' : ''; },
    number: function (v) {
      if (!v.trim()) return 'الخانة دي فاضية.';
      var n = normalizeAnswer(v);
      if (!/^-?\d+(\.\d+)?$/.test(n)) return 'الخانة دي عايزة رقم بس — مش كلام ولا رموز.';
      return '';
    },
    expr: function (v) {
      if (!v.trim()) return 'الخانة دي فاضية.';
      if (AR_LETTERS.test(v)) return 'اكتب الإجابة بالرموز الرياضية بالإنجليزي، مش بجملة عربي.';
      return '';
    },
    essay: function (v) {
      v = v.trim();
      if (!v) return 'السؤال ده فاضي.';
      if (v.length < 20) return 'الإجابة قصيرة أوي — اكتب تبريرك في جملة كاملة على الأقل.';
      return '';
    }
  };

  function fieldValue(f) {
    if (f.rule === 'radio') {
      var sel = document.querySelector('[name="' + f.name + '"]:checked');
      return sel ? sel.value : null;
    }
    var e = document.querySelector('[name="' + f.name + '"]');
    return e ? e.value : '';
  }

  function checkField(f) { return RULES[f.rule](fieldValue(f)); }

  /* --- rendering ---------------------------------------------------------- */

  function errLine(box) {
    var e = el('div', 'field-err');
    e.hidden = true;
    box.appendChild(e);
    return e;
  }

  function renderHomework() {
    if (!window.LESSON) return missingLesson();
    if (gateByRegistration()) return registrationWall();
    L = window.LESSON; BANK = window.QUESTION_BANK;
    var HW = L.homework;
    FIELDS = [];
    document.title = 'Homework — ' + L.title + ' | ' + L.author;

    mount('hwHead').innerHTML =
      '<span class="eyebrow">Unit ' + L.unit + ' · Lesson ' + L.lessonNo + '</span>' +
      '<h1>Homework assignment</h1>' +
      '<p class="lede">' + L.title + ' — ' + HW.auto.length +
      ' auto-graded questions + ' + HW.manual.length + ' written question.</p>' +
      '<p class="author">' + L.author + '</p>';

    devTools();

    /* The name was given once, on the first visit, so it is filled in here.
       Re-typing it on every homework is friction — and it is the reason two
       submissions from the same student can reach you spelled two different
       ways, which makes «أعلى محاولة» impossible to apply. */
    var prof = window.Student ? Student.profile() : null;
    var nameInput = document.getElementById('sName');
    if (prof && prof.name && nameInput && !nameInput.value) nameInput.value = prof.name;

    /* A homework already sent: say so plainly and open the road forward,
       instead of leaving a dead disabled button with no explanation. */
    demoBanner();
    storageWarning();
    buildStamp();

    var retry = applyRetry();

    if (homeworkSentFor(L.id)) {
      mount('hwForm').hidden = true;
      showAlreadySent(retry === 'bad');
      typeset(document.body);
      return;
    }

    var intro = mount('hwIntro');
    if (retry === true) {
      intro.appendChild(arNote({
        label: 'اتفتح لك الواجب لمحاولة جديدة',
        text: 'الدكتور وسام سمح لك بإعادة التسليم. إجاباتك السابقة اتبعتت له بالفعل، ' +
              'والمحاولة دي هتوصله كمان — والدرجة المعتمدة هي الأعلى بين محاولاتك.'
      }));
    } else if (retry === 'bad') {
      /* We only get here when the homework was NOT locked — a bad code never
         opens a locked one. Warning the student that his link failed, above a
         form he can already use, is a contradiction: say the calm true thing
         instead. The red warning belongs only in showAlreadySent(), where the
         homework really is locked and the link really did fail to help. */
      intro.appendChild(arNote({
        label: 'الواجب مفتوح لك أصلاً',
        text: 'مش محتاج رابط إعادة محاولة — كمّل حل عادي وسلّم.'
      }));
    }

    var n = attemptsFor(L.id);
    if (n > 0) {
      intro.appendChild(arNote({
        label: 'محاولة رقم ' + (n + 1),
        text: 'انت سلّمت الواجب ده ' + n + (n === 1 ? ' مرة قبل كده.' : ' مرات قبل كده.') +
              ' المعتمد هو أعلى درجة، فخد وقتك وراجع كويس.',
        tone: 'tip'
      }));
    }

    intro.appendChild(arNote({
      label: 'إرشادات مهمة قبل التسليم',
      text: HW.instructionsAr
    }));

    /* identity fields, declared here so they join the same completion list */
    addField({ name: 'student_name',  rule: 'name',  label: 'الاسم' });
    addField({ name: 'student_phone', rule: 'phone', label: 'رقم الموبايل' });
    addField({ name: 'student_email', rule: 'email', label: 'الإيميل', optional: true });
    ['student_name', 'student_phone', 'student_email'].forEach(function (n) {
      var input = document.querySelector('[name="' + n + '"]');
      var f = FIELDS.filter(function (x) { return x.name === n; })[0];
      f.box = input.closest('.field');
      f.focusEl = input;
      f.err = errLine(f.box);
    });

    var auto = mount('hwAuto');
    HW.auto.forEach(function (qid, i) {
      var q = BANK[qid];
      if (!q) return;
      var num = i + 1;
      var box = el('div', 'hw-q');
      box.id = 'hwq-' + qid;
      box.dataset.qid = qid;
      box.innerHTML = '<div class="q-text"><span class="qnum-badge">' + num + '</span>' +
                      '<span>' + q.prompt + '</span></div>';
      if (q.figure) box.appendChild(el('div', 'figure-svg', q.figure));
      if (q.ar) box.appendChild(arNote({ label: 'المطلوب', text: q.ar }));

      if (q.type === 'mcq') {
        var opts = el('div', 'options-row');
        q.options.forEach(function (o, j) {
          var lab = document.createElement('label');
          /* required on the radio group — without it the whole of Part A
             could be left blank and the form still counted as valid */
          lab.innerHTML = '<input type="radio" required name="hw-' + qid +
                          '" value="' + j + '"> ' + o;
          opts.appendChild(lab);
        });
        box.appendChild(opts);
        var f1 = addField({ name: 'hw-' + qid, rule: 'radio', label: 'سؤال ' + num, box: box });
        f1.focusEl = box;
        f1.err = errLine(box);

      } else if (q.type === 'numeric') {
        box.appendChild(answerRow('hw-' + qid, q));
        var f2 = addField({
          name: 'hw-' + qid, rule: q.entry === 'number' ? 'number' : 'expr',
          label: 'سؤال ' + num, box: box
        });
        f2.focusEl = box.querySelector('input');
        f2.err = errLine(box);

      } else if (q.type === 'steps') {
        var list = el('div', 'steps-list');
        q.steps.forEach(function (st, k) {
          var item = el('div', 'step-item');
          item.innerHTML = '<div class="step-q"><span class="step-n">' + (k + 1) + '</span>' +
                           '<span>' + st.prompt + '</span></div>';
          item.appendChild(answerRow('hw-' + qid + '-' + k, st));
          list.appendChild(item);
          var f3 = addField({
            name: 'hw-' + qid + '-' + k,
            rule: st.entry === 'number' ? 'number' : 'expr',
            label: 'سؤال ' + num + ' — خطوة ' + (k + 1), box: item
          });
          f3.focusEl = item.querySelector('input');
          f3.err = errLine(item);
        });
        box.appendChild(list);
      }

      /* An auto-graded question does not offer the camera unless the question
         itself asks for it — `allowPhoto: true`. Useful for a steps question
         where you also want to see the working, not only the final numbers. */
      if (q.allowPhoto === true) box.appendChild(photoBlock(qid, i + 1));

      auto.appendChild(box);
    });

    var man = mount('hwManual');
    HW.manual.forEach(function (qid, i) {
      var q = BANK[qid];
      if (!q) return;
      var num = HW.auto.length + i + 1;
      var box = el('div', 'hw-q');
      box.id = 'hwq-' + qid;
      box.innerHTML = '<div class="q-text"><span class="qnum-badge">' + num + '</span>' +
                      '<span>' + q.prompt + '</span>' +
                      '<span class="manual-chip">graded by Dr. Wessam</span></div>';
      if (q.ar) box.appendChild(arNote({ label: 'المطلوب', text: q.ar }));
      var ta = document.createElement('textarea');
      ta.name = 'hw-' + qid;
      ta.required = true;
      ta.placeholder = 'Write your full reasoning here…';
      box.appendChild(ta);
      man.appendChild(box);
      var f4 = addField({ name: 'hw-' + qid, rule: 'essay', label: 'سؤال ' + num, box: box });
      f4.focusEl = ta;
      f4.err = errLine(box);

      /* A written answer in mathematics is often a page of working, not a
         paragraph — so the student can photograph it instead of typing it.
         Which questions offer this is `allowPhoto` on the question itself,
         defaulting to on for essays. */
      if (q.allowPhoto !== false) box.appendChild(photoBlock(qid, num));
    });

    buildCompletionPanel();
    wireHomeworkSubmit(HW);
    typeset(document.body);
    refreshCompletion(false);
  }

  /* ------------------------------------------------------- photo answers */

  /* PHOTOS[qid] holds the compressed image the student took, as a data URL.
     Compression happens in the browser before anything is stored: a phone
     photo is 3-5 MB and useless at that size in an inbox, while the same page
     of working is perfectly readable at 1200px wide and about 150 KB. */
  var PHOTOS = {};
  var PHOTO_MAX_W = 1200;
  var PHOTO_QUALITY = 0.72;

  function compressImage(file, cb) {
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        var scale = Math.min(1, PHOTO_MAX_W / img.width);
        var cv = document.createElement('canvas');
        cv.width = Math.round(img.width * scale);
        cv.height = Math.round(img.height * scale);
        cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
        cb(cv.toDataURL('image/jpeg', PHOTO_QUALITY));
      };
      img.onerror = function () { cb(null); };
      img.src = reader.result;
    };
    reader.onerror = function () { cb(null); };
    reader.readAsDataURL(file);
  }

  function photoBlock(qid, num) {
    var wrap = el('div', 'photo-block');

    /* Sending an image needs somewhere to put it, and a static site has
       nowhere. The interface is built and ready; it turns itself on with the
       backend, exactly like the other server-backed features. */
    if (window.Access && Access.backendOff()) {
      wrap.innerHTML =
        '<div class="off-panel compact">' +
          '<span class="off-badge">الميزة دي لسه مش مفعّلة</span>' +
          '<h3>صوّر حلك بالكاميرا</h3>' +
          '<p>هتقدر تصوّر ورقة الحل وترفعها بدل ما تكتبها. دلوقتي اكتب حلك في المربع اللي فوق.</p>' +
        '</div>';
      return wrap;
    }

    wrap.innerHTML =
      '<label class="photo-btn" for="photo-' + esc(qid) + '">' +
        '<span class="photo-icon" aria-hidden="true">📷</span>' +
        '<span>صوّر ورقة الحل أو ارفع صورة</span>' +
      '</label>' +
      '<input type="file" id="photo-' + esc(qid) + '" class="photo-input" ' +
             'accept="image/*" capture="environment" />' +
      '<div class="photo-preview" hidden></div>' +
      '<p class="photo-hint">اختياري — ممكن تكتب الحل، أو تصوّره، أو الاتنين.</p>';

    var input = wrap.querySelector('.photo-input');
    var prev = wrap.querySelector('.photo-preview');

    input.addEventListener('change', function () {
      var f = input.files && input.files[0];
      if (!f) return;
      prev.hidden = false;
      prev.innerHTML = '<span class="photo-working">جاري تجهيز الصورة…</span>';
      compressImage(f, function (dataUrl) {
        if (!dataUrl) {
          prev.innerHTML = '<span class="photo-working bad">ما قدرتش أقرا الصورة دي. جرّب صورة تانية.</span>';
          return;
        }
        PHOTOS[qid] = dataUrl;
        var kb = Math.round((dataUrl.length * 3 / 4) / 1024);
        prev.innerHTML = '<img src="' + dataUrl + '" alt="صورة الحل" />' +
          '<div class="photo-meta"><span>صورة سؤال ' + num + ' · ' + kb + ' ك.ب</span>' +
          '<button type="button" class="photo-remove">شيل الصورة</button></div>';
        prev.querySelector('.photo-remove').addEventListener('click', function () {
          delete PHOTOS[qid];
          input.value = '';
          prev.hidden = true;
          prev.innerHTML = '';
        });
      });
    });

    return wrap;
  }

  function answerRow(name, def) {
    var row = el('div', 'answer-row');
    var inp = el('input', 'answer-input');
    inp.type = 'text';
    inp.dir = 'ltr';
    inp.name = name;
    inp.required = true;
    inp.autocomplete = 'off';
    inp.spellcheck = false;
    inp.placeholder = def.placeholder || '';
    if (def.entry === 'number') {
      inp.inputMode = 'decimal';
      inp.pattern = '-?[0-9]+([.][0-9]+)?';
    }
    row.appendChild(inp);
    if (def.inputHint) row.appendChild(el('span', 'input-hint', esc(def.inputHint)));
    return row;
  }

  /* --- completion panel --------------------------------------------------- */

  function buildCompletionPanel() {
    var panel = el('div', 'completion');
    panel.id = 'hwCompletion';
    panel.innerHTML =
      '<div class="comp-head">' +
        '<span class="comp-count" id="compCount"></span>' +
        '<div class="comp-track"><div class="comp-fill" id="compFill"></div></div>' +
      '</div>' +
      '<div class="comp-body" id="compBody"></div>';
    var btn = mount('hwSubmit');
    btn.parentNode.insertBefore(panel, btn);
  }

  /* show = paint the errors (after a submit attempt);
     false = just update the counter while the student is still typing. */
  function refreshCompletion(show) {
    var missing = [];
    FIELDS.forEach(function (f) {
      var msg = checkField(f);
      f.bad = !!msg;
      if (msg) missing.push(f);
      if (f.err) {
        if (msg && (show || f.touched)) {
          f.err.textContent = msg;
          f.err.hidden = false;
          f.box.classList.add('invalid');
        } else {
          f.err.hidden = true;
          f.box.classList.remove('invalid');
        }
      }
    });

    var required = FIELDS.filter(function (f) { return !f.optional; });
    var doneCount = required.length - missing.filter(function (f) { return !f.optional; }).length;
    var total = required.length;

    var count = document.getElementById('compCount');
    var fill = document.getElementById('compFill');
    var body = document.getElementById('compBody');
    if (!count) return missing;

    count.innerHTML = 'تم استيفاء <b>' + doneCount + '</b> من <b>' + total + '</b>';
    fill.style.width = (doneCount / total * 100) + '%';

    var panel = document.getElementById('hwCompletion');
    panel.classList.toggle('ready', doneCount === total);

    if (doneCount === total) {
      body.innerHTML = '<div class="comp-ok">كل حاجة مكتملة — تقدر تسلّم دلوقتي.</div>';
    } else if (show || FIELDS.some(function (f) { return f.touched; })) {
      var items = missing.filter(function (f) { return !f.optional || checkField(f); })
        .map(function (f) {
          return '<li><button type="button" class="comp-jump" data-name="' +
                 esc(f.name) + '">' + esc(f.label) + '</button>' +
                 '<span class="comp-why">' + esc(checkField(f)) + '</span></li>';
        });
      body.innerHTML = items.length
        ? '<div class="comp-title">الناقص:</div><ul class="comp-missing">' + items.join('') + '</ul>'
        : '';
    } else {
      body.innerHTML = '<div class="comp-hint">جاوب على كل الأسئلة، والعدّاد فوق هيوضّح اللي فاضل.</div>';
    }
    return missing;
  }

  function jumpTo(f) {
    if (!f || !f.box) return;
    f.box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    f.box.classList.add('flash');
    setTimeout(function () { f.box.classList.remove('flash'); }, 1400);
    if (f.focusEl && f.focusEl.focus) { try { f.focusEl.focus({ preventScroll: true }); } catch (e) {} }
  }

  /* --- grading ------------------------------------------------------------ */

  function gradeHomework(HW) {
    var earned = 0, max = 0, lines = [];

    HW.auto.forEach(function (qid, i) {
      var q = BANK[qid];
      var pts = q.points || 2;

      if (q.type === 'steps') {
        var got = 0, per = pts / q.steps.length;
        q.steps.forEach(function (st, k) {
          var f = document.querySelector('[name="hw-' + qid + '-' + k + '"]');
          if (matches(f ? f.value : '', st.hashes, st.kind)) got += per;
        });
        earned += got; max += pts;
        lines.push('Q' + (i + 1) + ' [steps] ' + got.toFixed(1) + '/' + pts);
      } else {
        var val = '';
        if (q.type === 'mcq') {
          var sel = document.querySelector('[name="hw-' + qid + '"]:checked');
          val = sel ? qid + ':' + sel.value : '';
        } else {
          var f2 = document.querySelector('[name="hw-' + qid + '"]');
          val = f2 ? f2.value : '';
        }
        var ok = matches(val, q.hashes, q.type === 'mcq' ? null : q.kind);
        if (ok) earned += pts;
        max += pts;
        lines.push('Q' + (i + 1) + ' ' + (ok ? 'correct' : 'wrong') + ' ' + (ok ? pts : 0) + '/' + pts);
      }
    });

    var essays = HW.manual.map(function (qid, i) {
      var f = document.querySelector('[name="hw-' + qid + '"]');
      return { q: 'Q' + (HW.auto.length + i + 1), maxScore: (BANK[qid].points || 4),
               answer: f ? f.value : '' };
    });
    var manualMax = essays.reduce(function (s, e) { return s + e.maxScore; }, 0);

    return {
      earned: Math.round(earned * 10) / 10,
      autoMax: max, manualMax: manualMax, totalMax: max + manualMax,
      lines: lines, essays: essays
    };
  }

  /* --- submit ------------------------------------------------------------- */

  function homeworkSentFor(id) {
    try { return !!localStorage.getItem('wg:hwsent:' + id); }
    catch (e) { return false; }
  }

  /* --- attempts -----------------------------------------------------------
     The counter lives in the student's browser, so a cleared browser starts
     it again. That is acceptable: the number that matters is the one stamped
     on the email you receive, and those are a permanent record.
     Grading policy: the HIGHEST attempt counts — the same rule the Egyptian
     Baccalaureate itself uses, so it needs no explaining to a parent. */

  function readNum(key, dflt) {
    try { return parseFloat(localStorage.getItem(key)) || dflt; }
    catch (e) { return dflt; }
  }
  function writeNum(key, v) {
    try { localStorage.setItem(key, String(v)); } catch (e) {}
  }
  function attemptsFor(id) { return readNum('wg:hwattempts:' + id, 0); }
  function bestFor(id) { return readNum('wg:hwbest:' + id, 0); }

  /* --- retry link ---------------------------------------------------------
     homework.html?retry=<code>  unlocks ONLY this lesson's submission, and
     leaves progress and quiz scores alone. Returns true / 'bad' / false. */
  function applyRetry() {
    var m = /[?&]retry=([^&#]+)/.exec(location.search);
    if (!m) return false;
    var given = decodeURIComponent(m[1]);
    var expected = (window.PLATFORM_CONFIG && window.PLATFORM_CONFIG.retryCode) || '';

    /* Strip ONLY `retry`, so refreshing does not re-open the homework a second
       time — but everything else in the address survives.

       Until v4.5 this line threw the WHOLE query away, `?id=` included. The
       page in front of the student stayed correct, because the lesson file had
       already been chosen before this ran. But the address bar now read
       `homework.html` with no lesson at all, so the moment he refreshed — the
       most ordinary thing a student does — he landed on the default lesson
       instead of his own. It hit precisely the student who had just been given
       a retry link. */
    try {
      var kept = location.search.replace(/^\?/, '').split('&').filter(function (kv) {
        return kv && kv.indexOf('retry=') !== 0;
      });
      history.replaceState(null, '',
        location.pathname + (kept.length ? '?' + kept.join('&') : '') + location.hash);
    } catch (e) {}
    if (!expected || given !== expected) return 'bad';
    try { localStorage.removeItem('wg:hwsent:' + L.id); } catch (e) {}
    return true;
  }

  function nextLessonCta() {
    var n = nextStep();
    return '<a class="cta" href="' + esc(n.href) + '">' + esc(n.label) + ' →</a>';
  }

  function showAlreadySent(badCode) {
    var ok = mount('hwOk');
    var n = attemptsFor(L.id);
    ok.hidden = false;
    ok.innerHTML =
      '<h3>Already submitted ✓</h3>' +
      (badCode
        ? '<div class="ar-note warn"><span class="ar-label">رابط إعادة المحاولة مش صالح</span>' +
          'الكود اللي في الرابط غلط أو انتهت صلاحيته.</div>'
        : '') +
      '<div class="ar-note"><span class="ar-label">الواجب ده متسلّم قبل كده' +
      (n ? ' — محاولة رقم ' + n : '') + '</span>' +
      'التسليم مرة واحدة بس لكل درس، والدرس التالي مفتوح لك. ' +
      'لو محتاج تعيد التسليم لأي سبب، كلّم الدكتور وسام وهيبعتلك رابط محاولة جديدة.</div>' +
      '<div class="ok-actions">' + nextLessonCta() +
      '<a class="cta secondary" href="' + esc(lessonUrl(L.id)) + '">' +
      '← ارجع للدرس</a></div>';
  }

  function wireHomeworkSubmit(HW) {
    var form = mount('hwForm');
    var btn = mount('hwSubmit');
    var okMsg = mount('hwOk');
    var errMsg = mount('hwErr');
    var errText = mount('hwErrText');

    /* Enter inside a text input would otherwise submit the form natively and
       reload the page, losing every answer. */
    form.addEventListener('submit', function (e) { e.preventDefault(); });

    /* live feedback: a field that has been touched starts reporting itself */
    form.addEventListener('input', function (e) {
      var f = FIELDS.filter(function (x) { return x.name === e.target.name; })[0];
      if (f) f.touched = true;
      refreshCompletion(false);
    });
    form.addEventListener('change', function (e) {
      var f = FIELDS.filter(function (x) { return x.name === e.target.name; })[0];
      if (f) f.touched = true;
      refreshCompletion(false);
    });
    document.addEventListener('click', function (e) {
      var j = e.target.closest('.comp-jump');
      if (!j) return;
      jumpTo(FIELDS.filter(function (x) { return x.name === j.dataset.name; })[0]);
    });

    btn.addEventListener('click', async function () {
      errMsg.hidden = true;

      /* The button stays clickable on purpose. Pressing it while the homework
         is incomplete is what reveals every missing item at once, in Arabic —
         a permanently disabled button just leaves the student guessing. */
      var missing = refreshCompletion(true).filter(function (f) { return !f.optional || f.bad; });
      if (missing.length) {
        jumpTo(missing[0]);
        btn.classList.add('shake');
        setTimeout(function () { btn.classList.remove('shake'); }, 500);
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Sending… جارٍ الإرسال';

      var g = gradeHomework(HW);
      var name = form.querySelector('[name="student_name"]').value.trim();

      /* stamped on the email so two submissions from the same student are
         never ambiguous — and so the highest-attempt rule is easy to apply */
      var attemptNo = attemptsFor(L.id) + 1;
      var prevBest = bestFor(L.id);
      var newBest = Math.max(prevBest, g.earned);

      var payload = {
        access_key: window.PLATFORM_CONFIG.web3formsKey,
        subject: '[' + L.id + '] Homework — ' + name +
                 (attemptNo > 1 ? ' (attempt ' + attemptNo + ')' : ''),
        student_name: name,
        student_phone: form.querySelector('[name="student_phone"]').value.trim(),
        student_email: form.querySelector('[name="student_email"]').value.trim(),
        lesson: L.id + ' · ' + L.title,
        attempt: String(attemptNo),
        this_attempt_score: g.earned + ' / ' + g.autoMax,
        best_auto_score: newBest + ' / ' + g.autoMax +
                         (attemptNo > 1 ? '  (previous best ' + prevBest + ')' : ''),
        grading_policy: 'highest attempt counts',
        manual_pending: '0 / ' + g.manualMax,
        total_possible: String(g.totalMax),
        breakdown: g.lines.join('\n'),
        written_answers: g.essays.map(function (e) {
          return e.q + ' (out of ' + e.maxScore + '):\n' + e.answer;
        }).join('\n\n---\n\n'),

        /* The student's own note, in his words. Optional and never validated:
           an empty one simply says so, rather than arriving as a blank line
           you have to interpret. */
        student_note: (function () {
          var n = document.getElementById('sNote');
          var v = n ? n.value.trim() : '';
          return v || '— لا توجد ملاحظات —';
        })(),

        /* Photographed working. The images themselves need somewhere to live,
           which is the backend; until then this records that the student
           wanted to send one, so nothing is silently lost. */
        photo_answers: (function () {
          var ids = Object.keys(PHOTOS);
          if (!ids.length) return '—';
          return ids.map(function (id) {
            var kb = Math.round((PHOTOS[id].length * 3 / 4) / 1024);
            return id + ' (' + kb + ' KB)';
          }).join(', ');
        })()
      };

      try {
        if (isDemo()) {
          /* preview link: behave exactly the same, just never post */
          await new Promise(function (r) { setTimeout(r, 600); });
        } else {
          var res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(payload)
          });
          var out = await res.json();
          if (!out.success) throw new Error(out.message || 'Unknown error');
        }

        try { localStorage.setItem('wg:hwsent:' + L.id, '1'); } catch (e) {}
        writeNum('wg:hwattempts:' + L.id, attemptNo);
        writeNum('wg:hwbest:' + L.id, newBest);
        track('hw', attemptNo > 1 ? 'محاولة ' + attemptNo : '');

        /* He just gave his name and number on this form. Asking him for them
           again at the next lesson's door would be asking twice for the same
           thing — so this submission counts as his registration. */
        if (window.Student && Student.registerFromHomework) {
          Student.registerFromHomework(name, payload.student_phone);
        }

        form.hidden = true;
        okMsg.hidden = false;
        okMsg.innerHTML =
          '<h3>Submitted ✓</h3>' +
          '<div class="ar-note"><span class="ar-label">تم التسليم' +
          (attemptNo > 1 ? ' — محاولة رقم ' + attemptNo : ' — والدرس التالي اتفتح') +
          '</span>' +
          (isDemo()
            ? 'دي نسخة عرض — الواجب اتصحّح لكن ما اتبعتش لحد.'
            : 'وصل واجبك بنجاح. الدرجة والرد على السؤال المقالي هيوصلوك قريب.') +
          (attemptNo > 1 ? ' المعتمد هو أعلى درجة بين محاولاتك.' : '') + '</div>' +
          '<div class="ok-actions">' + nextLessonCta() +
          '<a class="cta secondary" href="' + esc(lessonUrl(L.id)) + '">' +
          '← ارجع للدرس</a></div>';
        okMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });

        /* The biggest moment on the whole platform, and until v4.3 it passed
           in silence: this page never even loaded the confetti library. */
        cheer(true);
      } catch (err) {
        errText.textContent = err.message;
        errMsg.hidden = false;
        btn.disabled = false;
        btn.textContent = 'Submit and send — إرسال';
      }
    });
  }

  /* --- author's test helper: ?dev=1 --------------------------------------- */

  function devTools() {
    /* Shown automatically on localhost — that is always you testing. Students
       are on a real domain and never see it. ?dev=1 still forces it anywhere. */
    var isLocal = /^(localhost|127\.0\.0\.1|\[::1\]|::1)$/.test(location.hostname);
    if (!isLocal && !/[?&]dev=1/.test(location.search)) return;
    var bar = el('div', 'devbar');
    bar.innerHTML = '<span>DEV</span>' +
      '<button type="button" id="devReset">إعادة تعيين حالة الطالب</button>';
    document.body.appendChild(bar);
    document.getElementById('devReset').addEventListener('click', function () {
      try {
        Object.keys(localStorage)
          .filter(function (k) { return k.indexOf('wg:') === 0; })
          .forEach(function (k) { localStorage.removeItem(k); });
      } catch (e) {}
      location.reload();
    });
  }

  return {
    renderLesson: renderLesson,
    renderHomework: renderHomework,
    hashAnswer: hashAnswer,
    normalizeAnswer: normalizeAnswer
  };
})();

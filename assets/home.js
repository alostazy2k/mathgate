/* ==========================================================================
   THE STUDENT'S PAGE  ·  assets/home.js
   --------------------------------------------------------------------------
   Renders index.html, and nothing else. Two screens live here:

     1. FIRST VISIT — «اختر مرحلتك» + the student's name. Shown once, ever.
        The year is a setting, not a question asked at every entry.
     2. THE PAGE — five blocks, in this order:
          كمّل من حيث وقفت · الواجبات المستحقة · خريطة الوحدات ·
          ملخص الأداء · آخر النشاط

   It reads nothing out of localStorage itself: every fact comes from
   Student.*  — that is what makes the Supabase swap a one-file job.
   ========================================================================== */

(function () {
  'use strict';

  var root, DEV;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function mount(id) { return document.getElementById(id); }

  function isDev() {
    var local = /^(localhost|127\.0\.0\.1|\[::1\]|::1)$/.test(location.hostname);
    return local || /[?&]dev=1/.test(location.search);
  }

  /* Relative time, in the platform's own voice. */
  function ago(t) {
    var s = Math.max(0, Math.round((Date.now() - t) / 1000));
    if (s < 60) return 'دلوقتي';
    var m = Math.round(s / 60);
    if (m < 60) return 'من ' + m + ' دقيقة';
    var h = Math.round(m / 60);
    if (h < 24) return 'من ' + h + ' ساعة';
    var d = Math.round(h / 24);
    if (d === 1) return 'امبارح';
    if (d < 30) return 'من ' + d + ' يوم';
    return 'من ' + Math.round(d / 30) + ' شهر';
  }

  /* ==================================================== first-visit screen */

  function renderChooser() {
    var years = (window.COURSE && window.COURSE.years) || [];

    root.innerHTML =
      '<div class="onb">' +
        '<div class="onb-mark">' + brandMark() + '</div>' +
        '<h1>منصة الرياضيات</h1>' +
        '<p class="onb-lede">' +
          'قبل ما تبدأ، محتاج حاجتين بس — وبعدها مش هسألك تاني.' +
        '</p>' +

        '<div class="onb-step"><span class="onb-num">1</span> اسمك</div>' +
        '<div class="field onb-field">' +
          '<input type="text" id="onbName" placeholder="اكتب اسمك كامل" ' +
                 'autocomplete="name" maxlength="60" />' +
          '<p class="field-err" id="onbNameErr" hidden></p>' +
          '<p class="onb-hint">هيتكتب تلقائياً في كل واجب بتسلّمه، فمش هتعيد كتابته كل مرة.</p>' +
        '</div>' +

        '<div class="onb-step"><span class="onb-num">2</span> مرحلتك الدراسية</div>' +
        '<div class="onb-years" id="onbYears">' +
          years.map(function (y) {
            return '<button type="button" class="onb-year' + (y.ready ? '' : ' soon') + '" ' +
                   'data-year="' + esc(y.id) + '">' +
                     '<span class="oy-label">' + esc(y.label) + '</span>' +
                     '<span class="oy-en">' + esc(y.en) + '</span>' +
                     (y.ready
                        ? '<span class="oy-chip ready">متاح</span>'
                        : '<span class="oy-chip">قريباً</span>') +
                   '</button>';
          }).join('') +
        '</div>' +
        '<p class="field-err" id="onbYearErr" hidden></p>' +

        '<button type="button" class="cta onb-go" id="onbGo">ابدأ</button>' +

        '<p class="onb-foot">' +
          'بياناتك بتتحفظ على متصفحك أنت بس — مفيش حساب ولا كلمة سر دلوقتي.' +
        '</p>' +
      '</div>';

    var picked = null;
    mount('onbYears').addEventListener('click', function (e) {
      var b = e.target.closest('.onb-year');
      if (!b) return;
      Array.prototype.forEach.call(this.querySelectorAll('.onb-year'), function (x) {
        x.classList.remove('picked');
      });
      b.classList.add('picked');
      picked = b.dataset.year;
      mount('onbYearErr').hidden = true;
    });

    mount('onbGo').addEventListener('click', function () {
      var name = mount('onbName').value.trim();
      var nameErr = mount('onbNameErr'), yearErr = mount('onbYearErr');
      var bad = false;

      if (name.length < 3) {
        nameErr.textContent = 'اكتب اسمك كامل — على الأقل ٣ حروف.';
        nameErr.hidden = false; bad = true;
      } else { nameErr.hidden = true; }

      if (!picked) {
        yearErr.textContent = 'اختر مرحلتك الدراسية.';
        yearErr.hidden = false; bad = true;
      }

      if (bad) return;

      Student.saveProfile({ name: name, year: picked });
      Student.log('start', picked, '');
      location.reload();
    });

    mount('onbName').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') mount('onbGo').click();
    });
  }

  /* ============================================================ the page */

  function brandMark() {
    return '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<rect width="64" height="64" rx="14" fill="#2F6F6B"/>' +
      '<path d="M10 46 Q32 6 54 46" fill="none" stroke="#F7F5F0" stroke-width="5" stroke-linecap="round"/>' +
      '<line x1="32" y1="9" x2="32" y2="55" stroke="#B4842A" stroke-width="3" stroke-dasharray="5 4" stroke-linecap="round"/>' +
      '<circle cx="32" cy="26" r="4.5" fill="#B4842A"/></svg>';
  }

  function greeting() {
    var h = new Date().getHours();
    if (h < 12) return 'صباح الخير';
    if (h < 18) return 'مساء الخير';
    return 'مساء الخير';
  }

  function head(p, y) {
    return '<header class="sp-head">' +
      '<div class="sp-mark">' + brandMark() + '</div>' +
      '<div class="sp-who">' +
        '<h1>' + esc(greeting()) + '، ' + esc(Student.firstName() || 'يا بطل') + '</h1>' +
        '<p class="sp-year">' + esc(y ? y.label : '') +
          ' · <button type="button" class="linkish" id="changeYear">تغيير المرحلة</button></p>' +
      '</div>' +
    '</header>';
  }

  /* --- block 1 · كمّل من حيث وقفت ---------------------------------------- */

  function blockResume() {
    var l = Student.resume();
    var demo = Student.demo();

    if (!l) {
      /* Nothing in the year is built yet — the trial lesson is what there is
         to show, and saying so plainly beats an empty hero box. */
      if (demo) {
        var st = Student.lesson(demo.id);
        return card('resume',
          'ابدأ من هنا',
          '<div class="rs-main">' +
            '<span class="rs-eyebrow">درس تجريبي</span>' +
            '<h3>' + esc(demo.title) + '</h3>' +
            '<p class="rs-ar">' + esc(demo.noteAr) + '</p>' +
            bar(st.pct) +
          '</div>' +
          '<a class="cta" href="' + Student.href('lesson', demo.id) + '">' +
            (st.opened ? 'كمّل الدرس' : 'ابدأ الدرس') + ' →</a>');
      }
      return card('resume', 'كمّل من حيث وقفت',
        '<p class="empty">لسه مفيش دروس متاحة في مرحلتك. أول درس هيتفتح قريب.</p>');
    }

    var s = Student.lesson(l.id);
    return card('resume', 'كمّل من حيث وقفت',
      '<div class="rs-main">' +
        '<span class="rs-eyebrow">الوحدة ' + esc(l.unitNo) + ' · الدرس ' + esc(l.no) + '</span>' +
        '<h3>' + esc(l.title) + '</h3>' +
        '<p class="rs-ar">' + esc(l.titleAr) + '</p>' +
        bar(s.pct) +
      '</div>' +
      '<a class="cta" href="' + Student.href('lesson', l.id) + '">' +
        (s.opened ? 'كمّل الدرس' : 'ابدأ الدرس') + ' →</a>');
  }

  function bar(pct) {
    return '<div class="rs-bar"><div class="rs-bar-fill" style="width:' + pct + '%"></div></div>' +
           '<span class="rs-pct">' + pct + '% من الدرس</span>';
  }

  /* --- block 2 · الواجبات المستحقة --------------------------------------- */

  function blockDue() {
    var list = Student.due();

    if (!list.length) {
      return card('due', 'الواجبات المستحقة',
        '<p class="empty ok">مفيش واجب متأخر عليك. ✓</p>');
    }

    return card('due', 'الواجبات المستحقة',
      '<ul class="due-list">' + list.map(function (l) {
        var s = Student.lesson(l.id);
        return '<li>' +
          '<div class="du-body">' +
            '<span class="du-no">' + esc(l.isDemo ? 'تجريبي' : l.no) + '</span>' +
            '<div><strong>' + esc(l.title) + '</strong>' +
            '<span class="du-ar">' + esc(l.titleAr) + '</span></div>' +
          '</div>' +
          '<a class="mini-cta" href="' + Student.href('homework', l.id) + '">' +
            (s.attempts ? 'كمّل الواجب' : 'افتح الواجب') + '</a>' +
        '</li>';
      }).join('') + '</ul>' +
      '<div class="ar-note tip"><span class="ar-label">افتكر</span>' +
        'الدرس اللي بعده بيفتح بمجرد ما تسلّم — مش لازم كل الإجابات تكون صح.</div>');
  }

  /* --- block 3 · خريطة الوحدات ------------------------------------------- */

  function blockMap(y) {
    if (!y || !y.ready) {
      return card('map', 'خريطة الوحدات',
        '<p class="empty">' + esc((y && y.soonAr) || 'المحتوى بيتجهّز.') + '</p>');
    }

    var all = Student.lessons(y.id);
    var html = '';

    (y.terms || []).forEach(function (t) {
      (t.units || []).forEach(function (u) {
        var lessonsHtml = u.lessons.map(function (l) {
          var entry = null;
          for (var i = 0; i < all.length; i++) if (all[i].id === l.id) { entry = all[i]; break; }
          var stt = Student.statusOf(entry, all);
          var s = Student.lesson(l.id);
          var clickable = (stt === 'open' || stt === 'doing' || stt === 'done');

          var tail =
            stt === 'done'   ? '<span class="ls-chip done">تم التسليم ✓</span>' :
            stt === 'doing'  ? '<span class="ls-chip doing">' + s.pct + '%</span>' :
            stt === 'open'   ? '<span class="ls-chip open">ابدأ</span>' :
            stt === 'locked' ? '<span class="ls-chip locked">سلّم اللي قبله</span>' :
            stt === 'paid'   ? '<span class="ls-chip paid">بالاشتراك</span>' :
                               '<span class="ls-chip soon">قريباً</span>';

          var inner =
            '<span class="ls-no">' + esc(l.no) + '</span>' +
            '<span class="ls-body"><span class="ls-title">' + esc(l.title) + '</span>' +
            '<span class="ls-ar">' + esc(l.titleAr) + '</span></span>' + tail;

          return clickable
            ? '<a class="ls ' + stt + '" href="' + Student.href('lesson', l.id) + '">' + inner + '</a>'
            : '<div class="ls ' + stt + '" aria-disabled="true">' + inner + '</div>';
        }).join('');

        var built = u.lessons.filter(function (l) { return l.data; }).length;
        var doneN = u.lessons.filter(function (l) { return Student.lesson(l.id).hwSent; }).length;

        html +=
          '<details class="unit"' + (u.no === 1 ? ' open' : '') + '>' +
            '<summary>' +
              '<span class="un-no">الوحدة ' + esc(u.no) + '</span>' +
              '<span class="un-title">' + esc(u.title) +
                '<span class="un-ar">' + esc(u.titleAr) + '</span></span>' +
              (u.free !== false
                ? '<span class="un-chip free">مجاناً</span>'
                : '<span class="un-chip">بالاشتراك</span>') +
              '<span class="un-count">' +
                (built ? doneN + ' / ' + built : u.lessons.length + ' دروس') +
              '</span>' +
            '</summary>' +
            '<div class="unit-lessons">' + lessonsHtml + '</div>' +
          '</details>';
      });
    });

    return card('map', 'خريطة الوحدات', html);
  }

  /* --- block 4 · ملخص الأداء --------------------------------------------- */

  function blockSummary() {
    var s = Student.summary();

    /* The homework average is the TEACHER's number. A student who sees a
       running average starts optimising it instead of learning, and the whole
       point of «أعلى محاولة هي المعتمدة» is that a weak attempt costs nothing.
       So it is rendered only in DEV view. */
    var stats =
      stat(s.finished, 'واجب مسلّم') +
      stat(s.started,  'درس بدأته') +
      stat(s.quizPct === null ? '—' : s.quizPct + '%', 'متوسط الكويزات') +
      (DEV ? stat(s.hwAverage === null ? '—' : s.hwAverage + '%',
                  'متوسط الواجبات (أنت بس)', 'dev') : '');

    return card('summary', 'ملخص الأداء',
      '<div class="stats">' + stats + '</div>' +
      (s.quizPct === null
        ? '<p class="empty small">أول ما تحل كويز، متوسطك هيظهر هنا.</p>'
        : '<p class="empty small">الكويزات: ' + s.quizScore + ' من ' + s.quizTotal + ' إجابة صحيحة.</p>'));
  }

  function stat(v, label, cls) {
    return '<div class="stat' + (cls ? ' ' + cls : '') + '">' +
      '<span class="st-num">' + esc(v) + '</span>' +
      '<span class="st-label">' + esc(label) + '</span></div>';
  }

  /* --- block 5 · آخر النشاط ---------------------------------------------- */

  function nameOf(id) {
    var all = Student.tracked();
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i].title;
    return id;
  }

  function blockActivity() {
    var list = Student.activity(8).filter(function (a) { return a.type !== 'start'; });

    if (!list.length) {
      return card('activity', 'آخر النشاط',
        '<p class="empty">لسه مفيش نشاط. أول ما تفتح درس هيبان هنا.</p>');
    }

    return card('activity', 'آخر النشاط',
      '<ul class="act-list">' + list.map(function (a) {
        var icon =
          a.type === 'hw'   ? '<span class="ac-dot hw">✓</span>' :
          a.type === 'quiz' ? '<span class="ac-dot quiz">★</span>' :
                              '<span class="ac-dot open">▸</span>';
        var text =
          a.type === 'hw'   ? 'سلّمت واجب ' :
          a.type === 'quiz' ? 'حليت كويز ' :
                              'فتحت درس ';
        return '<li>' + icon +
          '<span class="ac-text">' + esc(text) + '<strong>' + esc(nameOf(a.id)) + '</strong>' +
          (a.label ? ' <span class="ac-extra">' + esc(a.label) + '</span>' : '') + '</span>' +
          '<span class="ac-when">' + esc(ago(a.t)) + '</span></li>';
      }).join('') + '</ul>');
  }

  /* --- shell -------------------------------------------------------------- */

  function card(kind, title, body) {
    return '<section class="sp-card ' + kind + '">' +
      '<h2>' + esc(title) + '</h2>' + body + '</section>';
  }

  function renderPage() {
    var p = Student.profile();
    var y = Student.year(p.year);

    root.innerHTML =
      head(p, y) +
      blockResume() +
      blockDue() +
      blockMap(y) +
      blockSummary() +
      blockActivity() +
      '<footer><strong>Dr. Wessam Gouda</strong> · Mathematics</footer>';

    mount('changeYear').addEventListener('click', function () {
      /* Changing the year keeps every lesson record — ids are year-prefixed,
         so nothing collides and nothing is thrown away. */
      Student.saveProfile({ year: null });
      location.reload();
    });
  }

  /* ------------------------------------------------------------ storage -- */

  function storageWarning() {
    if (Student.available()) return false;
    var isFile = location.protocol === 'file:';
    root.innerHTML =
      '<div class="storage-warn">' +
        '<span class="sw-title">متصفحك مانع حفظ البيانات</span>' +
        '<p>الصفحة الشخصية كلها مبنية على تقدّمك المحفوظ، ومن غير الحفظ مش هينفع تشتغل.</p>' +
        (isFile
          ? '<p class="sw-fix">الصفحة مفتوحة كملف محلي. شغّل <code>start-server.bat</code> ' +
            'وافتحها من <code>http://localhost:8080</code>.</p>'
          : '<p class="sw-fix">جرّب نافذة عادية مش تصفح خاص، أو اسمح بحفظ بيانات المواقع ' +
            'لهذا الموقع من إعدادات المتصفح.</p>') +
      '</div>';
    return true;
  }

  function demoBanner() {
    if (!(window.PLATFORM_CONFIG && window.PLATFORM_CONFIG.demoMode)) return;
    var d = document.createElement('div');
    d.className = 'demo-banner';
    d.innerHTML = '<span class="db-title">نسخة عرض</span>' +
      '<p>كل حاجة شغّالة عادي، بس <strong>الواجب مش بيتبعت فعلاً</strong> — ' +
      'دي نسخة للاطلاع على شكل المنصة.</p>';
    root.insertBefore(d, root.firstChild);
  }

  function devBar() {
    if (!DEV) return;
    var bar = document.createElement('div');
    bar.className = 'devbar';
    bar.innerHTML = '<span>DEV</span><button type="button" id="devReset">إعادة تعيين حالة الطالب</button>';
    document.body.appendChild(bar);
    document.getElementById('devReset').addEventListener('click', function () {
      Student.reset(); location.reload();
    });
  }

  function buildStamp() {
    var link = document.querySelector('link[href*="theme.css"]');
    var m = link && /[?&]v=([^&"]+)/.exec(link.getAttribute('href'));
    var f = root.querySelector('footer');
    if (!f) return;
    var s = document.createElement('span');
    s.className = 'build-stamp';
    s.textContent = 'engine v' + (m ? m[1] : 'dev') + ' · home';
    f.appendChild(s);
  }

  function boot() {
    root = document.getElementById('app');
    DEV = isDev();

    if (!window.COURSE) {
      root.innerHTML = '<div class="storage-warn"><span class="sw-title">مفيش ملف المنهج</span>' +
        '<p><code>data/course.js</code> مش محمّل. اتأكد إنك رفعت مجلد <code>data</code> كامل.</p></div>';
      return;
    }

    if (storageWarning()) { devBar(); return; }

    if (!Student.hasProfile()) renderChooser();
    else { renderPage(); buildStamp(); }

    demoBanner();
    devBar();
  }

  window.addEventListener('DOMContentLoaded', boot);
})();

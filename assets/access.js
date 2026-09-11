/* ==========================================================================
   ACCESS  ·  assets/access.js
   --------------------------------------------------------------------------
   The three doors of the platform, in one file:

     1. REGISTRATION   the first lesson is free to a stranger; from the second
                       one on, a name and a mobile number.
     2. THE PRICE      what a locked unit costs, and how to open it today.
     3. THE BACKEND    what is built, switched off, and waiting on a server —
                       said out loud instead of silently missing.

   It renders panels and sends signals. It stores nothing itself: every fact
   goes through Student.*, and every panel is drawn into a host element the
   caller owns. So home.js and engine.js both use it without either of them
   knowing how registration works.

   WHY SIGNALS GO TO EMAIL
   A static site has no database, so there is no place to count anything. The
   inbox is the database until `backend` is switched on: every message carries
   a tag in its subject, and one search per tag is the count.

       [register]   a new student, with his number
       [paywall]    someone stood in front of the price and did not pay
       [u1-l1]      a homework came in            (engine.js sends this one)

   The moment PLATFORM_CONFIG.backend is set, these become table rows and the
   counting stops being a mail search. Nothing else about the platform changes.
   ========================================================================== */

window.Access = (function () {
  'use strict';

  function cfg() { return window.PLATFORM_CONFIG || {}; }
  function isDemo() { return !!cfg().demoMode; }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ====================================================== the backend switch */

  function backendOff() { return !cfg().backend; }

  /* Everything that genuinely cannot work without a server. Each line is a
     promise the platform is making to itself — and the student can read it,
     which is the point: a missing feature that explains itself is a roadmap,
     a missing feature that says nothing is a bug. */
  var SERVICES = [
    { key: 'accounts',
      ar: 'حساب بكلمة سر',
      whyAr: 'تدخل بيه من أي جهاز وتلاقي تقدّمك زي ما سيبته' },
    { key: 'grading',
      ar: 'تصحيح على السيرفر',
      whyAr: 'الإجابات النموذجية ما تنزلش على المتصفح أصلاً' },
    { key: 'roster',
      ar: 'متابعة الطلاب',
      whyAr: 'أرقام حقيقية للدكتور: مين سجّل، مين كمّل، مين وقف فين' },
    { key: 'autoUnlock',
      ar: 'فتح الاشتراك تلقائياً',
      whyAr: 'الدفع يفتح الوحدة على طول من غير كود باليد' }
  ];

  function services() {
    var on = !backendOff();
    return SERVICES.map(function (s) {
      return { key: s.key, ar: s.ar, whyAr: s.whyAr, on: on };
    });
  }

  /* The panel a student sees where a server-backed feature would have been. */
  function disabledPanel(titleAr, bodyAr) {
    return '<div class="off-panel">' +
      '<span class="off-badge">الميزة دي لسه مش مفعّلة</span>' +
      '<h3>' + esc(titleAr) + '</h3>' +
      '<p>' + esc(bodyAr) + '</p>' +
      '<p class="off-note">اتبنت وجاهزة، ومستنية تجهيز الاستضافة. هتشتغل من غير ما تعمل أي حاجة.</p>' +
    '</div>';
  }

  /* ========================================================= sending signals */

  /* Same transport as the homework, same demo-mode rule: in demo everything
     behaves identically and nothing leaves the browser. */
  function send(payload) {
    var key = cfg().web3formsKey;
    if (!key) return Promise.reject(new Error('no web3forms key'));
    if (isDemo()) return new Promise(function (r) { setTimeout(r, 500); });
    payload.access_key = key;
    return fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (res) { return res.json(); })
      .then(function (out) { if (!out.success) throw new Error(out.message || 'Unknown error'); });
  }

  function yearLabel() {
    var y = window.Student && Student.year();
    return y ? y.label : '';
  }

  /* ============================================================ registration */

  /* Does opening this lesson require a registration first?
     Counted against the lessons that actually EXIST, not the ones merely
     listed — a «قريباً» lesson was never a free lesson he could have had. */
  function needsRegistration(lessonId) {
    if (!window.Student) return false;
    if (Student.registered()) return false;
    var free = cfg().registration && typeof cfg().registration.afterLessons === 'number'
             ? cfg().registration.afterLessons : 1;
    var rank = Student.rankOf(lessonId);
    if (rank < 0) return false;            /* not in the map — never block it */
    return rank >= free;
  }

  /* The sentence that keeps this from being a trap. Shown on the student's
     page BEFORE he starts, and only while he has not registered. */
  function announcementHtml() {
    var r = cfg().registration || {};
    if (r.announce === false) return '';
    if (window.Student && Student.registered()) return '';
    var n = typeof r.afterLessons === 'number' ? r.afterLessons : 1;
    return '<div class="ar-note tip announce">' +
      '<span class="ar-label">قبل ما تبدأ</span>' +
      (n === 1 ? 'الدرس الأول مفتوح على طول من غير أي تسجيل. '
               : 'أول ' + n + ' دروس مفتوحين من غير أي تسجيل. ') +
      'بعد كده بأسألك على اسمك ورقمك — عشان أعرف أتابع مستواك، ' +
      '<strong>وأصحّح واجبك بنفسي وأبعتلك الدرجة</strong>.' +
    '</div>';
  }

  var PHONE = /^01[0-9]{9}$/;

  /* Draws the registration form into `host`. onDone() runs after the student
     is registered — the caller decides what that means (navigate, re-render). */
  function renderRegistration(host, opts) {
    opts = opts || {};
    var p = (window.Student && Student.profile()) || {};

    host.innerHTML =
      '<div class="reg-panel">' +
        '<span class="reg-badge">خطوة واحدة وتكمّل</span>' +
        '<h2>سجّل عشان تكمّل</h2>' +
        '<p class="reg-lede">' +
          'الدرس الأول كان مفتوح من غير تسجيل زي ما قلت لك. عشان تكمّل الدروس اللي بعده، ' +
          'محتاج أعرف مين أنت — عشان أتابع مستواك، وأصحّح واجبك بنفسي وأبعتلك الدرجة.' +
        '</p>' +

        '<div class="field">' +
          '<label for="regName">الاسم كامل</label>' +
          '<input type="text" id="regName" maxlength="60" autocomplete="name" ' +
                 'value="' + esc(p.name || '') + '" placeholder="أحمد محمد علي" />' +
          '<p class="field-err" id="regNameErr" hidden></p>' +
        '</div>' +

        '<div class="field">' +
          '<label for="regPhone">رقم الموبايل</label>' +
          '<input type="tel" id="regPhone" inputmode="numeric" autocomplete="tel" ' +
                 'maxlength="11" placeholder="01xxxxxxxxx" />' +
          '<p class="field-err" id="regPhoneErr" hidden></p>' +
          '<p class="reg-hint">الرقم ده بيستخدم في متابعتك وإرسال درجاتك، وبس.</p>' +
        '</div>' +

        '<button type="button" class="cta reg-go" id="regGo">سجّل وكمّل</button>' +
        '<p class="reg-foot" id="regFoot"></p>' +
      '</div>';

    var btn = host.querySelector('#regGo');

    btn.addEventListener('click', function () {
      var name = host.querySelector('#regName').value.trim();
      var phone = host.querySelector('#regPhone').value.trim();
      var nErr = host.querySelector('#regNameErr');
      var pErr = host.querySelector('#regPhoneErr');
      var bad = false;

      if (name.replace(/\s+/g, ' ').split(' ').length < 2) {
        nErr.textContent = 'اكتب اسمك ثنائي على الأقل.';
        nErr.hidden = false; bad = true;
      } else { nErr.hidden = true; }

      if (!PHONE.test(phone)) {
        pErr.textContent = 'الرقم لازم يكون ١١ رقم ويبدأ بـ 01.';
        pErr.hidden = false; bad = true;
      } else { pErr.hidden = true; }

      if (bad) return;

      btn.disabled = true;
      btn.textContent = 'جاري التسجيل…';

      /* The record is saved FIRST and the mail is sent after. A student whose
         connection drops must not be locked out of a lesson because an email
         failed — the signal is for you, the access is for him. */
      Student.markRegistered({ name: name, phone: phone });
      Student.log('register', opts.lessonId || '', '');

      send({
        subject: '[register] ' + name + ' — ' + phone,
        from_name: 'MathGate',
        student_name: name,
        student_phone: phone,
        year: yearLabel(),
        at_lesson: opts.lessonId || '',
        registered_at: new Date().toISOString()
      })['catch'](function () { /* silent: his access does not depend on it */ })
        ['then'](function () {
          if (typeof opts.onDone === 'function') opts.onDone();
        });

      /* Promise.prototype.finally is not everywhere yet; the then above runs
         either way because the catch swallows the failure first. */
    });

    host.querySelector('#regPhone').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') btn.click();
    });
  }

  /* ================================================================ the price */

  function priceLineHtml() {
    var pr = cfg().pricing;
    if (!pr || !pr.termPrice) return '';
    return '<p class="price-anchor">' +
      'قيمة اشتراك الترم <strong>' + esc(pr.termPrice) + ' ' + esc(pr.currency) + '</strong> — ' +
      'الوحدة الأولى مفتوحة <strong>مجاناً</strong> للدفعة الأولى.' +
    '</p>';
  }

  /* The panel behind a locked unit. It pings you once per student per unit,
     so the number you read later is people, not page views. */
  function renderPaywall(host, opts) {
    opts = opts || {};
    var pr = cfg().pricing || {};
    var unitNo = opts.unitNo;
    var p = (window.Student && Student.profile()) || {};

    host.innerHTML =
      '<div class="pay-panel">' +
        '<span class="pay-badge">الوحدة دي بالاشتراك</span>' +
        '<h2>' + esc(opts.unitTitleAr || ('الوحدة ' + unitNo)) + '</h2>' +
        '<p class="pay-price">' + esc(pr.unitPrice) + ' <span>' + esc(pr.currency) + '</span></p>' +
        '<p class="pay-lede">' +
          'الوحدة الأولى كاملة مجانية — الشرح والتمارين والواجبات والتصحيح. ' +
          'الوحدات اللي بعدها باشتراك رمزي بيغطي تكلفة الفيديو والمتابعة.' +
        '</p>' +
        '<div class="ar-note"><span class="ar-label">الدفع دلوقتي</span>' +
          esc(pr.payHowAr || '') +
          (pr.contact ? ' — <strong>' + esc(pr.contact) + '</strong>' : '') +
        '</div>' +
        (backendOff()
          ? disabledPanel('الدفع الإلكتروني المباشر',
              'الدفع بالكارت وفودافون كاش من جوه الموقع، والوحدة بتتفتح لحظياً من غير كود.')
          : '') +
        '<p class="pay-foot">لو عندك كود فتح، اكتبه هنا:</p>' +
        '<div class="field pay-code">' +
          '<input type="text" id="payCode" placeholder="كود الفتح" maxlength="24" />' +
          '<button type="button" class="cta secondary" id="payGo">فتح</button>' +
        '</div>' +
        '<p class="field-err" id="payErr" hidden></p>' +
      '</div>';

    /* one ping per student per unit */
    if (window.Student && !Student.paywallSeen(unitNo)) {
      Student.markPaywallSeen(unitNo);
      send({
        subject: '[paywall] الوحدة ' + unitNo + ' — ' + (p.name || 'زائر'),
        from_name: 'MathGate',
        student_name: p.name || '',
        student_phone: p.phone || '',
        year: yearLabel(),
        unit: unitNo,
        seen_at: new Date().toISOString()
      })['catch'](function () {});
    }

    host.querySelector('#payGo').addEventListener('click', function () {
      var err = host.querySelector('#payErr');
      err.textContent = backendOff()
        ? 'أكواد الفتح بتتفعّل يدوياً دلوقتي. ابعتلي صورة التحويل وهبعتلك الكود.'
        : 'الكود ده مش صحيح أو انتهت صلاحيته.';
      err.hidden = false;
    });
  }

  return {
    backendOff: backendOff,
    services: services,
    disabledPanel: disabledPanel,
    needsRegistration: needsRegistration,
    announcementHtml: announcementHtml,
    renderRegistration: renderRegistration,
    priceLineHtml: priceLineHtml,
    renderPaywall: renderPaywall
  };
})();

/* ==========================================================================
   STUDENT DATA LAYER  ·  assets/student.js
   --------------------------------------------------------------------------
   Everything the platform knows about one student, behind one small API.

   WHY THIS IS ITS OWN FILE
   Today the answer to "what has this student done" is localStorage. Tomorrow
   it is a Supabase table. The whole point of this file is that the day that
   happens, ONLY this file is rewritten: engine.js, home.js and every page ask
   `Student.lesson(id)` and never touch a storage key themselves. Keep it that
   way — the moment a page reads localStorage directly, the swap gets expensive.

   THE KEYS IT OWNS  (all under the wg: namespace, so the DEV reset still
   clears everything in one sweep)

     wg:student            {name, year, since}      the profile
     wg:activity           [{t, type, id}]          last 30 events, newest first
     wg:progress:<id>      {seg:{}, ex:{}, quiz:{}} written by engine.js
     wg:hwsent:<id>        '1'                      written by engine.js
     wg:hwattempts:<id>    number                   written by engine.js
     wg:hwbest:<id>        number (percent)         written by engine.js

   The last four already existed in v3.7 and are read here, never renamed —
   a student who did lesson work before this build keeps every bit of it.
   ========================================================================== */

window.Student = (function () {
  'use strict';

  var K_PROFILE  = 'wg:student';
  var K_ACTIVITY = 'wg:activity';
  var ACTIVITY_MAX = 30;

  /* ------------------------------------------------------------ storage -- */

  function ok() {
    try { localStorage.setItem('wg:probe', '1'); localStorage.removeItem('wg:probe'); return true; }
    catch (e) { return false; }
  }
  function readRaw(k, dflt) {
    try { var v = localStorage.getItem(k); return v === null ? dflt : v; }
    catch (e) { return dflt; }
  }
  function readJSON(k, dflt) {
    try { return JSON.parse(localStorage.getItem(k)) || dflt; } catch (e) { return dflt; }
  }
  function writeJSON(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; }
  }
  function readNum(k, dflt) {
    var n = parseFloat(readRaw(k, ''));
    return isNaN(n) ? dflt : n;
  }

  /* ------------------------------------------------------------ profile -- */

  /* The stored record, whatever is in it. It may hold a name and a number but
     no year — that is a visitor who arrived on a direct lesson link and
     registered at the door without ever seeing «اختر مرحلتك». He is a real
     student; he just has not picked a year yet. */
  function profile() {
    var p = readJSON(K_PROFILE, null);
    return (p && typeof p === 'object') ? p : null;
  }

  /* Whether the first-visit screen has been answered. The year is what that
     screen asks for, so the year is what decides it. */
  function hasProfile() {
    var p = profile();
    return !!(p && p.year);
  }

  function saveProfile(patch) {
    var p = profile() || { since: Date.now() };
    for (var k in patch) if (Object.prototype.hasOwnProperty.call(patch, k)) p[k] = patch[k];
    if (!p.since) p.since = Date.now();
    writeJSON(K_PROFILE, p);
    return p;
  }

  function firstName() {
    var p = profile();
    if (!p || !p.name) return '';
    return String(p.name).trim().split(/\s+/)[0];
  }

  /* --------------------------------------------------------- registration --

     A PROFILE is not a REGISTRATION. The first-visit screen takes a name and
     a year so the page can speak to a person instead of a browser; that is a
     setting. Registration is the mobile number, and it is asked for only
     after the student has had a whole lesson for free — value first, then
     the ask. The two are deliberately different states. */

  function registered() {
    var p = profile();
    return !!(p && p.phone && p.registeredAt);
  }

  function markRegistered(data) {
    return saveProfile({
      name: data.name,
      phone: data.phone,
      registeredAt: Date.now()
    });
  }

  /* A student who submitted the first homework has already handed over his
     name and number on that form. Asking again would be asking twice for the
     same thing, so engine.js calls this at submit time. */
  function registerFromHomework(name, phone) {
    if (registered() || !phone) return;
    markRegistered({ name: name || (profile() && profile().name) || '', phone: phone });
  }

  /* ------------------------------------------------------------- paywall -- */

  /* One ping per unit per student: you want to know how many people stood in
     front of the price, not how many times each of them refreshed. */
  function paywallSeen(unitNo) { return !!readRaw('wg:paywall:' + unitNo, ''); }
  function markPaywallSeen(unitNo) {
    try { localStorage.setItem('wg:paywall:' + unitNo, String(Date.now())); } catch (e) {}
  }

  /* ----------------------------------------------------------- activity -- */

  /* Newest first, capped. Repeating the same event for the same lesson within
     the same session would flood the list, so an identical head is refreshed
     in place instead of pushed again. */
  function log(type, id, label) {
    var list = readJSON(K_ACTIVITY, []);
    if (!Array.isArray(list)) list = [];
    var head = list[0];
    if (head && head.type === type && head.id === id) head.t = Date.now();
    else list.unshift({ t: Date.now(), type: type, id: id, label: label || '' });
    writeJSON(K_ACTIVITY, list.slice(0, ACTIVITY_MAX));
  }
  function activity(n) {
    var list = readJSON(K_ACTIVITY, []);
    return Array.isArray(list) ? list.slice(0, n || ACTIVITY_MAX) : [];
  }

  /* ------------------------------------------------- one lesson's state -- */

  /* `entry` is a lesson object out of COURSE. It is optional: pass just an id
     and you still get the storage facts, only without the progress percent
     (which needs to know how many pieces the lesson has). */
  function lesson(idOrEntry) {
    var id = typeof idOrEntry === 'string' ? idOrEntry : (idOrEntry && idOrEntry.id);
    var st = readJSON('wg:progress:' + id, {});
    var segs = st.seg ? Object.keys(st.seg).length : 0;
    var exs  = st.ex  ? Object.keys(st.ex).length  : 0;
    var quiz = st.quiz || null;

    /* How many pieces the lesson has is known only to the lesson's own data
       file, which the home page does not load. `parts` is written into the
       progress object by engine.js on first render precisely so the home page
       can compute a percent without loading 17 lesson files. */
    var total = st.parts || 0;
    var done  = segs + exs + (quiz ? 1 : 0);
    var pct   = total ? Math.min(Math.round(done / total * 100), 100) : (done ? 5 : 0);

    return {
      id: id,
      opened: !!(st.parts || done),
      done: done,
      total: total,
      pct: pct,
      quiz: quiz,                                   /* {score,total} or null */
      hwSent: !!readRaw('wg:hwsent:' + id, ''),
      attempts: readNum('wg:hwattempts:' + id, 0),
      best: readNum('wg:hwbest:' + id, 0)           /* percent, highest attempt */
    };
  }

  /* --------------------------------------------------- the course, flat -- */

  function year(yearId) {
    var c = window.COURSE;
    if (!c) return null;
    var id = yearId || (profile() && profile().year);
    for (var i = 0; i < c.years.length; i++) if (c.years[i].id === id) return c.years[i];
    return null;
  }

  /* Every lesson of a year in teaching order, each carrying its unit, so the
     caller never has to walk the tree itself. */
  function lessons(yearId) {
    var y = year(yearId), out = [];
    if (!y || !y.terms) return out;
    y.terms.forEach(function (t) {
      (t.units || []).forEach(function (u) {
        (u.lessons || []).forEach(function (l, i) {
          out.push({
            id: l.id, no: l.no, data: l.data,
            title: l.title, titleAr: l.titleAr,
            unitNo: u.no, unitTitle: u.title, unitTitleAr: u.titleAr,
            free: u.free !== false,
            indexInUnit: i + 1, unitLessons: u.lessons.length,
            term: t.id
          });
        });
      });
    });
    return out;
  }

  /* The trial lesson, shaped like any other lesson entry. It is deliberately
     NOT part of lessons(): it must never appear inside a unit in the map. But
     it IS real work the student did, so «الواجبات المستحقة» and «ملخص الأداء»
     count it — a page that shows 9% progress on a lesson and «0 دروس بدأتها»
     in the same screen is simply lying. */
  function demo(yearId) {
    var d = window.COURSE && window.COURSE.demo;
    if (!d || !d.show) return null;

    /* A trial lesson belongs to one year. Since lesson 1-1 became real, the
       trial moved to Grade 2 Secondary — so a Grade 1 student now sees his
       own syllabus and nothing else. A trial with no `year` belongs to
       everyone, which is how it behaved before. */
    if (d.year) {
      var who = yearId || (profile() && profile().year);
      if (who && who !== d.year) return null;
      if (!who) return null;
    }

    return {
      id: d.id, no: '—', data: d.data, title: d.title, titleAr: d.titleAr,
      noteAr: d.noteAr, unitNo: 0, unitTitle: 'Trial lesson', unitTitleAr: 'درس تجريبي',
      free: true, indexInUnit: 1, unitLessons: 1, isDemo: true
    };
  }

  /* Everything that counts towards the student's record: the year's lessons,
     plus the trial lesson when it is switched on. */
  function tracked(yearId) {
    var d = demo(yearId);
    return d ? [d].concat(lessons(yearId)) : lessons(yearId);
  }

  /* The lessons that actually exist, in the order a student meets them. This
     is the list the registration gate counts against — a lesson that is only
     listed («قريباً») is not a lesson he could have had for free. */
  function built(yearId) {
    return tracked(yearId).filter(function (l) { return l.data; });
  }

  /* How many built lessons come before this one. -1 for a lesson that is not
     in the map at all, which the callers read as "do not block it".

     The rank is counted inside the lesson's OWN year, found across the whole
     map — not inside whatever year this browser happens to have picked. A
     visitor who followed a direct link to lesson 1–2 has no year set yet, and
     ranking him against an empty list would have opened the door to anyone
     holding a URL. */
  function rankOf(id) {
    var loc = locate(id);
    var list = built(loc ? loc.year.id : null);
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return i;
    return -1;
  }

  /* Where a lesson sits in the map, searched across ALL years — the lesson
     page does not know which year the student picked, and a teacher opening
     a link directly may have no profile at all. Returns null for a lesson
     that is not in the map (the trial lesson), and callers fall back to
     whatever the lesson's own data file says. */
  function locate(id) {
    var c = window.COURSE;
    if (!c) return null;
    for (var i = 0; i < c.years.length; i++) {
      var list = lessons(c.years[i].id);
      for (var j = 0; j < list.length; j++) {
        if (list[j].id !== id) continue;
        return {
          year: c.years[i], all: list, index: j, entry: list[j],
          prev: j > 0 ? list[j - 1] : null,
          next: j < list.length - 1 ? list[j + 1] : null
        };
      }
    }
    return null;
  }

  /* ----------------------------------------------------------- the gate -- */

  /* One lesson's status, as the student sees it:

       'soon'    not built yet                       (data === null)
       'paid'    built, but its unit is not free
       'locked'  built and free, but the previous built lesson's homework
                 has not been sent yet
       'open'    ready to start, nothing done in it
       'doing'   started, homework not sent
       'done'    homework sent

     The gate deliberately keys on the previous BUILT lesson, not the previous
     listed one — otherwise a not-yet-recorded lesson in the middle would wall
     off everything after it. */
  function statusOf(entry, all) {
    if (!entry.data) return 'soon';
    if (!entry.free) return 'paid';

    var st = lesson(entry.id);
    if (st.hwSent) return 'done';

    var list = all || lessons();
    var built = list.filter(function (l) { return l.data && l.free; });
    var pos = -1;
    for (var i = 0; i < built.length; i++) if (built[i].id === entry.id) { pos = i; break; }
    if (pos > 0 && !lesson(built[pos - 1].id).hwSent) return 'locked';

    return st.opened ? 'doing' : 'open';
  }

  /* ------------------------------------------------- derived, for blocks -- */

  /* «كمّل من حيث وقفت» — the lesson the student is in the middle of, else the
     first one he can start. Returns null when the year has nothing ready. */
  function resume() {
    var all = lessons(), i;
    for (i = 0; i < all.length; i++) if (statusOf(all[i], all) === 'doing') return all[i];
    for (i = 0; i < all.length; i++) if (statusOf(all[i], all) === 'open')  return all[i];
    return null;
  }

  /* «الواجبات المستحقة» — lessons he actually opened and has not handed in.
     Not "everything unlocked": the gate means at most one lesson is unlocked
     and untouched, and calling a lesson he never started an overdue homework
     is simply false. */
  function due() {
    return tracked().filter(function (l) {
      if (!l.data || !l.free) return false;
      var st = lesson(l.id);
      return st.opened && !st.hwSent;
    });
  }

  /* «ملخص الأداء».
     hwAverage is the teacher's number, not the student's — home.js shows it
     only in DEV view. It is computed here anyway so there is one definition
     of it in the codebase. */
  function summary() {
    var all = tracked();
    var built = all.filter(function (l) { return l.data; });
    var started = 0, finished = 0, qScore = 0, qTotal = 0, hwSum = 0, hwN = 0;

    built.forEach(function (l) {
      var st = lesson(l.id);
      if (st.opened) started++;
      if (st.hwSent) { finished++; hwSum += st.best; hwN++; }
      if (st.quiz && st.quiz.total) { qScore += st.quiz.score; qTotal += st.quiz.total; }
    });

    return {
      lessonsBuilt: built.length,
      lessonsListed: lessons().length,
      started: started,
      finished: finished,
      quizPct: qTotal ? Math.round(qScore / qTotal * 100) : null,
      quizScore: qScore, quizTotal: qTotal,
      hwAverage: hwN ? Math.round(hwSum / hwN) : null,   /* teacher-only */
      hwCount: hwN
    };
  }

  /* ------------------------------------------------------------- links -- */

  /* One place that knows a lesson id becomes a URL. Change the scheme here
     (query string today, folders tomorrow) and every link in the platform
     follows. `base` lets a page inside a subfolder still point at the root. */
  function href(page, id, base) {
    return (base || '') + page + '.html?id=' + encodeURIComponent(id);
  }

  function reset() {
    try {
      Object.keys(localStorage)
        .filter(function (k) { return k.indexOf('wg:') === 0; })
        .forEach(function (k) { localStorage.removeItem(k); });
    } catch (e) {}
  }

  return {
    available: ok,
    profile: profile, hasProfile: hasProfile, saveProfile: saveProfile, firstName: firstName,
    log: log, activity: activity,
    lesson: lesson, lessons: lessons, year: year, locate: locate,
    demo: demo, tracked: tracked, built: built, rankOf: rankOf,
    registered: registered, markRegistered: markRegistered,
    registerFromHomework: registerFromHomework,
    paywallSeen: paywallSeen, markPaywallSeen: markPaywallSeen,
    statusOf: statusOf, resume: resume, due: due, summary: summary,
    href: href, reset: reset
  };
})();

/* ==========================================================================
   PLATFORM CONFIG  ·  assets/config.js
   The one file with site-wide settings. Change it here, not inside pages.
   ========================================================================== */

window.PLATFORM_CONFIG = {

  siteName: 'Dr. Wessam Gouda — Mathematics',

  /* ----------------------------------------------------------------------
     DEMO MODE
     true  → the homework is graded and everything behaves normally, but the
             submission is NOT sent: no email reaches your inbox. A small
             banner tells the visitor this is a preview.
     false → real submissions.

     Turn it ON for the link you send to a friend or a colleague, OFF for
     the link you give to students.
     ---------------------------------------------------------------------- */
  demoMode: true,

  /* Phase 1 only. Web3Forms is fine for collecting homework while you have
     tens of students; it is NOT the long-term answer. The key is visible in
     the page source by design, so treat it as a public mailbox address:
     rotate it if it gets abused, and move homework to the database as soon
     as student accounts exist. */
  web3formsKey: '57b5112c-84d2-44f4-bca2-212763c2248e',

  /* Where solution videos live. Swap this one line when you move from local
     files to Bunny Stream — no lesson data file has to change. */
  videoBase: '',

  /* ----------------------------------------------------------------------
     RETRY CODE
     A student who asks to re-submit gets this link from you:

         https://alostazy2k.github.io/mathgate/homework.html?id=u1-l1&retry=w2026a

     It clears ONLY that lesson's submission lock — his progress and quiz
     scores stay. Change the code whenever you want every link you have
     handed out so far to stop working.

     This is a social control, not a security one: anyone reading this file
     can see the code. That is proportionate — the worst a misuse can do is
     send you one extra homework email, and every submission carries its
     attempt number so you always know which is the latest.
     ---------------------------------------------------------------------- */
  retryCode: 'w2026a',

  /* ======================================================================
     BACKEND
     --------------------------------------------------------------------
     null        → no server. Everything that genuinely needs one is BUILT
                   but switched off, and says so plainly to the student
                   instead of silently missing.
     'supabase'  → the server is live; those features turn themselves on.

     What is waiting on this switch, and why each one actually needs a
     server (none of these can be faked in the browser):

       accounts    a real login, so a student keeps his progress when he
                   changes phone or clears his browser
       grading     answers that never reach the browser at all, instead of
                   today's salted hashes
       roster      real numbers for you — who registered, who finished —
                   instead of counting emails
       autoUnlock  a paid subscription that opens by itself after payment,
                   instead of a code you send by hand

     Cost note, so the decision is made on facts: Supabase's free tier
     covers this platform's entire first year (500 MB, 50k monthly users).
     The paid tier ($25/month) buys daily backups and stops the project
     pausing after a week of inactivity — which matters the day real
     students depend on logging in, and not one day before.
     ====================================================================== */
  backend: null,

  /* ----------------------------------------------------------------------
     PRICE
     The anchor, not a paywall. A thing with no stated price is read as
     worth nothing — so the term price is declared, and Unit 1 is given
     away against it. Change the numbers here and every screen follows.
     ---------------------------------------------------------------------- */
  pricing: {
    currency: 'ج.م',
    termPrice: 300,        /* the declared value of a full term */
    unitPrice: 50,         /* what Unit 2 actually costs — the market test */
    /* WHICH units are free is not set here on purpose: it lives on each unit
       in data/course.js, next to the unit itself. One fact, one place. */
    payHowAr: 'التحويل على فودافون كاش، وابعتلي صورة التحويل على واتساب وهبعتلك كود الفتح في نفس اليوم.',
    contact: ''            /* your WhatsApp number — leave '' to hide the line */
  },

  /* ----------------------------------------------------------------------
     REGISTRATION
     afterLessons: 1 → the first lesson is open to a complete stranger, no
     name, no number, no friction. From the second lesson on, he registers.

     announce: true → the rule is stated on the student's page BEFORE he
     starts, exactly like the homework gate. A rule known in advance reads
     as a rule; the same rule discovered at the end reads as a trap, and
     the trap arrives at the worst possible moment — right after he has
     invested a whole lesson.
     ---------------------------------------------------------------------- */
  registration: {
    afterLessons: 1,
    announce: true
  }
};

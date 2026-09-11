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
  retryCode: 'w2026a'
};

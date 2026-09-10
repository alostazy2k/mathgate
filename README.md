# Dr. Wessam Gouda — Math Platform

Grade 1 Secondary · Egyptian Baccalaureate · Unit 1

---

## What is in here

```
platform/
├── robots.txt           preview only — delete it at launch
├── index.html           landing page — the entry point when the site is published
├── start-server.bat     double-click to run the site locally (Windows)
├── lesson.html          template — identical for every lesson, never edit per lesson
├── homework.html        template — identical for every lesson, never edit per lesson
├── assets/
│   ├── theme.css        all styling for the whole platform (one file, 60 lessons)
│   ├── engine.js        renderer + auto-grading + progress (one file, 60 lessons)
│   ├── config.js        site-wide settings (Web3Forms key, video base URL)
│   └── favicon.svg      site icon
├── data/
│   ├── questions.js     the question bank — every question, written once
│   └── u1-l1.js         lesson 1 content — THE ONLY FILE YOU WRITE PER LESSON
└── tools/
    └── hash.html        generates answer hashes (internal tool — do not publish)
```

**The rule:** `lesson.html`, `homework.html`, `theme.css` and `engine.js` never change when
you add a lesson. A new lesson is a new file in `data/`, plus new entries in `questions.js`.

---

## How to run it

**Double-click `start-server.bat`.** It finds Python, serves the folder on
`http://localhost:8080`, and opens the lesson in your browser. Keep the window open;
`Ctrl+C` stops it.

Or by hand:

```bash
cd platform
py -m http.server 8080      # python3 on Mac/Linux
# then open http://localhost:8080/lesson.html
```

### Do not open the files by double-clicking `lesson.html`

A page opened as `file:///…` is treated by the browser as an untrusted, unique origin, so
**`localStorage` is blocked**. The page still renders, but progress, quiz scores and the
homework gate stop working. Opening the HTML straight out of a `.zip` preview is worse
still — the archiver extracts to a new random temp folder each time, so nothing persists
and you may be looking at an old build.

When storage is unavailable the page now says so in an Arabic banner at the top instead of
failing silently — students in private windows or with strict tracking protection hit the
same wall.

---

## Putting it on the internet

Free, no build step, works with these files exactly as they are.

### Netlify Drop — the fastest

1. Open **app.netlify.com/drop**.
2. Drag the whole **`platform` folder** onto the page — the folder, not the files inside it.
3. You get a live URL in about thirty seconds. Send it to anyone.
4. To publish an update: drag the folder again onto the same site (*Deploys → Drag and drop*).

`index.html` is the entry point, so the bare link works on its own — nobody has to type
`/lesson.html`.

### Before you send the link to someone

- **Set `demoMode: true` in `assets/config.js`** if the person is a friend or a colleague
  just having a look. The homework is still graded and everything behaves normally, but
  nothing is sent to your inbox, and a small Arabic banner says the page is a preview.
  Set it back to `false` for the link students actually use.
- **The videos are not there yet.** All 18 `videos/u1-l1/*.mp4` paths are still empty, so
  the player shows its poster and does not play. Everything else works.
- Anyone who reads `assets/config.js` can see your Web3Forms key and the retry code. That
  is expected at this stage — see the notes in that file.

### Upload the whole folder, not the two HTML pages

`lesson.html` and `homework.html` each load six files next to them:

```
assets/theme.css   assets/engine.js   assets/config.js
assets/favicon.svg data/questions.js  data/u1-l1.js
```

Upload the pages alone and you get a blank, unstyled screen — the engine that builds the
content is not there.

### Other free hosts

GitHub Pages, Cloudflare Pages and Vercel all serve this folder unchanged. They need a
repository or an account first, which is why Netlify Drop is the quickest for a first look.

---

## How to add lesson 1–2

1. `cp data/u1-l1.js data/u1-l2.js` and edit the content.
2. Add its questions to `data/questions.js` with new ids (`q-210`, `h-301`, …).
3. Generate the answer hashes in `tools/hash.html` and paste them in.
4. `cp lesson.html u1/l2/lesson.html` (or change the one data `<script src>` line).
5. Point `next.href` of lesson 1–1 at lesson 1–2.

Nothing else.

---

## Language convention

| Where | Language |
|---|---|
| Mathematics, definitions, statements, answer options | English |
| Instructions, guidance, hints, short clarifications | Arabic, inside an `ar` field |

The engine styles every Arabic string the same way (`.ar-note`), so the student
learns instantly: *the teal box on the right is the note that explains it to me.*
Three tones are available: default, `tip` (gold), `warn` (rust).

---

## Question types

| Type | Use it for | Auto-graded |
|---|---|---|
| `mcq` | quick recall, reading a graph | yes |
| `numeric` | the student types the answer — no guessing from 4 options | yes |
| `steps` | anything that used to be an essay | yes, per step |
| `essay` | the one question you answer personally | no |

### `kind` — how a typed answer is compared

| `kind` | Meaning | Example |
|---|---|---|
| `'set'` | order ignored | `R-{3,-3}` = `R-{-3,3}` = `ℝ \ {3, -3}` |
| `'interval'` | order kept | `[2,6]` ≠ `[6,2]` |
| omitted | exact match after normalising | `(x-1)(x-2)` |

Put `kind: 'set'` on anything inside `{ }` or any comma-separated list of values.
Without it, a correct answer written in a different order is marked wrong.

### `placeholder` — the shape, never the answer

`(x-a)(x-b)`, `a, b`, `a number` — **not** `(x-1)(x-2)`, `1, 2`, `-2`.
The placeholder tells the student the format he should type in; if it tells him the
answer, the question is worthless.

`steps` is the important one: it replaces open-ended written questions with a chain of
short auto-graded steps. Same skill, same depth, and it tells you exactly *which step*
the student lost the thread at — which a marked essay never does.

---

## About the answer hashes

Answers are stored as salted FNV-1a hashes so a student cannot read them out of the page
source. This is **obfuscation, not security** — anyone who reads `engine.js` can brute-force
a 4-option question. It is the right level of protection for a free static unit.

Real protection needs the answers to live on a server and never reach the browser. That
arrives in Step 4 below, with student accounts.

---

## Roadmap — where we are

| # | Step | Status |
|---|---|---|
| 1 | Decide the language | done — English content, Arabic guidance layer |
| 2 | Fix the four critical bugs in the prototype | done — in this codebase |
| 3 | Split template from content, build the question bank | done — this folder |
| 3b | Placeholders, set-order answers, homework gate | done — v2 |
| 3c | Completion panel, Arabic validation, submit flow | done — v3 |
| 3d | Retry link + attempt counter | done — v3.4 |
| 5a | Landing page, demo mode, deploy guide | done — v3.6 |
| 4 | Record Unit 1: 8 lessons × 5 segments | next |
| 5 | Publish free, on a domain, collecting name + mobile | after 4 |
| 6 | Move video to Bunny Stream (signed URLs + watermark) | during term |
| 7 | Student accounts + server-side grading (Supabase) | during term |
| 8 | Payments — Paymob + Fawry — open paid access from Unit 2 | Oct / Nov |

---

## The homework gate

The next-lesson button opens once the homework has been **sent** — not once it is
answered correctly. A student who already understands the lesson is not held back by a
wrong answer, only by handing nothing in.

- The rule is stated at the **top** of the lesson (`gateNoticeAr`), not sprung at the bottom.
- The button is **visible but locked**, with the reason in Arabic. A hidden link reads as a
  broken page; a locked one reads as a rule.
- Nothing else is locked — the videos, the theory and the exercises are always open.
- Submitting sets `wg:hwsent:<lesson id>`; the lesson page also re-checks on window focus,
  so submitting in another tab unlocks the button on return.

**Phase 1 limit:** the flag lives in `localStorage`. A student who clears it, or types the
next lesson's URL, gets through. This is a rule the student agrees to, not a lock — it
becomes a real one in Step 7, when accounts and grading move to the server.

---

## Submitting the homework

The submit button is **never disabled**. Pressing it while the homework is incomplete is
what reveals every missing item at once — a dead button just leaves the student guessing.

- A **live completion panel** sits directly above the button: "تم استيفاء 12 من 18",
  a progress bar, and a clickable list of what is still missing with the reason for each.
- Every field validates with an **Arabic message under the field itself**: a word typed into
  a number box, a mobile number that is not 11 digits, an answer written as an Arabic
  sentence instead of maths notation, an essay of three words.
- Pressing submit while incomplete scrolls to the first missing item and flashes it.
- One submission per lesson. A student returning to a submitted homework sees a clear
  panel saying so, with the next-lesson button — not a disabled button with no explanation.

`entry: 'number'` on a step or numeric question makes that box numbers-only
(`inputmode` + `pattern` + the Arabic rule). Leave it off for algebraic answers
like `(x-a)(x-b)` or `R-{a, b}`.

### Letting a student re-submit

Send him this link:

```
https://your-site.com/u1/l1/homework.html?retry=w2026a
```

It clears **only** that lesson's submission lock; his progress and quiz scores are
untouched. The code is `retryCode` in `assets/config.js` — change it and every link you
have handed out so far stops working.

It is a social control, not a security one: anyone reading `config.js` can see the code.
That is proportionate — the worst a misuse does is send you one extra email, and every
submission is stamped with its attempt number.

**Grading policy: the highest attempt counts** — the same rule the Egyptian Baccalaureate
uses, so it needs no explaining to a student or a parent. Each email carries:

```
subject             [u1-l1] Homework — Ahmed Mohamed (attempt 2)
attempt             2
this_attempt_score  24 / 24
best_auto_score     24 / 24  (previous best 22)
grading_policy      highest attempt counts
```

The attempt counter lives in the student's browser, so a cleared browser restarts it. The
number that matters is the one stamped on the emails you keep.

---

## Which version am I looking at?

The bottom of every page prints a build stamp: **`engine v3.7 · u1-l1`**.
If that number does not match the release you just extracted, the browser is serving a
cached file or you opened an older `platform/` folder.

Every local asset is loaded with a version query:

```html
<link rel="stylesheet" href="assets/theme.css?v=3.7" />
<script src="assets/engine.js?v=3.7"></script>
```

The engine reads that `?v=` off its own `<script src>`, so the number lives in exactly one
place per page. **When you change `engine.js` or `theme.css`, bump the number in
`lesson.html` and `homework.html`** — otherwise returning students keep the old files.

### Testing it yourself

A small **إعادة تعيين حالة الطالب** button appears at the bottom-left whenever the page is
served from `localhost` or `127.0.0.1`. It clears every `wg:` key — submission flag,
progress, quiz score — and reloads. On a real domain it never appears; add `?dev=1` to the
URL if you ever need it there.

Remember that this state belongs to the **origin**, not the files: `http://localhost:8080`
keeps what you submitted yesterday, no matter how many times you re-extract the zip.

---

## Changelog

### v3.7 — preview build
- `demoMode: true` — homework is graded but never sent.
- `noindex, nofollow` on all three pages and a `robots.txt` that disallows everything,
  so search engines leave the preview alone.

**To go live, undo exactly three things:** set `demoMode: false`, delete `robots.txt`,
and remove the `<meta name="robots">` line from `index.html`, `lesson.html` and
`homework.html`. Then bump the `?v=` number and redeploy.

### v3.6
- `index.html` — a landing page, so the bare site link works on its own.
- `demoMode` in `config.js`: grade and confirm the homework exactly as usual but
  send nothing, with a banner saying so. For links you show to friends.
- Deployment guide for Netlify Drop.

### v3.5
- A wrong retry code on an **unlocked** homework used to show a red "invalid link"
  warning above a form the student could already use. It now says the calm true
  thing instead. The red warning is kept for the one case where it means
  something: a locked homework plus a code that did not open it.

### v3.4
- `?retry=<code>` link so you can let a student re-submit one lesson, without
  touching his progress and without him clearing browser data.
- Attempt counter, stamped on every email, plus the running best score — so two
  submissions from the same student are never ambiguous.

### v3.3
- The reset button now appears automatically on `localhost`, so testing no longer
  needs `?dev=1` typed by hand every time.

### v3.2
- `start-server.bat` — one double-click runs the site on `http://localhost:8080`.
- Arabic banner when the browser blocks storage, naming the cause (`file://` vs private
  window) and the fix, instead of the page half-working in silence.
- `assets/favicon.svg` — the vertical-line-test mark, in the brand colours. Also stops the
  `GET /favicon.ico 404`.

### v3.1
- Build stamp in the footer, and `?v=` on every local asset so a cached
  `engine.js` can never be mistaken for the current one.

### v3 — after the second review
- Homework button on the lesson now reads *Go to homework page — الانتقال إلى صفحة الواجب*.
- The next-lesson button appears **inside the homework success message**, so the student
  does not have to go back to the lesson to move on.
- Multiple-choice questions had no `required` at all — the whole of Part A could be left
  blank and the form still counted as valid.
- Added the live completion panel, Arabic per-field validation and jump-to-first-missing.
- The one-submission lock used to leave a permanently disabled button labelled
  "Already submitted" with no explanation; it is now a proper panel, plus `?dev=1` reset.
- `Enter` inside a text field used to submit the form natively and reload the page,
  losing every answer.

### v2 — after the first review
- Eight homework placeholders were showing the answer itself (`(x-1)(x-2)`, `1, 2`, `-2`).
  Placeholders now show the format only.
- Set answers were order-sensitive: `R-{3,-3}` was rejected. Added `kind: 'set'`, which
  sorts the members before hashing. `kind: 'interval'` keeps order where order matters.
- Added the homework link (it was missing entirely) and the next-lesson gate.

### v1 — fixed from the prototype

- Homework score was being divided by itself — every report read as full marks.
- Correct answers were plain text in the page source.
- `required` on the textareas never fired, because the form is never submitted.
- `MathJax options.scale` was ignored; equation size is now a real CSS control.
- `data-correct="B"` on quiz Q4 contradicted `correctMap` (`'C'`) — one source of truth now.
- Progress and quiz score survive closing the page.
- Video split into segments; each one ticks off when finished.

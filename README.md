# Dr. Wessam Gouda — Math Platform

Grade 1 Secondary · Egyptian Baccalaureate · Unit 1

---

## What is in here

```
platform/
├── robots.txt           preview only — delete it at launch
├── index.html           THE STUDENT'S PAGE — the entry point, holds no content itself
├── start-server.bat     double-click to run the site locally (Windows)
├── lesson.html          template — identical for every lesson, never edit per lesson
├── homework.html        template — identical for every lesson, never edit per lesson
├── assets/
│   ├── theme.css        all styling for the whole platform (one file, 60 lessons)
│   ├── engine.js        renderer + auto-grading + progress (one file, 60 lessons)
│   ├── student.js       THE STUDENT RECORD — the only file that touches storage
│   ├── access.js        the three doors: registration, price, backend switch
│   ├── home.js          draws index.html: first-visit screen + the five blocks
│   ├── config.js        site-wide settings (Web3Forms key, video base URL)
│   └── favicon.svg      site icon
├── data/
│   ├── course.js        THE COURSE MAP — years, units, lessons, free/locked flags
│   ├── questions.js     the question bank — every question, written once
│   └── u1-l1.js         the trial lesson (Real Functions) — not syllabus content
└── tools/
    └── hash.html        generates answer hashes (internal tool — do not publish)
```

**The rule:** `lesson.html`, `homework.html`, `theme.css`, `engine.js`, `student.js` and
`home.js` never change when you add a lesson. A new lesson is a new file in `data/`, its
questions in `questions.js`, and one line switched on in `data/course.js`.

### The four layers, and why they are separate

| Layer | File | Changes when |
|---|---|---|
| What exists in the course | `data/course.js` | you add or re-order a lesson |
| What one lesson contains | `data/<id>.js` | you record that lesson |
| What the student has done | `assets/student.js` | **never** — until storage moves to Supabase |
| What he sees | `home.js` / `engine.js` | you change the interface |

`student.js` is the important one. It is the only file in the platform that reads or writes
`localStorage`. Every page asks it questions (`Student.lesson(id)`, `Student.due()`,
`Student.summary()`) and none of them knows where the answer comes from. The day accounts
move to Supabase, that one file is rewritten and no screen is touched.

---

## How to run it

**Double-click `start-server.bat`.** It finds Python, serves the folder on
`http://localhost:8080`, and opens the lesson in your browser. Keep the window open;
`Ctrl+C` stops it.

Or by hand:

```bash
cd platform
py -m http.server 8080      # python3 on Mac/Linux
# then open http://localhost:8080/
```

### Do not open the files by double-clicking `index.html`

A page opened as `file:///…` is treated by the browser as an untrusted, unique origin, so
**`localStorage` is blocked**. The page still renders, but progress, quiz scores and the
homework gate stop working. Opening the HTML straight out of a `.zip` preview is worse
still — the archiver extracts to a new random temp folder each time, so nothing persists
and you may be looking at an old build.

When storage is unavailable the page now says so in an Arabic banner at the top instead of
failing silently — students in private windows or with strict tracking protection hit the
same wall.

---

## The student's page

`index.html` is no longer a landing page for one lesson. It is the student's own page, and
it is the first thing he sees.

**First visit, once and only once:** his name, and his year — three cards, all three years
shown, the two that are not ready marked «قريباً». The year is a setting, not a question
asked at every entry; after that he lands straight on his page. «تغيير المرحلة» in the
header re-opens the choice, and changes nothing else: lesson ids carry their year
(`s1-u1-l4`), so three years can never collide in one browser and nothing is thrown away.

**The page itself, five blocks in this order:**

| Block | What decides it |
|---|---|
| كمّل من حيث وقفت | the first lesson he has started and not finished, else the first he can open |
| الواجبات المستحقة | lessons he **opened** and has not sent — never a lesson he has not seen |
| خريطة الوحدات | the whole year, units collapsible, every lesson carrying its own state |
| ملخص الأداء | واجبات مسلّمة · دروس بدأها · متوسط الكويزات |
| آخر النشاط | the last events: lesson opened, quiz solved, homework sent |

A lesson in the map is in exactly one of six states: **قريباً** (not recorded yet),
**بالاشتراك** (its unit is not free), **سلّم اللي قبله** (the gate), **ابدأ**, a percentage
(in progress), or **تم التسليم ✓**.

### The homework average is yours, not his

`Student.summary()` computes `hwAverage`, and the page renders it **only in DEV view**
(`?dev=1`, or on localhost). A student who watches a running average starts protecting it
instead of learning — which is the exact opposite of «أعلى محاولة هي المعتمدة», the rule
that makes a weak attempt cost nothing. He sees how many he handed in; you see how he did.

### What is stored, and where

Everything lives under the `wg:` namespace in the student's own browser, so the DEV reset
still clears the lot in one sweep:

```
wg:student           {name, year, since}          new in v4.0
wg:activity          the last 30 events           new in v4.0
wg:progress:<id>     {seg, ex, quiz, parts}       `parts` is new in v4.0
wg:hwsent:<id>       the gate flag                unchanged since v3
wg:hwattempts:<id>   attempt counter              unchanged since v3
wg:hwbest:<id>       highest attempt, percent     unchanged since v3
```

The last three are read, never renamed: a student who did lesson work on v3.7 opens v4.0
and finds every bit of it still there, his homework still submitted and his gate still open.

---

## The three doors — `assets/access.js`

### 1. Registration — value first, then the ask

The **first lesson is open to a complete stranger**: no name, no number, no
friction. From the second lesson on, he registers with a name and a mobile.

**And he is told this before he starts**, on his own page:

> الدرس الأول مفتوح على طول من غير أي تسجيل.
> بعده بأسألك على اسمك ورقمك — عشان أعرف أتابع مستواك، وأصحّح واجبك بنفسي وأبعتلك الدرجة.

This is the same principle as the homework gate: a rule stated in advance reads
as a rule, the same rule discovered at the end reads as a trap — and it would
arrive at the worst possible moment, right after he has spent a whole lesson.
Note that the sentence gives the **reason**, and the reason is a benefit to him.

The gate holds wherever he arrives from: clicking in the map, or typing a
lesson URL a friend sent him. It counts only lessons that **exist** — a
«قريباً» lesson was never a free lesson he could have had.

A student who submits the first homework has already given his name and number
on that form, so that submission counts as his registration. He is never asked
twice for the same thing.

`registration.afterLessons` in `config.js` moves the door; `announce: false`
silences the notice.

### 2. The price — an anchor, not a paywall

A thing with no stated price is read as worth nothing. So the term price is
**declared** and Unit 1 is given away against it:

> قيمة اشتراك الترم **300 ج.م** — الوحدة الأولى مفتوحة **مجاناً** للدفعة الأولى.

A locked unit's «بالاشتراك» chip is a **button**. This matters while units 2–4
hold no recorded lessons: every lesson inside them reads «قريباً», so without
the chip the student would never learn a paid tier exists — and you would never
learn he looked. Both numbers live in `config.js` → `pricing`. Which units are
free does **not** live there: it is `free:` on each unit in `data/course.js`,
next to the unit itself. One fact, one place.

### 3. The backend switch — built, and switched off

```js
backend: null      // 'supabase' when the server is live
```

Four features genuinely cannot work in a browser alone. They are **built**, and
while the switch is `null` each one says so where it would have been, instead of
being silently missing:

| Feature | Why it needs a server |
|---|---|
| حساب بكلمة سر | progress that follows him to another phone |
| تصحيح على السيرفر | answers that never reach the browser at all |
| متابعة الطلاب | real numbers for you |
| فتح الاشتراك تلقائياً | payment that opens the unit with no code by hand |

Flip one word and they turn themselves on.

---

## Where the numbers actually are

**The inbox is the database** until `backend` is switched on. Every signal
carries a tag in its subject, and one search per tag is the count:

```
[register]   a new student, with his number
[paywall]    someone stood in front of the price and did not pay
[u1-l1]      a homework came in
```

The DEV panel is called **«سجل الطالب على الجهاز ده»** and not «إحصائيات» on
purpose. This is a static file with no server: it can only ever see the browser
it is running in. Calling one browser's record "statistics" would be the most
expensive kind of wrong number — the confident kind.

`demoMode: true` behaves identically and sends nothing, signals included.

---

## Putting it on the internet

Free, no build step, works with these files exactly as they are.

### GitHub Pages — the one that opens in Egypt

The live site is **alostazy2k.github.io/mathgate**, from the repo `alostazy2k/mathgate`.
That address was confirmed to open from both Egypt and Saudi Arabia — `netlify.app` does
not open from Egypt, which is why the site moved.

To publish an update:

1. Open the repo → **Add file → Upload files**.
2. Drag in **the files you changed** (keeping their folders — `assets/…`, `data/…`).
3. **Commit changes.** GitHub Pages redeploys in about a minute.

`index.html` is the entry point, so the bare link works on its own — nobody has to type a
page name.

**When you upload a changed `engine.js`, `theme.css`, `student.js` or `home.js`, bump the
`?v=` number in all three HTML pages too** — otherwise returning students keep the old file
out of their cache and you will be looking at a bug that no longer exists.

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

## How to add a lesson

Say you have just recorded **1–4 · إشارة الدالة**, which is already listed in the map as
`s1-u1-l4`.

1. `cp data/u1-l1.js data/s1-u1-l4.js` and write the content. Set `id: 's1-u1-l4'` inside it
   — the id in the file must match the file name.
2. Add its questions to `data/questions.js` with new ids (`q-210`, `h-301`, …).
3. Generate the answer hashes in `tools/hash.html` and paste them in.
4. In `data/course.js`, change that lesson's `data: null` to `data: 's1-u1-l4'`.

That is the whole procedure. Nothing else. No HTML file is copied, no link is repointed —
`lesson.html?id=s1-u1-l4` already works, the lesson appears in the map the moment step 4 is
saved, and the previous lesson's *next* button starts pointing at it by itself.

### Adding a lesson that is not in the map yet

Add the entry to the right unit in `data/course.js` (id, `no`, `title`, `titleAr`, `data`)
and it is listed. A lesson with `data: null` shows as **قريباً** and cannot be opened —
which is exactly how all seventeen Term 1 lessons sit right now.

### The URL scheme

`lesson.html?id=<lesson id>` and `homework.html?id=<lesson id>`. One template file serves
every lesson in the course; `Student.href()` is the single function that builds these links,
so the day you want `themathgate.com/u1/l4` instead, that one function changes.

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
| 5b | Move off Netlify to GitHub Pages (Egypt access) | done |
| 6a | Platform shell: course map, student record, personal page | done — v4.0 |
| 6b | Registration, price anchor, tagged signals, backend switch | done — v4.1 |
| 4 | Record Unit 1: 5 lessons, starting with 1–4 إشارة الدالة | next |
| 5 | Publish free, on the domain, collecting name + mobile | after 4 |
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

The bottom of every page prints a build stamp: **`engine v4.1.1 · u1-l1`**.
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

### v4.1.1 — fix: the lesson file is named by the course map

`lesson.html?id=X` was loading `data/X.js`, ignoring the `data:` field in
`data/course.js` entirely — so that field looked like a filename while being
treated as a yes/no flag. It is now what actually picks the file.

That fix is what makes **preview mode** possible: point a second entry at an
existing file (`data: 'u1-l1'` on lesson 1–1) and you have two openable
lessons, so the registration gate has something to guard and you can watch it
work before a single lesson is recorded. Set it back to `null` afterwards.

### v4.1 — registration, price and the backend switch (stage 6-ب)

The platform stops being anonymous, and starts telling you what it is worth.

- **`assets/access.js`** — registration, the price panel and the backend switch,
  in one file. It stores nothing itself: every fact goes through `Student.*`.
- **Registration after the first lesson, announced before it.** First lesson free
  to a stranger; from the second on, name and mobile. The rule is on his page
  before he starts. Submitting the first homework counts as registering.
- **The gate holds on a direct URL too** — not only when he walks in via the map.
- **A declared price.** `300 ج.م` for the term, `50 ج.م` for a unit, both in
  `config.js`. A locked unit's chip is a button that opens the price panel.
- **Tagged email signals** — `[register]` and `[paywall]` — so the inbox can be
  counted until there is a database. `demoMode` suppresses them like everything else.
- **`backend: null`** — four server-dependent features built and switched off,
  each explaining itself where it would have been.
- **The DEV panel** is now the student's record for this browser, plus the service
  status, and it is named honestly instead of being called statistics.
- Storing a registration no longer requires a year, so a visitor who arrives on a
  direct lesson link can register without ever seeing «اختر مرحلتك».

### v4.0 — the platform shell (stage 6-أ)

The platform stops being one lesson and becomes a course.

- **`data/course.js`** — the whole Term 1 map of Grade 1 Secondary, as it stands in the
  ministry book: 4 units, 17 lessons, each with its Arabic and English title. Unit 1 is
  marked free; units 2–4 are marked subscription. Every lesson is `data: null` until it is
  recorded, so the student sees the full year from day one and can open only what exists.
- **`assets/student.js`** — one small API over everything the platform knows about a
  student, and the only file that touches storage. Swapping it for Supabase later changes
  no screen.
- **`index.html` is now the student's page** — five blocks: كمّل من حيث وقفت ·
  الواجبات المستحقة · خريطة الوحدات · ملخص الأداء · آخر النشاط.
- **A first-visit screen** asks for the name and the year, once, and never again. The name
  is then filled into every homework form automatically — which also stops the same student
  reaching your inbox spelled three different ways.
- **One lesson template for the whole course.** `lesson.html?id=…` picks the data file, so a
  new lesson never copies an HTML file again. An id with no data file gets a proper Arabic
  «الدرس ده لسه مش متاح» page with a way back, not a blank screen.
- **The next-lesson button now comes from the course map**, not from the lesson file. Re-order
  a unit in `course.js` and every button follows.
- The homework average is computed but shown **only in DEV view** — it is your number.
- `engine.js` keeps its grading, gate, retry and attempt logic untouched. The only lines
  added to it are three activity hooks and the lesson-parts stamp.

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

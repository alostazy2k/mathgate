/* ==========================================================================
   QUESTION BANK  ·  data/questions.js
   --------------------------------------------------------------------------
   One question, written once, reused in: interactive examples, the quiz,
   the homework, the end-of-unit cumulative review, and the term exam.
   Never write a question twice.

   ID convention   q-1xx  lesson exercises
                   q-1yx  quiz
                   h-2xx  homework
   Answers are stored as salted hashes, never as plain text — generate them
   with tools/hash.html. See the note in engine.js about what that does and
   does not protect.

   Question types
     mcq      options[] + hashes of "<id>:<index>"
     numeric  student types the answer; hashes of every accepted spelling
     steps    a chain of short auto-graded steps — replaces an essay

   kind      how the typed answer is compared (numeric + steps only)
     'set'       order is ignored — R-{3,-3} = R-{-3,3}, and "2, 1" = "1, 2"
     'interval'  order is kept — [2,6] is NOT [6,2]
     (omitted)   exact string match after normalising

   allowPhoto   lets the student photograph his working instead of typing it.
                Defaults to ON for `essay` (a written answer in mathematics is
                usually a page of working, not a paragraph) and OFF for every
                other type. Set it explicitly either way:
                  allowPhoto: false   on an essay that must be typed
                  allowPhoto: true    on a steps question whose working matters

   placeholder  shows the SHAPE of the answer, never the answer itself:
                "(x-a)(x-b)", "a, b", "a number" — not "(x-1)(x-2)", "1, 2".
   ========================================================================== */

window.QUESTION_BANK = {

  /* ---------------------------------------------------- lesson exercises */

  'q-110': {
    type: 'mcq',
    title: 'Vertical line test',
    points: 2,
    prompt: 'Which of the following statements is true about the graph of a function?' +
      '<ol type="A">' +
      '<li>Every vertical line intersects the graph at exactly one point.</li>' +
      '<li>Every horizontal line intersects the graph at exactly one point.</li>' +
      '<li>A vertical line can intersect the graph at two points.</li>' +
      '<li>A function can have two different outputs for the same input.</li>' +
      '</ol>',
    options: ['A', 'B', 'C', 'D'],
    hashes: ['502016ae'],
    ar: 'اختر العبارة الصحيحة. افتكر إن كل قيمة لـ x ليها صورة واحدة بس.',
    explain: 'A function assigns exactly one output to each input, so no vertical line may meet the graph twice. The horizontal line test is a different test — it checks whether a function is one-to-one.',
    explainAr: 'الاختبار الرأسي بيقيس إن دي دالة أصلاً. الاختبار الأفقي حاجة تانية خالص — بيقيس إن الدالة واحد لواحد.',
    video: 'videos/u1-l1/sol-vertical-line-test.mp4'
  },

  'q-111': {
    type: 'numeric',
    title: 'Domain & range',
    points: 2,
    prompt: 'If \\( f:[1,5] \\rightarrow \\mathbb{R} \\) where \\( f(x) = x + 1 \\), write the range of \\(f\\).',
    placeholder: '[a, b]',
    inputHint: 'interval notation',
    kind: 'interval',
    hashes: ['7f503a26'],
    ar: 'اكتب المدى بصيغة الفترة. الأقواس المربعة معناها إن الطرف داخل، والأقواس العادية معناها إنه بره.',
    explain: 'The function is increasing on \\([1,5]\\), so the smallest output is \\(f(1)=2\\) and the largest is \\(f(5)=6\\). Both endpoints belong to the domain, so both belong to the range: \\([2,6]\\).',
    explainAr: 'الدالة متزايدة، فأصغر قيمة عند x=1 وأكبر قيمة عند x=5، والطرفين داخلين.',
    video: 'videos/u1-l1/sol-linear-range.mp4'
  },

  'q-112': {
    type: 'mcq',
    title: 'Piecewise function',
    points: 2,
    prompt: 'Given \\[ f(x) = \\begin{cases} 3 - x, & -2 \\le x < 2 \\\\ x, & 2 \\le x \\le 5 \\end{cases} \\] what is the range of \\(f\\)?' +
      '<ol type="A">' +
      '<li>\\([-2, 5]\\)</li><li>\\((1, 5]\\)</li><li>\\([1, 5]\\)</li><li>\\([1, 5)\\)</li>' +
      '</ol>',
    options: ['A', 'B', 'C', 'D'],
    hashes: ['961db923'],
    ar: 'خد بالك من الدائرة المفتوحة عند x = 2 — القيمة دي بتقرب منها الدالة بس ما بتوصلهاش.',
    explain: 'On \\([-2,2)\\) the first rule gives values in \\((1,5]\\) — the value \\(1\\) is approached at \\(x \\to 2^-\\) but never reached. On \\([2,5]\\) the second rule gives \\([2,5]\\). The union is \\((1,5]\\).',
    explainAr: 'القيمة 1 مش بتتحقق أبداً لأن x = 2 مش داخلة في القاعدة الأولى، عشان كده القوس مفتوح.',
    video: 'videos/u1-l1/sol-piecewise-range.mp4'
  },

  'q-113': {
    type: 'numeric',
    title: 'Domain of a rational function',
    points: 2,
    prompt: 'Find the domain of \\( f(x) = \\dfrac{x+3}{x^{2}-9} \\).',
    placeholder: 'R-{a, b}',
    inputHint: 'use R for ℝ',
    kind: 'set',                       /* order inside { } does not matter */
    hashes: ['422d3e9a'],
    ar: 'المقام ما ينفعش يساوي صفر. حل معادلة المقام واستبعد الجذور. اكتب الإجابة بالشكل R-{...}',
    explain: 'Set the denominator to zero: \\(x^{2}-9=0 \\Rightarrow x = \\pm 3\\). Both are excluded, even though \\(x=-3\\) also makes the numerator zero — the expression is still undefined there.',
    explainAr: 'ملاحظة مهمة: x = -3 بتصفّر البسط والمقام مع بعض، ورغم كده مستبعدة — الكسر غير معرّف عندها.',
    video: 'videos/u1-l1/sol-rational-domain.mp4'
  },

  'q-114': {
    type: 'numeric',
    title: 'Domain of a radical function',
    points: 2,
    prompt: 'Find the domain of \\( f(x) = \\sqrt{x-3} \\).',
    placeholder: '[a, inf)',
    inputHint: 'write inf for ∞',
    kind: 'interval',                  /* order DOES matter for an interval */
    hashes: ['d5034768'],
    ar: 'الجذر التربيعي (أُس زوجي) بيحتاج اللي تحته يكون أكبر من أو يساوي صفر.',
    explain: 'An even root needs a non-negative radicand: \\(x-3 \\ge 0 \\Rightarrow x \\ge 3\\). The endpoint is included because \\(\\sqrt{0}=0\\) is defined.',
    explainAr: 'الرقم 3 نفسه داخل، لأن الجذر التربيعي للصفر معرّف ويساوي صفر.',
    video: 'videos/u1-l1/sol-radical-domain.mp4'
  },

  /* ------------------------------------------------------------- the quiz */

  'q-120': {
    type: 'mcq', points: 1,
    prompt: 'If \\( f(x) = x^{2} \\), which of the following is true?',
    options: [
      'The graph fails the vertical line test.',
      'The graph fails the horizontal line test.',
      'The graph passes the vertical line test.',
      'The graph passes the horizontal line test.'
    ],
    hashes: ['6c28da7'],
    video: 'videos/u1-l1/quiz1.mp4'
  },

  'q-121': {
    type: 'mcq', points: 1,
    prompt: 'What is the domain of \\( f(x) = \\sqrt{x^{2} - 4} \\)?',
    options: [
      '\\( (-\\infty, -2] \\cup [2, \\infty) \\)',
      '\\( [-2, 2] \\)',
      '\\( (-\\infty, -2) \\cup (2, \\infty) \\)',
      '\\( \\mathbb{R} \\)'
    ],
    hashes: ['f7ad66'],
    video: 'videos/u1-l1/quiz2.mp4'
  },

  'q-122': {
    type: 'mcq', points: 1,
    prompt: 'For \\( f(x) = \\begin{cases} x^{2}, & x < 0 \\\\ x+1, & x \\ge 0 \\end{cases} \\), what is \\( f(0) \\)?',
    options: ['0', '2', '1', 'Undefined'],
    hashes: ['5fd3d5bd'],
    video: 'videos/u1-l1/quiz3.mp4'
  },

  'q-123': {
    type: 'mcq', points: 1,
    prompt: 'Which of the following is a real function?',
    options: [
      '\\( f(x) = \\frac{1}{x-2} \\), domain \\( \\mathbb{R} - \\{2\\} \\)',
      '\\( f(x) = \\sqrt{x} \\), domain \\( [0, \\infty) \\)',
      'Both A and B',
      'Neither A nor B'
    ],
    hashes: ['6932b84e'],
    video: 'videos/u1-l1/quiz4.mp4'
  },

  'q-124': {
    type: 'mcq', points: 1,
    prompt: 'The range of \\( f(x) = x^{2} + 1 \\) on the domain \\( [0, \\infty) \\) is:',
    options: ['\\( [0, \\infty) \\)', '\\( (-\\infty, \\infty) \\)', '\\( [1, \\infty) \\)', '\\( (1, \\infty) \\)'],
    hashes: ['4b4f34ab'],
    video: 'videos/u1-l1/quiz5.mp4'
  },

  /* -------------------------------------------------------------- homework */

  'h-201': {
    type: 'mcq', points: 2,
    prompt: 'Which graph represents a function \\( y = f(x) \\)? Use the vertical line test.',
    figure:
      '<svg viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="20" y="20" font-family="monospace" font-size="10" fill="#2F6F6B">A</text>' +
      '<line x1="10" y1="100" x2="120" y2="100" stroke="#C9CABE" stroke-width="1.5"/>' +
      '<line x1="65" y1="15" x2="65" y2="108" stroke="#C9CABE" stroke-width="1.5"/>' +
      '<path d="M 30 20 Q 65 90 100 20" fill="none" stroke="#2F6F6B" stroke-width="3" stroke-linecap="round"/>' +
      '<line x1="65" y1="12" x2="65" y2="110" stroke="#B4842A" stroke-width="1.5" stroke-dasharray="4 3"/>' +
      '<circle cx="65" cy="68" r="3.5" fill="#2F6F6B"/>' +
      '<text x="180" y="20" font-family="monospace" font-size="10" fill="#2F6F6B">B</text>' +
      '<line x1="165" y1="100" x2="290" y2="100" stroke="#C9CABE" stroke-width="1.5"/>' +
      '<line x1="230" y1="15" x2="230" y2="108" stroke="#C9CABE" stroke-width="1.5"/>' +
      '<circle cx="230" cy="55" r="38" fill="none" stroke="#AA4A32" stroke-width="3"/>' +
      '<line x1="230" y1="12" x2="230" y2="110" stroke="#B4842A" stroke-width="1.5" stroke-dasharray="4 3"/>' +
      '<circle cx="230" cy="17" r="3.5" fill="#AA4A32"/>' +
      '<circle cx="230" cy="93" r="3.5" fill="#AA4A32"/></svg>',
    options: ['A', 'B'],
    hashes: ['d8a44f5a'],
    ar: 'ارسم خط رأسي وهمي على كل رسمة وشوف بيقطعها في كام نقطة.'
  },

  'h-202': {
    type: 'mcq', points: 2,
    prompt: 'For \\( f(x) = x + 1 \\) on the interval \\([1, 5]\\), what is the range?',
    figure:
      '<svg viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg">' +
      '<line x1="20" y1="115" x2="210" y2="115" stroke="#C9CABE" stroke-width="1.5"/>' +
      '<line x1="50" y1="15" x2="50" y2="120" stroke="#C9CABE" stroke-width="1.5"/>' +
      '<line x1="50" y1="88" x2="180" y2="27" stroke="#2F6F6B" stroke-width="3" stroke-linecap="round"/>' +
      '<circle cx="50" cy="88" r="4" fill="#2F6F6B"/><circle cx="180" cy="27" r="4" fill="#2F6F6B"/>' +
      '<line x1="32" y1="88" x2="50" y2="88" stroke="#B4842A" stroke-width="1.5" stroke-dasharray="4 3"/>' +
      '<line x1="32" y1="27" x2="50" y2="27" stroke="#B4842A" stroke-width="1.5" stroke-dasharray="4 3"/>' +
      '<text x="18" y="92" font-family="monospace" font-size="11" fill="#47576B">2</text>' +
      '<text x="18" y="31" font-family="monospace" font-size="11" fill="#47576B">6</text>' +
      '<text x="45" y="128" font-family="monospace" font-size="11" fill="#47576B">1</text>' +
      '<text x="175" y="128" font-family="monospace" font-size="11" fill="#47576B">5</text></svg>',
    options: ['\\([1, 5]\\)', '\\([2, 6]\\)', '\\([1, 6]\\)', '\\([2, 5]\\)'],
    hashes: ['93424298'],
    ar: 'المدى بيتقرا من محور y، مش من محور x.'
  },

  'h-203': {
    type: 'mcq', points: 2,
    prompt: 'From the piecewise graph below, what is the range of \\( f \\)?',
    figure:
      '<svg viewBox="0 0 260 140" xmlns="http://www.w3.org/2000/svg">' +
      '<line x1="15" y1="125" x2="250" y2="125" stroke="#C9CABE" stroke-width="1.5"/>' +
      '<line x1="105" y1="12" x2="105" y2="130" stroke="#C9CABE" stroke-width="1.5"/>' +
      '<line x1="50" y1="45" x2="148" y2="113" stroke="#2F6F6B" stroke-width="3" stroke-linecap="round"/>' +
      '<line x1="148" y1="98" x2="220" y2="40" stroke="#B4842A" stroke-width="3" stroke-linecap="round"/>' +
      '<circle cx="50" cy="45" r="4.5" fill="#2F6F6B"/>' +
      '<circle cx="148" cy="113" r="4.5" fill="#fff" stroke="#2F6F6B" stroke-width="2.5"/>' +
      '<circle cx="148" cy="98" r="4.5" fill="#B4842A"/><circle cx="220" cy="40" r="4.5" fill="#B4842A"/>' +
      '<text x="42" y="38" font-family="monospace" font-size="10" fill="#47576B">-2</text>' +
      '<text x="140" y="132" font-family="monospace" font-size="10" fill="#47576B">2</text>' +
      '<text x="215" y="38" font-family="monospace" font-size="10" fill="#47576B">5</text></svg>',
    options: ['\\([-2, 5]\\)', '\\((1, 5]\\)', '\\([1, 5]\\)', '\\([1, 5)\\)'],
    hashes: ['1ec9013f'],
    ar: 'الدائرة البيضا معناها إن النقطة دي مش من ضمن الرسم.'
  },

  'h-204': {
    type: 'mcq', points: 2,
    prompt: 'For \\( f(x) = \\dfrac{x+3}{x^{2}-9} \\), which points are excluded from the domain?',
    figure:
      '<svg viewBox="0 0 260 80" xmlns="http://www.w3.org/2000/svg">' +
      '<line x1="20" y1="40" x2="250" y2="40" stroke="#C9CABE" stroke-width="1.5"/>' +
      '<circle cx="78" cy="40" r="6" fill="#fff" stroke="#AA4A32" stroke-width="2.5"/>' +
      '<circle cx="180" cy="40" r="6" fill="#fff" stroke="#AA4A32" stroke-width="2.5"/>' +
      '<text x="69" y="62" font-family="monospace" font-size="12" fill="#AA4A32">-3</text>' +
      '<text x="173" y="62" font-family="monospace" font-size="12" fill="#AA4A32">3</text>' +
      '<text x="40" y="24" font-family="monospace" font-size="11" fill="#47576B">defined</text>' +
      '<text x="110" y="24" font-family="monospace" font-size="11" fill="#47576B">defined</text>' +
      '<text x="195" y="24" font-family="monospace" font-size="11" fill="#47576B">defined</text></svg>',
    options: ['\\(\\mathbb{R}\\)', '\\(\\mathbb{R} - \\{3\\}\\)', '\\(\\mathbb{R} - \\{-3, 3\\}\\)', '\\(\\mathbb{R} - \\{-3\\}\\)'],
    hashes: ['f8a45837'],
    ar: 'حل معادلة المقام يساوي صفر، والجذور دي هي المستبعدة.'
  },

  'h-205': {
    type: 'mcq', points: 2,
    prompt: 'Which number line represents the domain of \\( f(x) = \\sqrt{x-3} \\)?',
    figure:
      '<svg viewBox="0 0 260 130" xmlns="http://www.w3.org/2000/svg">' +
      '<text x="14" y="22" font-family="monospace" font-size="11" fill="#2F6F6B">A</text>' +
      '<line x1="20" y1="40" x2="250" y2="40" stroke="#C9CABE" stroke-width="1.5"/>' +
      '<line x1="120" y1="40" x2="240" y2="40" stroke="#2F6F6B" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="120" cy="40" r="5" fill="#2F6F6B"/>' +
      '<path d="M238 35 L246 40 L238 45" fill="none" stroke="#2F6F6B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<text x="114" y="60" font-family="monospace" font-size="11" fill="#2F6F6B">3</text>' +
      '<text x="14" y="102" font-family="monospace" font-size="11" fill="#AA4A32">B</text>' +
      '<line x1="20" y1="105" x2="250" y2="105" stroke="#C9CABE" stroke-width="1.5"/>' +
      '<line x1="30" y1="105" x2="120" y2="105" stroke="#AA4A32" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="120" cy="105" r="5" fill="#fff" stroke="#AA4A32" stroke-width="2.5"/>' +
      '<text x="114" y="125" font-family="monospace" font-size="11" fill="#AA4A32">3</text></svg>',
    options: ['Graph A: \\([3, \\infty)\\)', 'Graph B: \\((-\\infty, 3)\\)'],
    hashes: ['741775f6'],
    ar: 'اسأل نفسك: أنهي قيم x بتخلي اللي تحت الجذر موجب أو يساوي صفر؟'
  },

  /* --- steps questions: these replace the old open-ended essay questions.
         Same skill, same depth, but graded automatically — and they tell you
         exactly which step the student lost the thread at.                 --- */

  'h-206': {
    type: 'steps', points: 4,
    prompt: 'Find the domain of \\( f(x) = \\dfrac{2x+3}{x^{2}-3x+2} \\).',
    ar: 'هنمشي خطوة خطوة. كل خطوة لازم تكون صح عشان اللي بعدها تتفتح.',
    steps: [
      { prompt: 'Factorise the denominator. Write it as (x-a)(x-b).',
        placeholder: '(x-a)(x-b)', hashes: ['8a46336d', '26b3ad3b'],
        ar: 'دوّر على عددين حاصل ضربهم 2 ومجموعهم -3.' },
      { prompt: 'Which values of \\(x\\) make the denominator zero? Comma separated.',
        placeholder: 'a, b', kind: 'set', hashes: ['2d06bbf1'] },
      { prompt: 'Now write the domain.',
        placeholder: 'R-{a, b}', kind: 'set', hashes: ['59f343ee'] }
    ],
    video: 'videos/u1-l1/hw-domain-rational.mp4'
  },

  'h-207': {
    type: 'steps', points: 4,
    prompt: 'Find the range of \\( f(x) = x^{2} + 1 \\) on the domain \\( [0, \\infty) \\).',
    ar: 'ابدأ بأصغر قيمة ممكنة للـ x² على الفترة دي.',
    steps: [
      { prompt: 'What is the smallest value of \\(x^{2}\\) on \\([0,\\infty)\\)?',
        placeholder: 'a number', entry: 'number', hashes: ['8843dfbc'] },
      { prompt: 'So what is the smallest value of \\(f(x)\\)?',
        placeholder: 'a number', entry: 'number', hashes: ['8943e14f'] },
      { prompt: 'Write the range in interval notation.',
        placeholder: '[a, inf)', kind: 'interval', hashes: ['f37ca2ee'],
        ar: 'اكتب inf بدل رمز اللانهاية.' }
    ],
    video: 'videos/u1-l1/hw-range-quadratic.mp4'
  },

  'h-208': {
    type: 'steps', points: 4,
    prompt: 'For \\( f(x) = \\begin{cases} x-1, & -2 \\le x < 0 \\\\ x+1, & 0 \\le x \\le 2 \\end{cases} \\), evaluate the following.',
    ar: 'قبل كل تعويض، اسأل: القيمة دي واقعة في أنهي فترة؟ ودي القاعدة اللي هتستخدمها.',
    steps: [
      { prompt: 'Find \\( f(-1) \\).', placeholder: 'a number', entry: 'number', hashes: ['8abdd61b'],
        ar: 'القيمة -1 واقعة في الفترة الأولى.' },
      { prompt: 'Find \\( f(0) \\).', placeholder: 'a number', entry: 'number', hashes: ['8943e14f'],
        ar: 'خد بالك: الصفر داخل في الفترة التانية مش الأولى.' },
      { prompt: 'Find \\( f(2) \\).', placeholder: 'a number', entry: 'number', hashes: ['8b43e475'] }
    ],
    video: 'videos/u1-l1/hw-piecewise-values.mp4'
  },

  'h-209': {
    type: 'numeric', points: 2,
    prompt: 'What is the domain of \\( f(x) = \\sqrt[3]{x-5} \\)?',
    placeholder: 'your answer',
    inputHint: 'use R for ℝ, inf for ∞',
    hashes: ['4a437e22', '88877808'],
    ar: 'الأُس الفردي مختلف عن الزوجي — فكّر ليه.'
  },

  'h-210': {
    type: 'essay', points: 4,
    prompt: 'Determine whether the relation \\( \\{(1,2), (2,3), (1,4)\\} \\) is a function, and explain your reasoning.',
    ar: 'اكتب التبرير كامل بخطواتك — السؤال ده الدكتور وسام بيصححه بنفسه ويرد عليك.'
  }
,

  /* ======================================================================
     LESSON s1-u1-l1  ·  An Introduction in Complex Numbers
     ----------------------------------------------------------------------
     REBUILT 27 Sept 2026 (second revision) as a direct, section-by-section
     transcription of the final PDF pair (Teaching Copy / Answer Key, built
     from preamble.tex + content.tex — see claude/قرارات-المشروع.md §7-§9).
     Standing rule from this point on: the PDF is the complete spec for a
     lesson; the platform is an interactive rendering of it, not an
     independent design. See the header comment in data/s1-u1-l1.js for the
     full section-by-section mapping.

     Every question below still carries a `pattern` field (P1 … P14, see
     README §1.4) so coverage stays checkable — nothing was invented to
     "fill a pattern gap" this time: every single number below is transcribed
     from content.tex, and the 14 patterns turned out to already be fully
     covered by that content on its own.

     ID ranges (all fresh — nothing here collides with anything above):
       q-150 … q-155   quiz, First question (6 MCQ)               — content.tex §6
       q-156 … q-157   quiz, Second question (short answer)        — content.tex §6
       q-160 … q-176   Worked Examples, all 17                     — content.tex §4
       q-180 … q-195   Additional Exercises, Part A (16 MCQ)        — content.tex §5
       q-200 … q-215   Additional Exercises, Part B (6 groups / 16) — content.tex §5
       h-230 … h-239   Homework (10)                                — content.tex §7
     ====================================================================== */

  /* ------------------------------------------------- quiz (q-150 … q-157) */
  /* First question: word for word, the PDF's own 6-mark, 6-item MCQ quiz —
     this is the quiz shown in the lesson video, not a paraphrase. */

  'q-150': {
    type: 'mcq', pattern: 'P1', points: 1,
    title: 'Quiz 1 — power of i',
    prompt: '\\( i^{58} = \\) .......' +
      '<ol type="A"><li>\\(1\\)</li><li>\\(-1\\)</li><li>\\(i\\)</li><li>\\(-i\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'],
    hashes: ['6fd04f5d'],
    video: 'videos/s1-u1-l1/quiz1.mp4'
  },

  'q-151': {
    type: 'mcq', pattern: 'P10', points: 1,
    title: 'Quiz 2 — the conjugate',
    prompt: 'If \\( z=2-3i \\), then \\( \\bar z = \\) .......' +
      '<ol type="A"><li>\\(2+3i\\)</li><li>\\(-2+3i\\)</li><li>\\(-2-3i\\)</li><li>\\(3-2i\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'],
    hashes: ['569afed1'],
    video: 'videos/s1-u1-l1/quiz2.mp4'
  },

  'q-152': {
    type: 'mcq', pattern: 'P8', points: 1,
    title: 'Quiz 3 — solution set in C',
    prompt: 'The solution set of \\( x^{2}+16=0 \\) in \\(\\mathbb{C}\\) is .......' +
      '<ol type="A"><li>\\(\\{4\\}\\)</li><li>\\(\\{-4,4\\}\\)</li><li>\\(\\{4i\\}\\)</li><li>\\(\\{4i,-4i\\}\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'],
    hashes: ['383300d5'],
    video: 'videos/s1-u1-l1/quiz3.mp4'
  },

  'q-153': {
    type: 'mcq', pattern: 'P7', points: 1,
    title: 'Quiz 4 — the exam-saving identity',
    prompt: '\\( (1-i)^{2} = \\) .......' +
      '<ol type="A"><li>\\(2i\\)</li><li>\\(-2i\\)</li><li>\\(2\\)</li><li>\\(-2\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'],
    hashes: ['aaac3f08'],
    video: 'videos/s1-u1-l1/quiz4.mp4'
  },

  'q-154': {
    type: 'mcq', pattern: 'P12', points: 1,
    title: 'Quiz 5 — purely imaginary',
    prompt: 'Which is a <strong>purely imaginary</strong> number? .......' +
      '<ol type="A"><li>\\(5\\)</li><li>\\(-7i\\)</li><li>\\(3+4i\\)</li><li>\\(5-2i\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'],
    hashes: ['b4375f9'],
    video: 'videos/s1-u1-l1/quiz5.mp4'
  },

  'q-155': {
    type: 'mcq', pattern: 'P9', points: 1,
    title: 'Quiz 6 — equality',
    prompt: 'If \\( x,y\\in\\mathbb{R} \\) and \\( (x-1)+(2y+3)i=0 \\), then \\( (x,y)= \\) .......' +
      '<ol type="A"><li>\\((1,-\\frac32)\\)</li><li>\\((-1,\\frac32)\\)</li><li>\\((1,\\frac32)\\)</li><li>\\((0,0)\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'],
    hashes: ['120e57cd'],
    video: 'videos/s1-u1-l1/quiz6.mp4'
  },

  'q-156': {
    type: 'numeric', pattern: 'P8', points: 2,
    kind: 'set',
    title: 'Quiz — Second question [a]',
    prompt: '(From the lesson quiz, second question, part [a]) Solve in \\(\\mathbb{C}\\): \\( x^{2}-2x+5=0 \\).',
    placeholder: 'a+bi, a-bi',
    hashes: ['b7092774'],
    ar: 'المميز هيطلع سالب — القانون العام، ثم تحويل الجذر لصورة i.',
    explain: 'Discriminant \\(=4-20=-16\\). \\(x=\\dfrac{2\\pm4i}{2}=1\\pm2i\\).',
    explainAr: 'المميز = −16، فالجذر = 4i، والحل = 1 ± 2i.',
    video: 'videos/s1-u1-l1/sol-quiz-2a.mp4'
  },

  'q-157': {
    type: 'numeric', pattern: 'P11', points: 2,
    title: 'Quiz — Second question [b]',
    prompt: '(From the lesson quiz, second question, part [b]) If \\(a,b\\in\\mathbb{R}\\) and \\( a+bi=\\dfrac{4+3i}{1-i} \\), find the value of \\( a+b \\).',
    placeholder: 'a number',
    entry: 'number',
    hashes: ['8443d970'],
    ar: 'اقسم بضرب البسط والمقام في مرافق المقام، وبعدين اجمع a و b.',
    explain: '\\(\\dfrac{4+3i}{1-i}\\times\\dfrac{1+i}{1+i}=\\dfrac{4+4i+3i+3i^{2}}{2}=\\dfrac{1+7i}{2}=\\dfrac12+\\dfrac72i\\). So \\(a+b=\\dfrac12+\\dfrac72=4\\).',
    explainAr: 'بعد القسمة a=1/2 و b=7/2، ومجموعهم 4.',
    video: 'videos/s1-u1-l1/sol-quiz-2b.mp4'
  },

  /* --------------------------------------------- Worked Examples (q-160 … q-176) */
  /* content.tex §4, all 17, in PDF order, word for word / number for number. */

  'q-160': {
    type: 'numeric', pattern: 'P8', points: 2,
    kind: 'set',
    title: 'Example 1 — Graph',
    prompt: 'Sketch \\( y=x^{2}+4 \\) for \\( x\\in[-3,3] \\). The graph never crosses the \\(x\\)-axis, so \\(x^{2}+4=0\\) has no real solution. Solve the equation in \\(\\mathbb{C}\\) instead.',
    figure:
      '<svg viewBox="0 0 220 170" xmlns="http://www.w3.org/2000/svg">' +
      '<line x1="15" y1="150" x2="205" y2="150" stroke="#C9CABE" stroke-width="1.5"/>' +
      '<line x1="110" y1="12" x2="110" y2="160" stroke="#C9CABE" stroke-width="1.5"/>' +
      '<path d="M 40 25 Q 110 195 180 25" fill="none" stroke="#2F6F6B" stroke-width="3" ' +
      'stroke-linecap="round" transform="translate(0,-8) scale(1,0.6) translate(0,55)"/>' +
      '<circle cx="110" cy="118" r="4.5" fill="#B4842A"/>' +
      '<text x="118" y="114" font-family="monospace" font-size="11" fill="#47576B">(0, 4)</text></svg>',
    placeholder: 'ai, -ai',
    hashes: ['4591b947'],
    ar: 'أدنى نقطة في المنحنى (0,4) فوق محور x، فمفيش حل حقيقي؛ في المركبات: x² = −4.',
    explain: 'The parabola\'s lowest point is \\((0,4)\\), already above the \\(x\\)-axis, and the curve never returns to it. Solving in \\(\\mathbb{C}\\): \\(x^{2}=-4\\Rightarrow x=\\pm\\sqrt{-4}=\\pm2i\\).',
    explainAr: 'x² = −4 ⇒ x = ±2i. مجموعة الحل = {2i, −2i}.',
    video: 'videos/s1-u1-l1/sol-ex1-graph.mp4'
  },

  'q-161': {
    type: 'numeric', pattern: 'P4', points: 2,
    entry: 'number',
    title: 'Example 2 — Simplify a root',
    prompt: 'Write \\( \\sqrt{-45} \\) in the simplest form \\( a\\sqrt{5}\\,i \\). Find \\(a\\).',
    placeholder: 'a number',
    hashes: ['8b43e475'],
    ar: 'حلل 45 = 9×5، وشيل الجذر التربيعي لـ 9.',
    explain: '\\(\\sqrt{-45}=\\sqrt{45}\\cdot\\sqrt{-1}=\\sqrt{9\\times5}\\cdot i=3\\sqrt5\\,i\\). So \\(a=3\\).',
    explainAr: '√-45 = √9 × √5 × i = 3√5 i، يعني a = 3.',
    video: 'videos/s1-u1-l1/sol-ex2-simplify-root.mp4'
  },

  'q-162': {
    type: 'numeric', pattern: 'P5', points: 2,
    entry: 'number',
    title: 'Example 3 — a common mistake',
    prompt: 'Find the value of \\( \\sqrt{-8}\\times\\sqrt{-2} \\).',
    placeholder: 'a number',
    hashes: ['90bddf8d'],
    ar: 'خلّي بالك — دي أشهر غلطة في الدرس كله. حوّل كل جذر لصورة i الأول، وبعدين اضرب.',
    explain: 'The rule \\(\\sqrt{a}\\sqrt{b}=\\sqrt{ab}\\) only works when \\(a,b\\ge0\\); both radicands here are negative, so multiplying first gives the wrong answer \\(\\sqrt{16}=4\\). Convert to \\(i\\)-form first: \\(\\sqrt{-8}=2\\sqrt2\\,i\\), \\(\\sqrt{-2}=\\sqrt2\\,i\\), so \\((2\\sqrt2\\,i)(\\sqrt2\\,i)=4i^{2}=-4\\).',
    explainAr: 'حوّل لـ i الأول ثم اضرب. لو ضربت تحت جذر واحد هتطلع +4 وهي غلط.',
    video: 'videos/s1-u1-l1/sol-ex3-common-mistake.mp4'
  },

  'q-163': {
    type: 'numeric', pattern: 'P1', points: 2,
    title: 'Example 4 — powers, positive and negative',
    prompt: 'Find the simplest form of \\( i^{75}+i^{-58} \\).',
    placeholder: 'a+bi',
    hashes: ['197f6f0'],
    ar: 'بسّط كل قوة لوحدها الأول (موجبة وسالبة)، وبعدين اجمع.',
    explain: '\\(75=4(18)+3\\Rightarrow i^{75}=i^{3}=-i\\). \\(58=4(14)+2\\Rightarrow i^{58}=i^{2}=-1\\Rightarrow i^{-58}=\\dfrac{1}{-1}=-1\\). Sum: \\(-i-1=-1-i\\).',
    explainAr: 'i^75 = −i، و i^(−58) = −1، فالمجموع = −1 − i.',
    video: 'videos/s1-u1-l1/sol-ex4-powers-pos-neg.mp4'
  },

  'q-164': {
    type: 'numeric', pattern: 'P3', points: 2,
    entry: 'expr',
    title: 'Example 5 — symbolic power',
    prompt: 'If \\( n \\) is a positive integer, find the simplest form of \\( i^{4n+1} \\).',
    placeholder: 'i, -1, 1 or -i',
    hashes: ['41436ff7'],
    ar: 'استخدم \\( i^{4n}=(i^4)^n=1^n=1 \\)، وبعدين اضرب في \\(i^1\\).',
    explain: '\\( i^{4n+1} = i^{4n}\\cdot i^{1} = \\left(i^{4}\\right)^{n}\\cdot i = (1)^{n}\\cdot i = i \\). So \\(i^{4n+1}=i\\) for every positive integer \\(n\\).',
    explainAr: 'الإجابة i دايمًا، مهما كانت قيمة n.',
    video: 'videos/s1-u1-l1/sol-ex5-symbolic-power.mp4'
  },

  'q-165': {
    type: 'mcq', pattern: 'P7', points: 2,
    title: 'Example 6 — the exam-saving identity',
    prompt: '\\( (1-i)^{6}=\\)' +
      '<ol type="A"><li>\\(8i\\)</li><li>\\(-8i\\)</li><li>\\(8\\)</li><li>\\(-8\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'],
    hashes: ['79cdda5e'],
    ar: 'احفظ \\((1-i)^2=-2i\\) — بعدها السؤال بيتحول لقوة صغيرة على \\(-2i\\).',
    explain: '\\( (1-i)^{2}=-2i \\Rightarrow (1-i)^{6}=\\left[(1-i)^{2}\\right]^{3}=(-2i)^{3}=-8i^{3}=-8(-i)=8i \\).',
    explainAr: '(1−i)² = −2i، فـ (1−i)⁶ = (−2i)³ = 8i.',
    video: 'videos/s1-u1-l1/sol-ex6-exam-saving-identity.mp4'
  },

  'q-166': {
    type: 'numeric', pattern: 'P9', points: 2,
    kind: 'interval',
    title: 'Example 7 — equality',
    prompt: 'Find the real numbers \\(x,y\\) satisfying: \\( (2x-1)+(3y+2)i = 5-4i \\).',
    placeholder: 'x, y',
    hashes: ['2bc75290'],
    ar: 'ساوي الحقيقي بالحقيقي والتخيلي بالتخيلي. اكتب x الأول وبعدين y.',
    explain: '\\(2x-1=5\\Rightarrow x=3\\). \\(3y+2=-4\\Rightarrow y=-2\\).',
    explainAr: 'x = 3 و y = −2.',
    video: 'videos/s1-u1-l1/sol-ex7-equality.mp4'
  },

  'q-167': {
    type: 'numeric', pattern: 'P12', points: 2,
    entry: 'number',
    title: 'Example 8 — purely imaginary',
    prompt: 'Find the real value of \\(m\\) so that \\( z = (m+4) + (2m-6)i \\) is a <strong>purely imaginary</strong> number.',
    placeholder: 'a number',
    hashes: ['90bddf8d'],
    ar: 'تخيلي بحت ← الجزء الحقيقي بصفر، والتخيلي لازم يفضل غير صفر.',
    explain: 'Purely imaginary \\(\\Rightarrow \\operatorname{Re}(z)=0\\) and \\(\\operatorname{Im}(z)\\neq0\\): \\(m+4=0\\Rightarrow m=-4\\). Check: \\(\\operatorname{Im}(z)=2(-4)-6=-14\\neq0\\) — valid.',
    explainAr: 'm = −4، وبالتأكد الجزء التخيلي = −14 ≠ 0.',
    video: 'videos/s1-u1-l1/sol-ex8-pure-imaginary.mp4'
  },

  'q-168': {
    type: 'numeric', pattern: 'P8', points: 2,
    kind: 'set',
    title: 'Example 9 — solve in C',
    prompt: 'Solve in \\(\\mathbb{C}\\): \\( x^{2}-4x+13=0 \\).',
    placeholder: 'a+bi, a-bi',
    hashes: ['cd233fa0'],
    ar: 'القانون العام، والمميز هيطلع سالب.',
    explain: 'Discriminant \\(=16-52=-36\\). \\(x=\\dfrac{4\\pm6i}{2}=2\\pm3i\\).',
    explainAr: 'المميز = −36، والحل = 2 ± 3i.',
    video: 'videos/s1-u1-l1/sol-ex9-solve-quadratic.mp4'
  },

  'q-169': {
    type: 'steps', pattern: 'P7', points: 4,
    title: 'Example 10 — sum and product',
    prompt: 'If \\( z_{1}=3-2i \\) and \\( z_{2}=-1+4i \\), find in the form \\(a+bi\\): (a) \\(z_{1}+z_{2}\\)  (b) \\(z_{1}\\cdot z_{2}\\).',
    ar: 'اجمع الحقيقي مع الحقيقي والتخيلي مع التخيلي في البند الأول، وافتح الأقواس عادي في التاني.',
    steps: [
      { prompt: 'Find \\(z_{1}+z_{2}\\) in the form \\(a+bi\\).', placeholder: 'a+bi', hashes: ['12dfe976'] },
      { prompt: 'Find \\(z_{1}\\cdot z_{2}\\) in the form \\(a+bi\\).', placeholder: 'a+bi', hashes: ['b9d846ec'],
        ar: 'افتكر تحوّل i² لـ −1 قبل ما تلمّ الحدود.' }
    ],
    video: 'videos/s1-u1-l1/sol-ex10-sum-product.mp4'
  },

  'q-170': {
    type: 'mcq', pattern: 'P10', points: 2,
    title: 'Example 11 — conjugate sum',
    prompt: 'If \\( z=4-3i \\), then \\( z+\\bar z = \\)' +
      '<ol type="A"><li>\\(8\\)</li><li>\\(-6i\\)</li><li>\\(8-6i\\)</li><li>\\(25\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'],
    hashes: ['91b9cec8'],
    ar: 'مرافق 4−3i هو 4+3i، والمجموع بيلغي الجزء التخيلي.',
    explain: '\\(\\bar z=4+3i \\Rightarrow z+\\bar z=8\\). The sum of a number and its conjugate is always \\(2a\\).',
    explainAr: 'z + z̄ = 2×4 = 8.',
    video: 'videos/s1-u1-l1/sol-ex11-conjugate-sum.mp4'
  },

  'q-171': {
    type: 'numeric', pattern: 'P14', points: 2,
    entry: 'number',
    title: 'Example 12 — find the error, Sara and Omar',
    prompt: 'Sara and Omar were asked to simplify \\( \\sqrt{-9}\\times\\sqrt{-16} \\). Sara wrote \\( \\sqrt{-9}\\times\\sqrt{-16}=\\sqrt{(-9)(-16)}=\\sqrt{144}=12 \\). Omar wrote \\( \\sqrt{-9}\\times\\sqrt{-16}=(3i)(4i)=12i^{2}=-12 \\). Which one is correct — write the correct value.',
    placeholder: 'a number',
    hashes: ['97da6a94'],
    ar: 'ساره طبّقت قاعدة الجذور من غير ما تتأكد إن الشرط بتاعها متحقق. عمر صح.',
    explain: '<strong>Omar is correct.</strong> Sara applied \\(\\sqrt{a}\\cdot\\sqrt{b}=\\sqrt{ab}\\), which only holds for \\(a,b\\ge0\\). Since both radicands here are negative, each root must first be written in \\(i\\)-form: \\(\\sqrt{-9}=3i\\), \\(\\sqrt{-16}=4i\\), then \\((3i)(4i)=12i^{2}=-12\\).',
    explainAr: 'القاعدة √a·√b=√ab بتشتغل بس لما a,b ≥ 0.',
    video: 'videos/s1-u1-l1/sol-ex12-sara-omar.mp4'
  },

  'q-172': {
    type: 'numeric', pattern: 'P10', points: 2,
    entry: 'number',
    title: 'Example 13 — a proof using the conjugate',
    prompt: 'If \\(a,b\\in\\mathbb{R}\\) and \\( a+bi=\\dfrac{3+i}{1-2i} \\), prove that \\( a^{2}+b^{2}=2 \\) — find the value of \\(a^{2}+b^{2}\\) to confirm it.',
    placeholder: 'a number',
    hashes: ['8a43e2e2'],
    ar: 'اوجد a و b الأول بضرب البسط والمقام في مرافق المقام، وبعدين عوّض.',
    explain: '\\(\\dfrac{3+i}{1-2i}\\times\\dfrac{1+2i}{1+2i}=\\dfrac{1+7i}{5}=\\dfrac15+\\dfrac75i\\). So \\(a=\\dfrac15,\\ b=\\dfrac75 \\Rightarrow a^{2}+b^{2}=\\dfrac{1}{25}+\\dfrac{49}{25}=2\\).',
    explainAr: 'بعد القسمة a=1/5 و b=7/5، وبالتعويض a²+b²=2.',
    video: 'videos/s1-u1-l1/sol-ex13-proof.mp4'
  },

  'q-173': {
    type: 'steps', pattern: 'P11', points: 4,
    title: 'Example 14 — division',
    prompt: 'Put \\( \\dfrac{5-i}{2+3i} \\) in the form \\( a+bi \\).',
    ar: 'اضرب البسط والمقام في مرافق المقام — ده بيخلي المقام عدد حقيقي.',
    steps: [
      { prompt: 'Write the conjugate of the denominator.', placeholder: 'a+bi', hashes: ['809e77f9'] },
      { prompt: 'Multiply out the numerator \\((5-i)(2-3i)\\) and write it in the form \\(a+bi\\).',
        placeholder: 'a+bi', hashes: ['2162823b'] },
      { prompt: 'What is the new denominator? It must be a real number.',
        placeholder: 'a number', entry: 'number', hashes: ['91dbf634'], ar: '(2+3i)(2−3i) = 2² + 3².' }
    ],
    video: 'videos/s1-u1-l1/sol-ex14-division.mp4'
  },

  'q-174': {
    type: 'mcq', pattern: 'P7', points: 2,
    title: 'Example 15 — which one is real',
    prompt: 'Which of the following equals a <strong>real</strong> number?' +
      '<ol type="A"><li>\\((2+i)(2-i)\\)</li><li>\\((3+2i)-(3-2i)\\)</li><li>\\(i^{5}\\)</li><li>\\(\\sqrt{-9}\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'],
    hashes: ['55311a3c'],
    ar: 'جرّب كل بند لوحده — إيه اللي جزؤه التخيلي بيطلع صفر؟',
    explain: '(a) \\(=4-i^{2}=5\\) (real, a number times its own conjugate). (b) \\(=4i\\). (c) \\(=i\\). (d) \\(=3i\\).',
    explainAr: '(أ) عدد في مرافقه، فالناتج حقيقي دايمًا = 5.',
    video: 'videos/s1-u1-l1/sol-ex15-which-is-real.mp4'
  },

  'q-175': {
    type: 'numeric', pattern: 'P7', points: 2,
    title: 'Example 16 — a challenge',
    prompt: 'Find the simplest form of \\( (1+i)^{10} \\).',
    placeholder: 'a+bi',
    hashes: ['b3304fc4'],
    ar: 'استخدم الهوية \\((1+i)^2=2i\\) بدل ما تفك القوس عشرة مرات.',
    explain: '\\( (1+i)^{2}=2i \\Rightarrow (1+i)^{10}=\\left[(1+i)^{2}\\right]^{5}=(2i)^{5}=32i^{5}=32i \\).',
    explainAr: '(1+i)² = 2i، فـ (1+i)¹⁰ = (2i)⁵ = 32i.',
    video: 'videos/s1-u1-l1/sol-ex16-challenge.mp4'
  },

  'q-176': {
    type: 'numeric', pattern: 'P13', points: 2,
    title: 'Example 17 — a real-world application',
    prompt: 'Two resistances are connected in a circuit. The current in the first is \\((6-2i)\\) amperes and in the second is \\((-1+5i)\\) amperes. If the total current is the sum of the two currents, find the total current in the form \\(a+bi\\).',
    placeholder: 'a+bi',
    hashes: ['cb9f4a68'],
    ar: 'المجموع = التيار الأول + التيار الثاني، زي أي جمع عادي.',
    explain: 'Total \\(=(6-2i)+(-1+5i)=(6-1)+(-2+5)i=5+3i\\) amperes.',
    explainAr: 'المجموع = 5+3i أمبير.',
    video: 'videos/s1-u1-l1/sol-ex17-application.mp4'
  },

  /* ------------------------------- Additional Exercises Part A (q-180 … q-195) */
  /* content.tex §5 Part A, all 16 multiple-choice items, in order. */

  'q-180': { type: 'mcq', pattern: 'P1', points: 1, title: 'Additional 1',
    prompt: '\\( i^{34}=\\)' + '<ol type="A"><li>\\(i\\)</li><li>\\(-1\\)</li><li>\\(-i\\)</li><li>\\(1\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'], hashes: ['7d35cdb4'],
    ar: '٣٤ = ٤×٨ + ٢.', explain: '\\(34=4(8)+2\\Rightarrow i^{34}=i^{2}=-1\\).', explainAr: 'الباقي 2، فالإجابة −1.',
    video: 'videos/s1-u1-l1/add-a01.mp4' },

  'q-181': { type: 'mcq', pattern: 'P1', points: 1, title: 'Additional 2',
    prompt: 'All are real <em>except</em>' + '<ol type="A"><li>\\((3+2i)+(3-2i)\\)</li><li>\\(i^{40}\\)</li><li>\\((2+i)(2-i)\\)</li><li>\\(i^{17}\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'], hashes: ['a93ed11'],
    ar: 'كل بند اتحسب لوحده والباقي اللي بيديه.', explain: '\\(17=4(4)+1\\Rightarrow i^{17}=i\\) — not real. The others reduce to \\(6,\\,1,\\,5\\), all real.', explainAr: 'الإجابة (د)، لأن i^17 = i مش عدد حقيقي.',
    video: 'videos/s1-u1-l1/add-a02.mp4' },

  'q-182': { type: 'mcq', pattern: 'P9', points: 1, title: 'Additional 3',
    prompt: 'If \\( (x{+}1)+3i=5+(y{-}2)i \\), then \\( (x,y)=\\)' + '<ol type="A"><li>\\((4,5)\\)</li><li>\\((6,1)\\)</li><li>\\((4,1)\\)</li><li>\\((6,5)\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'], hashes: ['27e758fd'],
    ar: 'ساوي الحقيقي بالحقيقي والتخيلي بالتخيلي.', explain: '\\(x+1=5\\Rightarrow x=4\\); \\(3=y-2\\Rightarrow y=5\\).', explainAr: '(x,y) = (4,5).',
    video: 'videos/s1-u1-l1/add-a03.mp4' },

  'q-183': { type: 'mcq', pattern: 'P7', points: 1, title: 'Additional 4',
    prompt: '\\( (2i)^{3}=\\)' + '<ol type="A"><li>\\(8i\\)</li><li>\\(-8i\\)</li><li>\\(8\\)</li><li>\\(-8\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'], hashes: ['2259aba9'],
    ar: '(2i)³ = 8i³.', explain: '\\(8i^{3}=8(-i)=-8i\\).', explainAr: 'الإجابة −8i.',
    video: 'videos/s1-u1-l1/add-a04.mp4' },

  'q-184': { type: 'mcq', pattern: 'P10', points: 1, title: 'Additional 5',
    prompt: 'The conjugate of \\( -3+5i \\) is' + '<ol type="A"><li>\\(3-5i\\)</li><li>\\(-3-5i\\)</li><li>\\(3+5i\\)</li><li>\\(5i-3\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'], hashes: ['c1c274b8'],
    ar: 'قلب إشارة الجزء التخيلي بس.', explain: 'Flip the sign of the imaginary part only: \\(-3-5i\\).', explainAr: 'الجزء الحقيقي زي ما هو، والتخيلي بيتقلب.',
    video: 'videos/s1-u1-l1/add-a05.mp4' },

  'q-185': { type: 'mcq', pattern: 'P10', points: 1, title: 'Additional 6',
    prompt: 'If \\( z=1+i \\), then \\( z\\bar z=\\)' + '<ol type="A"><li>\\(0\\)</li><li>\\(1\\)</li><li>\\(2\\)</li><li>\\(2i\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'], hashes: ['ce486b72'],
    ar: 'z·z̄ = a² + b².', explain: '\\(z\\bar z=a^{2}+b^{2}=1+1=2\\).', explainAr: 'الناتج = 2.',
    video: 'videos/s1-u1-l1/add-a06.mp4' },

  'q-186': { type: 'mcq', pattern: 'P8', points: 1, title: 'Additional 7',
    prompt: 'Solution set of \\( x^{2}+9=0 \\) in \\(\\mathbb{C}\\) is' + '<ol type="A"><li>\\(\\{3\\}\\)</li><li>\\(\\{-3,3\\}\\)</li><li>\\(\\{3i\\}\\)</li><li>\\(\\{3i,-3i\\}\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'], hashes: ['6973fb48'],
    ar: 'x² = −9 ⇒ x = ±3i.', explain: '\\(x^{2}=-9\\Rightarrow x=\\pm3i\\).', explainAr: 'مجموعة الحل {3i, −3i}.',
    video: 'videos/s1-u1-l1/add-a07.mp4' },

  'q-187': { type: 'mcq', pattern: 'P7', points: 1, title: 'Additional 8',
    prompt: 'Which product is real?' + '<ol type="A"><li>\\((4+i)(1+i)\\)</li><li>\\((4+i)(4-i)\\)</li><li>\\((4+i)^{2}\\)</li><li>\\((4+i)i\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'], hashes: ['86e6850d'],
    ar: 'عدد في مرافقه = حقيقي دايمًا.', explain: '(b) is a number times its own conjugate: \\(16+1=17\\).', explainAr: 'الإجابة (ب) = 17.',
    video: 'videos/s1-u1-l1/add-a08.mp4' },

  'q-188': { type: 'mcq', pattern: 'P2', points: 1, title: 'Additional 9',
    prompt: '\\( i^{-1}=\\)' + '<ol type="A"><li>\\(i\\)</li><li>\\(-i\\)</li><li>\\(1\\)</li><li>\\(-1\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'], hashes: ['53f4745c'],
    ar: '1/i × i/i = i/i² = i/−1 = −i.', explain: '\\(\\dfrac1i\\times\\dfrac{i}{i}=\\dfrac{i}{-1}=-i\\).', explainAr: 'الإجابة −i.',
    video: 'videos/s1-u1-l1/add-a09.mp4' },

  'q-189': { type: 'mcq', pattern: 'P7', points: 1, title: 'Additional 10',
    prompt: '\\( (1+i)^{4}=\\)' + '<ol type="A"><li>\\(4\\)</li><li>\\(-4\\)</li><li>\\(4i\\)</li><li>\\(-4i\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'], hashes: ['df529093'],
    ar: 'استخدم (1+i)² = 2i.', explain: '\\(\\big[(1+i)^{2}\\big]^{2}=(2i)^{2}=-4\\).', explainAr: 'الإجابة −4.',
    video: 'videos/s1-u1-l1/add-a10.mp4' },

  'q-190': { type: 'mcq', pattern: 'P9', points: 1, title: 'Additional 11',
    prompt: 'If \\( a+bi=0 \\) (\\(a,b\\in\\mathbb{R}\\)), then' + '<ol type="A"><li>\\(a=0\\) only</li><li>\\(b=0\\) only</li><li>\\(a=b=0\\)</li><li>\\(a=-b\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'], hashes: ['49076aa0'],
    ar: 'ساوي الحقيقي بالحقيقي والتخيلي بالتخيلي.', explain: 'Match real with real, imaginary with imaginary: both must be zero.', explainAr: 'الإجابة (ج): a = b = 0.',
    video: 'videos/s1-u1-l1/add-a11.mp4' },

  'q-191': { type: 'mcq', pattern: 'P1', points: 1, title: 'Additional 12',
    prompt: '\\( i^{2026}=\\)' + '<ol type="A"><li>\\(1\\)</li><li>\\(-1\\)</li><li>\\(i\\)</li><li>\\(-i\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'], hashes: ['50951b1a'],
    ar: '٢٠٢٦ = ٤×٥٠٦ + ٢.', explain: '\\(2026=4(506)+2\\Rightarrow i^{2}=-1\\).', explainAr: 'الإجابة −1.',
    video: 'videos/s1-u1-l1/add-a12.mp4' },

  'q-192': { type: 'mcq', pattern: 'P4', points: 1, title: 'Additional 13',
    prompt: '\\( \\sqrt{-64}=\\)' + '<ol type="A"><li>\\(8i\\)</li><li>\\(-8i\\)</li><li>\\(\\pm8i\\)</li><li>\\(8\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'], hashes: ['3141ac08'],
    ar: '√64 · √−1 = 8i.', explain: '\\(\\sqrt{64}\\cdot\\sqrt{-1}=8i\\).', explainAr: 'الإجابة 8i.',
    video: 'videos/s1-u1-l1/add-a13.mp4' },

  'q-193': { type: 'mcq', pattern: 'P5', points: 1, title: 'Additional 14',
    prompt: '\\( (\\sqrt{-3})(\\sqrt{-27})=\\)' + '<ol type="A"><li>\\(9\\)</li><li>\\(-9\\)</li><li>\\(9i\\)</li><li>\\(-9i\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'], hashes: ['26e2c7e4'],
    ar: 'حوّل لصورة i الأول.', explain: '\\((\\sqrt3\\,i)(3\\sqrt3\\,i)=9i^{2}=-9\\).', explainAr: 'الإجابة −9.',
    video: 'videos/s1-u1-l1/add-a14.mp4' },

  'q-194': { type: 'mcq', pattern: 'P3', points: 1, title: 'Additional 15',
    prompt: 'If \\( n \\) is a positive integer, \\( i^{4n+3}=\\)' + '<ol type="A"><li>\\(1\\)</li><li>\\(-1\\)</li><li>\\(i\\)</li><li>\\(-i\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'], hashes: ['ae944597'],
    ar: 'i^(4n) × i³ = 1 × (−i).', explain: '\\(i^{4n}\\cdot i^{3}=(1)^{n}\\cdot(-i)=-i\\).', explainAr: 'الإجابة −i مهما كانت n.',
    video: 'videos/s1-u1-l1/add-a15.mp4' },

  'q-195': { type: 'mcq', pattern: 'P8', points: 1, title: 'Additional 16 — reading a graph',
    prompt: 'From the graph of \\( y=x^{2}-4x+5 \\), the equation \\( x^{2}-4x+5=0 \\) has ....... real root(s).',
    figure:
      '<svg viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg">' +
      '<line x1="15" y1="125" x2="205" y2="125" stroke="#C9CABE" stroke-width="1.5"/>' +
      '<line x1="20" y1="12" x2="20" y2="130" stroke="#C9CABE" stroke-width="1.5"/>' +
      '<path d="M 30 115 Q 110 5 190 115" fill="none" stroke="#AA4A32" stroke-width="3" stroke-linecap="round"/>' +
      '<circle cx="110" cy="35" r="4" fill="#B4842A"/>' +
      '<text x="118" y="32" font-family="monospace" font-size="10" fill="#47576B">(2, 1)</text></svg>',
    options: ['\\(0\\)', '\\(1\\)', '\\(2\\)', 'infinitely many'],
    hashes: ['9621c3b1'],
    ar: 'من الرسم: القمة (2,1) لسه فوق محور x وما بترجعش تنزل.',
    explain: 'The vertex \\((2,1)\\) never reaches the \\(x\\)-axis, so the graph gives \\(0\\) real roots.',
    explainAr: 'الإجابة صفر — القمة (2,1) فوق محور x دايمًا.',
    video: 'videos/s1-u1-l1/add-a16.mp4' },

  /* ------------------------------- Additional Exercises Part B (q-200 … q-215) */
  /* content.tex §5 Part B, 6 groups, 16 items, in order. */

  'q-200': { type: 'numeric', pattern: 'P1', points: 1, title: 'Additional 17 — simplify (i)',
    prompt: 'Simplify to the simplest form: \\( i^{45}+i^{50} \\).', placeholder: 'a+bi', hashes: ['d9c8702'],
    explain: '\\(45=4(11)+1\\Rightarrow i^{45}=i\\); \\(50=4(12)+2\\Rightarrow i^{50}=-1\\). Sum \\(=i-1=-1+i\\).', explainAr: 'المجموع = −1 + i.',
    video: 'videos/s1-u1-l1/add-b1-1.mp4' },

  'q-201': { type: 'numeric', pattern: 'P7', points: 1, title: 'Additional 18 — simplify (ii)',
    prompt: 'Simplify to the simplest form: \\( (2-i)^{2} \\).', placeholder: 'a+bi', hashes: ['1e1dc227'],
    explain: '\\(4-4i+i^{2}=3-4i\\).', explainAr: 'الناتج = 3 − 4i.',
    video: 'videos/s1-u1-l1/add-b1-2.mp4' },

  'q-202': { type: 'numeric', pattern: 'P7', points: 1, title: 'Additional 19 — simplify (iii)',
    prompt: 'Simplify to the simplest form: \\( (1+i)^{8} \\).', placeholder: 'a number', entry: 'number', hashes: ['8edbf17b'],
    explain: '\\(\\big[(1+i)^{2}\\big]^{4}=(2i)^{4}=16i^{4}=16\\).', explainAr: 'الناتج = 16.',
    video: 'videos/s1-u1-l1/add-b1-3.mp4' },

  'q-203': { type: 'numeric', pattern: 'P1', points: 1, title: 'Additional 20 — simplify (iv)',
    prompt: 'Simplify to the simplest form: \\( 3i^{2}+5i^{3}-2i^{4} \\).', placeholder: 'a+bi', hashes: ['4a63d70b'],
    explain: '\\(3(-1)+5(-i)-2(1)=-5-5i\\).', explainAr: 'الناتج = −5 − 5i.',
    video: 'videos/s1-u1-l1/add-b1-4.mp4' },

  'q-204': { type: 'numeric', pattern: 'P11', points: 1, title: 'Additional 21 — put in a+bi (i)',
    prompt: 'Put in the form \\( a+bi \\) (give the coefficients as decimals): \\( \\dfrac{7+4i}{2i} \\).',
    placeholder: 'a+bi (decimal)', hashes: ['f6c69ed6'],
    ar: 'اضرب البسط والمقام في −i.',
    explain: '\\(\\dfrac{7+4i}{2i}\\times\\dfrac{-i}{-i}=\\dfrac{4-7i}{2}=2-3.5i\\).', explainAr: 'الناتج = 2 − 3.5i.',
    video: 'videos/s1-u1-l1/add-b2-1.mp4' },

  'q-205': { type: 'numeric', pattern: 'P11', points: 1, title: 'Additional 22 — put in a+bi (ii)',
    prompt: 'Put in the form \\( a+bi \\) (give the coefficients as decimals): \\( \\dfrac{3+2i}{1-i} \\).',
    placeholder: 'a+bi (decimal)', hashes: ['ddb0a0e0'],
    explain: '\\(\\dfrac{3+2i}{1-i}\\times\\dfrac{1+i}{1+i}=\\dfrac{1+5i}{2}=0.5+2.5i\\).', explainAr: 'الناتج = 0.5 + 2.5i.',
    video: 'videos/s1-u1-l1/add-b2-2.mp4' },

  'q-206': { type: 'numeric', pattern: 'P11', points: 1, title: 'Additional 23 — put in a+bi (iii)',
    prompt: 'Put in the form \\( a+bi \\) (give the coefficients as decimals): \\( \\dfrac{1-3i}{1+3i} \\).',
    placeholder: 'a+bi (decimal)', hashes: ['ec3443d'],
    explain: '\\(\\dfrac{(1-3i)^{2}}{10}=\\dfrac{-8-6i}{10}=-0.8-0.6i\\).', explainAr: 'الناتج = −0.8 − 0.6i.',
    video: 'videos/s1-u1-l1/add-b2-3.mp4' },

  'q-207': { type: 'numeric', pattern: 'P8', points: 1, kind: 'set', title: 'Additional 24 — solve in C (i)',
    prompt: 'Solve in \\(\\mathbb{C}\\): \\( x^{2}+25=0 \\).', placeholder: 'ai, -ai', hashes: ['6d117bd5'],
    explain: '\\(x^{2}=-25\\Rightarrow x=\\pm5i\\).', explainAr: 'الحل = ±5i.',
    video: 'videos/s1-u1-l1/add-b3-1.mp4' },

  'q-208': { type: 'numeric', pattern: 'P8', points: 1, kind: 'set', title: 'Additional 25 — solve in C (ii)',
    prompt: 'Solve in \\(\\mathbb{C}\\): \\( x^{2}-6x+10=0 \\).', placeholder: 'a+bi, a-bi', hashes: ['25219f06'],
    explain: 'Discriminant \\(=36-40=-4\\Rightarrow x=\\dfrac{6\\pm2i}{2}=3\\pm i\\).', explainAr: 'الحل = 3 ± i.',
    video: 'videos/s1-u1-l1/add-b3-2.mp4' },

  'q-209': { type: 'numeric', pattern: 'P8', points: 1, kind: 'set', title: 'Additional 26 — solve in C (iii)',
    prompt: 'Solve in \\(\\mathbb{C}\\): \\( 3x^{2}+27=0 \\).', placeholder: 'ai, -ai', hashes: ['f91db0c9'],
    explain: '\\(x^{2}=-9\\Rightarrow x=\\pm3i\\).', explainAr: 'الحل = ±3i.',
    video: 'videos/s1-u1-l1/add-b3-3.mp4' },

  'q-210': { type: 'numeric', pattern: 'P8', points: 1, kind: 'set', title: 'Additional 27 — solve in C (iv)',
    prompt: 'Solve in \\(\\mathbb{C}\\): \\( x^{2}+2x+5=0 \\).', placeholder: 'a+bi, a-bi', hashes: ['a7c09ef6'],
    explain: 'Discriminant \\(=4-20=-16\\Rightarrow x=\\dfrac{-2\\pm4i}{2}=-1\\pm2i\\).', explainAr: 'الحل = −1 ± 2i.',
    video: 'videos/s1-u1-l1/add-b3-4.mp4' },

  'q-211': { type: 'numeric', pattern: 'P9', points: 1, kind: 'interval', title: 'Additional 28 — find x, y (i)',
    prompt: 'Find the real numbers \\(x,y\\) satisfying: \\( (3x-2)+(y+4)i=7-i \\).', placeholder: 'x, y', hashes: ['32c75d95'],
    explain: '\\(3x-2=7\\Rightarrow x=3\\); \\(y+4=-1\\Rightarrow y=-5\\).', explainAr: 'x = 3، y = −5.',
    video: 'videos/s1-u1-l1/add-b4-1.mp4' },

  'q-212': { type: 'numeric', pattern: 'P9', points: 1, kind: 'interval', title: 'Additional 29 — find x, y (ii)',
    prompt: 'Find the real numbers \\(x,y\\) satisfying: \\( (x+y)+(x-y)i=6+2i \\).', placeholder: 'x, y', hashes: ['2221b12'],
    explain: '\\(x+y=6,\\ x-y=2\\Rightarrow x=4,\\,y=2\\).', explainAr: 'x = 4، y = 2.',
    video: 'videos/s1-u1-l1/add-b4-2.mp4' },

  'q-213': { type: 'numeric', pattern: 'P9', points: 1, kind: 'interval', title: 'Additional 30 — find x, y (iii)',
    prompt: 'Find the real numbers \\(x,y\\) satisfying: \\( (2+i)(x+yi)=4+7i \\).', placeholder: 'x, y', hashes: ['865d288b'],
    ar: 'افتح القوس الأول، وساوي الحقيقي بالحقيقي والتخيلي بالتخيلي.',
    explain: '\\((2+i)(x+yi)=(2x-y)+(x+2y)i=4+7i\\Rightarrow 2x-y=4,\\ x+2y=7\\Rightarrow x=3,\\,y=2\\).', explainAr: 'x = 3، y = 2.',
    video: 'videos/s1-u1-l1/add-b4-3.mp4' },

  'q-214': { type: 'numeric', pattern: 'P12', points: 1, entry: 'number', title: 'Additional 31 — purely imaginary',
    prompt: 'Find the real value of \\(k\\) so that \\( z=(2k-6)+(k+1)i \\) is a <strong>purely imaginary</strong> number.',
    placeholder: 'a number', hashes: ['8b43e475'],
    explain: '\\(2k-6=0\\Rightarrow k=3\\) (check: \\(k+1=4\\neq0\\), valid).', explainAr: 'k = 3.',
    video: 'videos/s1-u1-l1/add-b5.mp4' },

  'q-215': { type: 'numeric', pattern: 'P14', points: 2, entry: 'number', title: 'Additional 32 — find the error, Mona',
    prompt: 'Mona simplified \\( (\\sqrt{-4})(\\sqrt{-9}) \\) as \\( \\sqrt{36}=6 \\). Explain the mistake in her reasoning and find the correct value.',
    placeholder: 'a number', hashes: ['8ebddc67'],
    ar: 'نفس فخّ √a·√b=√ab لما a,b سالبين.',
    explain: 'Mona wrongly applied \\(\\sqrt{a}\\cdot\\sqrt{b}=\\sqrt{ab}\\), which needs \\(a,b\\ge0\\); both radicands here are negative, so each root must be converted to \\(i\\)-form first: \\(\\sqrt{-4}=2i\\), \\(\\sqrt{-9}=3i\\Rightarrow(2i)(3i)=6i^{2}=-6\\).',
    explainAr: 'الصح: (2i)(3i) = 6i² = −6.',
    video: 'videos/s1-u1-l1/add-b6.mp4' },

  /* -------------------------------------------------------- homework (h-230 … h-239) */
  /* content.tex §7, all 10 items, in order — auto-graded, every item here
     has a definite short answer. There is no manual/instructor-graded item
     in this PDF (see the note at the top of this section). */

  'h-230': { type: 'mcq', pattern: 'P1', points: 2, title: 'Power of i',
    prompt: '\\( i^{101} = \\) .......' + '<ol type="A"><li>\\(1\\)</li><li>\\(-1\\)</li><li>\\(i\\)</li><li>\\(-i\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'], hashes: ['48f4e9c'],
    ar: '١٠١ = ٤×٢٥ + ١، فالباقي ١.', video: 'videos/s1-u1-l1/hw-power-101.mp4' },

  'h-231': { type: 'mcq', pattern: 'P10', points: 2, title: 'Conjugate of a real number',
    prompt: 'The conjugate of the real number \\(6\\) is .......' + '<ol type="A"><li>\\(6\\)</li><li>\\(-6\\)</li><li>\\(6i\\)</li><li>\\(-6i\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'], hashes: ['ed1cce49'],
    ar: 'أي عدد حقيقي مرافقه نفسه بالظبط.', video: 'videos/s1-u1-l1/hw-conjugate-of-real.mp4' },

  'h-232': { type: 'numeric', pattern: 'P6', points: 2, title: 'Simplify — addition and subtraction',
    prompt: 'Simplify: \\( (3+2i)-(5-4i)+(1+i) \\).', placeholder: 'a+bi', hashes: ['f4e49803'],
    ar: 'خد بالك من إشارة الطرح.', video: 'videos/s1-u1-l1/hw-simplify-sum.mp4' },

  'h-233': { type: 'numeric', pattern: 'P7', points: 2, title: 'Simplify — multiplication',
    prompt: 'Simplify: \\( (2+3i)(1-2i) \\).', placeholder: 'a+bi', hashes: ['f07f0256'],
    ar: 'افتح الأقواس وحوّل i² لـ −1.', video: 'videos/s1-u1-l1/hw-simplify-product.mp4' },

  'h-234': { type: 'mcq', pattern: 'P8', points: 2, title: 'Complex-conjugate roots',
    prompt: 'Which equation has <strong>complex-conjugate</strong> roots?' + '<ol type="A"><li>\\(x^{2}-4=0\\)</li><li>\\(x^{2}-4x+4=0\\)</li><li>\\(x^{2}+4=0\\)</li><li>\\(x^{2}-4x=0\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'], hashes: ['4001de18'],
    ar: 'دوّر على المعادلة اللي مميزها سالب.', video: 'videos/s1-u1-l1/hw-conjugate-roots.mp4' },

  'h-235': { type: 'numeric', pattern: 'P8', points: 2, kind: 'set', title: 'Solve in C',
    prompt: 'Solve in \\(\\mathbb{C}\\): \\( x^{2}+6x+13=0 \\).', placeholder: 'a+bi, a-bi', hashes: ['64ebf02'],
    ar: 'القانون العام، والمميز هيطلع سالب.', video: 'videos/s1-u1-l1/hw-solve-quadratic.mp4' },

  'h-236': { type: 'numeric', pattern: 'P9', points: 2, kind: 'interval', title: 'Find x and y',
    prompt: 'Find the real \\(x,y\\) satisfying: \\( (x+2)+(y-1)i=3-5i \\).', placeholder: 'x, y', hashes: ['34b03cf8'],
    ar: 'ساوي الحقيقي بالحقيقي والتخيلي بالتخيلي.', video: 'videos/s1-u1-l1/hw-find-xy.mp4' },

  'h-237': { type: 'steps', pattern: 'P11', points: 4, title: 'Division of complex numbers',
    prompt: 'Put \\( \\dfrac{6-2i}{3+i} \\) in the form \\( a+bi \\).',
    ar: 'اضرب البسط والمقام في مرافق المقام.',
    steps: [
      { prompt: 'Write the conjugate of the denominator.', placeholder: 'a+bi', hashes: ['ab5b2433'] },
      { prompt: 'Multiply out the numerator \\((6-2i)(3-i)\\) and write it in the form \\(a+bi\\).', placeholder: 'a+bi', hashes: ['9b209fb8'] },
      { prompt: 'What is the new denominator? It must be a real number.', placeholder: 'a number', entry: 'number', hashes: ['94dbfaed'], ar: '(3+i)(3−i) = 3² + 1².' }
    ],
    video: 'videos/s1-u1-l1/hw-division-6-2.mp4' },

  'h-238': { type: 'numeric', pattern: 'P10', points: 2, entry: 'number', title: 'A number times its conjugate',
    prompt: 'If \\( z=3+4i \\), find the value of \\( z\\bar z \\) — it will be a positive real number.',
    placeholder: 'a number', hashes: ['7fde1875'],
    ar: 'z·z̄ = a² + b² دايمًا.', video: 'videos/s1-u1-l1/hw-conjugate-product.mp4' },

  'h-239': { type: 'mcq', pattern: 'P8', points: 2, title: 'Reading the graph',
    prompt: 'The graph of \\( y=x^{2}+2x+5 \\) .......' + '<ol type="A"><li>touches the \\(x\\)-axis once</li><li>crosses it twice</li><li>never meets the \\(x\\)-axis</li><li>passes through the origin</li></ol>',
    options: ['A', 'B', 'C', 'D'], hashes: ['145e247b'],
    ar: 'احسب المميز، أو لاحظ إنها نفس المعادلة اللي حليناها وطلع ليها حل مركب.', video: 'videos/s1-u1-l1/hw-graph-no-real-root.mp4' }

};

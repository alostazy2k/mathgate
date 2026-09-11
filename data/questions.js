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
     Every item below is ORIGINAL. The ministry book was read for its
     PATTERNS only — the `pattern` field on each question names which one —
     and not a single question, number or phrasing is copied from it.

     The pattern map for this lesson (see README):
       P1  positive integer power of i        P8   quadratic with imaginary roots
       P2  negative power of i                P9   equality of two complex numbers
       P3  symbolic power i^(4n+k)            P10  conjugates: sum and product
       P4  simplifying sqrt of a negative     P11  division into a+bi form
       P5  product of pure imaginaries        P12  real part / imaginary part
       P6  addition and subtraction           P13  a real-world application
       P7  multiplication of two complexes    P14  find-the-error / reasoning

     The exam this year is half multiple choice and half written, so the
     shapes are deliberate: `mcq` trains the first half, `steps` trains the
     second — a written question broken into short auto-graded steps, which
     also tells you WHICH step a student lost the thread at.
     ====================================================================== */

  /* ------------------------------------------- lesson exercises (q-13x) */

  'q-130': {
    type: 'mcq',
    pattern: 'P1',
    title: 'Powers of i',
    points: 2,
    prompt: 'Find \\( i^{58} \\) in its simplest form.' +
      '<ol type="A">' +
      '<li>\\( 1 \\)</li>' +
      '<li>\\( -1 \\)</li>' +
      '<li>\\( i \\)</li>' +
      '<li>\\( -i \\)</li>' +
      '</ol>',
    options: ['A', 'B', 'C', 'D'],
    hashes: ['d69430df'],
    ar: 'اقسم الأس على ٤ وخد الباقي. الباقي هو اللي بيحدد الإجابة.',
    explain: 'Divide the exponent by 4 and keep the remainder: \\(58 = 4(14) + 2\\), so \\(i^{58} = i^{2} = -1\\).',
    explainAr: '٥٨ = ٤×١٤ + ٢، فالباقي ٢، و i² = −1.',
    video: 'videos/s1-u1-l1/sol-power-of-i.mp4'
  },

  'q-131': {
    type: 'numeric',
    pattern: 'P4',
    title: 'Square roots of negatives',
    points: 2,
    prompt: 'Find \\( \\sqrt{-8} \\times \\sqrt{-2} \\) in its simplest form.',
    placeholder: 'a number',
    entry: 'number',
    inputHint: 'a real number',
    hashes: ['90bddf8d'],
    ar: 'خلّي بالك — دي أشهر غلطة في الدرس كله. حوّل كل جذر لصورة i الأول، وبعدين اضرب.',
    explain: 'Convert each root to \\(i\\) form FIRST: \\(\\sqrt{-8} = 2\\sqrt{2}\\,i\\) and \\(\\sqrt{-2} = \\sqrt{2}\\,i\\). Then \\( (2\\sqrt{2}\\,i)(\\sqrt{2}\\,i) = 4i^{2} = -4 \\). Multiplying under one root first would give \\(+4\\), which is wrong: the rule \\(\\sqrt{a}\\sqrt{b}=\\sqrt{ab}\\) needs at least one of \\(a,b\\) to be non-negative.',
    explainAr: 'حوّل لـ i الأول ثم اضرب. لو ضربت تحت جذر واحد هتطلع +4 وهي غلط — القاعدة دي مش شغّالة لما الاتنين سالبين.',
    video: 'videos/s1-u1-l1/sol-sqrt-negative-trap.mp4'
  },

  'q-132': {
    type: 'numeric',
    pattern: 'P7',
    title: 'Multiplying two complex numbers',
    points: 2,
    prompt: 'Write \\( (3 + 2i)(4 - 5i) \\) in the form \\( a + bi \\).',
    placeholder: 'a+bi',
    inputHint: 'the form a+bi',
    hashes: ['72ba68db'],
    ar: 'افتح الأقواس عادي، وبعدين حط i² = −1. اكتب الإجابة في صورة a+bi من غير مسافات.',
    explain: 'Expand: \\(12 - 15i + 8i - 10i^{2}\\). Since \\(i^{2} = -1\\), the last term becomes \\(+10\\), giving \\(22 - 7i\\).',
    explainAr: 'افتح الأقواس: 12 − 15i + 8i − 10i². الحد الأخير بيبقى +10، فالناتج 22 − 7i.',
    video: 'videos/s1-u1-l1/sol-multiply-complex.mp4'
  },

  'q-133': {
    type: 'steps',
    pattern: 'P8',
    title: 'A quadratic with imaginary roots',
    points: 4,
    prompt: 'Solve the equation \\( 2x^{2} + 50 = 0 \\) in the set of complex numbers.',
    ar: 'خطوة خطوة. كل خطوة صح بتفتح اللي بعدها.',
    steps: [
      { prompt: 'Move 50 to the other side. What does \\(2x^{2}\\) equal?',
        placeholder: 'a number', entry: 'number', hashes: ['11e424fe'] },
      { prompt: 'Divide both sides by 2. What does \\(x^{2}\\) equal?',
        placeholder: 'a number', entry: 'number', hashes: ['96d82a6a'] },
      { prompt: 'Take the square root of both sides. Write the two roots, separated by a comma.',
        placeholder: 'ai, -ai', kind: 'set', hashes: ['6d117bd5'],
        ar: 'اكتب الجذرين بأي ترتيب — الترتيب مش مهم هنا.' }
    ],
    video: 'videos/s1-u1-l1/sol-quadratic-imaginary-roots.mp4'
  },

  'q-134': {
    type: 'steps',
    pattern: 'P9',
    title: 'Equality of two complex numbers',
    points: 4,
    prompt: 'Find the values of \\(x\\) and \\(y\\) where \\(x, y \\in \\mathbb{R}\\), given that \\( (3x + 2y) + (x - y)i = 13 + i \\).',
    ar: 'عددان مركبان متساويان ← الجزء الحقيقي = الجزء الحقيقي، والتخيلي = التخيلي. دي معادلتين في مجهولين.',
    steps: [
      { prompt: 'Equate the real parts. What does \\(3x + 2y\\) equal?',
        placeholder: 'a number', entry: 'number', hashes: ['91dbf634'] },
      { prompt: 'Equate the imaginary parts. What does \\(x - y\\) equal?',
        placeholder: 'a number', entry: 'number', hashes: ['8943e14f'],
        ar: 'معامل i على اليمين هو 1، مش صفر.' },
      { prompt: 'Solve the two equations together. Write \\(x\\), then \\(y\\), separated by a comma.',
        placeholder: 'x, y', kind: 'interval', hashes: ['865d288b'],
        ar: 'الترتيب مهم هنا: x الأول وبعدين y.' }
    ],
    video: 'videos/s1-u1-l1/sol-equality-xy.mp4'
  },

  'q-135': {
    type: 'numeric',
    pattern: 'P6',
    title: 'Adding and subtracting',
    points: 2,
    prompt: 'Write \\( (9 - 4i) - (3 + 6i) \\) in the form \\( a + bi \\).',
    placeholder: 'a+bi',
    inputHint: 'the form a+bi',
    hashes: ['992ead8b'],
    ar: 'اطرح الأجزاء الحقيقية من بعض، والأجزاء التخيلية من بعض. خد بالك من الإشارة قدام القوس.',
    explain: 'Subtract real from real and imaginary from imaginary: \\((9-3) + (-4-6)i = 6 - 10i\\). The minus sign applies to BOTH terms in the second bracket.',
    explainAr: 'الإشارة السالبة بتتوزع على الحدّين جوه القوس التاني، مش على الأول بس.',
    video: 'videos/s1-u1-l1/sol-add-subtract.mp4'
  },

  /* -------------------------------------------------------- quiz (q-14x) */
  /* All five are multiple choice on purpose — this block is the mirror of
     the multiple-choice half of the exam. */

  'q-140': {
    type: 'mcq', pattern: 'P1', points: 2,
    title: 'Power of i',
    prompt: 'What is \\( i^{75} \\) ?' +
      '<ol type="A"><li>\\(1\\)</li><li>\\(i\\)</li><li>\\(-1\\)</li><li>\\(-i\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'],
    hashes: ['82fe7e7e'],
    video: 'videos/s1-u1-l1/quiz1.mp4'
  },

  'q-141': {
    type: 'mcq', pattern: 'P2', points: 2,
    title: 'Negative power of i',
    prompt: 'What is \\( i^{-34} \\) ?' +
      '<ol type="A"><li>\\(1\\)</li><li>\\(-1\\)</li><li>\\(i\\)</li><li>\\(-i\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'],
    hashes: ['c8539ff'],
    video: 'videos/s1-u1-l1/quiz2.mp4'
  },

  'q-142': {
    type: 'mcq', pattern: 'P3', points: 2,
    title: 'Symbolic power',
    prompt: 'If \\( n \\in \\mathbb{Z} \\), what is \\( i^{4n+7} \\) ?' +
      '<ol type="A"><li>\\(i\\)</li><li>\\(-i\\)</li><li>\\(1\\)</li><li>\\(-1\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'],
    hashes: ['abee030e'],
    video: 'videos/s1-u1-l1/quiz3.mp4'
  },

  'q-143': {
    type: 'mcq', pattern: 'P10', points: 2,
    title: 'Conjugate numbers',
    prompt: 'For the two conjugate numbers \\( a + bi \\) and \\( a - bi \\), where \\(a, b \\in \\mathbb{R}\\) and \\(b \\neq 0\\), which of the following is always a real number?' +
      '<ol type="A"><li>their difference</li><li>their sum only</li><li>their product only</li>' +
      '<li>both their sum and their product</li></ol>',
    options: ['A', 'B', 'C', 'D'],
    hashes: ['c5608687'],
    video: 'videos/s1-u1-l1/quiz4.mp4'
  },

  'q-144': {
    type: 'mcq', pattern: 'P12', points: 2,
    title: 'Pure imaginary',
    prompt: 'For which value of \\(k\\) is the number \\( z = (k - 3) + 5i \\) a pure imaginary number?' +
      '<ol type="A"><li>\\(k = -3\\)</li><li>\\(k = 3\\)</li><li>\\(k = 5\\)</li><li>\\(k = -5\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'],
    hashes: ['3daf08d4'],
    video: 'videos/s1-u1-l1/quiz5.mp4'
  },

  /* ------------------------------------------- homework · part A (h-22x) */
  /* Auto-graded, multiple choice and short answers — the exam's first half. */

  'h-220': {
    type: 'mcq', pattern: 'P2', points: 2,
    title: 'Negative power',
    prompt: 'Find \\( i^{-27} \\) in its simplest form.' +
      '<ol type="A"><li>\\(i\\)</li><li>\\(-i\\)</li><li>\\(1\\)</li><li>\\(-1\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'],
    hashes: ['8d172663'],
    ar: 'اوجد i^27 الأول، وبعدين خد المقلوب.',
    video: 'videos/s1-u1-l1/hw-negative-power.mp4'
  },

  'h-221': {
    type: 'mcq', pattern: 'P3', points: 2,
    title: 'Symbolic power',
    prompt: 'If \\( n \\in \\mathbb{Z} \\), then \\( i^{4n+22} = \\) ?' +
      '<ol type="A"><li>\\(1\\)</li><li>\\(-1\\)</li><li>\\(i\\)</li><li>\\(-i\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'],
    hashes: ['b79d4c57'],
    ar: 'حوّل 4n+22 لصورة 4m + باقي، والباقي أصغر من 4.',
    video: 'videos/s1-u1-l1/hw-symbolic-power.mp4'
  },

  'h-222': {
    type: 'numeric', pattern: 'P5', points: 2,
    title: 'Product of pure imaginaries',
    prompt: 'Find \\( (-3i)(5i) \\) in its simplest form.',
    placeholder: 'a number', entry: 'number',
    hashes: ['8fdbf30e'],
    ar: 'اضرب المعاملات، وبعدين حط i² = −1. الناتج عدد حقيقي.',
    video: 'videos/s1-u1-l1/hw-imaginary-product.mp4'
  },

  'h-223': {
    type: 'numeric', pattern: 'P10', points: 2,
    title: 'Product of conjugates',
    prompt: 'Find the product of \\( 7 - 2i \\) and its conjugate.',
    placeholder: 'a number', entry: 'number',
    hashes: ['f9d20c90'],
    ar: 'مرافق a − bi هو a + bi، وحاصل ضربهم دايماً a² + b².',
    video: 'videos/s1-u1-l1/hw-conjugate-product.mp4'
  },

  'h-224': {
    type: 'mcq', pattern: 'P12', points: 2,
    title: 'Pure real',
    prompt: 'The number \\( z = (2m + 6) + (m - 4)i \\) is a pure real number when:' +
      '<ol type="A"><li>\\(m = -3\\)</li><li>\\(m = 4\\)</li><li>\\(m = -4\\)</li><li>\\(m = 3\\)</li></ol>',
    options: ['A', 'B', 'C', 'D'],
    hashes: ['c789b44c'],
    ar: 'عدد حقيقي بحت معناه الجزء التخيلي بصفر.',
    video: 'videos/s1-u1-l1/hw-pure-real.mp4'
  },

  /* ------------------------------------------- homework · part B (h-22x) */
  /* Written questions, broken into auto-graded steps — the exam's second
     half, plus one question Dr Wessam marks himself. */

  'h-225': {
    type: 'steps', pattern: 'P7', points: 4,
    title: 'Squaring a complex number',
    prompt: 'Write \\( (4 + 3i)^{2} \\) in the form \\( a + bi \\).',
    ar: 'استخدم (a+b)² = a² + 2ab + b². خد بالك من i² في الحد الأخير.',
    steps: [
      { prompt: 'What is the value of \\( (3i)^{2} \\) ?',
        placeholder: 'a number', entry: 'number', hashes: ['83bdcb16'] },
      { prompt: 'What is the coefficient of \\(i\\) in the middle term \\(2 \\times 4 \\times 3i\\) ?',
        placeholder: 'a number', entry: 'number', hashes: ['7ede16e2'] },
      { prompt: 'Now write the whole answer in the form \\(a + bi\\).',
        placeholder: 'a+bi', hashes: ['2bc28623'] }
    ],
    video: 'videos/s1-u1-l1/hw-square-complex.mp4'
  },

  'h-226': {
    type: 'steps', pattern: 'P9', points: 4,
    title: 'Equality of two complex numbers',
    prompt: 'Find \\(x\\) and \\(y\\), where \\(x, y \\in \\mathbb{R}\\), given that \\( (2x - y) + (x + 3y)i = 7 + 7i \\).',
    ar: 'ساوي الحقيقي بالحقيقي والتخيلي بالتخيلي، وبعدين حل المعادلتين مع بعض.',
    steps: [
      { prompt: 'Equating the real parts: \\(2x - y = \\) ?',
        placeholder: 'a number', entry: 'number', hashes: ['8743de29'] },
      { prompt: 'Equating the imaginary parts: \\(x + 3y = \\) ?',
        placeholder: 'a number', entry: 'number', hashes: ['8743de29'] },
      { prompt: 'Solve the two equations together. Write \\(x\\), then \\(y\\), separated by a comma.',
        placeholder: 'x, y', kind: 'interval', hashes: ['122197f'],
        ar: 'الترتيب مهم: x الأول.' }
    ],
    video: 'videos/s1-u1-l1/hw-equality-system.mp4'
  },

  'h-227': {
    type: 'steps', pattern: 'P11', points: 4,
    title: 'Division of complex numbers',
    prompt: 'Write \\( \\dfrac{5 + i}{2 - 3i} \\) in the form \\( a + bi \\).',
    ar: 'اضرب البسط والمقام في مرافق المقام — ده بيخلي المقام عدد حقيقي.',
    steps: [
      { prompt: 'Write the conjugate of the denominator — the number you multiply by.',
        placeholder: 'a+bi', hashes: ['eedd7233'] },
      { prompt: 'Multiply out the numerator \\((5+i)(2+3i)\\) and write it in the form \\(a+bi\\).',
        placeholder: 'a+bi', hashes: ['5e79985d'] },
      { prompt: 'What is the new denominator? It must be a real number.',
        placeholder: 'a number', entry: 'number', hashes: ['91dbf634'],
        ar: '(2 − 3i)(2 + 3i) = 2² + 3².' }
    ],
    video: 'videos/s1-u1-l1/hw-division.mp4'
  },

  'h-229': {
    type: 'steps', pattern: 'P13', points: 4,
    title: 'Complex numbers in an electric circuit',
    prompt: 'In an alternating-current circuit the voltage is \\( V = I \\times Z \\), where \\(I\\) is the current ' +
      'and \\(Z\\) is the impedance, both measured as complex numbers. ' +
      'A circuit carries a current \\( I = 3 + 2i \\) amperes through an impedance \\( Z = 4 - i \\) ohms. ' +
      'Find the voltage \\(V\\) in the form \\( a + bi \\).',
    ar: 'ده مش سؤال نظري — الأعداد المركبة بتستخدم فعلاً في هندسة الكهرباء. اضرب زي أي عددين مركبين.',
    steps: [
      { prompt: 'Multiply the two real parts: \\( 3 \\times 4 = \\) ?',
        placeholder: 'a number', entry: 'number', hashes: ['92dbf7c7'] },
      { prompt: 'The product \\( (2i)(-i) \\) contains \\(i^{2}\\). After using \\(i^{2} = -1\\), what real number does it become?',
        placeholder: 'a number', entry: 'number', hashes: ['8a43e2e2'],
        ar: '(2i)(−i) = −2i² = +2.' },
      { prompt: 'Write the total voltage \\(V\\) in the form \\(a + bi\\).',
        placeholder: 'a+bi', hashes: ['b0ea9828'] }
    ],
    video: 'videos/s1-u1-l1/hw-circuit.mp4'
  },

  'h-228': {
    type: 'essay', pattern: 'P14', points: 4,
    title: 'Find the error',
    prompt: 'Two students were asked to simplify \\( \\sqrt{-4} \\times \\sqrt{-9} \\).' +
      '<br><br><strong>Student A wrote:</strong> \\( \\sqrt{-4} \\times \\sqrt{-9} = \\sqrt{(-4)(-9)} = \\sqrt{36} = 6 \\)' +
      '<br><strong>Student B wrote:</strong> \\( \\sqrt{-4} \\times \\sqrt{-9} = (2i)(3i) = 6i^{2} = -6 \\)' +
      '<br><br>Which student is correct? Explain the error in the other solution, and state the condition ' +
      'under which the rule \\( \\sqrt{a} \\times \\sqrt{b} = \\sqrt{ab} \\) is valid.',
    ar: 'اكتب تبريرك كامل. السؤال ده الدكتور وسام بيصححه بنفسه ويرد عليك — مش بيتصحّح آلياً.'
  }

};

/* ==========================================================================
   LESSON DATA  ·  data/u1-l1.js
   --------------------------------------------------------------------------
   This is the ONLY file you write for a new lesson.
   lesson.html and homework.html never change; theme.css and engine.js
   never change. Copy this file, change the content, done.

   Language rule used throughout:
     English  → all mathematics, definitions, statements, options
     Arabic   → instructions, guidance, hints, short clarifying sentences
                (always inside an `ar` / `ar:{}` field so the engine styles it)
   ========================================================================== */

window.LESSON = {

  id: 'u1-l1',
  author: 'Dr. Wessam Gouda',
  unit: 1,
  unitTitle: 'Functions',
  unitLessons: 8,
  lessonIndex: 1,
  lessonNo: '1–1',

  title: 'Real Functions',
  lede: 'Domain, range, piecewise rules, and the test that tells you whether a curve is a function at all.',

  goal: {
    en: 'By the end of this lesson you can decide whether a graph is a function, read domain and range straight off a graph, and find the domain of any rational or radical function.',
    ar: 'بعد الدرس ده هتقدر تحدد إذا كان الرسم يمثل دالة ولا لأ، وتقرا المجال والمدى من الرسم مباشرة، وتوجد مجال أي دالة كسرية أو جذرية.'
  },

  /* the progression rule, stated at the top of the lesson — not sprung at the end */
  gateNoticeAr:
    'الدرس التالي بيفتح بعد ما تسلّم واجب الدرس ده. ' +
    'مش شرط كل إجاباتك تكون صح — المهم إنك تحاول وتسلّم. ' +
    'لو ذاكرت الدرس وحاسس إنك فاهمه، سلّم الواجب على طول وكمّل.',

  /* the shorter version, shown next to the locked button */
  gateAr: 'الدرس التالي مقفول لحد ما تسلّم الواجب. سلّم الأول وهيفتح فوراً.',

  homeworkHref: 'homework.html',
  lessonHref: 'lesson.html',

  art:
    '<svg viewBox="0 0 260 200" xmlns="http://www.w3.org/2000/svg">' +
    '<line x1="20" y1="170" x2="240" y2="170" stroke="#C9CABE" stroke-width="1.5"/>' +
    '<line x1="40" y1="10" x2="40" y2="190" stroke="#C9CABE" stroke-width="1.5"/>' +
    '<path d="M 55 165 Q 130 20 205 165" fill="none" stroke="#2F6F6B" stroke-width="3" stroke-linecap="round"/>' +
    '<line x1="150" y1="20" x2="150" y2="185" stroke="#AA4A32" stroke-width="2" stroke-dasharray="5 5"/>' +
    '<circle cx="150" cy="60" r="5" fill="#B4842A"/>' +
    '<text x="158" y="35" font-family="monospace" font-size="11" fill="#47576B">one point only</text></svg>',

  /* --------------------------------------------------------------- video */
  video: {
    intro: {
      en: 'Watch the segments in order. Each one ends where the next begins.',
      ar: 'المقاطع مرتبة. اتفرج على المقطع كامل قبل ما تنتقل للي بعده، وبعد ما تخلص كلهم ابدأ التمارين.'
    },
    segments: [
      {
        title: 'What is a real function?',
        src: 'videos/u1-l1/seg1-definition.mp4',
        caption: 'Definition of a real function, and why almost everything this year is one.',
        ar: 'المقطع ده بيعرّف الدالة الحقيقية ويوضح الفرق بينها وبين العلاقة العادية.'
      },
      {
        title: 'The vertical line test',
        src: 'videos/u1-l1/seg2-vertical-line-test.mp4',
        caption: 'How to decide from a picture whether a curve is a function.',
        ar: 'أهم مقطع في الدرس — الاختبار الرأسي هو أسرع طريقة تعرف بيها إن الرسم دالة ولا لأ.'
      },
      {
        title: 'Domain and range',
        src: 'videos/u1-l1/seg3-domain-range.mp4',
        caption: 'Reading the domain off the x-axis and the range off the y-axis.',
        ar: 'المجال من محور x، والمدى من محور y. المقطع فيه أمثلة على الاتنين.'
      },
      {
        title: 'Piecewise functions',
        src: 'videos/u1-l1/seg4-piecewise.mp4',
        caption: 'Drawing each rule on its own interval — filled and open endpoints.',
        ar: 'ركّز جداً على الفرق بين الدائرة المقفولة والدائرة المفتوحة، ده أكتر مكان الطلبة بتغلط فيه.'
      },
      {
        title: 'Domain of algebraic functions',
        src: 'videos/u1-l1/seg5-algebraic-domain.mp4',
        caption: 'Zero denominators and negative radicands — the two things that break a rule.',
        ar: 'قاعدتين بس: المقام ما يساويش صفر، واللي تحت الجذر الزوجي ما يكونش سالب.'
      }
    ]
  },

  /* -------------------------------------------------------------- theory */
  sections: [
    {
      num: '§1',
      title: 'What is a real function?',
      subs: [
        {
          kicker: '1.1 Definition',
          title: 'Real functions',
          lede: 'A <strong>real function</strong> is a function whose domain and co-domain are the set of real numbers \\(\\mathbb{R}\\), or a subset of it — written \\( f: D \\rightarrow \\mathbb{R} \\). Almost every function you will meet this year, from straight lines to square roots, is a real function.',
          ar: {
            label: 'ببساطة',
            text: 'الدالة الحقيقية هي دالة مدخلاتها ومخرجاتها أعداد حقيقية. يعني تقريباً كل الدوال اللي هتقابلها السنة دي.'
          }
        },

        {
          kicker: '1.2 Learn',
          title: 'The vertical line test',
          lede: 'If a vertical line drawn through every element of the domain crosses the curve at <strong>only one point</strong>, the relation is a function from \\(X \\rightarrow Y\\). If some vertical line crosses it more than once, it is not.',
          ar: {
            label: 'القاعدة في سطر',
            text: 'خط رأسي واحد يقطع الرسم في نقطة واحدة ← دالة. يقطعه في أكتر من نقطة ← مش دالة.',
            tone: 'tip'
          },
          figures: [
            {
              svg: '<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">' +
                '<line x1="15" y1="130" x2="190" y2="130" stroke="#C9CABE" stroke-width="1.5"/>' +
                '<line x1="30" y1="10" x2="30" y2="140" stroke="#C9CABE" stroke-width="1.5"/>' +
                '<path d="M 35 20 Q 100 130 165 20" fill="none" stroke="#2F6F6B" stroke-width="3" stroke-linecap="round"/>' +
                '<line x1="100" y1="12" x2="100" y2="140" stroke="#B4842A" stroke-width="2" stroke-dasharray="5 4"/>' +
                '<circle cx="100" cy="119" r="4.5" fill="#2F6F6B"/></svg>',
              label: 'Every vertical line meets the curve once', verdict: 'yes'
            },
            {
              svg: '<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">' +
                '<line x1="15" y1="130" x2="190" y2="130" stroke="#C9CABE" stroke-width="1.5"/>' +
                '<line x1="30" y1="10" x2="30" y2="140" stroke="#C9CABE" stroke-width="1.5"/>' +
                '<circle cx="105" cy="72" r="42" fill="none" stroke="#AA4A32" stroke-width="3"/>' +
                '<line x1="105" y1="12" x2="105" y2="140" stroke="#B4842A" stroke-width="2" stroke-dasharray="5 4"/>' +
                '<circle cx="105" cy="30" r="4.5" fill="#AA4A32"/>' +
                '<circle cx="105" cy="114" r="4.5" fill="#AA4A32"/></svg>',
              label: 'This vertical line meets the curve twice', verdict: 'no'
            }
          ],
          worked: [
            {
              prompt: 'Which of these graphs represent \\(y\\) as a function of \\(x\\)?',
              figures: [
                { svg: '<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">' +
                    '<line x1="10" y1="105" x2="150" y2="105" stroke="#C9CABE" stroke-width="1.2"/>' +
                    '<line x1="80" y1="8" x2="80" y2="112" stroke="#C9CABE" stroke-width="1.2"/>' +
                    '<path d="M 25 20 Q 80 108 135 20" fill="none" stroke="#2F6F6B" stroke-width="2.5" stroke-linecap="round"/></svg>',
                  label: 'Figure 1', verdict: 'yes' },
                { svg: '<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">' +
                    '<line x1="10" y1="105" x2="150" y2="105" stroke="#C9CABE" stroke-width="1.2"/>' +
                    '<line x1="80" y1="8" x2="80" y2="112" stroke="#C9CABE" stroke-width="1.2"/>' +
                    '<circle cx="80" cy="60" r="40" fill="none" stroke="#AA4A32" stroke-width="2.5"/></svg>',
                  label: 'Figure 2', verdict: 'no' },
                { svg: '<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">' +
                    '<line x1="10" y1="105" x2="150" y2="105" stroke="#C9CABE" stroke-width="1.2"/>' +
                    '<line x1="80" y1="8" x2="80" y2="112" stroke="#C9CABE" stroke-width="1.2"/>' +
                    '<path d="M 25 20 Q 45 20 65 50 T 135 100" fill="none" stroke="#2F6F6B" stroke-width="2.5" stroke-linecap="round"/></svg>',
                  label: 'Figure 3', verdict: 'yes' },
                { svg: '<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">' +
                    '<line x1="10" y1="105" x2="150" y2="105" stroke="#C9CABE" stroke-width="1.2"/>' +
                    '<line x1="80" y1="8" x2="80" y2="112" stroke="#C9CABE" stroke-width="1.2"/>' +
                    '<path d="M 40 15 Q 130 60 40 105" fill="none" stroke="#AA4A32" stroke-width="2.5" stroke-linecap="round"/></svg>',
                  label: 'Figure 4', verdict: 'no' }
              ],
              solution: '<p>Figures 1 and 3 represent functions — any vertical line meets each curve at exactly one point. Figures 2 and 4 fail the test: a vertical line through the middle of the circle, or through the sideways curve, crosses it twice.</p>',
              ar: 'رقم 2 و 4 مش دوال، لأن في خط رأسي بيقطعهم في نقطتين.'
            }
          ]
        },

        {
          kicker: '1.3 Learn',
          title: 'Domain and range',
          lede: '<strong>Domain:</strong> every \\(x\\)-value that has an image under \\(f\\). <strong>Range:</strong> every resulting \\(y\\)-value. On a graph, read the domain off the horizontal axis and the range off the vertical axis.',
          ar: {
            label: 'اختصار مفيد',
            text: 'المجال = محور x. المدى = محور y. لو حفظت السطر ده مش هتتلخبط تاني بينهم.',
            tone: 'tip'
          },
          worked: [
            {
              prompt: 'If \\( f:[1,5] \\rightarrow \\mathbb{R} \\) where \\( f(x) = x + 1 \\), graph \\(f\\) and deduce its range.',
              grid: {
                text: '<p>\\(f\\) is a linear function on \\([1,5]\\), so its graph is the line segment joining \\((1, f(1))\\) and \\((5, f(5))\\) — the points \\((1,2)\\) and \\((5,6)\\).</p>',
                figure: {
                  svg: '<svg viewBox="0 0 220 190" xmlns="http://www.w3.org/2000/svg">' +
                    '<line x1="18" y1="170" x2="205" y2="170" stroke="#C9CABE" stroke-width="1.5"/>' +
                    '<line x1="30" y1="10" x2="30" y2="180" stroke="#C9CABE" stroke-width="1.5"/>' +
                    '<line x1="58" y1="126" x2="30" y2="126" stroke="#B4842A" stroke-width="1.5" stroke-dasharray="4 3"/>' +
                    '<line x1="170" y1="38" x2="30" y2="38" stroke="#B4842A" stroke-width="1.5" stroke-dasharray="4 3"/>' +
                    '<line x1="58" y1="126" x2="58" y2="170" stroke="#B4842A" stroke-width="1.5" stroke-dasharray="4 3"/>' +
                    '<line x1="170" y1="38" x2="170" y2="170" stroke="#B4842A" stroke-width="1.5" stroke-dasharray="4 3"/>' +
                    '<line x1="58" y1="126" x2="170" y2="38" stroke="#2F6F6B" stroke-width="3" stroke-linecap="round"/>' +
                    '<circle cx="58" cy="126" r="4.5" fill="#2F6F6B"/><circle cx="170" cy="38" r="4.5" fill="#2F6F6B"/>' +
                    '<text x="10" y="130" font-family="monospace" font-size="10" fill="#47576B">2</text>' +
                    '<text x="10" y="42" font-family="monospace" font-size="10" fill="#47576B">6</text>' +
                    '<text x="53" y="184" font-family="monospace" font-size="10" fill="#47576B">1</text>' +
                    '<text x="165" y="184" font-family="monospace" font-size="10" fill="#47576B">5</text></svg>',
                  caption: 'Range \\([2,6]\\) read off the \\(y\\)-axis; domain \\([1,5]\\) off the \\(x\\)-axis.'
                }
              },
              result: 'Domain of \\(f\\) = \\([1, 5]\\) &nbsp;·&nbsp; <strong>Range of \\(f\\) = \\([2, 6]\\)</strong> — read straight off the \\(y\\)-axis.'
            }
          ]
        },

        {
          kicker: '1.4 Learn',
          title: 'Piecewise-defined functions',
          lede: 'A piecewise function is a real function where each subset of the domain has its own rule. To graph one, draw each piece over its own interval — with a filled dot where an endpoint is included, and an open circle where it is not.',
          ar: {
            label: 'تحذير',
            text: 'الدائرة المقفولة معناها القيمة داخلة، والدائرة المفتوحة معناها القيمة مش داخلة. الفرق ده هو اللي بيحدد شكل القوس في المدى.',
            tone: 'warn'
          },
          worked: [
            {
              prompt: 'Graph \\( f(x) = \\begin{cases} 3 - x, & -2 \\le x < 2 \\\\ x, & 2 \\le x \\le 5 \\end{cases} \\) and deduce its domain and range.',
              grid: {
                reverse: true,
                text: '<p>The first rule \\(f_1(x) = 3-x\\) covers \\([-2, 2)\\): a segment from \\((-2,5)\\) to an <em>open</em> circle at \\((2,1)\\), since \\(2 \\notin [-2,2)\\).</p>' +
                      '<p>The second rule \\(f_2(x) = x\\) covers \\([2,5]\\): a segment from a <em>closed</em> dot at \\((2,2)\\) to \\((5,5)\\).</p>',
                figure: {
                  svg: '<svg viewBox="0 0 240 190" xmlns="http://www.w3.org/2000/svg">' +
                    '<line x1="20" y1="170" x2="230" y2="170" stroke="#C9CABE" stroke-width="1.5"/>' +
                    '<line x1="104" y1="15" x2="104" y2="180" stroke="#C9CABE" stroke-width="1.5"/>' +
                    '<line x1="60" y1="60" x2="148" y2="148" stroke="#2F6F6B" stroke-width="3" stroke-linecap="round"/>' +
                    '<line x1="148" y1="126" x2="214" y2="60" stroke="#B4842A" stroke-width="3" stroke-linecap="round"/>' +
                    '<circle cx="60" cy="60" r="5" fill="#2F6F6B"/>' +
                    '<circle cx="148" cy="148" r="5" fill="#fff" stroke="#2F6F6B" stroke-width="2.5"/>' +
                    '<circle cx="148" cy="126" r="5" fill="#B4842A"/><circle cx="214" cy="60" r="5" fill="#B4842A"/>' +
                    '<text x="50" y="52" font-family="monospace" font-size="10" fill="#47576B">-2</text>' +
                    '<text x="140" y="165" font-family="monospace" font-size="10" fill="#47576B">2</text>' +
                    '<text x="208" y="52" font-family="monospace" font-size="10" fill="#47576B">5</text></svg>',
                  caption: '\\(3-x\\) in teal on \\([-2,2)\\), open at \\(x=2\\); \\(x\\) in gold on \\([2,5]\\), closed at both ends.'
                }
              },
              result: 'Domain of \\(f\\) = \\([-2, 5]\\) &nbsp;·&nbsp; <strong>Range of \\(f\\) = \\((1, 5]\\)</strong> — the value \\(1\\) is approached but never reached.'
            }
          ]
        },

        {
          kicker: '1.5 Learn',
          title: 'Domain of algebraic functions',
          lede: 'For rational and radical functions, the domain is restricted by what makes the rule undefined: a zero denominator, or a negative number under an even root.',
          ar: {
            label: 'القاعدتين',
            text: 'واحد: المقام ما يساويش صفر. اتنين: اللي تحت الجذر الزوجي أكبر من أو يساوي صفر. مفيش قاعدة تالتة في الدرس ده.',
            tone: 'tip'
          },
          worked: [
            {
              prompt: 'Find the domain of \\( f(x) = \\dfrac{x+3}{x^{2}-9} \\).',
              grid: {
                text: '<p>The denominator must not be zero: \\(x^{2} - 9 = 0 \\Rightarrow x = \\pm 3\\). Both values are excluded.</p>',
                figure: {
                  svg: '<svg viewBox="0 0 220 90" xmlns="http://www.w3.org/2000/svg">' +
                    '<line x1="15" y1="45" x2="205" y2="45" stroke="#C9CABE" stroke-width="1.5"/>' +
                    '<circle cx="65" cy="45" r="5" fill="#fff" stroke="#AA4A32" stroke-width="2.5"/>' +
                    '<circle cx="155" cy="45" r="5" fill="#fff" stroke="#AA4A32" stroke-width="2.5"/>' +
                    '<text x="59" y="66" font-family="monospace" font-size="11" fill="#AA4A32">-3</text>' +
                    '<text x="150" y="66" font-family="monospace" font-size="11" fill="#AA4A32">3</text>' +
                    '<text x="28" y="28" font-family="monospace" font-size="10" fill="#47576B">defined</text>' +
                    '<text x="93" y="28" font-family="monospace" font-size="10" fill="#47576B">defined</text>' +
                    '<text x="168" y="28" font-family="monospace" font-size="10" fill="#47576B">defined</text></svg>',
                  caption: 'Open circles mark the two excluded points.'
                }
              },
              result: '<strong>Domain = \\(\\mathbb{R} - \\{-3, 3\\}\\)</strong>'
            },
            {
              prompt: 'Find the domain of \\( f(x) = \\sqrt{x-3} \\).',
              grid: {
                text: '<p>The radicand must be non-negative: \\(x - 3 \\ge 0 \\Rightarrow x \\ge 3\\).</p>',
                figure: {
                  svg: '<svg viewBox="0 0 220 90" xmlns="http://www.w3.org/2000/svg">' +
                    '<line x1="15" y1="45" x2="205" y2="45" stroke="#C9CABE" stroke-width="1.5"/>' +
                    '<line x1="115" y1="45" x2="200" y2="45" stroke="#2F6F6B" stroke-width="4" stroke-linecap="round"/>' +
                    '<circle cx="115" cy="45" r="5" fill="#2F6F6B"/>' +
                    '<path d="M198 40 L206 45 L198 50" fill="none" stroke="#2F6F6B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
                    '<text x="109" y="66" font-family="monospace" font-size="11" fill="#234F4C">3</text></svg>',
                  caption: 'Closed at \\(3\\), the domain extends to \\(+\\infty\\).'
                }
              },
              result: '<strong>Domain = \\([3, \\infty)\\)</strong>'
            }
          ],
          notice: '<strong>Notice —</strong> if \\( f(x) = \\sqrt[n]{g(x)} \\) with \\(g\\) a polynomial: when \\(n\\) is <strong>odd</strong>, the domain of \\(f\\) is \\(\\mathbb{R}\\); when \\(n\\) is <strong>even</strong>, the domain is every \\(x\\) with \\(g(x) \\ge 0\\).'
        }
      ],

      /* The highest-value block on the page, and the one no competitor has. */
      mistakes: [
        { en: 'Confusing the two line tests. The <strong>vertical</strong> line test decides whether it is a function at all; the horizontal one decides whether it is one-to-one.',
          ar: 'الاختبار الرأسي بيحدد إن دي دالة. الأفقي بيحدد إنها واحد لواحد. حاجتين مختلفتين.' },
        { en: 'Cancelling before excluding. In \\( \\frac{x+3}{x^{2}-9} \\) the factor \\(x+3\\) cancels, but \\(x=-3\\) is <strong>still</strong> excluded from the domain.',
          ar: 'أشهر غلطة في الامتحان: الطالب يختصر الكسر الأول وينسى يستبعد الجذر اللي اتشال.' },
        { en: 'Writing a closed bracket at an open endpoint. In the piecewise example the range is \\((1,5]\\), not \\([1,5]\\).',
          ar: 'القوس المربع معناه القيمة داخلة. لو الدائرة مفتوحة في الرسم، القوس لازم يكون عادي مش مربع.' },
        { en: 'Using \\(\\infty\\) with a closed bracket. Infinity is never reached, so it always takes \\()\\) — never \\(]\\).',
          ar: 'اللانهاية عمرها ما بتتقفل بقوس مربع، دايماً قوس عادي.' }
      ],

      recap: [
        { title: 'Vertical line test',
          html: '<p>One intersection per vertical line → function. More than one → not a function.</p>' },
        { title: 'Domain &amp; range',
          html: '<ul><li>Domain: read off the \\(x\\)-axis.</li><li>Range: read off the \\(y\\)-axis.</li></ul>' },
        { title: 'Operations on functions',
          html: '<ul>' +
                '<li>\\((f \\pm g)(x) = f(x) \\pm g(x)\\), \\(D = D_f \\cap D_g\\)</li>' +
                '<li>\\((f \\cdot g)(x) = f(x) \\cdot g(x)\\), \\(D = D_f \\cap D_g\\)</li>' +
                '<li>\\(\\left(\\frac{f}{g}\\right)(x) = \\frac{f(x)}{g(x)}\\), \\(g(x) \\ne 0\\)</li></ul>' },
        { title: 'Domain of algebraic functions',
          html: '<span class="tag">Rational</span> denominator ≠ 0<br><br>' +
                '<span class="tag">Even root</span> radicand ≥ 0<br><br>' +
                '<span class="tag">Odd root</span> domain = \\(\\mathbb{R}\\)' }
      ]
    }
  ],

  /* ----------------------------------------------------------- exercises */
  exercises: ['q-110', 'q-111', 'q-112', 'q-113', 'q-114'],
  exercisesAr: 'حل التمارين دي بنفسك الأول. لو الإجابة غلط، اضغط على «Watch solution» وشوف الحل بالفيديو قبل ما تعدّي للي بعده.',

  /* ---------------------------------------------------------------- quiz */
  quiz: ['q-120', 'q-121', 'q-122', 'q-123', 'q-124'],
  quizAr: 'خمس أسئلة سريعة. جاوب على كلهم الأول وبعدين اضغط تسليم — فيديو الحل هيظهر للأسئلة اللي غلطت فيها بس.',

  /* ------------------------------------------------------------ homework */
  homework: {
    instructionsAr:
      'اكتب اسمك ورقم موبايلك بشكل صحيح — دي هوية الطالب على المنصة، والدرجة هتترصد عليها. ' +
      'السؤال الأخير المقالي الدكتور وسام بيصححه بنفسه ويرد عليك. ' +
      'التسليم مرة واحدة بس، فراجع إجاباتك قبل ما تضغط إرسال. ' +
      'وبمجرد ما تسلّم، الدرس التالي هيفتح لك على طول.',
    auto: ['h-201', 'h-202', 'h-203', 'h-204', 'h-205', 'h-206', 'h-207', 'h-208', 'h-209'],
    manual: ['h-210']
  },

  /* ----------------------------------------------------------- next step */
  /* This is the trial lesson, so it has no next lesson in the course map —
     after the homework the student goes back to his own page. For a lesson
     that IS in data/course.js, this whole field is ignored: the engine takes
     the next step from the map. */
  next: { href: 'index.html', label: 'ارجع لصفحتك' }
};

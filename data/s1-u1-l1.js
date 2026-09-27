/* ==========================================================================
   LESSON DATA  ·  data/s1-u1-l1.js
   --------------------------------------------------------------------------
   Unit 1, Lesson 1-1 — An Introduction in Complex Numbers
   Grade 1 Secondary · Egyptian national curriculum · Term 1 · 2026/2027

   SOURCE  (rebuilt 27 Sept 2026 — second revision)
   ---------------------------------------------------------------------
   Standing rule from this revision onward: the PDF pair (Teaching Copy /
   Answer Key, built from preamble.tex + content.tex — see
   claude/قرارات-المشروع.md §7-§9) is the COMPLETE spec for the lesson.
   This file is a direct, section-by-section transcription of it, not an
   independent design:

     content.tex §1 Pre-requirements        → sections[0] below
     content.tex §2 Review of Key Definitions → sections[1] below
     content.tex §3 Lesson Explanation        → sections[2] below
     content.tex §4 Worked Examples  (17)     → exercises[]  q-160 … q-176
     content.tex §5 Additional Exercises      → exercises[]  q-180 … q-215
       Part A — 16 MCQ                        → q-180 … q-195
       Part B — 6 groups, 16 items            → q-200 … q-215
     content.tex §6 Quiz  First question (6)  → quiz[]       q-150 … q-155
     content.tex §6 Quiz  Second question (2) → exercises[]  q-156, q-157
       (the quiz UI is multiple-choice only — engine.js buildQuiz()/
       gradeQuiz() do not render or grade steps/numeric items — so these
       two short-answer parts live at the end of the exercises list
       instead of inside quiz[]; nothing from the PDF is dropped)
     content.tex §7 Homework (10)              → homework.auto  h-230 … h-239

   This is a REBUILD, not a patch, of the previous version delivered
   27 Sept 2026 earlier the same day. What changed and why:
     - The theory sections (§1-§3) no longer embed illustrated "worked"
       examples. In the PDF, sections 1-3 ("Pre-requirements", "Review of
       Key Definitions", "Lesson Explanation") contain NO examples at all —
       every example lives in §4 onward. Embedding some of them here would
       have been an invention not present in the source.
     - ALL 17 of §4's "Worked Examples" (called "التمارين" by Dr. Wessam)
       are now individual INTERACTIVE, auto-graded exercises — not passive
       narrated illustrations — because the video will show them being
       solved, and the student must be able to solve the same problem
       himself on the page afterwards.
     - §5's 32 problems ("التمارين الإضافية") are, for the same reason,
       transcribed as individual interactive exercises rather than
       represented by different, invented numbers.
     - The previous manual/instructor-graded essay item (h-228, a
       Sara/Omar-style "find the error" question) is REMOVED: it was never
       part of this PDF, and the standing rule is that the PDF is now the
       complete spec. homework.manual is therefore empty — every homework
       item in the PDF has a definite short answer and is auto-graded.
     - The "quick reference" mistakes[] boxes under each theory section are
       a platform structural feature (independent of any one exercise) and
       are kept, reworded to match the final section content.

   The page's own mechanism (masthead, video tabs, theory sections, common
   mistakes, interactive exercises, quiz, homework gate) is UNCHANGED —
   only the content inside it.
   ========================================================================== */

window.LESSON = {

  id: 's1-u1-l1',
  author: 'Dr. Wessam Gouda',
  unit: 1,
  unitTitle: 'Algebra, Relations and Functions',
  unitLessons: 5,
  lessonIndex: 1,
  lessonNo: '1–1',

  title: 'An Introduction in Complex Numbers',
  lede: 'The number whose square is negative one — and the whole new system of numbers it opens up.',

  goal: {
    en: 'By the end of this lesson you can solve a quadratic equation whose discriminant is negative, simplify any integer power of \\(i\\), write a complex number in the form \\(a+bi\\), decide when two complex numbers are equal, add, subtract and multiply them, use the conjugate, and divide one complex number by another.',
    ar: 'بعد الدرس ده هتقدر تحل معادلة تربيعية مميزها سالب، وتبسّط أي قوة صحيحة لـ i، وتكتب العدد المركب في صورة a + bi، وتعرف إمتى عددين مركبين يكونوا متساويين، وتجمع وتطرح وتضرب، وتستخدم المرافق في القسمة.'
  },

  gateNoticeAr:
    'الدرس التالي بيفتح بعد ما تسلّم واجب الدرس ده. ' +
    'مش شرط كل إجاباتك تكون صح — المهم إنك تحاول وتسلّم. ' +
    'لو ذاكرت الدرس وحاسس إنك فاهمه، سلّم الواجب على طول وكمّل.',

  gateAr: 'الدرس التالي مقفول لحد ما تسلّم الواجب. سلّم الأول وهيفتح فوراً.',

  homeworkHref: 'homework.html',
  lessonHref: 'lesson.html',

  /* the Argand plane with the point 3 + 2i marked */
  art:
    '<svg viewBox="0 0 260 200" xmlns="http://www.w3.org/2000/svg">' +
    '<line x1="20" y1="130" x2="240" y2="130" stroke="#C9CABE" stroke-width="1.5"/>' +
    '<line x1="60" y1="20" x2="60" y2="185" stroke="#C9CABE" stroke-width="1.5"/>' +
    '<line x1="60" y1="70" x2="180" y2="70" stroke="#2F6F6B" stroke-width="1.5" stroke-dasharray="4 4"/>' +
    '<line x1="180" y1="70" x2="180" y2="130" stroke="#2F6F6B" stroke-width="1.5" stroke-dasharray="4 4"/>' +
    '<line x1="60" y1="130" x2="180" y2="70" stroke="#2F6F6B" stroke-width="3" stroke-linecap="round"/>' +
    '<circle cx="180" cy="70" r="6" fill="#B4842A"/>' +
    '<text x="190" y="64" font-family="monospace" font-size="13" fill="#1B2A41">3 + 2i</text>' +
    '<text x="228" y="147" font-family="monospace" font-size="11" fill="#47576B">Re</text>' +
    '<text x="38" y="30" font-family="monospace" font-size="11" fill="#47576B">Im</text></svg>',

  /* --------------------------------------------------------------- video */
  video: {
    intro: {
      en: 'Watch the segments in order. Each one ends where the next begins.',
      ar: 'المقاطع مرتبة. اتفرج على المقطع كامل قبل ما تنتقل للي بعده، وبعد ما تخلص كلهم ابدأ التمارين.'
    },
    segments: [
      {
        title: 'Pre-requirements: when the quadratic has no real root',
        src: 'videos/s1-u1-l1/seg0-prerequirements.mp4',
        caption: 'The general quadratic formula, and the three cases of the discriminant \\(\\Delta\\).',
        ar: 'مقطع قبل الدرس نفسه — مراجعة سريعة لحل المعادلة التربيعية، عشان توصل لحظة «مفيش حل حقيقي» وانت جاهز تمامًا.'
      },
      {
        title: 'Definitions: i, the complex number, the conjugate',
        src: 'videos/s1-u1-l1/seg1-definitions.mp4',
        caption: 'The imaginary unit, the form \\(a+bi\\), equality, and the conjugate.',
        ar: 'كل التعريفات الأساسية اللي هتتبنى عليها باقي الدرس، في مقطع واحد.'
      },
      {
        title: 'Lesson explanation: powers of i and the four operations',
        src: 'videos/s1-u1-l1/seg2-explanation.mp4',
        caption: 'The remainder shortcut for \\(i^{n}\\), and add / subtract / multiply / divide, plus the exam-saving identity.',
        ar: 'الطريقة العملية لأي قوة لـ i، وقواعد الجمع والطرح والضرب والقسمة، وهوية بتوفر وقت الامتحان.'
      },
      {
        title: 'Worked examples, solved live (17 examples)',
        src: 'videos/s1-u1-l1/seg3-worked-examples.mp4',
        caption: 'Every example below is solved in this segment, in the same order.',
        ar: 'كل تمرين هتلاقيه تحت اتحل في المقطع ده بنفس الترتيب — لو غلطت في حاجة ارجع شوفها هنا.'
      }
    ]
  },

  /* ------------------------------------------------------------- theory */
  sections: [

    {
      num: '§1',
      title: 'Pre-requirements',
      subs: [
        {
          kicker: 'Pre-req 1 · Learn',
          title: 'Solving \\(ax^{2}+bx+c=0\\) algebraically',
          lede: 'Before meeting the complex number, we quickly review solving a quadratic equation — because the complex number is about to appear in exactly the case where this method gives no real answer.' +
            '<br><br>For \\( ax^{2}+bx+c=0 \\) with \\( a \\neq 0 \\), the general formula is:' +
            '\\[ x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a} \\]' +
            'The quantity \\( \\Delta = b^{2}-4ac \\) is called the <strong>discriminant</strong>; its sign tells us the type of roots before we even finish solving.',
          ar: {
            label: 'قبل الدخول في العدد المركب',
            text: 'نراجع سريعًا حل المعادلة التربيعية — لأن العدد المركب هيظهر بالظبط في الحالة اللي معندهاش حل حقيقي.'
          }
        },
        {
          kicker: 'Pre-req 2 · Learn',
          title: 'Solving \\(ax^{2}+bx+c=0\\) graphically',
          lede: 'Let \\( f(x) = ax^{2}+bx+c \\) and sketch the curve \\( y=f(x) \\). The real roots of the equation are exactly the \\(x\\)-coordinates of the points where the curve meets the \\(x\\)-axis. According to the sign of \\(\\Delta\\), three cases arise.',
          ar: {
            label: 'الفكرة في سطر',
            text: 'الرسم البياني بيوريك عدد الحلول الحقيقية من غير ما تحسب أي حاجة — بس شوف المنحنى بيقطع محور x كام مرة.'
          },
          figures: [
            {
              svg: '<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">' +
                '<line x1="10" y1="95" x2="150" y2="95" stroke="#C9CABE" stroke-width="1.3"/>' +
                '<path d="M 30 25 Q 80 130 130 25" fill="none" stroke="#2F6F6B" stroke-width="3" stroke-linecap="round"/>' +
                '<circle cx="52" cy="95" r="4" fill="#2F6F6B"/><circle cx="108" cy="95" r="4" fill="#2F6F6B"/></svg>',
              label: '\\(\\Delta>0\\) — two distinct real roots', verdict: 'yes'
            },
            {
              svg: '<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">' +
                '<line x1="10" y1="95" x2="150" y2="95" stroke="#C9CABE" stroke-width="1.3"/>' +
                '<path d="M 35 130 Q 80 60 125 130" fill="none" stroke="#B4842A" stroke-width="3" stroke-linecap="round"/>' +
                '<circle cx="80" cy="95" r="4" fill="#B4842A"/></svg>',
              label: '\\(\\Delta=0\\) — one repeated real root', verdict: 'yes'
            },
            {
              svg: '<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">' +
                '<line x1="10" y1="95" x2="150" y2="95" stroke="#C9CABE" stroke-width="1.3"/>' +
                '<path d="M 30 90 Q 80 15 130 90" fill="none" stroke="#AA4A32" stroke-width="3" stroke-linecap="round"/></svg>',
              label: '\\(\\Delta<0\\) — curve never meets the \\(x\\)-axis: no real root', verdict: 'no'
            }
          ],
          notice: 'When \\( \\Delta<0 \\) the equation still has <strong>two</strong> solutions — they are just not real numbers. This is exactly where today\'s lesson begins: building the number system \\( \\mathbb{C} \\) that contains them.'
        }
      ]
    },

    {
      num: '§2',
      title: 'Review of Key Definitions',
      subs: [
        {
          kicker: '2.1 · Definition',
          title: 'The imaginary unit, and the complex number',
          lede: 'Since \\( x^{2}+1=0 \\) has no real solution, we define the number \\(i\\) so that:' +
            '\\[ i^{2}=-1 \\qquad \\text{(equivalently } i=\\sqrt{-1}\\text{)} \\]' +
            'Its powers repeat every four steps: \\( i^{1}=i,\\; i^{2}=-1,\\; i^{3}=-i,\\; i^{4}=1 \\), then it repeats.' +
            '<br><br>A <strong>complex number</strong> has the form \\( z=a+bi \\), where \\( a,b\\in\\mathbb{R} \\). Here \\( a=\\operatorname{Re}(z) \\) is the <strong>real part</strong>, and \\( b=\\operatorname{Im}(z) \\) is the <strong>imaginary part</strong>:' +
            '\\[ \\mathbb{C}=\\{\\,a+bi : a,b\\in\\mathbb{R},\\ i^{2}=-1\\,\\} \\]',
          ar: {
            label: 'انتبه',
            text: 'مجموعة الأعداد الحقيقية جزء من مجموعة الأعداد المركبة، مش منفصلة عنها. أي عدد حقيقي هو عدد مركب جزؤه التخيلي بصفر.'
          },
          figures: [
            {
              svg: '<svg viewBox="0 0 220 170" xmlns="http://www.w3.org/2000/svg">' +
                '<line x1="15" y1="140" x2="205" y2="140" stroke="#C9CABE" stroke-width="1.5"/>' +
                '<line x1="110" y1="12" x2="110" y2="155" stroke="#C9CABE" stroke-width="1.5"/>' +
                '<path d="M 40 20 Q 110 190 180 20" fill="none" stroke="#2F6F6B" stroke-width="3" ' +
                'stroke-linecap="round" transform="translate(0,-8) scale(1,0.62) translate(0,40)"/>' +
                '<circle cx="110" cy="112" r="4.5" fill="#B4842A"/>' +
                '<text x="118" y="108" font-family="monospace" font-size="11" fill="#47576B">(0, 1)</text>' +
                '<text x="150" y="158" font-family="monospace" font-size="11" fill="#AA4A32">never meets x</text></svg>',
              label: 'y = x² + 1 — no real root, exactly why we need i'
            }
          ]
        },
        {
          kicker: '2.2 · Definition',
          title: 'Equality, and the conjugate',
          lede: 'Two complex numbers are equal <strong>if and only if</strong> their real parts are equal and their imaginary parts are equal:' +
            '\\[ a+bi=c+di \\iff a=c \\ \\text{and}\\ b=d \\]' +
            'The <strong>conjugate</strong> of \\( z=a+bi \\) is \\( \\bar z=a-bi \\). Two facts make it the most useful number in the lesson — both its sum and its product with \\(z\\) are real:' +
            '\\[ z+\\bar z=2a\\in\\mathbb{R} \\qquad\\qquad z\\cdot\\bar z=a^{2}+b^{2}\\in\\mathbb{R}^{+} \\]',
          ar: {
            label: 'احفظها',
            text: 'معادلة واحدة في الأعداد المركبة = معادلتين في الأعداد الحقيقية. وحاصل ضرب العدد في مرافقه a² + b² — دايمًا عدد حقيقي موجب.',
            tone: 'tip'
          }
        }
      ],
      mistakes: [
        {
          en: 'Forgetting that \\( 11 + i \\) has imaginary part \\(1\\), not \\(0\\) — a missing coefficient means 1, not "no imaginary part".',
          ar: 'لما تلاقي i لوحدها من غير رقم قدامها، معاملها ١ مش صفر.'
        },
        {
          en: 'Writing \\( (a+bi)(a-bi) = a^{2} - b^{2} \\). The correct result is \\( a^{2} + b^{2} \\): the minus sign from the difference of two squares meets the minus sign in \\( i^{2} \\), and they cancel.',
          ar: 'حاصل ضرب العدد في مرافقه a² + b² مش a² − b². الإشارتين السالبتين بيلغوا بعض.'
        }
      ]
    },

    {
      num: '§3',
      title: 'Lesson Explanation',
      subs: [
        {
          kicker: '3.1 · Learn',
          title: 'A negative discriminant, and the powers of i',
          lede: 'Some quadratics (e.g. \\( x^{2}+4=0 \\)) have a <strong>negative discriminant</strong> \\(\\Rightarrow\\) no real roots. We solve them by writing \\( \\sqrt{-k}=i\\sqrt{k} \\) for \\( k>0 \\) — take the minus sign out from under the root as \\(i\\) first, then simplify the ordinary root.' +
            '<br><br><strong>Quick rule for \\( i^{\\,n} \\):</strong> divide \\(n\\) by 4 and look at the remainder \\(r\\):' +
            '\\[ r=0\\Rightarrow 1,\\qquad r=1\\Rightarrow i,\\qquad r=2\\Rightarrow -1,\\qquad r=3\\Rightarrow -i \\]' +
            'This also settles a <strong>symbolic</strong> power right away: whatever positive integer \\(n\\) is, \\( i^{4n+1} \\) is always \\(i\\), because \\( i^{4n}=\\left(i^{4}\\right)^{n}=1^{n}=1 \\).',
          ar: {
            label: 'الطريقة العملية',
            text: 'اقسم الأس على ٤ وخد الباقي. القاعدة دي لوحدها بتحل أي سؤال في القوى، حتى لو الأس مكتوب برمز زي 4n+1.',
            tone: 'tip'
          }
        },
        {
          kicker: '3.2 · Learn',
          title: 'The four operations',
          lede: '<strong>Add / subtract:</strong> combine real parts together and imaginary parts together.' +
            '<br><strong>Multiply:</strong> expand normally and replace \\(i^{2}\\) by \\(-1\\).' +
            '<br><strong>Divide:</strong> multiply the numerator and denominator by the <strong>conjugate of the denominator</strong> — this always turns the denominator into a real number, and the goal is simply to remove \\(i\\) from underneath.',
          ar: {
            label: 'الهدف من مرافق المقام',
            text: 'الهدف من ضرب البسط والمقام في مرافق المقام إننا نتخلص من i في المقام خالص.'
          },
          notice: '<strong>Exam-saving identity:</strong> \\( (1+i)^{2}=2i \\) and \\( (1-i)^{2}=-2i \\). So \\( (1+i)^{2n}=(2i)^{n} \\) and \\( (1-i)^{2n}=(-2i)^{n} \\) — this turns a big power into a one-line calculation.'
        }
      ],
      recap: [
        { title: 'The cycle', html: '\\( i^{4n} = 1 \\)<br>\\( i^{4n+1} = i \\)<br>\\( i^{4n+2} = -1 \\)<br>\\( i^{4n+3} = -i \\)' },
        { title: 'Exam-saving identity', html: '\\( (1+i)^{2}=2i \\)<br>\\( (1-i)^{2}=-2i \\)<br>so \\( (1{+}i)^{2n}=(2i)^{n} \\)' }
      ],
      mistakes: [
        {
          en: 'Writing \\( \\sqrt{-4}\\times\\sqrt{-9}=\\sqrt{36}=6 \\). The rule \\( \\sqrt{a}\\sqrt{b}=\\sqrt{ab} \\) needs at least one of \\(a,b\\) to be non-negative. Convert to \\(i\\)-form first: \\( (2i)(3i)=6i^{2}=-6 \\).',
          ar: 'أشهر غلطة في الباب كله. حوّل لـ i الأول، وبعدين اضرب.'
        },
        {
          en: 'Multiplying only the numerator by the conjugate when dividing. Both the numerator AND the denominator must be multiplied, otherwise the value of the fraction changes.',
          ar: 'لازم تضرب فوق وتحت في مرافق المقام مع بعض. لو ضربت البسط بس، غيّرت قيمة الكسر.'
        }
      ]
    }
  ],

  /* ---------------------------------------------------------- exercises */
  /* Transcribed in full (27 Sept 2026) from content.tex §4 "Worked
     Examples" (17) and §5 "Additional Exercises" (Part A: 16 MCQ, Part B:
     6 groups / 16 items) plus the PDF quiz's short-answer "Second
     question" (2 parts — the quiz UI is multiple-choice only, see the
     note at the top of this file). Order follows the PDF exactly. */
  exercises: [
    /* content.tex §4 — Worked Examples, all 17, in PDF order */
    'q-160', 'q-161', 'q-162', 'q-163', 'q-164', 'q-165', 'q-166',
    'q-167', 'q-168', 'q-169', 'q-170', 'q-171', 'q-172', 'q-173',
    'q-174', 'q-175', 'q-176',
    /* content.tex §5 Part A — 16 multiple choice */
    'q-180', 'q-181', 'q-182', 'q-183', 'q-184', 'q-185', 'q-186', 'q-187',
    'q-188', 'q-189', 'q-190', 'q-191', 'q-192', 'q-193', 'q-194', 'q-195',
    /* content.tex §5 Part B — 6 groups, 16 items */
    'q-200', 'q-201', 'q-202', 'q-203', 'q-204', 'q-205', 'q-206', 'q-207',
    'q-208', 'q-209', 'q-210', 'q-211', 'q-212', 'q-213', 'q-214', 'q-215',
    /* the PDF quiz's own "Second question" — short answer, so it lives
       here rather than in quiz[] (see note at the top of this file) */
    'q-156', 'q-157'
  ],
  exercisesAr:
    'التمارين دي مطابقة بالحرف لملف الدرس اللي هتشوفه في الفيديو — بالترتيب بتاعه بالظبط: ' +
    'الأمثلة المحلولة في الفيديو الأول، وبعدين التمارين الإضافية. ' +
    'حل بنفسك الأول، ولو غلطت اضغط «Watch solution» وشوف الحل بالفيديو قبل ما تعدّي للي بعده.',

  /* --------------------------------------------------------------- quiz */
  /* The PDF's own 6-question multiple-choice "First question" (Quiz
     section, 6 marks) — word for word, see data/questions.js q-150 … q-155. */
  quiz: ['q-150', 'q-151', 'q-152', 'q-153', 'q-154', 'q-155'],
  quizAr:
    'ستة أسئلة اختيار من متعدد — نفس الكويز اللي هتشوفه في الفيديو بالحرف. ' +
    'السؤال الثاني في نفس الكويز (المقالي) هتلاقيه آخر قائمة التمارين فوق، مش هنا — لأن الكويز هنا اختيار من متعدد بس. ' +
    'جاوب على الكل الأول وبعدين اضغط تسليم، وفيديو الحل هيظهر للأسئلة اللي غلطت فيها بس.',

  /* ----------------------------------------------------------- homework */
  /* Transcribed in full from content.tex §7 (10 items, all auto-graded —
     every homework problem in this PDF has a definite short answer).
     There is no manual/instructor-graded item in this PDF, so
     homework.manual is empty — see the note at the top of this file. */
  homework: {
    instructionsAr:
      'الواجب ده مطابق بالحرف لملف الدرس. نصه اختيار من متعدد ونصه أسئلة قصيرة. ' +
      'اكتب اسمك ورقم موبايلك صح — دي هويتك على المنصة والدرجة بتترصد عليها. ' +
      'التسليم مرة واحدة بس، فراجع قبل ما تبعت — وأول ما تسلّم الدرس التالي بيفتح لك على طول.',
    auto: [
      'h-230', 'h-231', 'h-232', 'h-233', 'h-234',
      'h-235', 'h-236', 'h-237', 'h-238', 'h-239'
    ],
    manual: []
  },

  /* ------------------------------------------------------------ next step */
  /* Ignored: this lesson IS in data/course.js, so the engine takes the next
     step from the map. Kept only as a fallback if the map ever loses it. */
  next: { href: 'index.html', label: 'ارجع لصفحتك' }
};

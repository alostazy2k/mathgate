/* ==========================================================================
   LESSON DATA  ·  data/s1-u1-l1.js
   --------------------------------------------------------------------------
   Unit 1, Lesson 1-1 — An Introduction in Complex Numbers
   Grade 1 Secondary · Egyptian national curriculum · Term 1 · 2026/2027

   SOURCE
   Built from the ministry student book, pages 4-9 (English edition). The book
   was read for its content and its QUESTION PATTERNS; every question in
   data/questions.js is original — same pattern, different numbers. Each one
   carries a `pattern` field (P1 … P14) so coverage can be checked and changed
   without touching this file.

   Language rule, as everywhere on the platform:
     English  → all mathematics, definitions, statements, options
     Arabic   → instructions, guidance, hints, short clarifications
                (always inside an `ar` / `ar:{}` field so the engine styles it)
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
    en: 'By the end of this lesson you can simplify any integer power of \\(i\\), write a complex number in the form \\(a+bi\\), decide when two complex numbers are equal, add, subtract and multiply them, use the conjugate, and divide one complex number by another.',
    ar: 'بعد الدرس ده هتقدر تبسّط أي قوة صحيحة لـ i، وتكتب العدد المركب في صورة a + bi، وتعرف إمتى عددين مركبين يكونوا متساويين، وتجمع وتطرح وتضرب، وتستخدم المرافق في القسمة.'
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
        title: 'Why we need a new number',
        src: 'videos/s1-u1-l1/seg1-why-complex-numbers.mp4',
        caption: 'The equation \\(x^{2} = -1\\), and why no real number solves it.',
        ar: 'المقطع ده بيوضح ليه احتجنا مجموعة أعداد جديدة أصلاً — ومن غيره باقي الدرس هيبقى قواعد محفوظة.'
      },
      {
        title: 'Integer powers of i',
        src: 'videos/s1-u1-l1/seg2-powers-of-i.mp4',
        caption: 'The four-step cycle, negative powers, and powers written as \\(4n+k\\).',
        ar: 'أهم مقطع للأسئلة الاختيارية — دورة الأربعة، والقوى السالبة، والأس المكتوب بالرمز n.'
      },
      {
        title: 'The form a + bi',
        src: 'videos/s1-u1-l1/seg3-complex-form-and-equality.mp4',
        caption: 'Real part, imaginary part, pure real, pure imaginary — and when two complex numbers are equal.',
        ar: 'الجزء الحقيقي والجزء التخيلي، وإمتى العدد يبقى حقيقي بحت أو تخيلي بحت، وشرط تساوي عددين.'
      },
      {
        title: 'Adding, subtracting and multiplying',
        src: 'videos/s1-u1-l1/seg4-operations.mp4',
        caption: 'Ordinary algebra, with one extra rule: \\(i^{2} = -1\\).',
        ar: 'بتتعامل معاهم زي أي مقدار جبري عادي، والفرق الوحيد إن i² بتتحول لـ −1.'
      },
      {
        title: 'The conjugate, and division',
        src: 'videos/s1-u1-l1/seg5-conjugate-and-division.mp4',
        caption: 'Why multiplying by the conjugate is the whole trick behind division.',
        ar: 'المرافق هو مفتاح القسمة كلها. ركّز في المقطع ده لأن سؤال القسمة بييجي في الامتحان كتير.'
      }
    ]
  },

  /* ------------------------------------------------------------- theory */
  sections: [

    {
      num: '§1',
      title: 'A number whose square is negative',
      subs: [
        {
          kicker: '1.1 The problem',
          title: 'An equation with no real solution',
          lede: 'Every set of numbers you have met was invented to solve an equation the previous set could not. ' +
            'Now look at \\( x^{2} = -1 \\). No real number has a negative square, so this equation has ' +
            '<strong>no solution in \\(\\mathbb{R}\\)</strong> — and the graph of \\( y = x^{2}+1 \\) shows it: ' +
            'the parabola never touches the \\(x\\)-axis.',
          ar: {
            label: 'الفكرة في سطر',
            text: 'كل مجموعة أعداد اتعملت عشان تحل معادلة المجموعة اللي قبلها ما قدرتش تحلها. والمعادلة x² = −1 هي سبب وجود الأعداد المركبة.'
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
              label: 'y = x² + 1'
            }
          ]
        },
        {
          kicker: '1.2 Learn',
          title: 'The imaginary number i',
          lede: 'The <strong>imaginary number \\(i\\)</strong> is defined as the number whose square equals \\(-1\\):' +
            '\\[ i^{2} = -1 \\]' +
            'From it, the square root of any negative number can be written down. For \\( n \\in \\mathbb{R}^{+} \\):' +
            '\\[ \\sqrt{-n} = \\sqrt{-1 \\times n} = \\sqrt{n}\\; i \\]' +
            'Numbers such as \\( 2i,\\; -5i,\\; \\sqrt{3}\\,i \\) are called <strong>imaginary numbers</strong>.',
          ar: {
            label: 'القاعدة',
            text: 'أي جذر لعدد سالب بيتكتب: شيل السالب من تحت الجذر، وحط i جنبه. يعني √−7 = √7 i.',
            tone: 'tip'
          },
          worked: [
            {
              label: 'Example',
              prompt: 'Write \\( \\sqrt{-45} \\) in its simplest form.',
              solution: '\\[ \\sqrt{-45} = \\sqrt{45}\\; i = \\sqrt{9 \\times 5}\\; i = 3\\sqrt{5}\\; i \\]',
              result: '\\( \\sqrt{-45} = 3\\sqrt{5}\\,i \\)',
              ar: 'اطلع i الأول، وبعدين بسّط الجذر عادي.'
            }
          ],
          notice: 'A number is imaginary because of how it is defined, not because it is unreal. ' +
            'Electrical engineers use these numbers every day.'
        }
      ],
      mistakes: [
        {
          en: 'Writing \\( \\sqrt{-4} \\times \\sqrt{-9} = \\sqrt{36} = 6 \\). The rule \\( \\sqrt{a}\\sqrt{b} = \\sqrt{ab} \\) needs at least one of \\(a, b\\) to be non-negative. Convert to \\(i\\) form first: \\( (2i)(3i) = 6i^{2} = -6 \\).',
          ar: 'أشهر غلطة في الباب كله. حوّل لـ i الأول، وبعدين اضرب.'
        }
      ]
    },

    {
      num: '§2',
      title: 'Integer powers of i',
      subs: [
        {
          kicker: '2.1 Learn',
          title: 'A cycle of four',
          lede: 'The powers of \\(i\\) obey the ordinary laws of indices, and they repeat every four steps:' +
            '\\[ i^{1} = i, \\quad i^{2} = -1, \\quad i^{3} = i^{2} \\times i = -i, \\quad i^{4} = (-1)(-1) = 1 \\]' +
            'and then \\( i^{5} = i^{4} \\times i = i \\), and the cycle starts again. In general, for \\( n \\in \\mathbb{Z} \\):' +
            '\\[ i^{4n} = 1, \\quad i^{4n+1} = i, \\quad i^{4n+2} = -1, \\quad i^{4n+3} = -i \\]',
          ar: {
            label: 'الطريقة العملية',
            text: 'اقسم الأس على ٤ وخد الباقي. الباقي ٠ ← 1، الباقي ١ ← i، الباقي ٢ ← −1، الباقي ٣ ← −i. القاعدة دي لوحدها بتحل أي سؤال في القوى.',
            tone: 'tip'
          },
          worked: [
            {
              label: 'Example',
              prompt: 'Find \\( i^{103} \\) in its simplest form.',
              solution: 'Divide the exponent by 4 and keep the remainder: \\( 103 = 4(25) + 3 \\).' +
                '\\[ i^{103} = i^{4(25)+3} = \\left(i^{4}\\right)^{25} \\times i^{3} = 1 \\times (-i) = -i \\]',
              result: '\\( i^{103} = -i \\)',
              ar: '١٠٣ = ٤×٢٥ + ٣، فالباقي ٣، والباقي ٣ معناه −i.'
            }
          ]
        },
        {
          kicker: '2.2 Learn',
          title: 'Negative powers',
          lede: 'A negative power is a reciprocal, so simplify the positive power first and then invert it. ' +
            'It helps to remember that \\( \\dfrac{1}{i} = -i \\), because \\( \\dfrac{1}{i} \\times \\dfrac{i}{i} = \\dfrac{i}{i^{2}} = \\dfrac{i}{-1} = -i \\).',
          ar: {
            label: 'خطوتين',
            text: 'اوجد القوة الموجبة الأول، وبعدين خد المقلوب. واحفظ إن 1/i = −i.'
          },
          worked: [
            {
              label: 'Example',
              prompt: 'Find \\( i^{-26} \\) in its simplest form.',
              solution: '\\[ i^{-26} = \\frac{1}{i^{26}} \\]' +
                'Now \\( 26 = 4(6) + 2 \\), so \\( i^{26} = i^{2} = -1 \\), and therefore' +
                '\\[ i^{-26} = \\frac{1}{-1} = -1 \\]',
              result: '\\( i^{-26} = -1 \\)',
              ar: 'الأس الموجب ٢٦ باقيه ٢، يعني −1، والمقلوب برضه −1.'
            }
          ]
        }
      ],
      recap: [
        { title: 'The cycle', html: '\\( i^{4n} = 1 \\)<br>\\( i^{4n+1} = i \\)<br>\\( i^{4n+2} = -1 \\)<br>\\( i^{4n+3} = -i \\)' },
        { title: 'Useful', html: '\\( \\dfrac{1}{i} = -i \\)<br>\\( i^{-n} = \\dfrac{1}{i^{\\,n}} \\)<br>\\( \\sqrt{-n} = \\sqrt{n}\\,i \\)' }
      ],
      mistakes: [
        {
          en: 'Reading \\( i^{4n+7} \\) as remainder 7. A remainder must be smaller than 4: rewrite it as \\( 4(n+1)+3 \\), so the answer is \\( -i \\).',
          ar: 'الباقي لازم يكون أصغر من ٤. أعد كتابة الأس لحد ما الباقي يبقى 0 أو 1 أو 2 أو 3.'
        }
      ]
    },

    {
      num: '§3',
      title: 'The complex number',
      subs: [
        {
          kicker: '3.1 Definition',
          title: 'The form a + bi',
          lede: 'If \\( a \\) and \\( b \\) are two real numbers, the number \\( z = a + bi \\) is called a ' +
            '<strong>complex number</strong>. Here \\( a \\) is the <strong>real part</strong> of \\(z\\) and ' +
            '\\( bi \\) is its <strong>imaginary part</strong>.' +
            '<br><br>If \\( b = 0 \\) then \\( z = a \\) is a <strong>pure real</strong> number, so every real number ' +
            'is also a complex number. If \\( a = 0 \\) and \\( b \\neq 0 \\) then \\( z = bi \\) is <strong>pure imaginary</strong>.',
          ar: {
            label: 'انتبه',
            text: 'مجموعة الأعداد الحقيقية جزء من مجموعة الأعداد المركبة، مش منفصلة عنها. أي عدد حقيقي هو عدد مركب جزؤه التخيلي بصفر.'
          },
          worked: [
            {
              label: 'Example',
              prompt: 'For which value of \\(m\\) is \\( z = (m + 4) + (2m - 6)i \\) a pure real number?',
              solution: 'A number is pure real when its imaginary part is zero:' +
                '\\[ 2m - 6 = 0 \\;\\Rightarrow\\; m = 3 \\]' +
                'Then \\( z = 7 \\), which is indeed a real number.',
              result: '\\( m = 3 \\)',
              ar: 'حقيقي بحت ← الجزء التخيلي بصفر. تخيلي بحت ← الجزء الحقيقي بصفر (والتخيلي لا يساوي صفر).'
            }
          ]
        },
        {
          kicker: '3.2 Learn',
          title: 'Equality of two complex numbers',
          lede: 'Two complex numbers are equal <strong>if and only if</strong> their real parts are equal ' +
            'and their imaginary parts are equal:' +
            '\\[ a + bi = c + di \\iff a = c \\;\\text{ and }\\; b = d \\]' +
            'This is what turns one complex equation into two real equations — which is why these questions ' +
            'always end up as a pair of simultaneous equations.',
          ar: {
            label: 'ليه ده مهم',
            text: 'معادلة واحدة في الأعداد المركبة = معادلتين في الأعداد الحقيقية. ده اللي بيخلي سؤال «أوجد x و y» قابل للحل أصلاً.',
            tone: 'tip'
          },
          worked: [
            {
              label: 'Example',
              prompt: 'Find \\(x\\) and \\(y\\), where \\( x, y \\in \\mathbb{R} \\), given that \\( (x + 3y) + (2x - y)i = 11 + 1i \\).',
              solution: 'Equate the real parts, then the imaginary parts:' +
                '\\[ x + 3y = 11 \\qquad 2x - y = 1 \\]' +
                'From the second equation \\( y = 2x - 1 \\). Substituting into the first:' +
                '\\[ x + 3(2x - 1) = 11 \\;\\Rightarrow\\; 7x = 14 \\;\\Rightarrow\\; x = 2, \\quad y = 3 \\]',
              result: '\\( x = 2, \\; y = 3 \\)',
              ar: 'ساوي الحقيقي بالحقيقي والتخيلي بالتخيلي، وبعدين حل المعادلتين بالتعويض أو بالحذف.'
            }
          ]
        }
      ],
      mistakes: [
        {
          en: 'Forgetting that \\( 11 + i \\) has imaginary part \\(1\\), not \\(0\\). A missing coefficient means 1.',
          ar: 'لما تلاقي i لوحدها من غير رقم قدامها، معاملها ١ مش صفر.'
        }
      ]
    },

    {
      num: '§4',
      title: 'Operations, the conjugate, and division',
      subs: [
        {
          kicker: '4.1 Learn',
          title: 'Adding, subtracting and multiplying',
          lede: 'Treat \\( i \\) as an ordinary algebraic symbol and use the commutative, associative and ' +
            'distributive properties as usual. There is exactly one extra rule: wherever \\( i^{2} \\) appears, ' +
            'replace it by \\( -1 \\).',
          ar: {
            label: 'قاعدة واحدة زيادة',
            text: 'اتعامل معاهم زي أي مقدار جبري، وكل ما تلاقي i² حوّلها لـ −1. مفيش أي حاجة تانية جديدة.'
          },
          worked: [
            {
              label: 'Example',
              prompt: 'Find \\( (5 - 2i)(3 + 4i) \\) in the form \\( a + bi \\).',
              solution: '\\[ (5 - 2i)(3 + 4i) = 15 + 20i - 6i - 8i^{2} \\]' +
                'Since \\( i^{2} = -1 \\), the last term becomes \\( +8 \\):' +
                '\\[ = (15 + 8) + (20 - 6)i = 23 + 14i \\]',
              result: '\\( 23 + 14i \\)',
              ar: 'افتح الأقواس، حوّل i² لـ −1، وبعدين لمّ الحقيقي مع الحقيقي والتخيلي مع التخيلي.'
            }
          ]
        },
        {
          kicker: '4.2 Learn',
          title: 'Conjugate numbers',
          lede: 'The two numbers \\( a + bi \\) and \\( a - bi \\) are called <strong>conjugate numbers</strong>. ' +
            'Two facts make them the most useful pair in the whole lesson — <strong>both their sum and their ' +
            'product are real</strong>:' +
            '\\[ (a+bi) + (a-bi) = 2a \\]' +
            '\\[ (a+bi)(a-bi) = a^{2} - b^{2}i^{2} = a^{2} + b^{2} \\]',
          ar: {
            label: 'احفظها',
            text: 'حاصل ضرب العدد في مرافقه = a² + b² — دايماً عدد حقيقي موجب. ودي هي الفكرة اللي القسمة كلها قايمة عليها.',
            tone: 'tip'
          },
          notice: 'Notice the product is \\( a^{2} + b^{2} \\) and not \\( a^{2} - b^{2} \\): ' +
            'the minus sign from the difference of two squares meets the minus sign in \\( i^{2} \\), and they cancel.'
        },
        {
          kicker: '4.3 Learn',
          title: 'Division',
          lede: 'To divide, multiply the numerator and the denominator by the <strong>conjugate of the ' +
            'denominator</strong>. The denominator becomes a real number, and the result can then be split ' +
            'into the form \\( a + bi \\).',
          ar: {
            label: 'الخطوات بالترتيب',
            text: 'اضرب فوق وتحت في مرافق المقام ← المقام يبقى حقيقي ← اقسم كل حد لوحده ← اكتب الناتج a + bi.'
          },
          worked: [
            {
              label: 'Example',
              prompt: 'Write \\( \\dfrac{4 + 7i}{3 - 2i} \\) in the form \\( a + bi \\).',
              solution: 'Multiply above and below by \\( 3 + 2i \\), the conjugate of the denominator:' +
                '\\[ \\frac{4+7i}{3-2i} \\times \\frac{3+2i}{3+2i} = \\frac{12 + 8i + 21i + 14i^{2}}{3^{2} + 2^{2}} \\]' +
                '\\[ = \\frac{12 + 29i - 14}{13} = \\frac{-2 + 29i}{13} \\]' +
                'Split it into two terms:' +
                '\\[ = -\\frac{2}{13} + \\frac{29}{13}\\,i \\]',
              result: '\\( -\\dfrac{2}{13} + \\dfrac{29}{13}\\,i \\)',
              ar: 'المقام بقى 13 لأن (3−2i)(3+2i) = 3² + 2². وبعدها اقسم البسط على 13 حد حد.'
            }
          ]
        }
      ],
      mistakes: [
        {
          en: 'Multiplying only the numerator by the conjugate. Both parts of the fraction must be multiplied, otherwise its value changes.',
          ar: 'لازم تضرب فوق وتحت. لو ضربت البسط بس، غيّرت قيمة الكسر.'
        },
        {
          en: 'Writing \\( (a+bi)(a-bi) = a^{2} - b^{2} \\). The correct result is \\( a^{2} + b^{2} \\).',
          ar: 'حاصل الضرب a² + b² مش a² − b². الإشارتين السالبتين بيلغوا بعض.'
        }
      ]
    }
  ],

  /* ---------------------------------------------------------- exercises */
  exercises: ['q-130', 'q-131', 'q-135', 'q-132', 'q-133', 'q-134'],
  exercisesAr:
    'حل التمارين دي بنفسك الأول. لو الإجابة غلط، اضغط على «Watch solution» وشوف الحل بالفيديو قبل ما تعدّي للي بعده. ' +
    'التمارين مرتبة زي الدرس: قوى i، ثم الجذور والعمليات، ثم المعادلات والتساوي.',

  /* --------------------------------------------------------------- quiz */
  quiz: ['q-140', 'q-141', 'q-142', 'q-143', 'q-144'],
  quizAr:
    'خمس أسئلة اختيار من متعدد — نفس شكل النص الأول من امتحان السنة دي. ' +
    'جاوب على كلهم الأول وبعدين اضغط تسليم، وفيديو الحل هيظهر للأسئلة اللي غلطت فيها بس.',

  /* ----------------------------------------------------------- homework */
  homework: {
    instructionsAr:
      'الواجب ده مبني على شكل امتحان السنة دي: نصه اختيار من متعدد ونصه أسئلة مقالية. ' +
      'اكتب اسمك ورقم موبايلك صح — دي هويتك على المنصة والدرجة بتترصد عليها. ' +
      'الأسئلة المقالية اتقسمت خطوات قصيرة عشان تتصحّح لك فوراً وتعرف ضيعت عند أنهي خطوة بالظبط، ' +
      'وآخر سؤال الدكتور وسام بيصححه بنفسه ويرد عليك. ' +
      'التسليم مرة واحدة بس، فراجع قبل ما تبعت — وأول ما تسلّم الدرس التالي بيفتح لك على طول.',
    auto: ['h-220', 'h-221', 'h-222', 'h-223', 'h-224', 'h-225', 'h-226', 'h-227', 'h-229'],
    manual: ['h-228']
  },

  /* ------------------------------------------------------------ next step */
  /* Ignored: this lesson IS in data/course.js, so the engine takes the next
     step from the map. Kept only as a fallback if the map ever loses it. */
  next: { href: 'index.html', label: 'ارجع لصفحتك' }
};

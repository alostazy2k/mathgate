/* ==========================================================================
   COURSE MAP  ·  data/course.js
   --------------------------------------------------------------------------
   The whole platform's table of contents, in one place. This file is DATA,
   not code: adding a lesson, renaming a unit or opening a locked one is an
   edit here and nowhere else. No page and no engine file has to change.

   Two independent flags decide what a student sees:

     data   the name of the lesson's file in data/ (without .js), or null.
            null    → the lesson is listed but not built yet  → «قريباً»
            's1-u1-l4' → data/s1-u1-l4.js exists and the lesson can open

            The name does NOT have to match the lesson's id. Two entries may
            point at the same file — which is how you PREVIEW a door before
            the lessons behind it are recorded. Set lesson 1–1 to
            data: 'u1-l1' and you suddenly have two openable lessons, so the
            registration gate has a second lesson to guard and you can see it
            work. Put it back to null when you are done looking.

     free   set on the UNIT.  true  → open to everyone
                              false → opens with a subscription
            Unit 1 is free by design: it is what brings the student in.

   The homework gate still applies on top of both: a ready, free lesson stays
   locked until the previous lesson's homework has been sent.

   Lesson ids carry the year: s1-u2-l3 = Grade 1 Secondary, Unit 2, Lesson 3.
   The prefix is what keeps three different years from colliding in the
   student's browser storage later.
   ========================================================================== */

window.COURSE = {

  meta: {
    author: 'Dr. Wessam Gouda',
    curriculum: 'Egyptian national curriculum · 2026 / 2027'
  },

  /* ----------------------------------------------------------------------
     THE TRIAL LESSON
     Real Functions was built to settle the lesson format. It keeps its
     original id `u1-l1`, so nothing already done on it is lost.

     `year` says WHOSE trial it is. It is now 's2' — Grade 2 Secondary, whose
     own content has not started — so a Grade 1 student never sees it: his
     page shows the real syllabus and nothing else, which is the whole point
     of replacing the trial with lesson 1-1.
     Set `show: false` the day you want it gone entirely.
     ---------------------------------------------------------------------- */
  demo: {
    show: true,
    year: 's2',
    id: 'u1-l1',
    data: 'u1-l1',
    title: 'Real Functions',
    titleAr: 'الدوال الحقيقية',
    noteAr: 'درس تجريبي — موجود عشان تشوف شكل الدرس كامل: فيديو، شرح، تمارين، كويز، وواجب. مش من المنهج الرسمي.'
  },

  /* ----------------------------------------------------------------------
     THE YEARS
     All three are listed from day one. A year with ready:false is shown
     and chooseable, but lands on a short «قريباً» page instead of a map —
     an empty year the student can see is a promise; a hidden one is nothing.
     ---------------------------------------------------------------------- */
  years: [

    {
      id: 'p3',
      label: 'الصف الثالث الإعدادي',
      en: 'Grade 3 Preparatory',
      ready: false,
      soonAr: 'المنهج بيتجدّد السنة الجاية، فالمحتوى هيتبني على النسخة الجديدة أول ما تنزل.',
      terms: []
    },

    {
      id: 's1',
      label: 'الصف الأول الثانوي',
      en: 'Grade 1 Secondary',
      ready: true,
      terms: [{
        id: 't1',
        label: 'الترم الأول',
        en: 'Term 1',
        units: [

          {
            no: 1,
            title: 'Algebra, Relations and Functions',
            titleAr: 'الجبر والعلاقات والدوال',
            free: true,
            lessons: [
              { id: 's1-u1-l1', no: '1–1', data: 's1-u1-l1',
                title: 'Complex Numbers — An Introduction',
                titleAr: 'مقدمة في الأعداد المركبة' },
              { id: 's1-u1-l2', no: '1–2', data: null,
                title: 'The Nature of the Roots of a Quadratic Equation',
                titleAr: 'نوع جذري المعادلة التربيعية' },
              { id: 's1-u1-l3', no: '1–3', data: null,
                title: 'The Relation Between the Roots and the Coefficients',
                titleAr: 'العلاقة بين جذري معادلة الدرجة الثانية ومعاملات حدودها' },
              { id: 's1-u1-l4', no: '1–4', data: null,
                title: 'The Sign of a Function',
                titleAr: 'إشارة الدالة' },
              { id: 's1-u1-l5', no: '1–5', data: null,
                title: 'Quadratic Inequalities in One Variable',
                titleAr: 'متباينات الدرجة الثانية في متغير واحد' }
            ]
          },

          {
            no: 2,
            title: 'Similarity',
            titleAr: 'التشابه',
            free: false,
            lessons: [
              { id: 's1-u2-l1', no: '2–1', data: null,
                title: 'Similarity of Polygons',
                titleAr: 'تشابه المضلعات' },
              { id: 's1-u2-l2', no: '2–2', data: null,
                title: 'Similarity of Triangles',
                titleAr: 'تشابه المثلثات' },
              { id: 's1-u2-l3', no: '2–3', data: null,
                title: 'Areas of Similar Polygons',
                titleAr: 'العلاقة بين مساحتي مضلعين متشابهين' },
              { id: 's1-u2-l4', no: '2–4', data: null,
                title: 'Applications of Similarity in Circles',
                titleAr: 'تطبيقات التشابه في الدائرة' }
            ]
          },

          {
            no: 3,
            title: 'Proportionality Theorems in Triangles',
            titleAr: 'نظريات التناسب في المثلث',
            free: false,
            lessons: [
              { id: 's1-u3-l1', no: '3–1', data: null,
                title: 'Parallel Lines and Proportional Parts',
                titleAr: 'المستقيمات المتوازية والأجزاء المتناسبة' },
              { id: 's1-u3-l2', no: '3–2', data: null,
                title: 'Angle Bisectors and Proportional Parts',
                titleAr: 'منصفات الزوايا والأجزاء المتناسبة' }
            ]
          },

          {
            no: 4,
            title: 'Trigonometry',
            titleAr: 'حساب المثلثات',
            free: false,
            lessons: [
              { id: 's1-u4-l1', no: '4–1', data: null,
                title: 'Directed Angles',
                titleAr: 'الزوايا الموجهة' },
              { id: 's1-u4-l2', no: '4–2', data: null,
                title: 'Degree and Radian Measure',
                titleAr: 'القياس الستيني والدائري للزاوية' },
              { id: 's1-u4-l3', no: '4–3', data: null,
                title: 'Trigonometric Functions',
                titleAr: 'الدوال المثلثية' },
              { id: 's1-u4-l4', no: '4–4', data: null,
                title: 'Related Angles',
                titleAr: 'الزوايا المرتبطة' },
              { id: 's1-u4-l5', no: '4–5', data: null,
                title: 'Graphs of Trigonometric Functions',
                titleAr: 'التمثيل البياني للدوال المثلثية' },
              { id: 's1-u4-l6', no: '4–6', data: null,
                title: 'Finding an Angle from a Trigonometric Ratio',
                titleAr: 'إيجاد قياس الزاوية بمعلومية إحدى نسبها المثلثية' }
            ]
          }

        ]
      }]
    },

    {
      id: 's2',
      label: 'الصف الثاني الثانوي',
      en: 'Grade 2 Secondary',
      ready: false,
      soonAr: 'بيتبني بعد ما يخلص أولى ثانوي.',
      terms: []
    }

  ]
};

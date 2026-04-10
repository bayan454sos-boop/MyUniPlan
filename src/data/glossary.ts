export interface GlossaryTerm {
  term_en: string;
  term_ar: string;
  definition_en: string;
  definition_ar: string;
  example_en: string;
  example_ar: string;
}

export const ACADEMIC_GLOSSARY: GlossaryTerm[] = [
  {
    term_en: "GPA (Grade Point Average)",
    term_ar: "المعدل التراكمي (GPA)",
    definition_en: "A numerical representation of a student's academic achievement, calculated by dividing the total grade points earned by the total credit hours attempted. It serves as a standard measure of academic performance across a semester or the entire degree program.",
    definition_ar: "تمثيل رقمي للإنجاز الأكاديمي للطالب، يتم حسابه بقسمة إجمالي نقاط التقدير المكتسبة على إجمالي الساعات المعتمدة المسجلة. يعمل كمقياس قياسي للأداء الأكاديمي خلال الفصل الدراسي أو البرنامج الدراسي بأكمله.",
    example_en: "Maintaining a high GPA is essential for academic honors and scholarships.",
    example_ar: "الحفاظ على معدل تراكمي مرتفع أمر ضروري للحصول على مرتبة الشرف والمنح الدراسية."
  },
  {
    term_en: "Credit Hours",
    term_ar: "الساعات المعتمدة",
    definition_en: "A unit of measure used to represent the academic value of a course. Typically, one credit hour corresponds to one hour of classroom instruction per week over a 15-week semester. It determines the weight of a course in the overall GPA calculation and the student's progress toward graduation.",
    definition_ar: "وحدة قياس تستخدم لتمثيل القيمة الأكاديمية للمساق. عادةً ما تعادل الساعة المعتمدة الواحدة ساعة واحدة من التدريس في الفصل أسبوعياً على مدار فصل دراسي مدته 15 أسبوعاً. وهي تحدد وزن المساق في حساب المعدل التراكمي الإجمالي وتقدم الطالب نحو التخرج.",
    example_en: "A student must complete 132 credit hours to graduate from this program.",
    example_ar: "يجب على الطالب إكمال 132 ساعة معتمدة للتخرج من هذا البرنامج."
  },
  {
    term_en: "Elective Courses",
    term_ar: "المساقات الاختيارية",
    definition_en: "Courses that students can choose from a list of options within their degree plan. Electives allow students to explore areas of interest outside their core requirements or to specialize in a specific sub-field. They are categorized into University, College, or Specialization electives.",
    definition_ar: "المساقات التي يمكن للطلاب اختيارها من قائمة خيارات ضمن خطتهم الدراسية. تسمح المساقات الاختيارية للطلاب باستكشاف مجالات الاهتمام خارج متطلباتهم الأساسية أو التخصص في مجال فرعي محدد. وتصنف إلى اختياري جامعة، أو كلية، أو تخصص.",
    example_en: "Students can choose 'Creative Writing' as a specialization elective in Semester 7.",
    example_ar: "يمكن للطلاب اختيار 'الكتابة الإبداعية' كمساق اختياري تخصص في الفصل السابع."
  },
  {
    term_en: "Academic Probation",
    term_ar: "الملاحظة الأكاديمية",
    definition_en: "A formal warning status issued to students whose cumulative Grade Point Average (GPA) falls below the university's minimum requirement (typically 2.0). During this period, students are often restricted in their credit load and must improve their GPA to avoid academic dismissal.",
    definition_ar: "حالة تحذير رسمية تصدر للطلاب الذين ينخفض معدلهم التراكمي (GPA) عن الحد الأدنى المطلوب في الجامعة (عادةً 2.0). خلال هذه الفترة، غالباً ما يتم تقييد العبء الدراسي للطلاب ويجب عليهم تحسين معدلهم لتجنب الفصل الأكاديمي.",
    example_en: "Students on academic probation must meet with their academic advisor regularly.",
    example_ar: "يجب على الطلاب تحت الملاحظة الأكاديمية مقابلة مرشدهم الأكاديمي بانتظام."
  },
  {
    term_en: "Specialization Courses",
    term_ar: "مساقات التخصص",
    definition_en: "Core courses specifically designed for the student's major field of study (e.g., English Language). These courses provide the deep knowledge and skills required for professional expertise in the chosen discipline.",
    definition_ar: "المساقات الأساسية المصممة خصيصاً لمجال الدراسة الرئيسي للطالب (مثل اللغة الإنجليزية). توفر هذه المساقات المعرفة والمهارات العميقة المطلوبة للخبرة المهنية في التخصص المختار.",
    example_en: "Advanced English Grammar is a core specialization course.",
    example_ar: "قواعد اللغة الإنجليزية المتقدمة هي مساق تخصص أساسي."
  },
  {
    term_en: "University Courses",
    term_ar: "متطلبات الجامعة",
    definition_en: "General education courses required for all students regardless of their major. These courses aim to provide a broad foundation of knowledge in areas such as languages, culture, and basic skills.",
    definition_ar: "مساقات التعليم العام المطلوبة لجميع الطلاب بغض النظر عن تخصصهم. تهدف هذه المساقات إلى توفير أساس واسع من المعرفة في مجالات مثل اللغات والثقافة والمهارات الأساسية.",
    example_en: "Oman and Islamic Civilization is a mandatory university course.",
    example_ar: "عمان والحضارة الإسلامية هو مساق جامعة إلزامي."
  },
  {
    term_en: "College Courses",
    term_ar: "متطلبات الكلية",
    definition_en: "Courses required for all students within a specific college (e.g., College of Education). These courses bridge the gap between general university requirements and specific major requirements, focusing on the broader field of study.",
    definition_ar: "المساقات المطلوبة لجميع الطلاب داخل كلية معينة (مثل كلية التربية). تسد هذه المساقات الفجوة بين متطلبات الجامعة العامة ومتطلبات التخصص المحددة، مع التركيز على المجال الدراسي الأوسع.",
    example_en: "Educational Foundations is a required college course for education students.",
    example_ar: "أسس التربية هو مساق كلية مطلوب لطلاب التربية."
  }
];

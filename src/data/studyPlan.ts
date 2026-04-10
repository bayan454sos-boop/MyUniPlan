export interface Course {
  code: string;
  title_en: string;
  title_ar: string;
  credits: number;
  type: 'university' | 'college' | 'specialization';
  prerequisites: string[];
  semester: number;
  isElective?: boolean;
  electiveGroupId?: string;
  description_en: string;
  description_ar: string;
}

export const ENGLISH_PROGRAM_PLAN: Course[] = [
  // Semester 1
  { 
    code: 'UNEN1102', 
    title_en: 'English for Academic Purposes', 
    title_ar: 'الإنجليزية لأغراض أكاديمية', 
    credits: 3, 
    type: 'university', 
    prerequisites: [], 
    semester: 1,
    description_en: 'Focuses on developing academic reading, writing, listening, and speaking skills required for university studies.',
    description_ar: 'يركز على تطوير مهارات القراءة والكتابة والاستماع والتحدث الأكاديمية المطلوبة للدراسات الجامعية.'
  },
  { 
    code: 'EDEF1102', 
    title_en: 'Educational Foundations', 
    title_ar: 'أسس التربية', 
    credits: 2, 
    type: 'college', 
    prerequisites: [], 
    semester: 1,
    description_en: 'Explores the historical, philosophical, and sociological foundations of education.',
    description_ar: 'يستكشف الأسس التاريخية والفلسفية والاجتماعية للتربية.'
  },
  { 
    code: 'EDEN1101', 
    title_en: 'Adv. English Language Awareness: Grammar', 
    title_ar: 'الوعي المتقدم باللغة الإنجليزية: القواعد', 
    credits: 3, 
    type: 'specialization', 
    prerequisites: [], 
    semester: 1,
    description_en: 'In-depth study of English grammar structures and their usage in various contexts.',
    description_ar: 'دراسة متعمقة لهياكل قواعد اللغة الإنجليزية واستخدامها في سياقات مختلفة.'
  },
  { 
    code: 'EDEN1102', 
    title_en: 'Adv. English Language Awareness: Listening & Speaking', 
    title_ar: 'الوعي المتقدم باللغة الإنجليزية: الاستماع والتحدث', 
    credits: 4, 
    type: 'specialization', 
    prerequisites: [], 
    semester: 1,
    description_en: 'Enhances advanced listening comprehension and oral communication skills in English.',
    description_ar: 'يعزز مهارات الاستماع والفهم والتواصل الشفهي المتقدمة باللغة الإنجليزية.'
  },
  { 
    code: 'EDEN1103', 
    title_en: 'Writing for Professional Purposes', 
    title_ar: 'الكتابة لأغراض مهنية', 
    credits: 3, 
    type: 'specialization', 
    prerequisites: [], 
    semester: 1,
    description_en: 'Develops writing skills for professional environments, including reports, emails, and proposals.',
    description_ar: 'يطور مهارات الكتابة للبيئات المهنية، بما في ذلك التقارير ورسائل البريد الإلكتروني والمقترحات.'
  },
  { 
    code: 'EDEN1104', 
    title_en: 'Critical Thinking, Language and Ethics', 
    title_ar: 'التفكير النقدي واللغة والأخلاق', 
    credits: 2, 
    type: 'specialization', 
    prerequisites: [], 
    semester: 1,
    description_en: 'Examines the relationship between language, critical thinking, and ethical considerations in communication.',
    description_ar: 'يفحص العلاقة بين اللغة والتفكير النقدي والاعتبارات الأخلاقية في التواصل.'
  },

  // Semester 2
  { 
    code: 'UNAB4105', 
    title_en: 'Arabic Language Skills', 
    title_ar: 'مهارات اللغة العربية', 
    credits: 3, 
    type: 'university', 
    prerequisites: [], 
    semester: 2,
    description_en: 'Focuses on improving proficiency in Arabic language skills, including grammar, reading, and writing.',
    description_ar: 'يركز على تحسين الكفاءة في مهارات اللغة العربية، بما في ذلك القواعد والقراءة والكتابة.'
  },
  { 
    code: 'UNEN1203', 
    title_en: 'Technical Writing', 
    title_ar: 'الكتابة التقنية', 
    credits: 3, 
    type: 'university', 
    prerequisites: [], 
    semester: 2,
    description_en: 'Introduces the principles and practices of technical communication and documentation.',
    description_ar: 'يقدم مبادئ وممارسات التواصل التقني والتوثيق.'
  },
  { 
    code: 'EDEP1204', 
    title_en: 'Educational Psychology', 
    title_ar: 'علم النفس التربوي', 
    credits: 2, 
    type: 'college', 
    prerequisites: [], 
    semester: 2,
    description_en: 'Studies psychological theories and principles applied to teaching and learning processes.',
    description_ar: 'يدرس النظريات والمبادئ النفسية المطبقة على عمليات التدريس والتعلم.'
  },
  { 
    code: 'EDEN1205', 
    title_en: 'Adv. English Language Awareness: Reading & Writing', 
    title_ar: 'الوعي المتقدم باللغة الإنجليزية: القراءة والكتابة', 
    credits: 4, 
    type: 'specialization', 
    prerequisites: [], 
    semester: 2,
    description_en: 'Develops advanced reading comprehension and academic writing skills in English.',
    description_ar: 'يطور مهارات القراءة والفهم والكتابة الأكاديمية المتقدمة باللغة الإنجليزية.'
  },
  { 
    code: 'EDEN1207', 
    title_en: 'Introduction to Linguistics', 
    title_ar: 'مقدمة في اللسانيات', 
    credits: 3, 
    type: 'specialization', 
    prerequisites: [], 
    semester: 2,
    description_en: 'Provides an overview of the scientific study of language, including phonology, morphology, and syntax.',
    description_ar: 'يقدم نظرة عامة على الدراسة العلمية للغة، بما في ذلك علم الأصوات والصرف والنحو.'
  },
  { 
    code: 'EDEN1206', 
    title_en: 'Critical Reading', 
    title_ar: 'القراءة النقدية', 
    credits: 2, 
    type: 'specialization', 
    prerequisites: [], 
    semester: 2,
    description_en: 'Develops skills for analyzing and evaluating complex texts from a critical perspective.',
    description_ar: 'يطور مهارات تحليل وتقييم النصوص المعقدة من منظور نقدي.'
  },

  // Semester 3
  { 
    code: 'EDCM2103', 
    title_en: 'General Curriculum & Teaching Methods', 
    title_ar: 'المناهج العامة وطرق التدريس', 
    credits: 2, 
    type: 'college', 
    prerequisites: [], 
    semester: 3,
    description_en: 'Introduces curriculum design principles and various teaching strategies and methods.',
    description_ar: 'يقدم مبادئ تصميم المناهج ومختلف استراتيجيات وطرق التدريس.'
  },
  { 
    code: 'EDRS2102', 
    title_en: 'Research Methods & Statistics', 
    title_ar: 'مناهج البحث والإحصاء', 
    credits: 2, 
    type: 'college', 
    prerequisites: [], 
    semester: 3,
    description_en: 'Covers basic research methodologies and statistical techniques used in educational research.',
    description_ar: 'يغطي منهجيات البحث الأساسية والتقنيات الإحصائية المستخدمة في البحوث التربوية.'
  },
  { 
    code: 'EDCS2102', 
    title_en: 'Advanced Computer Skills', 
    title_ar: 'مهارات الحاسوب المتقدمة', 
    credits: 2, 
    type: 'college', 
    prerequisites: [], 
    semester: 3,
    description_en: 'Develops advanced proficiency in using computer applications for educational and professional purposes.',
    description_ar: 'يطور كفاءة متقدمة في استخدام تطبيقات الحاسوب للأغراض التربوية والمهنية.'
  },
  { 
    code: 'EDEN2108', 
    title_en: 'Phonetics and Phonology', 
    title_ar: 'علم الأصوات والنطق', 
    credits: 3, 
    type: 'specialization', 
    prerequisites: ['EDEN1207'], 
    semester: 3,
    description_en: 'Studies the production, transmission, and perception of speech sounds in English.',
    description_ar: 'يدرس إنتاج ونقل وإدراك أصوات الكلام في اللغة الإنجليزية.'
  },
  { 
    code: 'EDEN2109', 
    title_en: 'Introduction to Literature', 
    title_ar: 'مقدمة في الأدب', 
    credits: 3, 
    type: 'specialization', 
    prerequisites: [], 
    semester: 3,
    description_en: 'Introduces the major genres of literature, including poetry, drama, and fiction.',
    description_ar: 'يقدم الأنواع الرئيسية للأدب، بما في ذلك الشعر والدراما والرواية.'
  },
  { 
    code: 'EDEN2110', 
    title_en: 'Special Topics in Applied Linguistics', 
    title_ar: 'مواضيع خاصة في اللسانيات التطبيقية', 
    credits: 3, 
    type: 'specialization', 
    prerequisites: ['EDEN1207'], 
    semester: 3,
    description_en: 'Explores specific areas of applied linguistics, such as sociolinguistics or psycholinguistics.',
    description_ar: 'يستكشف مجالات محددة من اللسانيات التطبيقية، مثل اللسانيات الاجتماعية أو اللسانيات النفسية.'
  },

  // Semester 4
  { 
    code: 'UNEN3104', 
    title_en: 'Public Speaking', 
    title_ar: 'الخطابة العامة', 
    credits: 3, 
    type: 'university', 
    prerequisites: [], 
    semester: 4,
    description_en: 'Develops skills for preparing and delivering effective public speeches and presentations.',
    description_ar: 'يطور مهارات إعداد وتقديم الخطب والعروض التقديمية العامة الفعالة.'
  },
  { 
    code: 'EDTM2206', 
    title_en: 'ELT Methods', 
    title_ar: 'طرق تدريس اللغة الإنجليزية', 
    credits: 4, 
    type: 'specialization', 
    prerequisites: ['EDCM2103'], 
    semester: 4,
    description_en: 'Focuses on specific methods and techniques for teaching English as a second or foreign language.',
    description_ar: 'يركز على طرق وتقنيات محددة لتدريس اللغة الإنجليزية كلغة ثانية أو أجنبية.'
  },
  { 
    code: 'EDTC2202', 
    title_en: 'Education Technology for ELT', 
    title_ar: 'تكنولوجيا التعليم لتدريس الإنجليزية', 
    credits: 2, 
    type: 'college', 
    prerequisites: ['EDCS2102'], 
    semester: 4,
    description_en: 'Explores the integration of technology in English language teaching and learning.',
    description_ar: 'يستكشف دمج التكنولوجيا في تدريس وتعلم اللغة الإنجليزية.'
  },
  { 
    code: 'EDEN2211', 
    title_en: 'Morphology and Syntax', 
    title_ar: 'علم الصرف والنحو', 
    credits: 3, 
    type: 'specialization', 
    prerequisites: ['EDEN1207'], 
    semester: 4,
    description_en: 'Studies the internal structure of words and the rules for combining words into sentences.',
    description_ar: 'يدرس البنية الداخلية للكلمات وقواعد دمج الكلمات في جمل.'
  },
  { 
    code: 'EDEN2213', 
    title_en: 'Initial Literacy in English', 
    title_ar: 'القراءة والكتابة الأولية بالإنجليزية', 
    credits: 3, 
    type: 'specialization', 
    prerequisites: [], 
    semester: 4,
    description_en: 'Focuses on teaching early reading and writing skills to young learners of English.',
    description_ar: 'يركز على تدريس مهارات القراءة والكتابة المبكرة لمتعلمي اللغة الإنجليزية الصغار.'
  },
  { 
    code: 'EDEN2214', 
    title_en: 'Children\'s Literature', 
    title_ar: 'أدب الأطفال', 
    credits: 3, 
    type: 'specialization', 
    prerequisites: [], 
    semester: 4,
    description_en: 'Examines various genres and themes in literature written for children.',
    description_ar: 'يفحص مختلف الأنواع والموضوعات في الأدب المكتوب للأطفال.'
  },

  // Semester 5
  { 
    code: 'EDAE3106', 
    title_en: 'Psychometric Assessment & Evaluation', 
    title_ar: 'القياس النفسي والتقويم التربوي', 
    credits: 3, 
    type: 'specialization', 
    prerequisites: ['EDRS2102'], 
    semester: 5,
    description_en: 'Covers the principles and techniques of psychological and educational testing and evaluation.',
    description_ar: 'يغطي مبادئ وتقنيات الاختبار والتقييم النفسي والتربوي.'
  },
  { 
    code: 'EDSM3104', 
    title_en: 'School Management', 
    title_ar: 'الإدارة المدرسية', 
    credits: 2, 
    type: 'college', 
    prerequisites: ['EDEF1102'], 
    semester: 5,
    description_en: 'Introduces the principles and practices of school administration and management.',
    description_ar: 'يقدم مبادئ وممارسات الإدارة المدرسية.'
  },
  { 
    code: 'EDPR3109', 
    title_en: 'Practicum 1', 
    title_ar: 'التربية العملية 1', 
    credits: 3, 
    type: 'college', 
    prerequisites: ['EDTM2206'], 
    semester: 5,
    description_en: 'First supervised teaching experience in a real classroom setting.',
    description_ar: 'أول تجربة تدريس تحت الإشراف في بيئة صفية حقيقية.'
  },
  { 
    code: 'EDEN3114', 
    title_en: 'Language Acquisition', 
    title_ar: 'اكتساب اللغة', 
    credits: 3, 
    type: 'specialization', 
    prerequisites: [], 
    semester: 5,
    description_en: 'Examines the theories and processes of first and second language acquisition.',
    description_ar: 'يفحص نظريات وعمليات اكتساب اللغة الأولى والثانية.'
  },
  { 
    code: 'EDEN3115', 
    title_en: 'Semantics and Pragmatics', 
    title_ar: 'علم الدلالة والبراغماتية', 
    credits: 3, 
    type: 'specialization', 
    prerequisites: ['EDEN1207'], 
    semester: 5,
    description_en: 'Studies the meaning of words and sentences and how context influences meaning.',
    description_ar: 'يدرس معنى الكلمات والجمل وكيف يؤثر السياق على المعنى.'
  },
  { 
    code: 'EDEN3119', 
    title_en: 'Language Competencies, Planning and Evaluation', 
    title_ar: 'الكفايات اللغوية والتخطيط والتقويم', 
    credits: 2, 
    type: 'specialization', 
    prerequisites: [], 
    semester: 5,
    description_en: 'Focuses on planning and evaluating language learning outcomes and competencies.',
    description_ar: 'يركز على تخطيط وتقييم مخرجات وكفايات تعلم اللغة.'
  },
  { 
    code: 'EDEN3116', 
    title_en: 'World Literature', 
    title_ar: 'الأدب العالمي', 
    credits: 2, 
    type: 'specialization', 
    prerequisites: ['EDEN2109'], 
    semester: 5, 
    isElective: true, 
    electiveGroupId: 'sem5_elective',
    description_en: 'Explores significant literary works from various cultures and regions around the world.',
    description_ar: 'يستكشف الأعمال الأدبية الهامة من مختلف الثقافات والمناطق حول العالم.'
  },
  { 
    code: 'EDEN3117', 
    title_en: 'Contemporary Literature', 
    title_ar: 'الأدب المعاصر', 
    credits: 2, 
    type: 'specialization', 
    prerequisites: ['EDEN2109'], 
    semester: 5, 
    isElective: true, 
    electiveGroupId: 'sem5_elective',
    description_en: 'Examines modern literary trends and works from the late 20th century to the present.',
    description_ar: 'يفحص الاتجاهات والأعمال الأدبية الحديثة من أواخر القرن العشرين إلى الوقت الحاضر.'
  },
  { 
    code: 'EDEN3118', 
    title_en: 'Drama and Film Studies', 
    title_ar: 'دراسات الدراما والسينما', 
    credits: 2, 
    type: 'specialization', 
    prerequisites: ['EDEN2109'], 
    semester: 5, 
    isElective: true, 
    electiveGroupId: 'sem5_elective',
    description_en: 'Introduces the study of dramatic texts and their adaptation into film.',
    description_ar: 'يقدم دراسة النصوص الدرامية واقتباسها في السينما.'
  },

  // Semester 6
  { 
    code: 'UNIS2206', 
    title_en: 'Islamic Culture', 
    title_ar: 'الثقافة الإسلامية', 
    credits: 3, 
    type: 'college', 
    prerequisites: [], 
    semester: 6, 
    isElective: true, 
    electiveGroupId: 'sem6_uni_elective',
    description_en: 'Explores the principles, values, and history of Islamic culture and civilization.',
    description_ar: 'يستكشف مبادئ وقيم وتاريخ الثقافة والحضارة الإسلامية.'
  },
  { 
    code: 'UNOC2207', 
    title_en: 'Omani Civilization and Man', 
    title_ar: 'الحضارة العمانية والإنسان', 
    credits: 3, 
    type: 'college', 
    prerequisites: [], 
    semester: 6, 
    isElective: true, 
    electiveGroupId: 'sem6_uni_elective',
    description_en: 'Studies the history, heritage, and development of Omani civilization.',
    description_ar: 'يدرس تاريخ وتراث وتطور الحضارة العمانية.'
  },
  { 
    code: 'EDPR3216', 
    title_en: 'Practicum 2', 
    title_ar: 'التربية العملية 2', 
    credits: 3, 
    type: 'college', 
    prerequisites: ['EDPR3109'], 
    semester: 6,
    description_en: 'Second supervised teaching experience with increasing responsibility in the classroom.',
    description_ar: 'تجربة تدريس ثانية تحت الإشراف مع زيادة المسؤولية في الصف.'
  },
  { 
    code: 'EDEN3220', 
    title_en: 'Models & Tech for Lang. Competencies', 
    title_ar: 'نماذج وتقنيات الكفايات اللغوية', 
    credits: 4, 
    type: 'specialization', 
    prerequisites: [], 
    semester: 6,
    description_en: 'Explores various models and technologies used to develop language competencies.',
    description_ar: 'يستكشف مختلف النماذج والتقنيات المستخدمة لتطوير الكفايات اللغوية.'
  },
  { 
    code: 'EDEN3225', 
    title_en: 'Error Correction and Recognition', 
    title_ar: 'تصحيح الأخطاء والتعرف عليها', 
    credits: 3, 
    type: 'specialization', 
    prerequisites: [], 
    semester: 6,
    description_en: 'Focuses on identifying and correcting common errors made by English language learners.',
    description_ar: 'يركز على تحديد وتصحيح الأخطاء الشائعة التي يقع فيها متعلمو اللغة الإنجليزية.'
  },
  { 
    code: 'EDEN3226', 
    title_en: 'English Language Workshop', 
    title_ar: 'ورشة اللغة الإنجليزية', 
    credits: 3, 
    type: 'specialization', 
    prerequisites: [], 
    semester: 6,
    description_en: 'Practical workshop for developing advanced English language skills through various activities.',
    description_ar: 'ورشة عمل عملية لتطوير مهارات اللغة الإنجليزية المتقدمة من خلال أنشطة مختلفة.'
  },
  { 
    code: 'EDEN3222', 
    title_en: 'Psycholinguistics', 
    title_ar: 'علم النفس اللغوي', 
    credits: 2, 
    type: 'specialization', 
    prerequisites: ['EDEN1207'], 
    semester: 6, 
    isElective: true, 
    electiveGroupId: 'sem6_elective',
    description_en: 'Studies the psychological factors that enable humans to acquire, use, and understand language.',
    description_ar: 'يدرس العوامل النفسية التي تمكن البشر من اكتساب اللغة واستخدامها وفهمها.'
  },
  { 
    code: 'EDEN3223', 
    title_en: 'Sociolinguistics', 
    title_ar: 'علم الاجتماع اللغوي', 
    credits: 2, 
    type: 'specialization', 
    prerequisites: ['EDEN1207'], 
    semester: 6, 
    isElective: true, 
    electiveGroupId: 'sem6_elective',
    description_en: 'Examines the relationship between language and society, including dialects and language variation.',
    description_ar: 'يفحص العلاقة بين اللغة والمجتمع، بما في ذلك اللهجات وتنوع اللغة.'
  },
  { 
    code: 'EDEN3224', 
    title_en: 'Discourse Analysis', 
    title_ar: 'تحليل الخطاب', 
    credits: 2, 
    type: 'specialization', 
    prerequisites: ['EDEN1207'], 
    semester: 6, 
    isElective: true, 
    electiveGroupId: 'sem6_elective',
    description_en: 'Studies the use of language in social contexts and how meaning is constructed in discourse.',
    description_ar: 'يدرس استخدام اللغة في السياقات الاجتماعية وكيفية بناء المعنى في الخطاب.'
  },

  // Semester 7
  { 
    code: 'EDDM4109', 
    title_en: 'Developmental Psych & Mental Health', 
    title_ar: 'علم نفس النمو والصحة النفسية', 
    credits: 2, 
    type: 'college', 
    prerequisites: ['EDEP1204'], 
    semester: 7,
    description_en: 'Studies human development across the lifespan and principles of mental health in education.',
    description_ar: 'يدرس التطور البشري عبر مراحل العمر ومبادئ الصحة النفسية في التربية.'
  },
  { 
    code: 'EDPR4119', 
    title_en: 'Practicum 3', 
    title_ar: 'التربية العملية 3', 
    credits: 4, 
    type: 'college', 
    prerequisites: ['EDPR3216'], 
    semester: 7,
    description_en: 'Advanced supervised teaching experience with a focus on independent classroom management.',
    description_ar: 'تجربة تدريس متقدمة تحت الإشراف مع التركيز على الإدارة الصفية المستقلة.'
  },
  { 
    code: 'EDEN4129', 
    title_en: 'Aspects of Translation', 
    title_ar: 'جوانب الترجمة', 
    credits: 3, 
    type: 'specialization', 
    prerequisites: ['EDEN3226'], 
    semester: 7,
    description_en: 'Introduces the theory and practice of translation between English and Arabic.',
    description_ar: 'يقدم نظرية وممارسة الترجمة بين اللغتين الإنجليزية والعربية.'
  },
  { 
    code: 'EDEN4127', 
    title_en: 'Creative Writing', 
    title_ar: 'الكتابة الإبداعية', 
    credits: 2, 
    type: 'specialization', 
    prerequisites: ['EDEN3226'], 
    semester: 7, 
    isElective: true, 
    electiveGroupId: 'sem7_writing_elective',
    description_en: 'Develops skills for writing original literary works, such as stories and poems.',
    description_ar: 'يطور مهارات كتابة الأعمال الأدبية الأصلية، مثل القصص والقصائد.'
  },
  { 
    code: 'EDEN4128', 
    title_en: 'Debating and Rhetorical Strategies', 
    title_ar: 'المناظرة والاستراتيجيات البلاغية', 
    credits: 2, 
    type: 'specialization', 
    prerequisites: ['EDEN3226'], 
    semester: 7, 
    isElective: true, 
    electiveGroupId: 'sem7_writing_elective',
    description_en: 'Focuses on the art of persuasion and effective communication through debating.',
    description_ar: 'يركز على فن الإقناع والتواصل الفعال من خلال المناظرة.'
  },
  { 
    code: 'EDEN4130', 
    title_en: 'Semiotics and Multimodality', 
    title_ar: 'السيميائية وتعدد الوسائط', 
    credits: 2, 
    type: 'specialization', 
    prerequisites: [], 
    semester: 7, 
    isElective: true, 
    electiveGroupId: 'sem7_culture_elective',
    description_en: 'Studies signs and symbols and how they convey meaning in multimodal communication.',
    description_ar: 'يدرس العلامات والرموز وكيفية نقل المعنى في التواصل متعدد الوسائط.'
  },
  { 
    code: 'EDEN4131', 
    title_en: 'Language, Culture, and Identity', 
    title_ar: 'اللغة والثقافة والهوية', 
    credits: 2, 
    type: 'specialization', 
    prerequisites: [], 
    semester: 7, 
    isElective: true, 
    electiveGroupId: 'sem7_culture_elective',
    description_en: 'Examines the complex interplay between language, cultural background, and personal identity.',
    description_ar: 'يفحص التفاعل المعقد بين اللغة والخلفية الثقافية والهوية الشخصية.'
  },
  { 
    code: 'EDEN4132', 
    title_en: 'Language Development Through Stories and Arts', 
    title_ar: 'تطوير اللغة من خلال القصص والفنون', 
    credits: 3, 
    type: 'specialization', 
    prerequisites: [], 
    semester: 7,
    description_en: 'Explores creative ways to enhance language learning using storytelling and artistic expression.',
    description_ar: 'يستكشف طرقاً إبداعية لتعزيز تعلم اللغة باستخدام سرد القصص والتعبير الفني.'
  },

  // Semester 8
  { 
    code: 'UNEP2109', 
    title_en: 'Entrepreneurship: Creativity & Innovation', 
    title_ar: 'ريادة الأعمال: الإبداع والابتكار', 
    credits: 3, 
    type: 'college', 
    prerequisites: [], 
    semester: 8,
    description_en: 'Introduces the concepts of entrepreneurship, innovation, and business development.',
    description_ar: 'يقدم مفاهيم ريادة الأعمال والابتكار وتطوير الأعمال.'
  },
  { 
    code: 'EDPR4220', 
    title_en: 'Practicum 4', 
    title_ar: 'التربية العملية 4', 
    credits: 4, 
    type: 'college', 
    prerequisites: ['EDPR4119'], 
    semester: 8,
    description_en: 'Final intensive teaching practicum with full classroom responsibility.',
    description_ar: 'التطبيق العملي النهائي المكثف للتدريس مع المسؤولية الكاملة عن الصف.'
  },
  { 
    code: 'EDEN4235', 
    title_en: 'Graduation Research Project', 
    title_ar: 'مشروع بحث التخرج', 
    credits: 2, 
    type: 'specialization', 
    prerequisites: [], 
    semester: 8,
    description_en: 'Independent research project on a topic related to English language teaching.',
    description_ar: 'مشروع بحث مستقل حول موضوع متعلق بتدريس اللغة الإنجليزية.'
  },
  { 
    code: 'EDEN4232', 
    title_en: 'Autonomy and Differentiation in ELT', 
    title_ar: 'الاستقلالية والتمايز في تدريس الإنجليزية', 
    credits: 3, 
    type: 'specialization', 
    prerequisites: [], 
    semester: 8,
    description_en: 'Focuses on promoting learner autonomy and addressing diverse learning needs in ELT.',
    description_ar: 'يركز على تعزيز استقلالية المتعلم وتلبية احتياجات التعلم المتنوعة في تدريس الإنجليزية.'
  },
  { 
    code: 'EDEN4236', 
    title_en: 'Technology for Initial Language Literacy', 
    title_ar: 'التكنولوجيا للقراءة والكتابة الأولية باللغة', 
    credits: 2, 
    type: 'specialization', 
    prerequisites: [], 
    semester: 8, 
    isElective: true, 
    electiveGroupId: 'sem8_spec_elective',
    description_en: 'Explores technological tools and resources for teaching early literacy skills.',
    description_ar: 'يستكشف الأدوات والموارد التكنولوجية لتدريس مهارات القراءة والكتابة المبكرة.'
  },
  { 
    code: 'EDEN4237', 
    title_en: 'Computer-Assisted Translation', 
    title_ar: 'الترجمة بمعونة الحاسوب', 
    credits: 2, 
    type: 'specialization', 
    prerequisites: ['EDEN4129'], 
    semester: 8, 
    isElective: true, 
    electiveGroupId: 'sem8_spec_elective',
    description_en: 'Introduces software and tools that assist in the translation process.',
    description_ar: 'يقدم البرامج والأدوات التي تساعد في عملية الترجمة.'
  },
];

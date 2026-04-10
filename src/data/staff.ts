export interface Staff {
  id: number;
  name_en: string;
  name_ar: string;
  role_en: string;
  role_ar: string;
  email: string;
  phone: string;
  type: 'instructor' | 'admin';
}

export const STAFF_DATA: Staff[] = [
  {
    id: 1,
    name_en: 'Dr. Sharifa',
    name_ar: 'د. شريفة العدوية',
    role_en: 'Department Instructor',
    role_ar: 'محاضر بالقسم',
    email: 'sharifa.aladawi@utas.edu.om',
    phone: '',
    type: 'instructor'
  },
  {
    id: 2,
    name_en: 'Dr. Abdullah',
    name_ar: 'د. عبد الله العبري',
    role_en: 'Department Instructor',
    role_ar: 'محاضر بالقسم',
    email: 'abdullah.alabri@utas.edu.om',
    phone: '',
    type: 'instructor'
  },
  {
    id: 3,
    name_en: 'Muna Al-Ghafri',
    name_ar: 'أ. منى الغافرية',
    role_en: 'Head of Admission & Registration',
    role_ar: 'رئيسة مركز القبول والتسجيل',
    email: 'a.r.c-rustaq@utas.edu.om',
    phone: '26774968',
    type: 'admin'
  },
  {
    id: 4,
    name_en: 'Bader Al-Ghafri',
    name_ar: 'أ. بدر الغافري',
    role_en: 'Biology Specialization (SIS + CIMS)',
    role_ar: 'مواضيع تخصص الأحياء (SIS + CIMS)',
    email: 'bader.alghafri@utas.edu.om',
    phone: '26774964',
    type: 'admin'
  },
  {
    id: 5,
    name_en: 'Mohamed Al-Fouri',
    name_ar: 'أ. محمد الفوري',
    role_en: 'Physics Specialization (SIS + CIMS)',
    role_ar: 'مواضيع تخصص الفيزياء (SIS + CIMS)',
    email: 'mohamed.alfori@utas.edu.om',
    phone: '26774934',
    type: 'admin'
  },
  {
    id: 6,
    name_en: 'Younis Al-Nofli',
    name_ar: 'أ. يونس النوفلي',
    role_en: 'Math Specialization (SIS + CIMS)',
    role_ar: 'مواضيع تخصص الرياضيات (SIS + CIMS)',
    email: 'younis.alnofli@utas.edu.om',
    phone: '26774966',
    type: 'admin'
  },
  {
    id: 7,
    name_en: 'Fatma Al-Khatri',
    name_ar: 'أ. فاطمة الخاطرية',
    role_en: 'Chemistry Specialization (SIS + CIMS)',
    role_ar: 'مواضيع تخصص الكيمياء (SIS + CIMS)',
    email: 'fatma.alkhatri@utas.edu.om',
    phone: '26774967',
    type: 'admin'
  },
  {
    id: 8,
    name_en: 'Eman Al-Hinai',
    name_ar: 'أ. إيمان الهنائية',
    role_en: 'English Specialization (CIMS only)',
    role_ar: 'مواضيع تخصص اللغة الإنجليزية (CIMS فقط)',
    email: 'eman.s.alhinai@utas.edu.om',
    phone: '26774871',
    type: 'admin'
  },
  {
    id: 9,
    name_en: 'Khamis Al-Abri',
    name_ar: 'أ. خميس العبري',
    role_en: 'English (SIS only) + Scheduling & Exams',
    role_ar: 'مواضيع تخصص اللغة الإنجليزية (SIS فقط) + قسم الجدولة والاختبارات',
    email: 'khamis.alabri@utas.edu.om',
    phone: '26774969',
    type: 'admin'
  },
  {
    id: 10,
    name_en: 'Zahra Al-Abri',
    name_ar: 'أ. زهرة العبرية',
    role_en: 'Scheduling & Exams',
    role_ar: 'قسم الجدولة والاختبارات',
    email: 'zahra.alabri@utas.edu.om',
    phone: '26774965',
    type: 'admin'
  }
];

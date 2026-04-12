import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "app_name": "MyUniPlan",
      "tagline": "Track. Understand. Graduate Smarter.",
      "select_program": "Select Your Program",
      "english_program": "English Language Program",
      "coming_soon": "Coming Soon",
      "semester": "Semester",
      "credits": "Credits",
      "completed": "Completed",
      "in_progress": "In Progress",
      "not_taken": "Not Taken",
      "prerequisites": "Prerequisites",
      "locked": "Locked",
      "progress": "Overall Progress",
      "remaining": "Remaining",
      "expected_grad": "Expected Graduation",
      "graduated": "Graduated!",
      "add_from_plan": "Add from Study Plan...",
      "gpa_calculator": "GPA Calculator",
      "glossary": "Academic Glossary",
      "directory": "Contact Directory",
      "admin": "Admin Panel",
      "toggle_lang": "العربية",
      "course_code": "Code",
      "course_title": "Title",
      "course_type": "Type",
      "university_req": "University Requirement",
      "college_req": "College Requirement",
      "specialization_req": "Specialization Requirement",
      "save": "Save",
      "edit": "Edit",
      "reset": "Reset",
      "calculate": "Calculate",
      "grade": "Grade",
      "staff_instructors": "Department Instructors",
      "staff_admin": "Admission & Registration",
      "search": "Search...",
      "no_prereq": "No Prerequisites",
      "total_credits": "Total Credits",
      "current_gpa": "Current Cumulative GPA",
      "semester_gpa": "Semester GPA",
      "add_course": "Add Course",
      "remove": "Remove",
      "description": "Description",
      "elective_group": "Elective Group (Choose One)",
      "contact_lecturer": "Contact My Lecturer",
      "course_unlocked": "Course Unlocked!",
      "qualified_to_take": "{{from}} has unlocked {{course}}.",
      "it_opens": "It opens:",
      "copy_email": "Copy Email"
    }
  },
  ar: {
    translation: {
      "app_name": "خطة جامعتي",
      "tagline": "تتبع. افهم. تخرج بذكاء.",
      "select_program": "اختر تخصصك",
      "english_program": "برنامج اللغة الإنجليزية",
      "coming_soon": "قريباً",
      "semester": "الفصل الدراسي",
      "credits": "الساعات المعتمدة",
      "completed": "مكتمل",
      "in_progress": "قيد التنفيذ",
      "not_taken": "لم يؤخذ بعد",
      "prerequisites": "المتطلبات السابقة",
      "locked": "مغلق",
      "progress": "التقدم الإجمالي",
      "remaining": "المتبقي",
      "expected_grad": "التخرج المتوقع",
      "graduated": "تم التخرج!",
      "add_from_plan": "إضافة من الخطة الدراسية...",
      "gpa_calculator": "حاسبة المعدل",
      "glossary": "المصطلحات الأكاديمية",
      "directory": "دليل التواصل",
      "admin": "لوحة الإدارة",
      "toggle_lang": "English",
      "course_code": "الرمز",
      "course_title": "العنوان",
      "course_type": "النوع",
      "university_req": "متطلب جامعة",
      "college_req": "متطلب كلية",
      "specialization_req": "متطلب تخصص",
      "save": "حفظ",
      "edit": "تعديل",
      "reset": "إعادة ضبط",
      "calculate": "احسب",
      "grade": "الدرجة",
      "staff_instructors": "أعضاء هيئة التدريس بالقسم",
      "staff_admin": "مركز القبول والتسجيل",
      "search": "بحث...",
      "no_prereq": "لا توجد متطلبات سابقة",
      "total_credits": "إجمالي الساعات",
      "current_gpa": "المعدل التراكمي الحالي",
      "semester_gpa": "معدل الفصل",
      "add_course": "إضافة مساق",
      "remove": "حذف",
      "description": "الوصف",
      "elective_group": "مجموعة اختيارية (اختر واحداً)",
      "contact_lecturer": "تواصل مع المحاضر",
      "course_unlocked": "تم فتح مساق جديد!",
      "qualified_to_take": "لقد فتح {{from}} المساق {{course}}.",
      "it_opens": "يفتح هذا المساق:",
      "copy_email": "نسخ البريد الإلكتروني"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

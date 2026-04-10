import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, GraduationCap, AlertCircle, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const AskSenior: React.FC = () => {
  const { i18n } = useTranslation();

  const seniors = [
    { name_en: 'Bayan', name_ar: 'بيان', email: '1663s22119@utas.edu.om' },
    { name_en: 'Noor Al-Huda', name_ar: 'نور الهدى', email: '1633s2259@utas.edu.om' },
    { name_en: 'Ariyam', name_ar: 'أريام', email: '2021161081@utas.edu.om' },
    { name_en: 'Wedad', name_ar: 'وداد', email: '1633s2274@utas.edu.om' },
  ];

  const handleConnect = (email: string, name: string) => {
    const subject = i18n.language === 'ar' ? `طلب مساعدة أكاديمية - ${name}` : `Academic Assistance Request - ${name}`;
    const body = i18n.language === 'ar' 
      ? `مرحباً ${name}، أحتاج إلى بعض المساعدة بخصوص خطتي الدراسية...` 
      : `Hi ${name}, I need some help regarding my study plan...`;
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="bg-gradient-to-br from-red-600 via-orange-600 to-amber-500 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden text-center">
        <div className="relative z-10 space-y-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-md mx-auto"
          >
            <GraduationCap className="w-12 h-12" />
          </motion.div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">
              {i18n.language === 'ar' ? 'تواصل مع الخريجين' : 'Connect with Seniors'}
            </h1>
            <p className="text-red-50 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              {i18n.language === 'ar' 
                ? 'هل لديك أسئلة حول تخصصك أو خطتك الدراسية؟ نحن هنا للمساعدة! اختر أحد الخريجين أدناه للتواصل معه مباشرة.' 
                : 'Have questions about your major or study plan? We\'re here to help! Choose a senior below to connect with them directly.'}
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-10 pointer-events-none">
          <GraduationCap className="w-96 h-96" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {seniors.map((senior, idx) => (
          <motion.div
            key={senior.name_en}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-[2rem] border-2 border-slate-50 shadow-sm hover:shadow-xl hover:border-red-100 transition-all text-center space-y-6 group"
          >
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mx-auto group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              {i18n.language === 'ar' ? `تواصل مع ${senior.name_ar}` : `Connect with ${senior.name_en}`}
            </h3>
            <button
              onClick={() => handleConnect(senior.email, i18n.language === 'ar' ? senior.name_ar : senior.name_en)}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-red-600 transition-all shadow-lg"
            >
              <Mail className="w-5 h-5" />
              {i18n.language === 'ar' ? 'تواصل الآن' : 'Connect Now'}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="bg-slate-900 text-white rounded-[2rem] p-8 text-center space-y-4">
        <div className="flex justify-center gap-8 opacity-60">
          <div className="flex items-center gap-2 text-sm font-bold">
            <AlertCircle className="w-4 h-4" />
            {i18n.language === 'ar' ? 'استجابة سريعة' : 'Quick Response'}
          </div>
          <div className="flex items-center gap-2 text-sm font-bold">
            <MessageSquare className="w-4 h-4" />
            {i18n.language === 'ar' ? 'دعم الأقران' : 'Peer Support'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskSenior;

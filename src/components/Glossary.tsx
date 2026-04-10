import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ACADEMIC_GLOSSARY } from '../data/glossary';
import { Search, Book } from 'lucide-react';

const Glossary: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState('');

  const filtered = ACADEMIC_GLOSSARY.filter(item => {
    const s = search.toLowerCase();
    return item.term_en.toLowerCase().includes(s) || 
           item.term_ar.includes(s) ||
           item.definition_en.toLowerCase().includes(s) ||
           item.definition_ar.includes(s);
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600 rounded-xl text-white">
            <Book className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">{t('glossary')}</h1>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={t('search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b">
          <h2 className="font-bold text-slate-800">{i18n.language === 'ar' ? 'نظام التقديرات والمعدل التراكمي' : 'Grading System & GPA Ranges'}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/50">
              <tr>
                <th className="px-6 py-3 font-bold">{i18n.language === 'ar' ? 'النقاط' : 'GPA Points'}</th>
                <th className="px-6 py-3 font-bold">{i18n.language === 'ar' ? 'النسبة' : 'Percentage'}</th>
                <th className="px-6 py-3 font-bold">{i18n.language === 'ar' ? 'الرمز' : 'Grade'}</th>
                <th className="px-6 py-3 font-bold">{i18n.language === 'ar' ? 'الوصف' : 'Description'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { pts: '4.0', range: '95 – 100%', grade: 'A', desc_en: 'Excellent', desc_ar: 'تحقيق أهداف المقرر بمستوى متميز' },
                { pts: '3.7', range: '90 – 94%', grade: 'A-', desc_en: 'Excellent', desc_ar: 'تحقيق أهداف المقرر بمستوى متميز' },
                { pts: '3.3', range: '85 – 89%', grade: 'B+', desc_en: 'Very Good', desc_ar: 'تحقيق أهداف المقرر بمستوى متقن' },
                { pts: '3.0', range: '80 – 84%', grade: 'B', desc_en: 'Very Good', desc_ar: 'تحقيق أهداف المقرر بمستوى متقن' },
                { pts: '2.7', range: '75 – 79%', grade: 'B-', desc_en: 'Very Good', desc_ar: 'تحقيق أهداف المقرر بمستوى متقن' },
                { pts: '2.3', range: '70 – 74%', grade: 'C+', desc_en: 'Good', desc_ar: 'تحقيق أهداف المقرر بمستوى جيد' },
                { pts: '2.0', range: '65 – 69%', grade: 'C', desc_en: 'Good', desc_ar: 'تحقيق أهداف المقرر بمستوى جيد' },
                { pts: '1.7', range: '60 – 64%', grade: 'C-', desc_en: 'Good', desc_ar: 'تحقيق أهداف المقرر بمستوى جيد' },
                { pts: '1.3', range: '55 – 59%', grade: 'D+', desc_en: 'Fair', desc_ar: 'تحقيق أهداف المقرر بمستوى مرضٍ' },
                { pts: '1.0', range: '50 – 54%', grade: 'D', desc_en: 'Fair', desc_ar: 'تحقيق أهداف المقرر بمستوى مرضٍ' },
                { pts: '0.0', range: '< 50%', grade: 'F', desc_en: 'Unsatisfactory', desc_ar: 'عدم تحقيق أهداف المقرر' },
                { pts: '0.0', range: '—', grade: 'FW', desc_en: 'Fail (Absence)', desc_ar: 'الإخفاق بسبب الغياب' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-3 font-mono font-bold text-blue-600">{row.pts}</td>
                  <td className="px-6 py-3 text-slate-600">{row.range}</td>
                  <td className="px-6 py-3 font-bold text-slate-900">{row.grade}</td>
                  <td className="px-6 py-3 text-slate-500">
                    {i18n.language === 'ar' ? row.desc_ar : row.desc_en}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filtered.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-xl font-bold text-slate-900">
                {i18n.language === 'ar' ? item.term_ar : item.term_en}
              </h3>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {i18n.language === 'ar' ? item.term_en : item.term_ar}
              </span>
            </div>
            
            <div className="space-y-3">
              <p className="text-slate-600 leading-relaxed">
                {i18n.language === 'ar' ? item.definition_ar : item.definition_en}
              </p>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Example</span>
                <p className="text-sm italic text-slate-500">
                  {i18n.language === 'ar' ? item.example_ar : item.example_en}
                </p>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed">
            <p className="text-slate-400">No terms found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Glossary;

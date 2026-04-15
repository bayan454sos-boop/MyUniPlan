import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, Search, Users, ShieldCheck, MessageCircle, ExternalLink, Copy, Check } from 'lucide-react';
import { STAFF_DATA, Staff } from '../data/staff';
import { openInOutlook, copyToClipboard } from '../lib/emailUtils';
import { toast } from 'sonner';

const ContactDirectory: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'instructor' | 'admin'>('all');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleEmailClick = (e: React.MouseEvent, email: string) => {
    e.preventDefault();
    toast.success('Opening Outlook...');
    openInOutlook(email);
  };

  const handleCopyEmail = async (e: React.MouseEvent, email: string) => {
    e.preventDefault();
    e.stopPropagation();
    const success = await copyToClipboard(email);
    if (success) {
      setCopiedEmail(email);
      toast.success(i18n.language === 'ar' ? 'تم نسخ البريد الإلكتروني' : 'Email copied to clipboard');
      setTimeout(() => setCopiedEmail(null), 2000);
    }
  };

  const getWhatsAppLink = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const fullPhone = cleanPhone.startsWith('968') ? cleanPhone : `968${cleanPhone}`;
    return `https://wa.me/${fullPhone}`;
  };

  const filtered = STAFF_DATA.filter(s => {
    const matchesSearch = 
      s.name_en.toLowerCase().includes(search.toLowerCase()) ||
      s.name_ar.includes(search) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      (s.role_en && s.role_en.toLowerCase().includes(search.toLowerCase())) ||
      (s.role_ar && s.role_ar.includes(search));
    const matchesFilter = filter === 'all' || s.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-600 rounded-xl text-white">
            <Users className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">{t('directory')}</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t('search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {(['all', 'instructor', 'admin'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filter === f ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {f === 'all' ? 'All' : t(`staff_${f === 'instructor' ? 'instructors' : 'admin'}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((s) => (
          <div key={s.id} className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                {s.type === 'admin' ? <ShieldCheck className="w-6 h-6" /> : <Users className="w-6 h-6" />}
              </div>
              <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${
                s.type === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {t(`staff_${s.type === 'instructor' ? 'instructors' : 'admin'}`)}
              </span>
            </div>
            
            <div className="space-y-1 mb-6 flex-grow">
              <h3 className="text-lg font-bold text-slate-900">
                {i18n.language === 'ar' ? s.name_ar : s.name_en}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {i18n.language === 'ar' ? s.role_ar : s.role_en}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center justify-between group/link">
                <button 
                  onClick={(e) => handleEmailClick(e, s.email)}
                  className="flex items-center gap-3 text-sm text-slate-600 hover:text-emerald-600 transition-colors truncate flex-1 text-left"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span className="truncate">{s.email}</span>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleCopyEmail(e, s.email)}
                    className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                    title={t('copy_email')}
                  >
                    {copiedEmail === s.email ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <ExternalLink className="w-3 h-3 text-slate-300" />
                </div>
              </div>
              
              {s.phone && (
                <div className="flex items-center justify-between">
                  <a href={`tel:${s.phone}`} className="flex items-center gap-3 text-sm text-slate-600 hover:text-emerald-600 transition-colors">
                    <Phone className="w-4 h-4" />
                    {s.phone}
                  </a>
                  {s.email !== 'zahra.alabri@utas.edu.om' && (
                    <a 
                      href={getWhatsAppLink(s.phone)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
                      title="WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed">
          <p className="text-slate-400">No contacts found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ContactDirectory;

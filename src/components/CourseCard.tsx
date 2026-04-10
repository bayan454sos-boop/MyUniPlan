import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Lock, ChevronDown, ChevronUp, Info, Plus, Minus } from 'lucide-react';
import { Course, ENGLISH_PROGRAM_PLAN } from '../data/studyPlan';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AnimatePresence } from 'framer-motion';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CourseCardProps {
  course: Course;
  status: 'completed' | 'in_progress' | 'not_taken';
  isLocked: boolean;
  isRegistered?: boolean;
  onStatusChange: (code: string, status: 'completed' | 'in_progress' | 'not_taken') => void;
  onPrereqClick: (code: string) => void;
  onRegisterToggle?: (code: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  status, 
  isLocked, 
  isRegistered,
  onStatusChange, 
  onPrereqClick,
  onRegisterToggle
}) => {
  const { t, i18n } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPrereqTooltip, setShowPrereqTooltip] = useState(false);

  const title = i18n.language === 'ar' ? course.title_ar : course.title_en;

  const getPrereqName = (code: string) => {
    const p = ENGLISH_PROGRAM_PLAN.find(c => c.code === code);
    return p ? (i18n.language === 'ar' ? p.title_ar : p.title_en) : code;
  };

  const coursesItOpens = ENGLISH_PROGRAM_PLAN.filter(c => c.prerequisites.includes(course.code));

  const typeColors = {
    university: 'bg-blue-500/10 text-blue-600 border-blue-200',
    college: 'bg-purple-500/10 text-purple-600 border-purple-200',
    specialization: 'bg-utas-orange/10 text-utas-orange border-utas-orange/20',
  };

  const statusIcons = {
    completed: <CheckCircle2 className="w-5 h-5 text-utas-blue" />,
    in_progress: <Circle className="w-5 h-5 text-utas-orange fill-utas-orange/20" />,
    not_taken: <Circle className="w-5 h-5 text-slate-300" />,
  };

  return (
    <motion.div
      layout
      onClick={() => {
        if (isLocked) return;
        const nextStatus = status === 'not_taken' ? 'in_progress' : status === 'in_progress' ? 'completed' : 'not_taken';
        
        // Play synthesized click sound
        try {
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContextClass) {
            const context = new AudioContextClass();
            const oscillator = context.createOscillator();
            const gain = context.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, context.currentTime);
            
            gain.gain.setValueAtTime(0.05, context.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
            
            oscillator.connect(gain);
            gain.connect(context.destination);
            
            oscillator.start();
            oscillator.stop(context.currentTime + 0.1);
          }
        } catch (e) {
          console.warn("Audio feedback failed:", e);
        }

        onStatusChange(course.code, nextStatus);
      }}
      className={cn(
        "group relative bg-white border rounded-xl shadow-sm transition-all overflow-hidden cursor-pointer",
        isLocked ? "opacity-60 grayscale bg-slate-50 cursor-not-allowed" : "hover:shadow-md active:scale-[0.98]",
        status === 'completed' && "border-utas-blue/20 bg-utas-blue/5"
      )}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                {course.code}
              </span>
              <span className={cn("text-[10px] px-1.5 py-0.5 rounded border font-semibold uppercase tracking-tight", typeColors[course.type])}>
                {t(`${course.type}_req`)}
              </span>
            </div>
            <h3 className="font-semibold text-slate-900 leading-tight mb-2">
              {title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="font-medium text-slate-700">{course.credits}</span> {t('credits')}
              </span>
              {course.prerequisites.length > 0 && (
                <div className="relative">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPrereqTooltip(!showPrereqTooltip);
                    }}
                    className="flex items-center gap-1 text-amber-600 font-medium hover:text-amber-700 transition-colors"
                  >
                    <Info className="w-3 h-3" />
                    {course.prerequisites.length} {t('prerequisites')}
                  </button>

                  <AnimatePresence>
                    {showPrereqTooltip && (
                      <>
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={() => setShowPrereqTooltip(false)} 
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 5, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.95 }}
                          className="absolute left-0 top-full mt-2 w-64 p-3 bg-white border border-amber-100 rounded-xl shadow-xl z-50 text-xs"
                        >
                          <div className="font-bold text-amber-800 mb-2 border-b border-amber-50 pb-1">
                            {t('prerequisites')}
                          </div>
                          <ul className="space-y-2">
                            {course.prerequisites.map(pre => (
                              <li key={pre} className="flex gap-2 text-slate-600">
                                <span className="font-bold text-amber-600 shrink-0">{pre}:</span>
                                <span>{getPrereqName(pre)}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="relative">
              {isLocked ? (
                <div className="p-2 text-slate-400" title={t('locked')}>
                  <Lock className="w-5 h-5" />
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const nextStatus = status === 'not_taken' ? 'in_progress' : status === 'in_progress' ? 'completed' : 'not_taken';
                    
                    // Play synthesized click sound
                    try {
                      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                      if (AudioContextClass) {
                        const context = new AudioContextClass();
                        const oscillator = context.createOscillator();
                        const gain = context.createGain();
                        
                        oscillator.type = 'sine';
                        oscillator.frequency.setValueAtTime(800, context.currentTime);
                        
                        gain.gain.setValueAtTime(0.05, context.currentTime);
                        gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
                        
                        oscillator.connect(gain);
                        gain.connect(context.destination);
                        
                        oscillator.start();
                        oscillator.stop(context.currentTime + 0.1);
                      }
                    } catch (e) {
                      console.warn("Audio feedback failed:", e);
                    }

                    onStatusChange(course.code, nextStatus);
                  }}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  {statusIcons[status]}
                </button>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {onRegisterToggle && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRegisterToggle(course.code);
                }}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border",
                  isRegistered 
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-sm shadow-emerald-100" 
                    : "bg-white text-slate-500 border-slate-200 hover:border-emerald-500 hover:text-emerald-600"
                )}
              >
                {isRegistered ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                {isRegistered ? "Added" : "Register"}
              </button>
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="px-4 pb-4 border-t bg-slate-50/50 text-sm"
        >
          <div className="pt-4 space-y-4">
            <div>
              <h4 className="font-semibold text-slate-700 mb-1">{t('description')}</h4>
              <p className="text-slate-600 leading-relaxed">
                {i18n.language === 'ar' ? course.description_ar : course.description_en}
              </p>
            </div>

            {coursesItOpens.length > 0 && (
              <div>
                <h4 className="font-semibold text-emerald-700 mb-1">{t('it_opens')}</h4>
                <div className="flex flex-wrap gap-2">
                  {coursesItOpens.map((c) => (
                    <span key={c.code} className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-xs font-medium">
                      {i18n.language === 'ar' ? c.title_ar : c.title_en}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {course.prerequisites.length > 0 && (
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">{t('prerequisites')}</h4>
                <div className="flex flex-wrap gap-2">
                  {course.prerequisites.map(pre => (
                    <button
                      key={pre}
                      onClick={() => onPrereqClick(pre)}
                      className="px-2 py-1 bg-white border rounded text-xs font-medium text-slate-600 hover:border-utas-orange hover:text-utas-orange transition-all"
                    >
                      {pre}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CourseCard;

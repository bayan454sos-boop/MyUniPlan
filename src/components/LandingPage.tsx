import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

const TICK_SOUND = 'https://cdn.pixabay.com/audio/2022/03/10/audio_5fe1357528.mp3';

const LandingPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playClickSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => {
        console.warn('Click sound failed:', err);
      });
    }
  };

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(TICK_SOUND);
      audioRef.current.volume = 0.5;
    }

    const handleFirstInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          audioRef.current!.pause();
          audioRef.current!.currentTime = 0;
        }).catch(() => {});
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('mousedown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('mousedown', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('mousedown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const programs = [
    { id: 'english', name: t('english_program'), active: true, icon: BookOpen, color: 'emerald' },
    { id: 'biology', name: 'Biology', active: false, icon: GraduationCap, color: 'blue' },
    { id: 'physics', name: 'Physics', active: false, icon: GraduationCap, color: 'purple' },
    { id: 'chemistry', name: 'Chemistry', active: false, icon: GraduationCap, color: 'amber' },
    { id: 'math', name: 'Mathematics', active: false, icon: GraduationCap, color: 'rose' },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="text-center space-y-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold tracking-wide uppercase"
          >
            <CheckCircle className="w-4 h-4" />
            Empowering Your Academic Journey
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight"
          >
            {t('app_name')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            {t('tagline')}
          </motion.p>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-slate-800 text-center">{t('select_program')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, idx) => {
              const Icon = program.icon;
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                >
                  {program.active ? (
                    <Link
                      to="/dashboard"
                      onClick={playClickSound}
                      className="group relative bg-white p-8 rounded-3xl border-2 border-transparent hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all block overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Icon className="w-24 h-24" />
                      </div>
                      <div className="relative z-10 space-y-4">
                        <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">{program.name}</h3>
                          <p className="text-sm text-slate-500 mt-1">Full Study Plan (2023) Available</p>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                          Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="relative bg-slate-100 p-8 rounded-3xl border border-slate-200 opacity-60 cursor-not-allowed overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Icon className="w-24 h-24" />
                      </div>
                      <div className="relative z-10 space-y-4">
                        <div className="w-12 h-12 bg-slate-300 rounded-2xl flex items-center justify-center text-white">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-400">{program.name}</h3>
                          <p className="text-sm text-slate-400 mt-1">{t('coming_soon')}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

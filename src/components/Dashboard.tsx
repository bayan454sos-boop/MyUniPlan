import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, RotateCcw, Send, Mail, X, CheckCircle2, GraduationCap, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import i18n from '../i18n';
import { ENGLISH_PROGRAM_PLAN, Course } from '../data/studyPlan';
import CourseCard from './CourseCard';
import { Progress } from './ProgressBar';
import { openInOutlook } from '../lib/emailUtils';

const SOUNDS = {
  TICK: 'https://www.soundjay.com/buttons/sounds/button-16.mp3', // More reliable click sound
  POP: 'https://cdn.pixabay.com/audio/2022/03/15/audio_783d1a0e71.mp3',
  WIN: 'https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1539c.mp3',
};

// Global audio cache
const audioCache: Record<string, HTMLAudioElement> = {};

const playSound = (url: string, duration?: number) => {
  try {
    let audio = audioCache[url];
    if (!audio) {
      audio = new Audio(url);
      audio.preload = 'auto';
      audioCache[url] = audio;
    }
    
    audio.currentTime = 0;
    audio.volume = 1.0; // Max volume for better feedback
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        // If blocked, we'll try again on next interaction
        console.warn('Audio playback blocked:', err);
      });
    }
    
    if (duration) {
      setTimeout(() => {
        if (!audio.paused) {
          audio.pause();
          audio.currentTime = 0;
        }
      }, duration);
    }
  } catch (err) {
    console.error('Error in playSound:', err);
  }
};

const Dashboard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [inProgressCourses, setInProgressCourses] = useState<string[]>([]);
  const [expandedSemesters, setExpandedSemesters] = useState<number[]>([1]);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [studentName, setStudentName] = useState(localStorage.getItem('student_name') || '');
  const [registrationSelection, setRegistrationSelection] = useState<string[]>([]);
  const [courseSearchQuery, setCourseSearchQuery] = useState('');

  useEffect(() => {
    const savedRegistration = localStorage.getItem('registration_selection');
    if (savedRegistration) {
      setRegistrationSelection(JSON.parse(savedRegistration));
    } else {
      setRegistrationSelection([...inProgressCourses]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('registration_selection', JSON.stringify(registrationSelection));
  }, [registrationSelection]);

  useEffect(() => {
    localStorage.setItem('student_name', studentName);
  }, [studentName]);

  useEffect(() => {
    const savedCompleted = localStorage.getItem('completed_courses');
    const savedInProgress = localStorage.getItem('in_progress_courses');
    if (savedCompleted) setCompletedCourses(JSON.parse(savedCompleted));
    if (savedInProgress) setInProgressCourses(JSON.parse(savedInProgress));

    // Pre-load sounds
    Object.values(SOUNDS).forEach(url => {
      const audio = new Audio(url);
      audio.preload = 'auto';
      audioCache[url] = audio;
    });

    const handleFirstInteraction = () => {
      console.log('User interacted, unlocking audio...');
      
      // Unlock all sounds in the cache
      Object.values(SOUNDS).forEach(url => {
        const audio = audioCache[url] || new Audio(url);
        audioCache[url] = audio;
        
        // Play and immediately pause/reset to unlock
        audio.play().then(() => {
          audio.pause();
          audio.currentTime = 0;
        }).catch(err => {
          console.warn(`Failed to unlock sound ${url}:`, err);
        });
      });

      window.removeEventListener('mousedown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
    };

    window.addEventListener('mousedown', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    window.addEventListener('click', handleFirstInteraction);

    return () => {
      window.removeEventListener('mousedown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  const handleStatusChange = (code: string, status: 'completed' | 'in_progress' | 'not_taken') => {
    // Play click sound immediately on interaction
    playSound(SOUNDS.TICK);

    let newCompleted = [...completedCourses];
    let newInProgress = [...inProgressCourses];
    let isSemesterWin = false;

    const course = ENGLISH_PROGRAM_PLAN.find(c => c.code === code);

    if (status === 'completed') {
      if (!newCompleted.includes(code)) {
        newCompleted.push(code);
        
        // Check if semester is completed
        if (course) {
          const semesterCourses = ENGLISH_PROGRAM_PLAN.filter(c => c.semester === course.semester);
          const compulsoryCourses = semesterCourses.filter(c => !c.isElective);
          const electiveGroups = Array.from(new Set(semesterCourses.filter(c => c.isElective).map(c => c.electiveGroupId)));
          
          const allCompulsoryDone = compulsoryCourses.every(c => newCompleted.includes(c.code));
          const allElectiveGroupsDone = electiveGroups.every(groupId => 
            semesterCourses.filter(c => c.electiveGroupId === groupId).some(c => newCompleted.includes(c.code))
          );

          if (allCompulsoryDone && allElectiveGroupsDone) {
            // Check if it was NOT completed before this action
            const wasCompulsoryDone = compulsoryCourses.every(c => completedCourses.includes(c.code));
            const wasElectiveGroupsDone = electiveGroups.every(groupId => 
              semesterCourses.filter(c => c.electiveGroupId === groupId).some(c => completedCourses.includes(c.code))
            );

            if (!(wasCompulsoryDone && wasElectiveGroupsDone)) {
              isSemesterWin = true;
              // Trigger Celebration!
              confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#F27D26', '#003366', '#FFFFFF']
              });
              
              // Semester Win Sound: Pop + 2s Music (Overrides Tick)
              playSound(SOUNDS.POP);
              setTimeout(() => playSound(SOUNDS.WIN, 2000), 100);

              toast.success(`Semester ${course.semester} Completed!`, {
                description: "Amazing progress! Keep it up!",
                duration: 5000,
              });
            }
          }
        }

        // Check for newly unlocked courses
        const unlockedCourses = ENGLISH_PROGRAM_PLAN.filter(c => 
          c.prerequisites.includes(code) && 
          c.prerequisites.every(pre => newCompleted.includes(pre))
        );

        unlockedCourses.forEach((c, index) => {
          setTimeout(() => {
            toast.success(t('course_unlocked'), {
              description: t('qualified_to_take', { 
                from: i18n.language === 'ar' ? course.title_ar : course.title_en,
                course: i18n.language === 'ar' ? c.title_ar : c.title_en 
              }),
              duration: 2000,
            });
          }, index * 100); // Small stagger to ensure library registers all 7 in the stack
        });
      }
      newInProgress = newInProgress.filter(c => c !== code);
      
      // If it's an elective, uncheck others in the same group
      if (course?.isElective && course.electiveGroupId) {
        const group = ENGLISH_PROGRAM_PLAN.filter(c => c.electiveGroupId === course.electiveGroupId && c.code !== code);
        const groupCodes = group.map(c => c.code);
        newCompleted = newCompleted.filter(c => !groupCodes.includes(c));
        newInProgress = newInProgress.filter(c => !groupCodes.includes(c));
      }
    } else if (status === 'in_progress') {
      if (!newInProgress.includes(code)) {
        newInProgress.push(code);
      }
      newCompleted = newCompleted.filter(c => c !== code);

      // If it's an elective, uncheck others in the same group
      if (course?.isElective && course.electiveGroupId) {
        const group = ENGLISH_PROGRAM_PLAN.filter(c => c.electiveGroupId === course.electiveGroupId && c.code !== code);
        const groupCodes = group.map(c => c.code);
        newCompleted = newCompleted.filter(c => !groupCodes.includes(c));
        newInProgress = newInProgress.filter(c => !groupCodes.includes(c));
      }
    } else {
      newCompleted = newCompleted.filter(c => c !== code);
      newInProgress = newInProgress.filter(c => c !== code);
    }

    // Standard Tick Sound is now played at the start of the function
    // to ensure responsiveness. We only play special sounds here if it's a win.
    if (isSemesterWin) {
      // Semester Win Sound: Pop + 2s Music
      playSound(SOUNDS.POP);
      setTimeout(() => playSound(SOUNDS.WIN, 2000), 100);
    }

    setCompletedCourses(newCompleted);
    setInProgressCourses(newInProgress);
    localStorage.setItem('completed_courses', JSON.stringify(newCompleted));
    localStorage.setItem('in_progress_courses', JSON.stringify(newInProgress));
  };

  const isCourseLocked = (course: Course) => {
    if (course.prerequisites.length === 0) return false;
    return !course.prerequisites.every(pre => completedCourses.includes(pre));
  };

  const getElectiveGroups = () => {
    const groups: Record<string, Course[]> = {};
    ENGLISH_PROGRAM_PLAN.forEach(c => {
      if (c.isElective && c.electiveGroupId) {
        if (!groups[c.electiveGroupId]) groups[c.electiveGroupId] = [];
        groups[c.electiveGroupId].push(c);
      }
    });
    return groups;
  };

  const calculateCredits = (courses: Course[], filterCompleted: boolean) => {
    const electiveGroups = getElectiveGroups();
    const countedGroups = new Set<string>();

    return courses.reduce((acc, c) => {
      const isDone = completedCourses.includes(c.code);
      if (filterCompleted && !isDone) return acc;

      if (c.isElective && c.electiveGroupId) {
        if (countedGroups.has(c.electiveGroupId)) return acc;
        
        if (filterCompleted) {
          // Find if ANY course in this group is completed
          const group = electiveGroups[c.electiveGroupId];
          const anyDone = group.find(gc => completedCourses.includes(gc.code));
          if (anyDone?.code === c.code) {
            countedGroups.add(c.electiveGroupId);
            return acc + c.credits;
          }
          return acc;
        } else {
          // For total, just count one (the first one)
          const group = electiveGroups[c.electiveGroupId];
          if (group[0].code === c.code) {
            countedGroups.add(c.electiveGroupId);
            return acc + c.credits;
          }
          return acc;
        }
      }
      return acc + c.credits;
    }, 0);
  };

  const totalCredits = 132;
  const completedCredits = calculateCredits(ENGLISH_PROGRAM_PLAN, true);

  const breakdown = {
    university: { 
      total: 12,
      done: Math.min(12, calculateCredits(ENGLISH_PROGRAM_PLAN.filter(c => c.type === 'university'), true))
    },
    college: { 
      total: 36,
      done: Math.min(36, calculateCredits(ENGLISH_PROGRAM_PLAN.filter(c => c.type === 'college'), true))
    },
    specialization: { 
      total: 84,
      done: Math.min(84, calculateCredits(ENGLISH_PROGRAM_PLAN.filter(c => c.type === 'specialization'), true))
    },
  };

  const semesters = Array.from({ length: 8 }, (_, i) => i + 1);

  const toggleSemester = (sem: number) => {
    playSound(SOUNDS.TICK);
    setExpandedSemesters(prev => 
      prev.includes(sem) ? prev.filter(s => s !== sem) : [...prev, sem]
    );
  };

  const resetProgress = () => {
    playSound(SOUNDS.TICK);
    setCompletedCourses([]);
    setInProgressCourses([]);
    localStorage.removeItem('completed_courses');
    localStorage.removeItem('in_progress_courses');
    setShowResetConfirm(false);
    toast.info('Progress has been reset');
    // We don't necessarily need window.location.reload() if state is cleared
    // but it ensures everything is fresh. Let's keep it but after a small delay
    // so the state update can be seen if possible, or just reload.
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleSendToAdvisor = () => {
    if (!studentName.trim()) {
      toast.error('Please enter your full name');
      return;
    }

    const selectedCourses = ENGLISH_PROGRAM_PLAN.filter(c => registrationSelection.includes(c.code));
    if (selectedCourses.length === 0) {
      toast.error('No courses selected for registration');
      return;
    }

    const advisorEmail = "abdullah.alabri@utas.edu.om";
    const subject = `Course Registration Request - ${studentName}`;
    
    const courseListText = selectedCourses.map(c => 
      `- ${c.code}: ${i18n.language === 'ar' ? c.title_ar : c.title_en} (${c.credits} Credits)`
    ).join('\n');

    const body = `Dear Dr Abdullah,

I hope this email finds you well.

I would like to register for the following courses for the upcoming semester:

${courseListText}

Total Credits: ${selectedCourses.reduce((acc, c) => acc + c.credits, 0)}

Thank you,
${studentName}`;

    openInOutlook(advisorEmail, subject, body);
    setIsRegisterModalOpen(false);
    toast.success('Opening Outlook...');
  };

  const selectedForRegistration = ENGLISH_PROGRAM_PLAN.filter(c => registrationSelection.includes(c.code));
  
  const filteredCourses = courseSearchQuery.trim() === '' 
    ? [] 
    : ENGLISH_PROGRAM_PLAN.filter(c => 
        (c.code.toLowerCase().includes(courseSearchQuery.toLowerCase()) || 
         c.title_en.toLowerCase().includes(courseSearchQuery.toLowerCase()) ||
         c.title_ar.includes(courseSearchQuery)) &&
        !registrationSelection.includes(c.code)
      ).slice(0, 5);

  const toggleRegistrationCourse = (code: string) => {
    playSound(SOUNDS.TICK);
    setRegistrationSelection(prev => 
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
    if (!registrationSelection.includes(code)) {
      setCourseSearchQuery('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <AnimatePresence>
        {isRegisterModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b flex justify-between items-center bg-emerald-50 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Course Registration</h2>
                    <p className="text-xs text-emerald-600 font-medium uppercase tracking-wider">Send to Advisor</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    playSound(SOUNDS.TICK);
                    setIsRegisterModalOpen(false);
                  }}
                  className="p-2 hover:bg-white rounded-full transition-colors text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    Your Full Name
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter your name as it appears in ID"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">Search & Add Courses</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={courseSearchQuery}
                      onChange={(e) => setCourseSearchQuery(e.target.value)}
                      placeholder="Search by code or name..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                    />
                    {filteredCourses.length > 0 && (
                      <div className="absolute z-10 w-full mt-2 bg-white border rounded-2xl shadow-xl overflow-hidden">
                        {filteredCourses.map(course => (
                          <button
                            key={course.code}
                            onClick={() => toggleRegistrationCourse(course.code)}
                            className="w-full text-left px-4 py-3 hover:bg-emerald-50 transition-colors border-b last:border-0 flex justify-between items-center"
                          >
                            <div>
                              <p className="text-sm font-bold text-slate-900">{course.code}</p>
                              <p className="text-xs text-slate-500">{i18n.language === 'ar' ? course.title_ar : course.title_en}</p>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full uppercase">Add</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700">Selected for Registration</label>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                      {selectedForRegistration.length} Courses
                    </span>
                  </div>
                  <div className="space-y-2">
                    {selectedForRegistration.length > 0 ? (
                      selectedForRegistration.map(course => (
                        <div key={course.code} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-emerald-600 border shadow-sm">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">{course.code}</p>
                              <p className="text-xs text-slate-500 truncate max-w-[200px]">
                                {i18n.language === 'ar' ? course.title_ar : course.title_en}
                              </p>
                            </div>
                          </div>
                          <button 
                            onClick={() => toggleRegistrationCourse(course.code)}
                            className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                        <p className="text-sm text-slate-400">No courses selected.</p>
                        <p className="text-xs text-slate-400 mt-1">Search above to add any course from the plan.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t shrink-0">
                <button
                  onClick={handleSendToAdvisor}
                  disabled={selectedForRegistration.length === 0}
                  className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  Send to Advisor
                </button>
                <p className="text-[10px] text-center text-slate-400 mt-4 leading-relaxed">
                  This will open your default email client (Outlook) with a pre-filled message to <br/>
                  <span className="font-bold text-slate-500">abdullah.alabri@utas.edu.om</span>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <header className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{t('english_program')}</h1>
            <p className="text-slate-500 mt-1">Academic Year 2023 Study Plan</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playSound(SOUNDS.TICK);
                setIsRegisterModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100"
            >
              <Send className="w-4 h-4" />
              Register Courses
            </button>
            {showResetConfirm ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Are you sure?</span>
                <button
                  onClick={resetProgress}
                  className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-all shadow-sm"
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => {
                    playSound(SOUNDS.TICK);
                    setShowResetConfirm(false);
                  }}
                  className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
              </motion.div>
            ) : (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-bold hover:bg-red-100 transition-all shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                {t('reset')} Progress
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border shadow-sm space-y-4">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">{t('progress')}</span>
                <div className="text-3xl font-black text-slate-900">
                  {completedCredits} <span className="text-lg text-slate-400 font-normal">/ {totalCredits} {t('credits')}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-utas-orange">{Math.round((completedCredits / totalCredits) * 100)}%</div>
              </div>
            </div>
            <Progress value={(completedCredits / totalCredits) * 100} className="h-3 bg-slate-100" indicatorClassName="bg-utas-blue" />
          </div>
          
          <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Breakdown</span>
            <div className="space-y-3">
              {Object.entries(breakdown).map(([key, val]) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-600">{t(`${key}_req`)}</span>
                    <span className="text-slate-400">{val.done}/{val.total}</span>
                  </div>
                  <Progress value={(val.done / val.total) * 100} className="h-1.5 bg-slate-50" indicatorClassName={key === 'specialization' ? 'bg-utas-orange' : 'bg-utas-blue'} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#003366] text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">{t('expected_grad')}</span>
              <div className="text-3xl font-black">
                {completedCredits >= totalCredits ? t('graduated') : (new Date().getFullYear() + Math.max(0, 4 - Math.floor(completedCredits / 33)))}
              </div>
            </div>
            <div className="pt-4 border-t border-white/10 mt-4">
              <div className="text-xs text-orange-400 font-medium">Remaining to Graduate</div>
              <div className="text-xl font-bold">{Math.max(0, totalCredits - completedCredits)} Credits</div>
            </div>
          </div>
        </div>

        {/* Top Banners Grid */}
        <div className="grid grid-cols-1 gap-6">
          {/* Emergency: Ask a Senior Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group cursor-pointer"
            onClick={() => {
              playSound(SOUNDS.TICK);
              window.location.href = '/ask-senior';
            }}
          >
            <div className="relative z-10 flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform">
                <GraduationCap className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                  {i18n.language === 'ar' ? 'تواصل مع الخريجين' : 'Connect with Seniors'}
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                  </span>
                </h2>
                <p className="text-red-100 font-medium">
                  {i18n.language === 'ar' 
                    ? 'تواصل مع خريجينا المتميزين للحصول على نصائح سريعة ومباشرة.' 
                    : 'Connect with our amazing seniors for a quick, peer-to-peer guidance.'}
                </p>
              </div>
            </div>
            <div className="relative z-10">
              <button className="px-6 py-3 bg-white text-red-600 rounded-2xl font-black text-sm hover:bg-red-50 transition-all shadow-lg">
                {i18n.language === 'ar' ? 'تواصل الآن' : 'Connect Now'}
              </button>
            </div>
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
              <GraduationCap className="w-64 h-64" />
            </div>
          </motion.div>
        </div>
      </header>

      <div className="space-y-6">
        {semesters.map(sem => {
          const semCourses = ENGLISH_PROGRAM_PLAN.filter(c => c.semester === sem);
          const semCredits = calculateCredits(semCourses, false);
          const isExpanded = expandedSemesters.includes(sem);
          const electiveGroups = getElectiveGroups();

          return (
            <div key={sem} className="bg-white border rounded-2xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSemester(sem)}
                className="w-full px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-bold text-slate-900">{t('semester')} {sem}</h2>
                  <div className="flex items-center gap-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <span className="text-slate-600">{semCredits}</span> {t('credits')}
                    </span>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              
              {isExpanded && (
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Compulsory Courses */}
                    {semCourses.filter(c => !c.isElective).map(course => (
                      <CourseCard
                        key={course.code}
                        course={course}
                        status={completedCourses.includes(course.code) ? 'completed' : inProgressCourses.includes(course.code) ? 'in_progress' : 'not_taken'}
                        isLocked={isCourseLocked(course)}
                        isRegistered={registrationSelection.includes(course.code)}
                        onStatusChange={handleStatusChange}
                        onPrereqClick={(code) => {
                          const targetCourse = ENGLISH_PROGRAM_PLAN.find(c => c.code === code);
                          if (targetCourse) {
                            if (!expandedSemesters.includes(targetCourse.semester)) {
                              setExpandedSemesters(prev => [...prev, targetCourse.semester]);
                            }
                            setTimeout(() => {
                              document.getElementById(`course-${code}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }, 100);
                          }
                        }}
                        onRegisterToggle={toggleRegistrationCourse}
                      />
                    ))}

                    {/* Elective Groups */}
                    {Object.entries(electiveGroups).map(([groupId, groupCourses]) => {
                      if (groupCourses[0].semester !== sem) return null;
                      return (
                        <div key={groupId} className="col-span-full bg-orange-50/30 p-4 rounded-xl border border-dashed border-orange-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">{t('elective_group')}</span>
                            <span className="text-[10px] font-bold text-orange-400">{groupCourses[0].credits} {t('credits')}</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {groupCourses.map(course => (
                              <CourseCard
                                key={course.code}
                                course={course}
                                status={completedCourses.includes(course.code) ? 'completed' : inProgressCourses.includes(course.code) ? 'in_progress' : 'not_taken'}
                                isLocked={isCourseLocked(course)}
                                isRegistered={registrationSelection.includes(course.code)}
                                onStatusChange={handleStatusChange}
                                onPrereqClick={(code) => {
                                  const targetCourse = ENGLISH_PROGRAM_PLAN.find(c => c.code === code);
                                  if (targetCourse) {
                                    if (!expandedSemesters.includes(targetCourse.semester)) {
                                      setExpandedSemesters(prev => [...prev, targetCourse.semester]);
                                    }
                                    setTimeout(() => {
                                      document.getElementById(`course-${code}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }, 100);
                                  }
                                }}
                                onRegisterToggle={toggleRegistrationCourse}
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t flex flex-wrap gap-8 justify-end text-sm">
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Semester Credits</span>
                      <span className="font-bold text-slate-700">{semCredits}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;

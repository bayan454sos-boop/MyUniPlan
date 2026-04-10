import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Trash2, RotateCcw, Calculator as CalcIcon, Search } from 'lucide-react';
import { ENGLISH_PROGRAM_PLAN } from '../data/studyPlan';

interface CourseGrade {
  id: string;
  name: string;
  credits: number;
  grade: string;
  code?: string;
}

const GRADE_POINTS: Record<string, number> = {
  'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0, 'FW': 0.0
};

const GPACalculator: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [courses, setCourses] = useState<CourseGrade[]>([]);
  const [cumulativeGPA, setCumulativeGPA] = useState<number>(0);
  const [cumulativeCredits, setCumulativeCredits] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem('gpa_courses');
    if (saved) setCourses(JSON.parse(saved));
    const savedCum = localStorage.getItem('cumulative_gpa_data');
    if (savedCum) {
      const { gpa, credits } = JSON.parse(savedCum);
      setCumulativeGPA(gpa);
      setCumulativeCredits(credits);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gpa_courses', JSON.stringify(courses));
    localStorage.setItem('cumulative_gpa_data', JSON.stringify({ gpa: cumulativeGPA, credits: cumulativeCredits }));
  }, [courses, cumulativeGPA, cumulativeCredits]);

  const addCourse = () => {
    setCourses([...courses, { id: Math.random().toString(36).substr(2, 9), name: '', credits: 3, grade: 'A' }]);
  };

  const addFromPlan = (code: string) => {
    const course = ENGLISH_PROGRAM_PLAN.find(c => c.code === code);
    if (course) {
      setCourses([...courses, { 
        id: Math.random().toString(36).substr(2, 9), 
        name: i18n.language === 'ar' ? course.title_ar : course.title_en, 
        credits: course.credits, 
        grade: 'A',
        code: course.code
      }]);
    }
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof CourseGrade, value: any) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const calculateSemesterGPA = () => {
    const totalPoints = courses.reduce((acc, c) => acc + (GRADE_POINTS[c.grade] || 0) * c.credits, 0);
    const totalCredits = courses.reduce((acc, c) => acc + c.credits, 0);
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const calculateNewCumulativeGPA = () => {
    const semPoints = courses.reduce((acc, c) => acc + (GRADE_POINTS[c.grade] || 0) * c.credits, 0);
    const semCredits = courses.reduce((acc, c) => acc + c.credits, 0);
    const totalPoints = (cumulativeGPA * cumulativeCredits) + semPoints;
    const totalCredits = cumulativeCredits + semCredits;
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-emerald-500 rounded-xl text-white">
          <CalcIcon className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">{t('gpa_calculator')}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2">Cumulative Data</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-500 mb-1">{t('current_gpa')}</label>
              <input
                type="number"
                step="0.01"
                value={cumulativeGPA}
                onChange={(e) => setCumulativeGPA(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-500 mb-1">Total Credits Completed</label>
              <input
                type="number"
                value={cumulativeCredits}
                onChange={(e) => setCumulativeCredits(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-lg space-y-6">
          <h2 className="text-lg font-bold border-b border-white/20 pb-2">Results</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs text-emerald-300 uppercase font-bold tracking-wider">{t('semester_gpa')}</span>
              <div className="text-4xl font-black">{calculateSemesterGPA()}</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-emerald-300 uppercase font-bold tracking-wider">New Cumulative</span>
              <div className="text-4xl font-black">{calculateNewCumulativeGPA()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-slate-800">Current Semester Courses</h2>
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <select 
                className="text-xs bg-transparent border-none focus:ring-0 text-slate-500 outline-none cursor-pointer"
                onChange={(e) => {
                  if (e.target.value) {
                    addFromPlan(e.target.value);
                    e.target.value = "";
                  }
                }}
              >
                <option value="">{t('add_from_plan') || 'Add from Study Plan...'}</option>
                {ENGLISH_PROGRAM_PLAN.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {i18n.language === 'ar' ? c.title_ar : c.title_en}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCourses([])}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              {t('reset')}
            </button>
            <button
              onClick={addCourse}
              className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              {t('add_course')}
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {courses.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              No courses added. Click "Add Course" to start calculating.
            </div>
          ) : (
            <div className="space-y-3">
              {courses.map((course) => (
                <div key={course.id} className="flex flex-col md:flex-row gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Course Name"
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 bg-white border rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="w-full md:w-32">
                    <select
                      value={course.credits}
                      onChange={(e) => updateCourse(course.id, 'credits', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-white border rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {[1, 2, 3, 4, 5, 6].map(c => <option key={c} value={c}>{c} Credits</option>)}
                    </select>
                  </div>
                  <div className="w-full md:w-32">
                    <select
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                      className="w-full px-3 py-2 bg-white border rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {Object.keys(GRADE_POINTS).map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <button
                    onClick={() => removeCourse(course.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GPACalculator;

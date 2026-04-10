import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, LayoutDashboard, Calculator, BookOpen, Contact, LogOut, GraduationCap } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import { useNavigate } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('collegeId');
    localStorage.removeItem('nationalId');
    window.location.href = '/'; // Force reload to clear state
  };

  const navItems = [
    { path: '/', label: t('app_name'), icon: Home },
    { path: '/dashboard', label: t('english_program'), icon: LayoutDashboard },
    { path: '/gpa', label: t('gpa_calculator'), icon: Calculator },
    { path: '/glossary', label: t('glossary'), icon: BookOpen },
    { path: '/directory', label: t('directory'), icon: Contact },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold tracking-tight text-emerald-500">
              {t('app_name')}
            </Link>
            <div className="hidden md:flex items-center gap-4">
              {navItems.slice(1).map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-white/10 text-emerald-400" 
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

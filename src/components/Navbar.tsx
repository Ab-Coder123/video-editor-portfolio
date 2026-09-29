import React from 'react';
import { Video, PhoneCall, FolderKanban, User, Mail, Moon, Sun } from 'lucide-react';
import { EDITOR_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeTab: 'projects' | 'about' | 'contact';
  setActiveTab: (tab: 'projects' | 'about' | 'contact') => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, isDark, toggleTheme }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <div 
            onClick={() => setActiveTab('projects')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-blue-glow group-hover:scale-105 transition-transform">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-italic-serif text-brand-800 dark:text-brand-300 tracking-wide flex items-center gap-1.5">
                <span>{EDITOR_INFO.name}</span>
                <span className="text-brand-600 dark:text-brand-400 font-sans text-xs bg-brand-50 dark:bg-brand-950/80 px-2 py-0.5 rounded-full font-semibold border border-brand-200 dark:border-brand-800">
                  {EDITOR_INFO.yearsExperience} سنوات خبرة
                </span>
              </div>
              <p className="text-xs text-slateText-light dark:text-slate-400 font-medium">{EDITOR_INFO.titleEn}</p>
            </div>
          </div>

          {/* Navigation Tabs (3 Core Pages) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'projects'
                  ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm font-semibold'
                  : 'text-slateText-main dark:text-slate-300 hover:text-brand-700 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>المشاريع والمعرض</span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'about'
                  ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm font-semibold'
                  : 'text-slateText-main dark:text-slate-300 hover:text-brand-700 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>عن المصمم (About Us)</span>
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'contact'
                  ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm font-semibold'
                  : 'text-slateText-main dark:text-slate-300 hover:text-brand-700 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>التواصل والطلب</span>
            </button>
          </nav>

          {/* Right Actions: Dark Mode Toggle + WhatsApp CTA */}
          <div className="flex items-center gap-3">
            
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slateText-dark dark:text-yellow-400 border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all shadow-sm"
              title={isDark ? "تفعيل الوضع المضيء (Light Mode)" : "تفعيل الوضع المظلم (Dark Mode)"}
            >
              {isDark ? <Sun className="w-5 h-5 animate-spin-slow" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* CTA WhatsApp Button */}
            <a
              href={`https://wa.me/${EDITOR_INFO.whatsapp}?text=أهلاً%20كريم،%20حابب%20أستفسر%20عن%20مشروع%20فيديو%20جديد`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl shadow-blue-glow hover:shadow-lg transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span className="hidden sm:inline">واتساب</span>
              <span className="sm:hidden">واتساب</span>
            </a>
          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex items-center justify-around border-t border-slate-100 dark:border-slate-800 py-2">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex flex-col items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'projects' ? 'text-brand-600 dark:text-brand-400 font-bold bg-brand-50 dark:bg-slate-800' : 'text-slateText-light dark:text-slate-400'
            }`}
          >
            <FolderKanban className="w-5 h-5" />
            <span>المشاريع</span>
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`flex flex-col items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'about' ? 'text-brand-600 dark:text-brand-400 font-bold bg-brand-50 dark:bg-slate-800' : 'text-slateText-light dark:text-slate-400'
            }`}
          >
            <User className="w-5 h-5" />
            <span>عن المصمم</span>
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex flex-col items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'contact' ? 'text-brand-600 dark:text-brand-400 font-bold bg-brand-50 dark:bg-slate-800' : 'text-slateText-light dark:text-slate-400'
            }`}
          >
            <Mail className="w-5 h-5" />
            <span>التواصل</span>
          </button>
        </div>

      </div>
    </header>
  );
};

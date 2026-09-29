import React, { useState, useEffect } from 'react';
import { Video, PhoneCall, FolderKanban, User, Mail, Moon, Sun, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EDITOR_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeTab: 'projects' | 'about' | 'contact';
  setActiveTab: (tab: 'projects' | 'about' | 'contact') => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, isDark, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on route/tab change
  const handleTabSelect = (tab: 'projects' | 'about' | 'contact') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo & Branding */}
            <div 
              onClick={() => handleTabSelect('projects')}
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-blue-glow group-hover:scale-105 transition-transform flex-shrink-0">
                <Video className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="text-base sm:text-2xl font-bold font-italic-serif text-brand-800 dark:text-brand-300 tracking-wide flex items-center gap-1.5 leading-none">
                  <span>{EDITOR_INFO.name}</span>
                  <span className="hidden sm:inline-block text-brand-600 dark:text-brand-400 font-sans text-xs bg-brand-50 dark:bg-brand-950/80 px-2 py-0.5 rounded-full font-semibold border border-brand-200 dark:border-brand-800">
                    {EDITOR_INFO.yearsExperience} سنوات خبرة
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slateText-light dark:text-slate-400 font-medium mt-0.5">
                  {EDITOR_INFO.titleEn}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => handleTabSelect('projects')}
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
                onClick={() => handleTabSelect('about')}
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
                onClick={() => handleTabSelect('contact')}
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

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Dark Mode Toggle Button */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slateText-dark dark:text-yellow-400 border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all shadow-sm"
                title={isDark ? "تفعيل الوضع المضيء" : "تفعيل الوضع المظلم"}
              >
                {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />}
              </button>

              {/* CTA WhatsApp Button - Desktop */}
              <a
                href={`https://wa.me/${EDITOR_INFO.whatsapp}?text=أهلاً%20كريم،%20حابب%20أستفسر%20عن%20مشروع%20فيديو%20جديد`}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-xl shadow-blue-glow hover:shadow-lg transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>واتساب</span>
              </a>

              {/* Mobile Hamburger Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className="md:hidden w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slateText-dark dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all"
                aria-label="قائمة التصفح"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Modern Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 z-30 md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4"
          >
            <div className="space-y-2">
              <button
                onClick={() => handleTabSelect('projects')}
                className={`w-full flex items-center justify-between p-4 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === 'projects'
                    ? 'bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-300 border border-brand-200 dark:border-brand-800 shadow-sm'
                    : 'text-slateText-dark dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${activeTab === 'projects' ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    <FolderKanban className="w-5 h-5" />
                  </div>
                  <span>المشاريع ومعرض الأعمال</span>
                </div>
                {activeTab === 'projects' && <span className="text-xs bg-brand-600 text-white px-2 py-0.5 rounded-full font-sans">الحالي</span>}
              </button>

              <button
                onClick={() => handleTabSelect('about')}
                className={`w-full flex items-center justify-between p-4 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === 'about'
                    ? 'bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-300 border border-brand-200 dark:border-brand-800 shadow-sm'
                    : 'text-slateText-dark dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${activeTab === 'about' ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    <User className="w-5 h-5" />
                  </div>
                  <span>عن المصمم وقصتي (About Us)</span>
                </div>
                {activeTab === 'about' && <span className="text-xs bg-brand-600 text-white px-2 py-0.5 rounded-full font-sans">الحالي</span>}
              </button>

              <button
                onClick={() => handleTabSelect('contact')}
                className={`w-full flex items-center justify-between p-4 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === 'contact'
                    ? 'bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-300 border border-brand-200 dark:border-brand-800 shadow-sm'
                    : 'text-slateText-dark dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${activeTab === 'contact' ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>التواصل وطلب مشروع</span>
                </div>
                {activeTab === 'contact' && <span className="text-xs bg-brand-600 text-white px-2 py-0.5 rounded-full font-sans">الحالي</span>}
              </button>
            </div>

            {/* Mobile Contact Quick Actions */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <a
                href={`https://wa.me/${EDITOR_INFO.whatsapp}?text=أهلاً%20كريم،%20حابب%20أستفسر%20عن%20مشروع%20فيديو%20جديد`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold py-3.5 rounded-2xl shadow-lg transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>تواصل مباشر واتساب ({EDITOR_INFO.phone})</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Navigation Bar for Mobile (iOS Native Feel) */}
      <div className="md:hidden fixed bottom-4 inset-x-4 z-40">
        <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-1.5 shadow-2xl flex items-center justify-around">
          <button
            onClick={() => handleTabSelect('projects')}
            className={`flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-2xl transition-all ${
              activeTab === 'projects'
                ? 'bg-brand-600 text-white shadow-md font-bold scale-100'
                : 'text-slateText-light dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FolderKanban className="w-5 h-5" />
            <span className="text-[11px]">المشاريع</span>
          </button>

          <button
            onClick={() => handleTabSelect('about')}
            className={`flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-2xl transition-all ${
              activeTab === 'about'
                ? 'bg-brand-600 text-white shadow-md font-bold scale-100'
                : 'text-slateText-light dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[11px]">عن المصمم</span>
          </button>

          <button
            onClick={() => handleTabSelect('contact')}
            className={`flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-2xl transition-all ${
              activeTab === 'contact'
                ? 'bg-brand-600 text-white shadow-md font-bold scale-100'
                : 'text-slateText-light dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Mail className="w-5 h-5" />
            <span className="text-[11px]">التواصل</span>
          </button>
        </nav>
      </div>
    </>
  );
};

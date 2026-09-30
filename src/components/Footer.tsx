import React from 'react';
import { Video, Heart } from 'lucide-react';
import { EDITOR_INFO } from '../data/portfolioData';

interface FooterProps {
  setActiveTab: (tab: 'projects' | 'about' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg font-italic-serif text-brand-800 dark:text-brand-300">{EDITOR_INFO.name}</h3>
              <p className="text-xs text-slateText-light dark:text-slate-400">{EDITOR_INFO.titleAr}</p>
            </div>
          </div>

          <nav className="flex items-center gap-6 text-xs sm:text-sm font-semibold text-slateText-main dark:text-slate-300">
            <button onClick={() => setActiveTab('projects')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">المشاريع ومعرض الأعمال</button>
            <button onClick={() => setActiveTab('about')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">عن المصمم (About Us)</button>
            <button onClick={() => setActiveTab('contact')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">التواصل والطلب</button>
          </nav>

        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slateText-light dark:text-slate-400">
          <p>© {new Date().getFullYear()} {EDITOR_INFO.name}. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>Abdulrahman A.A  </span>
            <a href="https://developer-portfolio-sigma-pink.vercel.app/" className='text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-600'>
              Portfolio
            </a >
            <span>: Is Created By</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Award, Film, CheckCircle2, ArrowLeft } from 'lucide-react';
import { EDITOR_INFO, STATS } from '../data/portfolioData';

interface HeroProps {
  onExploreProjects: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProjects, onContactClick }) => {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-12 lg:py-20 transition-colors duration-300">
      
      {/* Background Decorative Blur Spheres with subtle float */}
      <motion.div 
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-1/4 w-96 h-96 bg-brand-100/60 dark:bg-brand-900/20 rounded-full blur-3xl -z-10 pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1.08, 1, 1.08], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-10 w-80 h-80 bg-sky-100/50 dark:bg-sky-900/20 rounded-full blur-3xl -z-10 pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Right Column (Arabic Content & Text) */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-right"
          >
            
            {/* Experience Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 px-4 py-2 rounded-full text-brand-700 dark:text-brand-300 font-semibold text-xs sm:text-sm">
              <Award className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>خبرة احترافية أكثر من 5 سنوات في المونتاج والتصوير والموشن</span>
            </div>

            {/* Main Title with Italian Serif Italic styling */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slateText-heading dark:text-white leading-tight">
              أصنع قصص بصرية
              <span className="block font-italic-serif text-brand-600 dark:text-brand-400 italic text-4xl sm:text-6xl lg:text-7xl mt-1">
                تترك انطباعاً سينمائياً فريداً
              </span>
            </h1>

            {/* Tagline / Subtitle */}
            <p className="text-slateText-main dark:text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl font-normal">
              {EDITOR_INFO.tagline}. أدمج مهارات المونتاج الدقيق على <span className="font-semibold text-brand-700 dark:text-brand-400">Premiere Pro</span>، والتلوين السينمائي على <span className="font-semibold text-brand-700 dark:text-brand-400">DaVinci Resolve</span>، والموشن جرافيك السلس على <span className="font-semibold text-brand-700 dark:text-brand-400">After Effects</span> لإخراج فيديو ينافس أحدث المعايير العالمية.
            </p>

            {/* Bullet Points */}
            <div className="grid grid-cols-2 gap-3 pt-2 max-w-lg">
              <div className="flex items-center gap-2 text-slateText-dark dark:text-slate-200 text-xs sm:text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
                <span>إعلانات تجارية & ريلز</span>
              </div>
              <div className="flex items-center gap-2 text-slateText-dark dark:text-slate-200 text-xs sm:text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
                <span>موشن جرافيك 2D/3D</span>
              </div>
              <div className="flex items-center gap-2 text-slateText-dark dark:text-slate-200 text-xs sm:text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
                <span>تلوين سينمائي Log Profiling</span>
              </div>
              <div className="flex items-center gap-2 text-slateText-dark dark:text-slate-200 text-xs sm:text-sm font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400 flex-shrink-0" />
                <span>تصوير احترافي معدات 4K</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onExploreProjects}
                className="flex items-center gap-3 bg-brand-600 hover:bg-brand-700 text-white font-bold px-7 py-3.5 rounded-2xl shadow-blue-glow hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>استعرض المعرض والمشاريع</span>
              </button>

              <button
                onClick={onContactClick}
                className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slateText-dark dark:text-white font-semibold px-6 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 transition-all text-sm sm:text-base"
              >
                <span>طلب مشروع جديد</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Stats Grid with stagger animations */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-100 dark:border-slate-800">
              {STATS.map((stat, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 p-3.5 rounded-2xl"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-brand-600 dark:text-brand-400 font-italic-serif italic">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slateText-heading dark:text-white mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slateText-light dark:text-slate-400 mt-0.5 leading-tight">
                    {stat.sublabel}
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>

          {/* Left Column (User Profile Photo Frame with spring effect) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              
              {/* Blue Glassmorphic Outer Card */}
              <div className="relative rounded-3xl bg-gradient-to-tr from-brand-600 to-sky-400 p-2.5 shadow-2xl shadow-brand-500/20">
                <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 aspect-[3/4] border-2 border-white dark:border-slate-800 shadow-inner">
                  <img
                    src={EDITOR_INFO.photoUrl}
                    alt={EDITOR_INFO.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />
                  
                  {/* Photo Overlay Badge */}
                  <div className="absolute bottom-4 right-4 left-4 text-white p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-base text-white">{EDITOR_INFO.name}</h3>
                        <p className="text-xs text-brand-200">{EDITOR_INFO.titleAr}</p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-brand-600 flex items-center justify-center text-white shadow-md">
                        <Film className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Floating Floating Badge 1 */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                  5+
                </div>
                <div>
                  <div className="text-xs font-bold text-slateText-heading dark:text-white">سنوات خبرة</div>
                  <div className="text-[10px] text-slateText-light dark:text-slate-400">في مونتاج الفيديو</div>
                </div>
              </motion.div>

              {/* Floating Badge 2 */}
              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slateText-heading dark:text-white">موشن جرافيك & 4K</div>
                  <div className="text-[10px] text-slateText-light dark:text-slate-400">جودة سينمائية فائقة</div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

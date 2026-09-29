import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, Clock, ExternalLink, Bot } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project, CategoryType } from '../types';

interface ProjectsPageProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');

  const categories = [
    { id: 'all', label: 'كل الأعمال' },
    { id: 'commercials', label: 'إعلانات وبرومو' },
    { id: 'reels', label: 'ريلز وسوشيال' },
    { id: 'motion', label: 'موشن جرافيك' },
    { id: 'photography', label: 'تصوير فوتوغرافي' },
    { id: 'ai', label: '🤖 شغل AI' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <section className="py-12 lg:py-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider border border-brand-200 dark:border-brand-800">
            <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>معرض الأعمال الحقيقية</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slateText-heading dark:text-white leading-tight">
            مشاريع صنعت
            <span className="font-italic-serif text-brand-600 dark:text-brand-400 italic px-2">بصمتها وأثّرت</span>
          </h2>
          <p className="text-slateText-main dark:text-slate-300 text-base sm:text-lg">
            إعلانات، ريلز، موشن جرافيك، تصوير فوتوغرافي، وشغل AI — كل فيديو بيحكي قصة.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as CategoryType)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm ${
                selectedCategory === cat.id
                  ? 'bg-brand-600 text-white shadow-blue-glow scale-105'
                  : 'bg-white dark:bg-slate-900 text-slateText-main dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-700 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Masonry-Style Grid with iOS-like scroll reveal */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: Math.min(idx * 0.05, 0.3),
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => onSelectProject(project)}
                className="break-inside-avoid group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-soft-card hover:shadow-2xl hover:border-brand-400 dark:hover:border-brand-500 transition-all duration-300 cursor-pointer mb-6"
              >
                {/* Thumbnail Container */}
                <div className={`relative overflow-hidden bg-slate-900 ${project.isVertical ? 'aspect-[9/16]' : 'aspect-video'}`}>
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors" />

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3 bg-brand-600/90 text-white text-xs px-2.5 py-1 rounded-lg font-semibold shadow-sm backdrop-blur-sm">
                    {project.categoryName}
                  </div>

                  {/* AI Badge */}
                  {project.isAI && (
                    <div className="absolute top-3 left-3 bg-purple-600/90 text-white text-xs px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 backdrop-blur-sm">
                      <Bot className="w-3 h-3" />
                      <span>AI</span>
                    </div>
                  )}

                  {/* Featured Badge */}
                  {project.isFeatured && (
                    <div className="absolute bottom-3 right-3 bg-yellow-400/90 text-yellow-900 text-xs px-2.5 py-1 rounded-lg font-bold backdrop-blur-sm">
                      ⭐ مميز
                    </div>
                  )}

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-brand-600/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform group-hover:bg-brand-600 backdrop-blur-sm">
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slateText-light dark:text-slate-400 font-medium">
                    <span className="font-semibold text-slateText-dark dark:text-slate-200">{project.client}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="text-base font-bold text-slateText-heading dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-slateText-main dark:text-slate-300 text-xs line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tools Tags */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-1">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.slice(0, 2).map((tool, idx) => (
                        <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slateText-dark dark:text-slate-300 text-[11px] font-semibold px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                          {tool}
                        </span>
                      ))}
                      {project.tools.length > 2 && (
                        <span className="bg-slate-100 dark:bg-slate-800 text-slateText-light dark:text-slate-400 text-[11px] px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                          +{project.tools.length - 2}
                        </span>
                      )}
                    </div>
                    <span className="text-brand-600 dark:text-brand-400 text-xs font-bold flex items-center gap-1">
                      <span>شاهد</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

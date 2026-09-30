import React, { useEffect, useRef, useState } from 'react';
import { X, Bot, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Project } from '../types';

interface VideoModalProps {
  project: Project | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ project, onClose }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activePhoto) setActivePhoto(null);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, activePhoto]);

  if (!project) return null;

  const isVertical = project.isVertical;
  const isPhotos = project.embedType === 'photos';
  const photos = project.photos || [];

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({ left: dir === 'right' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <>
      {/* Main Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className={`relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 w-full my-auto transition-colors duration-300 ${isVertical ? 'max-w-sm sm:max-w-md' : isPhotos ? 'max-w-5xl' : 'max-w-5xl'}`}>

          {/* Header */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90">
            <div className="space-y-1 flex-1 ml-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-brand-700 dark:text-brand-300 bg-brand-100 dark:bg-brand-950 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-800">
                  {project.categoryName}
                </span>
                {project.isAI && (
                  <span className="text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800 flex items-center gap-1">
                    <Bot className="w-3 h-3" />
                    AI Generated
                  </span>
                )}
                {project.isFeatured && (
                  <span className="text-xs font-bold text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-950 px-3 py-1 rounded-full border border-yellow-200 dark:border-yellow-800">
                    ⭐ مميز
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slateText-heading dark:text-white leading-snug">
                {project.title}
              </h3>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="flex-shrink-0 flex items-center gap-2 bg-slate-200 dark:bg-slate-800 hover:bg-rose-600 dark:hover:bg-rose-600 text-slateText-dark dark:text-slate-200 hover:text-white px-4 py-2.5 rounded-2xl font-bold text-sm transition-all"
              title="إغلاق — Close"
            >
              <span className="hidden sm:inline">إغلاق (Close)</span>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-8 space-y-6 bg-slate-50/50 dark:bg-slate-950/50">

            {/* ─── PHOTOS MODE: Horizontal Scroll Gallery ─── */}
            {isPhotos && photos.length > 0 ? (
              <div className="space-y-4">
                {/* Arrow Controls */}
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <span>←</span>
                    <span>اسحب أو اضغط للتصفح</span>
                    <span>→</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => scroll('left')}
                      className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => scroll('right')}
                      className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Scrollable Row */}
                <div className="relative">
                  {/* Fade edges */}
                  <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-slate-950/60 to-transparent rounded-r-2xl" />
                  <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-slate-950/60 to-transparent rounded-l-2xl" />

                  <div
                    ref={scrollRef}
                    className="flex gap-3 overflow-x-auto pb-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
                  >
                    {photos.map((src, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActivePhoto(src)}
                        className="group flex-none w-[240px] sm:w-[280px] aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 cursor-zoom-in relative shadow-lg hover:shadow-2xl hover:border-amber-500 transition-all duration-300"
                      >
                        <img
                          src={src}
                          alt={`صورة ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg backdrop-blur-sm">
                          {idx + 1}/{photos.length}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            ) : isPhotos ? null : (
              /* ─── VIDEO / BEHANCE EMBED ─── */
              <div className="p-3 bg-slate-950 rounded-2xl shadow-xl border border-slate-800">
                {project.embedType === 'youtube' ? (
                  <div className={`relative rounded-xl overflow-hidden bg-black ${isVertical ? 'aspect-[9/16]' : 'aspect-video'}`}>
                    <iframe
                      src={project.videoUrl}
                      title={project.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden bg-white" style={{ height: '380px' }}>
                    <iframe
                      src={project.videoUrl}
                      title={project.title}
                      className="w-full h-full border-0"
                      allowFullScreen
                      allow="clipboard-write"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Project Details Card */}
            <div className="p-5 sm:p-7 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-slateText-light dark:text-slate-400 border-b border-slate-100 dark:border-slate-700 pb-4">
                <span>العميل: <strong className="text-slateText-heading dark:text-white">{project.client}</strong></span>
                {project.duration && <span>المدة: <strong className="text-slateText-heading dark:text-white">{project.duration}</strong></span>}
                <span>السنة: <strong className="text-slateText-heading dark:text-white">{project.year}</strong></span>
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-bold text-slateText-dark dark:text-slate-200">عن الشغل:</h4>
                <p className="text-xs sm:text-sm text-slateText-main dark:text-slate-300 leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <span className="text-xs font-bold text-slateText-dark dark:text-slate-200">البرامج:</span>
                {project.tools.map((t, idx) => (
                  <span key={idx} className="bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-semibold text-xs px-3 py-1.5 rounded-xl border border-brand-200 dark:border-brand-800">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slateText-light dark:text-slate-400">اضغط ESC أو خارج النافذة للإغلاق</span>
              <button
                onClick={onClose}
                className="flex items-center gap-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slateText-dark dark:text-slate-200 px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all"
              >
                <X className="w-4 h-4" />
                <span>إغلاق (Close)</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ─── Lightbox (zoom in on single photo) ─── */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setActivePhoto(null)}
        >
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activePhoto}
            alt="صورة مكبرة"
            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            style={{ maxHeight: '90vh' }}
          />
        </div>
      )}
    </>
  );
};

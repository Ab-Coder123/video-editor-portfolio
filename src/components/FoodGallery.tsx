import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';

const FOOD_PHOTOS = [
  { src: '/food-photos/food-1.jpg', caption: 'إضاءة طبيعية وتفاصيل دقيقة' },
  { src: '/food-photos/food-2.jpg', caption: 'تصوير منتجات بأسلوب ناعم' },
  { src: '/food-photos/food-3.jpg', caption: 'طبق يفتح النفس من أول نظرة' },
  { src: '/food-photos/food-4.jpg', caption: 'ألوان حقيقية وتعبير صادق' },
  { src: '/food-photos/food-5.jpg', caption: 'لقطة مقربة تبرز التفاصيل' },
  { src: '/food-photos/food-6.jpg', caption: 'إضاءة استوديو احترافية' },
  { src: '/food-photos/food-7.jpg', caption: 'شغل بصري يبيع قبل الذوق' },
  { src: '/food-photos/food-8.jpg', caption: 'تصوير مطاعم على مستوى عالمي' },
];

export const FoodGallery: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.7;
    scrollRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between mb-8 gap-4"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider border border-amber-200 dark:border-amber-800">
              <Camera className="w-4 h-4" />
              <span>تصوير أكل ومطاعم</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              إضاءة دقيقة —{' '}
              <span className="text-amber-600 dark:text-amber-400 italic">تفاصيل تفتح النفس</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg">
              تصوير احترافي يبرز المنتج بأفضل صورة ويخلّي الناس تاكل بعينيها قبل الفم.
            </p>
          </div>

          {/* Arrow Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950 hover:border-amber-400 hover:text-amber-600 transition-all flex items-center justify-center shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950 hover:border-amber-400 hover:text-amber-600 transition-all flex items-center justify-center shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Horizontal Scroll Track */}
        <div className="relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-20 z-10 bg-gradient-to-l from-white dark:from-slate-950 to-transparent" />
          <div className="pointer-events-none absolute left-0 top-0 h-full w-20 z-10 bg-gradient-to-r from-white dark:from-slate-950 to-transparent" />

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>

            {FOOD_PHOTOS.map((photo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(idx * 0.07, 0.35),
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group flex-none w-[260px] sm:w-[300px] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-2xl hover:border-amber-400 dark:hover:border-amber-500 transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Caption */}
                <div className="p-3">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 text-right leading-relaxed">
                    {photo.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-slate-400 dark:text-slate-600 mt-3 flex items-center justify-center gap-1"
        >
          <span>←</span>
          <span>اسحب للتصفح</span>
          <span>→</span>
        </motion.p>

      </div>
    </section>
  );
};

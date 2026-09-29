import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clapperboard } from 'lucide-react';

interface VideoLoaderProps {
  onComplete?: () => void;
  pageName?: string;
}

export const VideoLoader: React.FC<VideoLoaderProps> = ({ onComplete, pageName }) => {
  const [progress, setProgress] = useState(0);
  const [timecode, setTimecode] = useState("00:00:00:00");
  const [statusText, setStatusText] = useState(pageName ? `جاري فتح ${pageName}...` : "جاري استيراد التايم لاين...");

  useEffect(() => {
    const statuses = [
      pageName ? `جاري معالجة ${pageName}...` : "استيراد 4K Footage...",
      "مزامنة الصوت والـ FX...",
      "تطبيق التلوين والـ Color LUTs...",
      "جاهز للإخراج 🎬"
    ];

    let currentProgress = 0;
    // Faster, smoother transition when switching pages (approx 600ms total)
    const interval = setInterval(() => {
      currentProgress += 25;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        setStatusText(statuses[3]);
        clearInterval(interval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 250);
      } else {
        setProgress(currentProgress);
        const idx = Math.min(Math.floor((currentProgress / 100) * statuses.length), statuses.length - 1);
        setStatusText(statuses[idx]);
        
        const frames = String(Math.floor(Math.random() * 24)).padStart(2, '0');
        const secs = String(Math.floor((currentProgress / 100) * 59)).padStart(2, '0');
        setTimecode(`01:00:${secs}:${frames}`);
      }
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete, pageName]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-md text-white selection:bg-brand-600 select-none overflow-hidden"
    >
      {/* Background Cinematic Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-600/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Film Strip Border at Top & Bottom */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-slate-900/80 border-b border-slate-800 flex items-center justify-around opacity-60">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-4 h-3 rounded-sm bg-slate-950 border border-slate-700/60" />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-slate-900/80 border-t border-slate-800 flex items-center justify-around opacity-60">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-4 h-3 rounded-sm bg-slate-950 border border-slate-700/60" />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 space-y-5 text-center">
        
        {/* Animated Clapperboard Icon */}
        <div className="relative">
          <motion.div
            animate={{ rotate: [0, -12, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-brand-600 to-sky-500 flex items-center justify-center shadow-2xl shadow-brand-500/30"
          >
            <Clapperboard className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </motion.div>
          
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center text-[9px] font-black text-white shadow-md"
          >
            REC
          </motion.div>
        </div>

        {/* Brand & Page Info */}
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-black text-white tracking-wide">
            {pageName ? pageName : "كريم أحمد عبد العزيز"}
          </h2>
          <p className="text-[11px] text-brand-400 font-semibold uppercase tracking-widest">
            {pageName ? "تحميل المحتوى التفاعلي" : "Video Editor & Motion Graphics"}
          </p>
        </div>

        {/* Timeline Progress Card */}
        <div className="w-full bg-slate-900/90 rounded-2xl p-4 border border-slate-800 shadow-xl space-y-3">
          
          {/* Timecode and FPS */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800 pb-2">
            <span className="text-brand-400 font-bold tracking-widest">{timecode}</span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">60.00 FPS UHD</span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300 font-medium">
              <span className="text-[11px] text-slate-400">{statusText}</span>
              <span className="font-bold text-brand-400 font-mono">{progress}%</span>
            </div>
            
            <div className="relative w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-600 via-sky-400 to-emerald-400 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Audio & Video Tracks Visual */}
          <div className="space-y-1 pt-1 opacity-75">
            <div className="h-1.5 w-full bg-slate-800 rounded flex gap-1 overflow-hidden">
              <div className="h-full bg-brand-500/80 rounded" style={{ width: '45%' }} />
              <div className="h-full bg-sky-500/80 rounded" style={{ width: '35%' }} />
              <div className="h-full bg-indigo-500/80 rounded" style={{ width: '20%' }} />
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded flex gap-1 overflow-hidden">
              <div className="h-full bg-emerald-500/80 rounded" style={{ width: '60%' }} />
              <div className="h-full bg-teal-500/80 rounded" style={{ width: '40%' }} />
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};

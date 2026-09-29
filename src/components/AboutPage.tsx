import React from 'react';
import { 
  Award, Video, Sparkles, Palette, Image as ImageIcon, Feather, 
  Volume2, Box, Camera, Cpu, Layers, CheckCircle2, Sliders 
} from 'lucide-react';
import { EDITOR_INFO, SOFTWARE_TOOLS, CAMERA_GEAR } from '../data/portfolioData';

export const AboutPage: React.FC = () => {
  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'Video': return <Video className="w-6 h-6 text-brand-600 dark:text-brand-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-brand-600 dark:text-brand-400" />;
      case 'Palette': return <Palette className="w-6 h-6 text-brand-600 dark:text-brand-400" />;
      case 'Image': return <ImageIcon className="w-6 h-6 text-brand-600 dark:text-brand-400" />;
      case 'Feather': return <Feather className="w-6 h-6 text-brand-600 dark:text-brand-400" />;
      case 'Volume2': return <Volume2 className="w-6 h-6 text-brand-600 dark:text-brand-400" />;
      case 'Box': return <Box className="w-6 h-6 text-brand-600 dark:text-brand-400" />;
      case 'Camera': return <Camera className="w-6 h-6 text-brand-600 dark:text-brand-400" />;
      default: return <Video className="w-6 h-6 text-brand-600 dark:text-brand-400" />;
    }
  };

  const workflowSteps = [
    { number: "01", title: "دراسة الفكرة والـ Script", desc: "تحليل رؤية العميل وإعداد الـ Storyboard وتحديد الهوية البصرية بالفيديو." },
    { number: "02", title: "المونتاج الأولى (Rough Cut)", desc: "قص المشاهد واختيار أفضل الأخذات مع مزامنة الإيقاع الموسيقي والقصات." },
    { number: "03", title: "الموشن جرافيك والـ FX", desc: "إضافة النصوص المتحركة (Typography)، العناوين، والشعارات 2D/3D بـ After Effects." },
    { number: "04", title: "التلوين السينمائي (Coloring)", desc: "تصحيح الألوان وإضافة الـ Mood السينمائي المناسب على DaVinci Resolve Studio." },
    { number: "05", title: "المكساج والتسليم النهائي", desc: "تنقية الصوت وإضافة المؤثرات الصوتية الـ SFX والتصدير بجودة 4K جاهزة للعرض." },
  ];

  return (
    <section className="py-12 lg:py-20 bg-white dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border-4 border-brand-100 dark:border-brand-900 shadow-2xl bg-brand-50 dark:bg-slate-800">
              <img
                src={EDITOR_INFO.photoUrl}
                alt={EDITOR_INFO.name}
                className="w-full h-auto object-cover"
              />
              <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-center">
                <h3 className="font-bold text-lg text-slateText-heading dark:text-white">{EDITOR_INFO.name}</h3>
                <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold">{EDITOR_INFO.titleAr}</p>
                <p className="text-[11px] text-slateText-light dark:text-slate-400 mt-1">{EDITOR_INFO.location}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 px-4 py-1.5 rounded-full text-brand-700 dark:text-brand-300 font-semibold text-xs">
              <Award className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>بدأ 2018 — إعمار، OKA، وزارة التضامن، مؤسسة ساويرس</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-slateText-heading dark:text-white">
              {EDITOR_INFO.name}
              <span className="block font-italic-serif text-brand-600 dark:text-brand-400 italic text-4xl sm:text-6xl mt-1">
                شغف بالابتكار وجودة الإخراج
              </span>
            </h2>

            <p className="text-slateText-main dark:text-slate-200 text-base sm:text-lg leading-relaxed font-semibold text-brand-700 dark:text-brand-300">
              {EDITOR_INFO.bio}
            </p>

            {/* Story Card */}
            <div className="bg-brand-50/70 dark:bg-slate-800/80 border border-brand-100 dark:border-slate-700 rounded-2xl p-6 space-y-3 text-slateText-main dark:text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              <h4 className="font-bold text-slateText-heading dark:text-white text-base">قصتي مع الكاميرا والمونتاج:</h4>
              <p>{EDITOR_INFO.story}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl">
                <div className="text-2xl font-bold text-brand-600 dark:text-brand-400 font-italic-serif italic">5+ سنوات</div>
                <div className="text-xs text-slateText-dark dark:text-slate-300 font-semibold mt-1">خبرة المونتاج والتصوير</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl">
                <div className="text-2xl font-bold text-brand-600 dark:text-brand-400 font-italic-serif italic">160+ مشروع</div>
                <div className="text-xs text-slateText-dark dark:text-slate-300 font-semibold mt-1">إعلانات ورئيلز وموشن</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl">
                <div className="text-2xl font-bold text-brand-600 dark:text-brand-400 font-italic-serif italic">4K UHD</div>
                <div className="text-xs text-slateText-dark dark:text-slate-300 font-semibold mt-1">دقة إخراج سينمائي</div>
              </div>
            </div>

          </div>

        </div>

        {/* Section 2: Software Tools Suite Grid */}
        <div className="space-y-8 pt-8 border-t border-slate-100 dark:border-slate-800">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold px-4 py-1.5 rounded-full text-xs border border-brand-200 dark:border-brand-800">
              <Cpu className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>حزمة البرامج والتطبيقات المستعملة</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-slateText-heading dark:text-white">
              احتراف أحدث برامج
              <span className="font-italic-serif text-brand-600 dark:text-brand-400 italic px-2">Adobe & DaVinci Resolve</span>
            </h3>
            <p className="text-slateText-main dark:text-slate-300 text-sm sm:text-base">
              نستخدم أفضل البرامج عالمياً لتحقيق أعلى مستويات الجودة في القص والتعديل والتلوين والـ 3D.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOFTWARE_TOOLS.map((tool, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-800/90 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700 hover:border-brand-400 dark:hover:border-brand-500 hover:shadow-soft-card transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center shadow-sm">
                      {getToolIcon(tool.iconName)}
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-slateText-heading dark:text-white">{tool.name}</h4>
                      <span className="text-xs text-brand-600 dark:text-brand-400 font-semibold">{tool.nameAr}</span>
                    </div>
                  </div>
                  <span className="text-xs bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold px-2.5 py-1 rounded-full border border-brand-200 dark:border-brand-800">
                    {tool.yearsOfUse}
                  </span>
                </div>

                <p className="text-xs text-slateText-main dark:text-slate-300 leading-relaxed">
                  {tool.description}
                </p>

                {/* Proficiency Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-semibold text-slateText-dark dark:text-slate-200">
                    <span>مستوى الإتقان</span>
                    <span>{tool.proficiency}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-600 to-sky-400 rounded-full transition-all duration-1000"
                      style={{ width: `${tool.proficiency}%` }}
                    />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Equipment & Gear */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Camera className="w-4 h-4" />
                <span>معدات التصوير والإنتاج Studio Gear</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                تجهيزات ومعدات سينمائية بدقة 4K UHD
              </h3>
            </div>
            <div className="text-slate-400 text-xs sm:text-sm max-w-md">
              نمتلك أحدث الكاميرات والمثبتات ومعدات الصوت لضمان جودة تصوير وإخراج لا تشوبها شائبة.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAMERA_GEAR.map((item, idx) => (
              <div key={idx} className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-5 space-y-2">
                <span className="text-xs text-brand-400 font-semibold">{item.category}</span>
                <h4 className="font-bold text-base text-white">{item.name}</h4>
                <p className="text-xs text-slate-400">{item.specs}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Workflow Stages */}
        <div className="space-y-8 pt-4">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold px-4 py-1.5 rounded-full text-xs border border-brand-200 dark:border-brand-800">
              <Layers className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>مراحل العمل والإنتاج</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-slateText-heading dark:text-white">
              من الفكرة الأولية حتى
              <span className="font-italic-serif text-brand-600 dark:text-brand-400 italic px-2">التسليم النهائي</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 space-y-3 relative">
                <span className="text-3xl font-extrabold font-italic-serif italic text-brand-500 dark:text-brand-400">
                  {step.number}
                </span>
                <h4 className="font-bold text-sm text-slateText-heading dark:text-white">{step.title}</h4>
                <p className="text-xs text-slateText-main dark:text-slate-300 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

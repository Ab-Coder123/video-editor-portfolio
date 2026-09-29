import React, { useState } from 'react';
import { Mail, PhoneCall, MapPin, Send, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { EDITOR_INFO } from '../data/portfolioData';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'commercial',
    budget: '$500 - $1500',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Prepare mailto link to ka2010055@gmail.com
    const subject = encodeURIComponent(`طلب مشروع جديد من: ${formData.name} (${formData.projectType})`);
    const body = encodeURIComponent(
      `الاسم: ${formData.name}\nالبريد الإلكتروني: ${formData.email}\nرقم الهاتف / واتساب: ${formData.phone}\nنوع المشروع: ${formData.projectType}\nالميزانية التقديرية: ${formData.budget}\n\nتفاصيل المشروع:\n${formData.message}`
    );
    
    // Open email client with pre-filled content to ka2010055@gmail.com
    window.location.href = `mailto:${EDITOR_INFO.email}?subject=${subject}&body=${body}`;
    
    setSubmitted(true);
  };

  return (
    <section className="py-12 lg:py-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold px-4 py-1.5 rounded-full text-xs border border-brand-200 dark:border-brand-800">
            <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>التواصل وبدء العمل المشترك</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slateText-heading dark:text-white">
            هل لديك مشروع فيديو جديد؟
            <span className="block font-italic-serif text-brand-600 dark:text-brand-400 italic text-4xl sm:text-6xl mt-1">
              دعنا نحوله إلى تحفة بصرية
            </span>
          </h2>
          <p className="text-slateText-main dark:text-slate-300 text-base sm:text-lg">
            أنا متاح حالياً لاستلام مشاريع الإعلانات الترويجية، فيديوهات الريلز والسوشيال ميديا، والموشن جرافيك بأسعار تنافسية وتسليم في المواعيد.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-soft-card space-y-6">
              <h3 className="text-xl font-bold text-slateText-heading dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
                معلومات التواصل المباشر
              </h3>

              <div className="space-y-4">
                
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${EDITOR_INFO.whatsapp}?text=أهلاً%20كريم،%20حابب%20أستفسر%20عن%20مشروع%20فيديو%20جديد`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">تواصل سريع عبر واتساب</span>
                    <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-200 dir-ltr">{EDITOR_INFO.phone}</h4>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href={`mailto:${EDITOR_INFO.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-600 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slateText-light dark:text-slate-400 font-medium">البريد الإلكتروني المباشر</span>
                    <h4 className="text-sm font-bold text-slateText-heading dark:text-white dir-ltr">{EDITOR_INFO.email}</h4>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="w-12 h-12 rounded-xl bg-sky-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slateText-light dark:text-slate-400 font-medium">الموقع والنطاق</span>
                    <h4 className="text-sm font-bold text-slateText-heading dark:text-white">{EDITOR_INFO.location}</h4>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slateText-light dark:text-slate-400 font-medium">أوقات العمل</span>
                    <h4 className="text-sm font-bold text-slateText-heading dark:text-white">السبت - الخميس (10:00 ص - 8:00 م)</h4>
                  </div>
                </div>

              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-brand-900 dark:bg-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-4 border border-brand-800 dark:border-slate-800">
              <h4 className="font-bold text-base text-white">تابع أعمالي الفنية على:</h4>
              <div className="flex items-center flex-wrap gap-3">
                <a href={EDITOR_INFO.socials.vimeo} target="_blank" rel="noreferrer" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold text-white transition-colors">Vimeo</a>
                <a href={EDITOR_INFO.socials.youtube} target="_blank" rel="noreferrer" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold text-white transition-colors">YouTube</a>
                <a href={EDITOR_INFO.socials.behance} target="_blank" rel="noreferrer" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold text-white transition-colors">Behance</a>
                <a href={EDITOR_INFO.socials.instagram} target="_blank" rel="noreferrer" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold text-white transition-colors">Instagram</a>
                <a href={EDITOR_INFO.socials.linkedin} target="_blank" rel="noreferrer" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold text-white transition-colors">LinkedIn</a>
              </div>
            </div>

          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-soft-card">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slateText-heading dark:text-white">تم إرسال طلبك بنجاح!</h3>
                <p className="text-slateText-main dark:text-slate-300 text-sm max-w-md mx-auto">
                  شكراً لتواصلك يا {formData.name}. تم توجيه رسالتك إلى <strong className="text-brand-600 dark:text-brand-400">{EDITOR_INFO.email}</strong> وسيتم الرد عليك في أقرب وقت.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 bg-brand-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-brand-700 transition-colors text-sm"
                >
                  إرسال طلب آخر
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-extrabold text-slateText-heading dark:text-white">ارسل تفاصيل مشروعك</h3>
                  <p className="text-xs text-slateText-light dark:text-slate-400 mt-1">
                    سيتم إرسال تفاصيل طلبك مباشرة إلى البريد الإلكتروني <strong className="text-brand-600 dark:text-brand-400 font-bold">{EDITOR_INFO.email}</strong>.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slateText-dark dark:text-slate-200">الاسم الكامل *</label>
                    <input
                      type="text"
                      required
                      placeholder="أحمد محمد"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-brand-600 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900 outline-none text-sm transition-all bg-slate-50/50 dark:bg-slate-800 dark:text-white"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slateText-dark dark:text-slate-200">البريد الإلكتروني *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-brand-600 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900 outline-none text-sm transition-all bg-slate-50/50 dark:bg-slate-800 dark:text-white dir-ltr text-right"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slateText-dark dark:text-slate-200">رقم الهاتف / الواتساب</label>
                    <input
                      type="tel"
                      placeholder="+20 1xx xxx xxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-brand-600 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900 outline-none text-sm transition-all bg-slate-50/50 dark:bg-slate-800 dark:text-white dir-ltr text-right"
                    />
                  </div>

                  {/* Project Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slateText-dark dark:text-slate-200">نوع المشروع المطلوب</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-brand-600 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900 outline-none text-sm transition-all bg-slate-50/50 dark:bg-slate-800 dark:text-white"
                    >
                      <option value="commercial">إعلان تجاري ترويجي</option>
                      <option value="motion">موشن جرافيك 2D/3D</option>
                      <option value="reels">سلسلة ريلز وتيك توك</option>
                      <option value="grading">تلوين سينمائي وتعديل ألوان</option>
                      <option value="full">إنتاج وتصوير كامل من الصفر</option>
                    </select>
                  </div>

                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slateText-dark dark:text-slate-200">تفاصيل المشروع والمتطلبات *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="اكتب نبذة عن الفيديو المطلوب، المدة الزمنية المتوقعة، وأي أفكار حابب نطبقها..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-brand-600 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900 outline-none text-sm transition-all bg-slate-50/50 dark:bg-slate-800 dark:text-white resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl shadow-blue-glow hover:shadow-xl transition-all flex items-center justify-center gap-2 text-base"
                >
                  <Send className="w-5 h-5" />
                  <span>إرسال الطلب إلى {EDITOR_INFO.email}</span>
                </button>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

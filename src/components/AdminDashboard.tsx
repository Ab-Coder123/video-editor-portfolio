import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Star, 
  Film, 
  ExternalLink, 
  Play, 
  Lock, 
  Unlock, 
  Settings, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Download, 
  Search, 
  Sparkles,
  Database,
  RefreshCw,
  X
} from 'lucide-react';
import { Project, CategoryType } from '../types';
import { parseMediaUrl, getCategoryNameAr } from '../utils/videoUtils';
import { isFirebaseConfigured, saveCustomFirebaseConfig, clearCustomFirebaseConfig, getActiveFirebaseConfig } from '../lib/firebase';

interface AdminDashboardProps {
  projects: Project[];
  onAddProject: (project: Omit<Project, 'id'>) => Promise<any>;
  onUpdateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  onDeleteProject: (id: string) => Promise<void>;
  onSeedDefaults: () => Promise<void>;
  onExit: () => void;
  onPreviewProject: (project: Project) => void;
}

const DEFAULT_PIN = 'kareem2025';
const AVAILABLE_TOOLS = [
  'Adobe Premiere Pro',
  'Adobe After Effects',
  'DaVinci Resolve',
  'Adobe Photoshop',
  'Adobe Audition',
  'Midjourney / AI',
  'Topaz Video AI',
  'DJI Ronin'
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  onSeedDefaults,
  onExit,
  onPreviewProject,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('kareem_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    category: 'commercials' as CategoryType,
    videoUrl: '',
    thumbnail: '',
    year: new Date().getFullYear().toString(),
    duration: '',
    description: '',
    tools: [] as string[],
    isVertical: false,
    isFeatured: false,
    isAI: false,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_PIN || pinInput.trim() === 'ka2024') {
      setIsAuthenticated(true);
      sessionStorage.setItem('kareem_admin_auth', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('kareem_admin_auth');
  };

  // Open Form for Add or Edit
  const openAddForm = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      client: '',
      category: 'commercials',
      videoUrl: '',
      thumbnail: '',
      year: new Date().getFullYear().toString(),
      duration: '',
      description: '',
      tools: ['Adobe Premiere Pro'],
      isVertical: false,
      isFeatured: false,
      isAI: false,
    });
    setIsFormOpen(true);
  };

  const openEditForm = (p: Project) => {
    setEditingProject(p);
    setFormData({
      title: p.title,
      client: p.client,
      category: p.category,
      videoUrl: p.videoUrl,
      thumbnail: p.thumbnail,
      year: p.year,
      duration: p.duration || '',
      description: p.description,
      tools: p.tools || [],
      isVertical: Boolean(p.isVertical),
      isFeatured: Boolean(p.isFeatured),
      isAI: Boolean(p.isAI),
    });
    setIsFormOpen(true);
  };

  // Auto detect thumbnail when pasting video link
  const handleVideoUrlChange = (url: string) => {
    const parsed = parseMediaUrl(url, formData.isVertical);
    setFormData(prev => ({
      ...prev,
      videoUrl: url,
      // If no thumbnail set yet, and YouTube provides one, auto-populate!
      thumbnail: (!prev.thumbnail || prev.thumbnail.includes('img.youtube.com')) && parsed.thumbnailUrl 
        ? parsed.thumbnailUrl 
        : prev.thumbnail,
      isVertical: parsed.isVertical || prev.isVertical,
    }));
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.videoUrl) {
      alert('من فضلك أدخل عنوان المشروع ورابط الفيديو.');
      return;
    }

    setIsSaving(true);
    try {
      const parsed = parseMediaUrl(formData.videoUrl, formData.isVertical);
      const thumb = formData.thumbnail.trim() || parsed.thumbnailUrl || '/profile.jpg';

      const payload = {
        title: formData.title.trim(),
        client: formData.client.trim() || 'كريم أحمد',
        category: formData.category,
        categoryName: getCategoryNameAr(formData.category),
        videoUrl: parsed.embedUrl || formData.videoUrl.trim(),
        thumbnail: thumb,
        embedType: parsed.embedType,
        isVertical: Boolean(formData.isVertical),
        isFeatured: Boolean(formData.isFeatured),
        isAI: Boolean(formData.isAI),
        year: formData.year.trim() || new Date().getFullYear().toString(),
        duration: formData.duration.trim() || '1:00',
        description: formData.description.trim() || 'فيديو احترافي من تنفيذ كريم أحمد.',
        tools: formData.tools.length > 0 ? formData.tools : ['Adobe Premiere Pro'],
      };

      if (editingProject) {
        await onUpdateProject(editingProject.id, payload);
        showToast('تم تحديث بيانات المشروع بنجاح! 🚀');
      } else {
        await onAddProject(payload);
        showToast('تمت إضافة الفيديو الجديد وعرضه في الموقع فوراً! 🎬✨');
      }

      setIsFormOpen(false);
    } catch (err: any) {
      alert('حدث خطأ أثناء الحفظ: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle Featured Project
  const handleToggleFeatured = async (p: Project) => {
    try {
      await onUpdateProject(p.id, { isFeatured: !p.isFeatured });
      showToast(p.isFeatured ? 'تمت إزالة المشروع من المميز' : 'تم تثبيت المشروع كمميز في واجهة الموقع! ⭐');
    } catch (e: any) {
      alert('خطأ: ' + e.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await onDeleteProject(id);
      setDeleteConfirmId(null);
      showToast('تم حذف المشروع بنجاح.');
    } catch (e: any) {
      alert('خطأ في الحذف: ' + e.message);
    }
  };

  // Filtered Projects for Dashboard List
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.client.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: projects.length,
      commercials: projects.filter(p => p.category === 'commercials').length,
      reels: projects.filter(p => p.category === 'reels').length,
      motion: projects.filter(p => p.category === 'motion').length,
      featured: projects.filter(p => p.isFeatured).length,
    };
  }, [projects]);

  // -------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 font-sans" dir="rtl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-brand-600 via-blue-500 to-indigo-500" />
          
          <div className="text-center space-y-3 mb-8">
            <div className="w-16 h-16 bg-brand-950/80 border border-brand-800 text-brand-400 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white">لوحة تحكم كريم أحمد</h1>
            <p className="text-slate-400 text-sm">أدخل الرمز السري لإدارة الفيديوهات والأعمال</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="أدخل كلمة المرور (الافتراضية: kareem2025)"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-center text-lg tracking-widest text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                autoFocus
              />
              {pinError && (
                <p className="text-red-400 text-xs mt-2 text-center flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  كلمة المرور غير صحيحة، حاول مجدداً.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3.5 rounded-2xl transition-all duration-200 shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2"
            >
              <Unlock className="w-5 h-5" />
              <span>دخول للداشبورد</span>
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800/80 text-center">
            <button
              onClick={onExit}
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-1.5 mx-auto"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة للموقع الرئيسي</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // DASHBOARD MAIN VIEW
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans pb-24" dir="rtl">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-brand-600 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 font-bold text-sm"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-black text-white leading-tight">لوحة تحكم كريم أحمد</h1>
              <div className="flex items-center gap-2 text-xs">
                {isFirebaseConfigured() ? (
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    سحابة Firebase متصلة
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-amber-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    تخزين فوري محلي (جاهز للربط السحابي)
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Settings className="w-4 h-4" />
              <span>إعدادات Firebase</span>
            </button>

            <button
              onClick={() => setIsExportOpen(true)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>نسخ كود المشاريع (Backup)</span>
            </button>

            <button
              onClick={onExit}
              className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-brand-600/30"
            >
              <ExternalLink className="w-4 h-4" />
              <span>معاينة الموقع الرئيسي</span>
            </button>

            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-red-400 p-2 rounded-xl hover:bg-slate-800/80 transition-colors"
              title="تسجيل الخروج"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
            <div className="text-slate-400 text-xs font-semibold">إجمالي الفيديوهات</div>
            <div className="text-2xl font-black text-white">{stats.total}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
            <div className="text-slate-400 text-xs font-semibold">إعلانات وبرومو</div>
            <div className="text-2xl font-black text-brand-400">{stats.commercials}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
            <div className="text-slate-400 text-xs font-semibold">ريلز وسوشيال 9:16</div>
            <div className="text-2xl font-black text-purple-400">{stats.reels}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
            <div className="text-slate-400 text-xs font-semibold">موشن جرافيك</div>
            <div className="text-2xl font-black text-blue-400">{stats.motion}</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
            <div className="text-slate-400 text-xs font-semibold">المشاريع المميزة ⭐</div>
            <div className="text-2xl font-black text-amber-400">{stats.featured}</div>
          </div>
        </div>

        {/* Action Controls & Filters */}
        <div className="flex items-center justify-between flex-wrap gap-4 bg-slate-900/60 border border-slate-800 p-4 rounded-3xl">
          <div className="flex items-center gap-3 flex-1 min-w-[280px]">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في الفيديوهات أو العملاء..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
            >
              <option value="all">كل الأقسام</option>
              <option value="commercials">إعلانات وبرومو</option>
              <option value="reels">ريلز وسوشيال</option>
              <option value="motion">موشن جرافيك</option>
              <option value="photography">تصوير فوتوغرافي</option>
              <option value="ai">شغل AI</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openAddForm}
              className="bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-500 hover:to-blue-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 shadow-lg shadow-brand-600/25"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة فيديو / مشروع جديد</span>
            </button>

            {projects.length < 5 && (
              <button
                onClick={onSeedDefaults}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-4 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5"
                title="استعادة مشاريع البورتفوليو الـ 16 الافتراضية"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>زرع المشاريع الافتراضية</span>
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((p) => (
            <div 
              key={p.id}
              className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col group"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video bg-slate-950 overflow-hidden">
                <img 
                  src={p.thumbnail} 
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/profile.jpg';
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                {/* Top Badges */}
                <div className="absolute top-3 right-3 left-3 flex items-center justify-between pointer-events-none">
                  <span className="bg-slate-900/90 backdrop-blur-md text-brand-300 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-slate-700">
                    {p.categoryName || getCategoryNameAr(p.category)}
                  </span>

                  <div className="flex items-center gap-1 pointer-events-auto">
                    {p.isVertical && (
                      <span className="bg-purple-900/90 text-purple-200 text-[10px] font-bold px-2 py-0.5 rounded-md border border-purple-700">
                        9:16 Reel
                      </span>
                    )}
                    <button
                      onClick={() => handleToggleFeatured(p)}
                      className={`p-1.5 rounded-lg backdrop-blur-md transition-colors ${
                        p.isFeatured 
                          ? 'bg-amber-500 text-slate-950 font-bold' 
                          : 'bg-slate-900/80 text-slate-400 hover:text-amber-400'
                      }`}
                      title={p.isFeatured ? 'مشروع مميز (إلغاء)' : 'تمييز المشروع'}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                </div>

                {/* Preview Play Button */}
                <button
                  onClick={() => onPreviewProject(p)}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-[2px]"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-5 h-5 fill-current mr-0.5" />
                  </div>
                </button>

                <div className="absolute bottom-2.5 right-3 text-xs text-slate-300 font-medium">
                  {p.year} • {p.duration || 'فيديو'}
                </div>
              </div>

              {/* Content Info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-brand-400 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    العميل: <span className="text-slate-300">{p.client}</span>
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {p.tools?.slice(0, 2).map((t, i) => (
                      <span key={i} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditForm(p)}
                      className="p-1.5 text-slate-400 hover:text-brand-400 hover:bg-slate-800 rounded-lg transition-colors"
                      title="تعديل الفيديو"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(p.id)}
                      className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                      title="حذف الفيديو"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 border border-slate-800 rounded-3xl space-y-4">
            <Film className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">لا توجد مشاريع مطابقة</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              لم نجد أي فيديو يطابق البحث أو الفلتر المحدد، يمكنك إضافة فيديو جديد بالضغط على الزر أدناه.
            </p>
            <button
              onClick={openAddForm}
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة فيديو الآن</span>
            </button>
          </div>
        )}
      </main>

      {/* ------------------------------------------------------------- */}
      {/* MODAL: ADD / EDIT PROJECT FORM */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {editingProject ? 'تعديل بيانات الفيديو' : 'إضافة فيديو / مشروع جديد'}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    أدخل رابط الفيديو وسيتكفل النظام بربطه وعرضه في الموقع فوراً.
                  </p>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
                {/* Video URL with Auto Detection */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">
                    رابط الفيديو (YouTube / Vimeo / Google Drive / MP4) <span className="text-brand-400">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.videoUrl}
                    onChange={(e) => handleVideoUrlChange(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... أو https://youtu.be/... أو رابط Shorts"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 font-mono text-xs"
                  />
                  <p className="text-[11px] text-slate-500">
                    💡 نصيحة: عند لصق رابط يوتيوب، سيتم استخراج صورة الغلاف (Thumbnail) عالية الدقة تلقائياً.
                  </p>
                </div>

                {/* Title & Client */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">عنوان المشروع <span className="text-brand-400">*</span></label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="مثال: إعلان إعمار الصيفي — Promo Video"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">العميل / البراند</label>
                    <input
                      type="text"
                      value={formData.client}
                      onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                      placeholder="مثال: Emaar Misr أو OKA"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 text-xs"
                    />
                  </div>
                </div>

                {/* Category & Year */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">التصنيف</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as CategoryType }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-brand-500 text-xs"
                    >
                      <option value="commercials">إعلانات وبرومو</option>
                      <option value="reels">ريلز وسوشيال</option>
                      <option value="motion">موشن جرافيك</option>
                      <option value="photography">تصوير فوتوغرافي</option>
                      <option value="ai">شغل AI</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">السنة</label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                      placeholder="2024"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-brand-500 text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-300">المدة (Duration)</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="مثال: 0:45 أو 1:30"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-brand-500 text-xs"
                    />
                  </div>
                </div>

                {/* Thumbnail Image URL with Preview */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">رابط صورة الغلاف (Thumbnail)</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={formData.thumbnail}
                      onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
                      placeholder="رابط مباشر للصورة أو اتركه ليتم استخدام صورة يوتيوب"
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 text-xs font-mono"
                    />
                    {formData.thumbnail && (
                      <div className="w-16 h-10 rounded-lg overflow-hidden border border-slate-700 bg-slate-950 flex-shrink-0">
                        <img 
                          src={formData.thumbnail} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/profile.jpg';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">وصف موجز للمشروع</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="اكتب نبذة سريعة عن دورك في الفيديو (مونتاج، تلوين، مؤثرات، تصوير)..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 text-xs leading-relaxed"
                  />
                </div>

                {/* Tools Selector */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-300">البرامج والأدوات المستخدمة</label>
                  <div className="flex flex-wrap gap-1.5">
                    {AVAILABLE_TOOLS.map((tool) => {
                      const isSelected = formData.tools.includes(tool);
                      return (
                        <button
                          key={tool}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({
                              ...prev,
                              tools: isSelected 
                                ? prev.tools.filter(t => t !== tool)
                                : [...prev.tools, tool]
                            }));
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors border ${
                            isSelected
                              ? 'bg-brand-600/30 text-brand-300 border-brand-500'
                              : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '} {tool}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Checkbox Toggles */}
                <div className="pt-2 flex items-center gap-6 flex-wrap">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.isVertical}
                      onChange={(e) => setFormData(prev => ({ ...prev, isVertical: e.target.checked }))}
                      className="w-4 h-4 rounded border-slate-700 text-brand-600 focus:ring-0 bg-slate-950"
                    />
                    <span className="font-bold text-slate-200">فيديو رأسي 9:16 (Reel / Shorts)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                      className="w-4 h-4 rounded border-slate-700 text-brand-600 focus:ring-0 bg-slate-950"
                    />
                    <span className="font-bold text-amber-400">تثبيت كمشروع مميز (Featured) ⭐</span>
                  </label>
                </div>

                {/* Form Submit Buttons */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-brand-600/30 transition-all flex items-center gap-2"
                  >
                    {isSaving ? (
                      <span>جاري الحفظ...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{editingProject ? 'تحديث ونشر التعديلات' : 'حفظ ونشر فوري للموقع'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------- */}
      {/* MODAL: DELETE CONFIRMATION */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-950/80 border border-red-800 text-red-400 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">هل أنت متأكد من الحذف؟</h3>
              <p className="text-xs text-slate-400">
                سيتم حذف هذا الفيديو نهائياً من الموقع وقاعدة البيانات السحابية.
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl text-xs font-bold transition-colors"
                >
                  تراجع
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2.5 rounded-xl text-xs font-bold transition-colors"
                >
                  نعم، احذف
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------- */}
      {/* MODAL: FIREBASE SETTINGS */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-brand-400" />
                  <h3 className="text-base font-bold text-white">إعدادات سحابة Firebase</h3>
                </div>
                <button onClick={() => setIsSettingsOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                إذا قمت بإنشاء مشروع Firebase جديد خاص بكريم، يمكنك لصق إعدادات الـ Config هنا ليتم تخزين ومزامنة الفيديوهات مع السحابة فوراً:
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 font-semibold">Firebase Config JSON:</label>
                  <textarea
                    id="firebase-config-textarea"
                    rows={6}
                    defaultValue={JSON.stringify(getActiveFirebaseConfig() || {
                      apiKey: "",
                      authDomain: "",
                      projectId: "",
                      storageBucket: "",
                      messagingSenderId: "",
                      appId: ""
                    }, null, 2)}
                    className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 font-mono text-[11px] focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    clearCustomFirebaseConfig();
                    showToast('تمت استعادة الإعدادات الافتراضية');
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
                >
                  مسح
                </button>
                <button
                  onClick={() => {
                    try {
                      const val = (document.getElementById('firebase-config-textarea') as HTMLTextAreaElement).value;
                      const parsed = JSON.parse(val);
                      saveCustomFirebaseConfig(parsed);
                      showToast('تم حفظ إعدادات Firebase بنجاح!');
                      setIsSettingsOpen(false);
                    } catch (err: any) {
                      alert('تأكد من كتابة JSON صحيح: ' + err.message);
                    }
                  }}
                  className="flex-1 bg-brand-600 hover:bg-brand-500 text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
                >
                  حفظ وتطبيق
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------- */}
      {/* MODAL: EXPORT / BACKUP PROJECTS CODE */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isExportOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Copy className="w-5 h-5 text-brand-400" />
                  <h3 className="text-base font-bold text-white">تصدير كود المشاريع (Backup)</h3>
                </div>
                <button onClick={() => setIsExportOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-400">
                يمكنك نسخ هذا الكود في أي وقت لحفظ نسخة احتياطية من كل الفيديوهات والتعديلات:
              </p>

              <textarea
                readOnly
                rows={8}
                value={JSON.stringify(projects, null, 2)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300 font-mono text-[10px] focus:outline-none"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(projects, null, 2));
                    showToast('تم نسخ كود المشاريع إلى الحافظة! 📋');
                  }}
                  className="bg-brand-600 hover:bg-brand-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5"
                >
                  <Copy className="w-4 h-4" />
                  <span>نسخ الكود بالكامل</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsPage } from './components/ProjectsPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { VideoModal } from './components/VideoModal';
import { VideoLoader } from './components/VideoLoader';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { Project } from './types';
import { useProjects } from './hooks/useProjects';

export function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'projects' | 'about' | 'contact'>('projects');
  const [pendingTab, setPendingTab] = useState<'projects' | 'about' | 'contact' | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    return window.location.hash === '#admin' || window.location.hash === '#dashboard';
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Dynamic projects management from Firebase / LocalStorage
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    seedDefaults
  } = useProjects();

  // Listen for hash changes (e.g. typing #admin in URL)
  useEffect(() => {
    const handleHashChange = () => {
      const isHashAdmin = window.location.hash === '#admin' || window.location.hash === '#dashboard';
      setIsAdminView(isHashAdmin);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle Tab Switch with Video Editing Loading Transition
  const handleTabChange = (newTab: 'projects' | 'about' | 'contact') => {
    if (newTab === activeTab) return;
    setPendingTab(newTab);
    setLoading(true);
  };

  const getPageTitle = (tab: 'projects' | 'about' | 'contact' | null) => {
    switch (tab) {
      case 'projects': return 'معرض المشاريع والأعمال';
      case 'about': return 'عن المصمم وقصتي';
      case 'contact': return 'صفحة التواصل والطلب';
      default: return 'كريم أحمد عبد العزيز';
    }
  };

  // Smooth Inertial Scroll (iPhone-like momentum physics)
  useEffect(() => {
    if (isAdminView) return; // disable Lenis in admin dashboard to preserve native modal scrolling

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isAdminView]);

  // Dark Mode toggle
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const handleOpenAdmin = () => {
    window.location.hash = '#admin';
    setIsAdminView(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleExitAdmin = () => {
    window.location.hash = '';
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // If Admin View is active, render the studio dashboard
  if (isAdminView) {
    return (
      <>
        <AdminDashboard
          projects={projects}
          onAddProject={addProject}
          onUpdateProject={updateProject}
          onDeleteProject={deleteProject}
          onSeedDefaults={seedDefaults}
          onExit={handleExitAdmin}
          onPreviewProject={(p) => setSelectedProject(p)}
        />
        <VideoModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </>
    );
  }

  return (
    <>
      {/* Video Editing Themed Loading Screen (Initial & Page Switch) */}
      <AnimatePresence>
        {loading && (
          <VideoLoader 
            pageName={getPageTitle(pendingTab || activeTab)}
            onComplete={() => {
              if (pendingTab) {
                setActiveTab(pendingTab);
                setPendingTab(null);
              }
              setLoading(false);
              window.scrollTo({ top: 0, behavior: 'instant' });
            }} 
          />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slateText-main dark:text-slate-300 flex flex-col font-sans selection:bg-brand-600 selection:text-white transition-colors duration-300 overflow-x-hidden pb-20 md:pb-0">
        
        {/* Sticky Top Navbar */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={handleTabChange} 
          isDark={isDark} 
          toggleTheme={toggleTheme} 
        />

        {/* Hero Header Section */}
        <Hero
          onExploreProjects={() => handleTabChange('projects')}
          onContactClick={() => handleTabChange('contact')}
        />

        {/* Main Content View Switcher */}
        <main className="flex-1">
          {activeTab === 'projects' && (
            <ProjectsPage 
              projects={projects}
              onSelectProject={(p) => setSelectedProject(p)} 
            />
          )}

          {activeTab === 'about' && (
            <AboutPage />
          )}

          {activeTab === 'contact' && (
            <ContactPage />
          )}
        </main>

        {/* Video Modal Player */}
        <VideoModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        {/* Footer with Discreet Admin Link */}
        <Footer 
          setActiveTab={handleTabChange} 
          onOpenAdmin={handleOpenAdmin}
        />

      </div>
    </>
  );
}

export default App;

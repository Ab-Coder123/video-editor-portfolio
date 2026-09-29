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
import { Project } from './types';

export function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'projects' | 'about' | 'contact'>('projects');
  const [pendingTab, setPendingTab] = useState<'projects' | 'about' | 'contact' | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

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
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-like exponential deceleration
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
  }, []);

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
            <ProjectsPage onSelectProject={(p) => setSelectedProject(p)} />
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

        {/* Footer */}
        <Footer setActiveTab={handleTabChange} />

      </div>
    </>
  );
}

export default App;

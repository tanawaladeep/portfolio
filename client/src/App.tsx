import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { EducationSection } from './sections/EducationSection';
import { LearningRoadmapSection } from './sections/LearningRoadmapSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './components/Footer';
import { useScrollSpy } from './hooks/useScrollSpy';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

export const App: React.FC = () => {
  const sectionIds = ['home', 'about', 'skills', 'projects', 'education', 'roadmap', 'contact'];
  const activeSection = useScrollSpy(sectionIds, 150);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Initialize Lenis smooth scroll if reduced motion is disabled
  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    let animationFrameId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-dark-950">
      {/* Top Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <LearningRoadmapSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;

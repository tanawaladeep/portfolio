import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
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

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const sectionIds = ['home', 'about', 'skills', 'projects', 'education', 'roadmap', 'contact'];
  const activeSection = useScrollSpy(sectionIds, 150);
  const prefersReducedMotion = usePrefersReducedMotion();
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis, GSAP ScrollTrigger sync, and AOS
  useEffect(() => {
    // 1. Initialize AOS for declarative section reveals
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 40,
      disable: prefersReducedMotion,
    });

    if (prefersReducedMotion) {
      return () => {
        // Cleanup AOS
      };
    }

    // 2. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
      AOS.refresh();
    });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // 3. GSAP Context for global scroll-driven animations & progress bar
    const ctx = gsap.context(() => {
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.2,
          },
        });
      }
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [prefersReducedMotion]);

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-dark-950 relative">
      {/* GSAP-Driven Global Scroll Progress Indicator */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-500 via-amber-300 to-emerald-400 z-50 origin-left scale-x-0 pointer-events-none shadow-sm shadow-amber-500/20"
      />

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

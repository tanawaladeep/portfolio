import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ArrowDown, Mail, MapPin, CheckCircle } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { CodeSnippetPreview } from '../components/CodeSnippetPreview';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';

export const HeroSection: React.FC = () => {
  const amberOrbRef = useRef<HTMLDivElement>(null);
  const indigoOrbRef = useRef<HTMLDivElement>(null);

  // GSAP Subtle Floating Parallax on Background Orbs
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (amberOrbRef.current) {
        gsap.to(amberOrbRef.current, {
          y: 35,
          x: -15,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
      if (indigoOrbRef.current) {
        gsap.to(indigoOrbRef.current, {
          y: -25,
          x: 20,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-grid-pattern"
    >
      {/* Background radial glowing gradients with GSAP floating effect */}
      <div
        ref={amberOrbRef}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none"
      />
      <div
        ref={indigoOrbRef}
        className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-900/90 border border-amber-500/30 text-xs font-mono text-amber-300 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>MCA Student • Aspiring Java Backend Developer</span>
            </motion.div>

            {/* Name & Primary Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Hi, I'm{' '}
                <span className="text-gradient-amber drop-shadow-sm">
                  {personalInfo.name}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-300">
                Crafting robust backend services, relational database systems &amp; clean software architectures.
              </p>
            </motion.div>

            {/* Introduction Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Master of Computer Applications student dedicated to backend engineering. 
              Grounded in <strong className="text-slate-200">Core Java</strong>, strict{' '}
              <strong className="text-slate-200">Object-Oriented Programming (OOP)</strong>,{' '}
              <strong className="text-slate-200">Data Structures &amp; Algorithms</strong>, and{' '}
              <strong className="text-slate-200">SQL/DBMS normalization</strong>.
            </motion.p>

            {/* Key Engineering Pillars Pill Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1"
            >
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-dark-900 border border-slate-800 text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Core Java OOP
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-dark-900 border border-slate-800 text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400" /> Relational SQL / 3NF
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-dark-900 border border-slate-800 text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-indigo-400" /> RESTful APIs
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-dark-900 border border-slate-800 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-red-400" /> Surat, Gujarat
              </span>
            </motion.div>

            {/* CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-xl font-semibold text-sm text-dark-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-lg hover:shadow-amber-500/25 flex items-center gap-2 group cursor-pointer"
              >
                <span>View Featured Projects</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-xl font-semibold text-sm text-slate-200 bg-dark-900 hover:bg-slate-800 border border-slate-700 transition-all hover:border-slate-600 flex items-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Contact Deep</span>
              </motion.a>

              {/* Social profile quick links */}
              <div className="flex items-center gap-2 pl-2">
                <motion.a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl text-slate-400 hover:text-white bg-dark-900 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl text-slate-400 hover:text-sky-400 bg-dark-900 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Code Snippet / Simulation Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-6 w-full"
          >
            <CodeSnippetPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

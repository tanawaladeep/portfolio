import React from 'react';
import { Compass, Award } from 'lucide-react';
import { roadmapData } from '../data/portfolioData';

export const LearningRoadmapSection: React.FC = () => {
  return (
    <section id="roadmap" className="py-24 relative bg-dark-950/70 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-16 text-center max-w-2xl mx-auto" data-aos="fade-up">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Compass className="w-3.5 h-3.5" />
            <span>Learning Journey &amp; Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Java Backend <span className="text-gradient-amber">Developer Roadmap</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A transparent view into past milestones, current engineering objectives, and upcoming technical targets.
          </p>
        </div>

        {/* Roadmap Milestones Grid with AOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {roadmapData.map((milestone, idx) => {
            const isCompleted = milestone.status === 'Completed';
            const isInProgress = milestone.status === 'In Progress';

            return (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className={`p-6 rounded-2xl bg-dark-900/90 border transition-all duration-300 flex flex-col justify-between glass-panel relative ${
                  isInProgress
                    ? 'border-amber-500/50 shadow-lg shadow-amber-500/10'
                    : isCompleted
                    ? 'border-emerald-500/30'
                    : 'border-slate-800 opacity-90'
                }`}
              >
                <div className="space-y-4">
                  {/* Status header */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {milestone.phase}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border ${
                        isCompleted
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : isInProgress
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {milestone.status}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-base text-white tracking-tight">
                      {milestone.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Key Topics Covered */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                      Focus Areas:
                    </div>
                    <div className="space-y-1.5">
                      {milestone.topics.map((topic, tIdx) => (
                        <div
                          key={tIdx}
                          className="flex items-start gap-1.5 text-xs text-slate-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 mt-1.5 shrink-0" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/60 text-[11px] font-mono text-slate-500">
                  {milestone.period}
                </div>
              </div>
            );
          })}
        </div>

        {/* Learning Milestones Card with AOS */}
        <div
          data-aos="fade-up"
          className="p-8 rounded-2xl bg-dark-900/80 border border-slate-800/90 glass-panel space-y-6"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Learning Milestones
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Targeted enterprise technologies, cloud architectures, and ongoing technical mastery.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 self-start sm:self-auto font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              In Progress Roadmap
            </span>
          </div>

          {/* Full-Width Feature Card */}
          <div className="rounded-xl bg-dark-850/90 border border-amber-500/30 p-6 sm:p-8 space-y-6 shadow-xl shadow-amber-500/5 hover:border-amber-400 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Title & Specialization Overview (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Target: 2025 – 2026
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Backend Specialization Track
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Enterprise Spring Boot &amp; Cloud Services
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-400/90 font-mono">
                    [Self-Paced Learning / Target Certification]
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Deep-diving into production-grade Java enterprise systems: building scalable microservices with Spring Boot, automating object-relational database transactions with Spring Data JPA, designing secure REST APIs, and containerizing applications using Docker.
                </p>
              </div>

              {/* Right Column: Architectural Focus & Badges (5 cols) */}
              <div className="lg:col-span-5 bg-dark-900/80 rounded-xl p-5 border border-slate-800 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center justify-between">
                  <span>Core Focus Areas:</span>
                  <span className="text-amber-400 font-mono text-[11px]">4 Key Pillars</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Spring Boot', tag: 'Microservices & REST' },
                    { name: 'Spring Data JPA', tag: 'ORM & Hibernate' },
                    { name: 'REST APIs', tag: 'Contract & Security' },
                    { name: 'Docker', tag: 'Containerization' },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-dark-850 border border-slate-800 hover:border-amber-500/40 transition-colors space-y-1"
                    >
                      <span className="text-xs font-bold text-slate-200 block font-mono">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Award } from 'lucide-react';
import { roadmapData } from '../data/portfolioData';

export const LearningRoadmapSection: React.FC = () => {
  const certifications = [
    {
      title: 'Java Programming & OOP Foundations',
      issuer: '[Issuing Authority / University / Platform Placeholder]',
      date: '[2024 / Editable Placeholder]',
      skills: ['Java OOP', 'Collections', 'Exception Handling', 'Multithreading'],
      status: 'Verified Coursework',
    },
    {
      title: 'Database Management Systems & SQL',
      issuer: '[Issuing Authority / Platform Placeholder]',
      date: '[2024 / Editable Placeholder]',
      skills: ['Relational Schema Design', 'SQL Queries', '3NF Normalization', 'Transactions'],
      status: 'Academic Completion',
    },
    {
      title: 'Enterprise Spring Boot & Cloud Services',
      issuer: '[Self-Paced Learning / Target Certification]',
      date: 'Target: 2025 - 2026',
      skills: ['Spring Boot', 'Spring Data JPA', 'REST APIs', 'Docker'],
      status: 'In Progress Roadmap',
    },
  ];

  return (
    <section id="roadmap" className="py-24 relative bg-dark-950/70 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-16 text-center max-w-2xl mx-auto">
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

        {/* Roadmap Milestones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {roadmapData.map((milestone, idx) => {
            const isCompleted = milestone.status === 'Completed';
            const isInProgress = milestone.status === 'In Progress';

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
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
              </motion.div>
            );
          })}
        </div>

        {/* Certifications & Learning Credentials */}
        <div className="p-8 rounded-2xl bg-dark-900/60 border border-slate-800 glass-panel space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Certifications &amp; Learning Milestones
                </h3>
                <p className="text-xs text-slate-400">
                  Documented certifications and verified coursework credentials (editable placeholders).
                </p>
              </div>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-dark-850 text-slate-400 border border-slate-800 self-start sm:self-auto">
              Verified &amp; Ongoing
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certifications.map((cert, cIdx) => (
              <div
                key={cIdx}
                className="p-4 rounded-xl bg-dark-850/80 border border-slate-800/90 space-y-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                    <span>{cert.date}</span>
                    <span className="text-amber-400/90">{cert.status}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{cert.title}</h4>
                  <p className="text-xs text-slate-400">{cert.issuer}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cert.skills.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-dark-950 text-slate-300 border border-slate-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

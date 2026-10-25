import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, BookOpen, CheckCircle2 } from 'lucide-react';
import { educationData } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 relative bg-dark-900/50 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education &amp; <span className="text-gradient-emerald">Formal Training</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Rigorous computational foundations, software engineering curricula, and core computer science coursework.
          </p>
        </div>

        {/* Education Timeline / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educationData.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="p-8 rounded-2xl bg-dark-900/90 border border-slate-800 glass-panel-hover flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Status & Duration */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-medium border ${
                      edu.status === 'Pursuing'
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    {edu.status === 'Pursuing' ? '● Currently Enrolled' : '✓ Completed'}
                  </span>

                  <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {edu.duration}
                  </span>
                </div>

                {/* Degree Title & College */}
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {edu.degree}
                  </h3>
                  <div className="text-sm font-medium text-amber-400/90">
                    {edu.institution}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{edu.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {edu.description}
                </p>

                {/* Grade Placeholder Tag (Marked as Editable per prompt guidelines) */}
                {edu.gradePlaceholder && (
                  <div className="p-2.5 rounded-lg bg-dark-950/80 border border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
                    <span className="text-slate-500">Academic Standing:</span>
                    <span className="text-amber-300 font-medium">{edu.gradePlaceholder}</span>
                  </div>
                )}

                {/* Coursework List */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Key Coursework &amp; Syllabi</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {edu.coursework.map((course, cIdx) => (
                      <div
                        key={cIdx}
                        className="flex items-center gap-2 p-2 rounded-lg bg-dark-850/80 border border-slate-800/80 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{course}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Stamp */}
              <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>MCA Specialization Track</span>
                <span className="text-slate-400">Deep Tanawala</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, Target, Cpu, CheckCircle2, Shield, Database, Code2, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const corePrinciples = [
    {
      title: 'Object-Oriented Integrity',
      desc: 'Writing maintainable code adhering to SOLID principles, design patterns (Singleton, Factory, DAO), and strict encapsulation.',
      icon: <Code2 className="w-5 h-5 text-amber-400" />,
    },
    {
      title: 'Relational Schema Rigor',
      desc: 'Architecting 3NF normalized MySQL/PostgreSQL databases with foreign keys, composite indexes, and transaction isolation.',
      icon: <Database className="w-5 h-5 text-blue-400" />,
    },
    {
      title: 'Algorithmic Problem Solving',
      desc: 'Evaluating data structures from asymptotic Big-O runtime and spatial footprints to eliminate bottlenecks in production services.',
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: 'Defensive Backend Design',
      desc: 'Hardening APIs with server-side validation (Zod), rate limiting against abuse, HTTP security headers, and structured logging.',
      icon: <Shield className="w-5 h-5 text-purple-400" />,
    },
  ];

  return (
    <section id="about" className="py-24 relative bg-dark-950/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <User className="w-3.5 h-3.5" />
            <span>Profile &amp; Career Objective</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About <span className="text-gradient-amber">Deep Tanawala</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            MCA student in Surat, Gujarat with an unrelenting curiosity for server architectures, algorithmic design, and enterprise Java development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative & Background */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-2xl bg-dark-900/80 border border-slate-800/80 glass-panel space-y-5">
              <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
                <GraduationCap className="w-5 h-5 text-amber-400" />
                <span>My Academic &amp; Engineering Journey</span>
              </h3>

              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                I am currently pursuing my <strong className="text-white">Master of Computer Applications (MCA)</strong> at <strong className="text-white">Shrimad Rajchandra Institute of Management and Computer Application (SRIMCA), Uka Tarsadia University</strong> in Bardoli, Gujarat. From early coursework in computational logic and relational databases, I found my passion in backend development: the unseen backbone that turns data into fast, reliable, and secure applications.
              </p>

              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Rather than chasing ephemeral front-end trends alone, I have deliberately invested my time in the durable fundamentals: <span className="text-amber-300 font-semibold">Core Java</span>, <span className="text-amber-300 font-semibold">Object-Oriented Programming (OOP)</span>, <span className="text-amber-300 font-semibold">Data Structures &amp; Algorithms</span>, and <span className="text-amber-300 font-semibold">Relational Database Management (DBMS &amp; SQL)</span>.
              </p>

              {/* Career Goal Card */}
              <div className="p-4 rounded-xl bg-dark-850 border border-amber-500/25 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-300 uppercase tracking-wide">
                  <Target className="w-4 h-4 text-amber-400" />
                  <span>Immediate Career Objective</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Seeking an <strong className="text-white">Internship or Fresher Software Engineer / Java Backend Developer</strong> opportunity where I can contribute to mission-critical backend systems, collaborate with experienced engineers, and continuously elevate code quality.
                </p>
              </div>

              {/* Quick Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-dark-950/60 border border-slate-800 text-xs">
                  <span className="text-slate-500 block font-mono">Location</span>
                  <span className="text-slate-200 font-semibold flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-red-400" /> Surat, Gujarat, India
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-dark-950/60 border border-slate-800 text-xs">
                  <span className="text-slate-500 block font-mono">Degree</span>
                  <span className="text-slate-200 font-semibold block mt-0.5">
                    Master of Computer Applications (MCA)
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-dark-950/60 border border-slate-800 text-xs">
                  <span className="text-slate-500 block font-mono">Primary Focus</span>
                  <span className="text-amber-300 font-semibold block mt-0.5">
                    Java Backend &amp; Database Architecture
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-dark-950/60 border border-slate-800 text-xs">
                  <span className="text-slate-500 block font-mono">Status</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Available for Opportunities
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Principles Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 px-1 font-semibold flex items-center gap-1.5">
              <span>Engineering Philosophy &amp; Standards</span>
            </div>

            {corePrinciples.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-5 rounded-xl bg-dark-900/70 border border-slate-800 glass-panel-hover"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-dark-850 border border-slate-800 shrink-0">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

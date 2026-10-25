import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Cpu } from 'lucide-react';
import { skillsData } from '../data/skillsData';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProficiency, setSelectedProficiency] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Programming Languages',
    'Core Computer Science',
    'Backend & Frameworks',
    'Databases & Storage',
    'Frontend Technologies',
    'Tools & DevOps',
  ];

  const filteredSkills = skillsData.filter((skill) => {
    const matchesCategory =
      selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesProficiency =
      selectedProficiency === 'All' || skill.proficiency === selectedProficiency;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.highlight.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesProficiency && matchesSearch;
  });

  return (
    <section id="skills" className="py-24 relative bg-dark-900/40 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-14 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills &amp; <span className="text-gradient-indigo">Architectural Toolkit</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Authentic, honest overview of technical proficiencies. Clearly distinguishes between core capabilities and technologies actively being explored. No arbitrary percentages.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search skills (e.g. Java, OOP, SQL, REST)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-dark-850 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400/60 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Proficiency Filter Pills */}
            <div className="flex items-center gap-2 self-start md:self-auto overflow-x-auto pb-1 max-w-full">
              <span className="text-xs font-mono text-slate-500 hidden sm:inline">Filter:</span>
              {(['All', 'Core / Proficient', 'Currently Exploring'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedProficiency(level)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    selectedProficiency === level
                      ? level === 'Currently Exploring'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-dark-850 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {level === 'Currently Exploring' ? '✨ Currently Exploring' : level}
                </button>
              ))}
            </div>
          </div>

          {/* Category Pill Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white text-dark-950 font-semibold shadow-md'
                    : 'bg-dark-850/80 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="p-5 rounded-2xl bg-dark-900/80 border border-slate-800/90 glass-panel-hover flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm sm:text-base text-white tracking-tight">
                      {skill.name}
                    </h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium shrink-0 border ${
                        skill.proficiency === 'Currently Exploring'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      }`}
                    >
                      {skill.proficiency === 'Currently Exploring'
                        ? '🌱 Exploring'
                        : '✓ Core'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {skill.highlight}
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>{skill.category}</span>
                  <span className="text-amber-400/80">Deep Tanawala</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <p className="text-sm text-slate-400">No skills match the selected filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedProficiency('All');
                setSearchQuery('');
              }}
              className="text-xs font-mono text-amber-400 underline hover:text-amber-300"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

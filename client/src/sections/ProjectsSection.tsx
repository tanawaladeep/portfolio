import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FolderGit2,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import type { Project } from '../types';
import { fetchProjects } from '../services/api';
import { StatusBadge } from '../components/StatusBadge';
import { ProjectModal } from '../components/ProjectModal';
import { GithubIcon } from '../components/SocialIcons';

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dataSource, setDataSource] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const result = await fetchProjects();
      setProjects(result.projects);
      setDataSource(result.source);
    } catch {
      // Handled in api.ts
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const categories = ['All', 'Android & Mobile', 'Kotlin & Gradle', 'Featured'];

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Featured') return p.featured;
    if (selectedCategory === 'Android & Mobile') return p.category.includes('Android') || p.category.includes('Mobile');
    if (selectedCategory === 'Kotlin & Gradle') return p.technologies.includes('Kotlin') || p.technologies.includes('Gradle') || p.technologies.includes('Gradle KTS');
    return p.category === selectedCategory;
  });

  return (
    <section id="projects" className="py-24 relative bg-dark-950/80 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>GitHub Projects • @tanawaladeep</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured <span className="text-gradient-amber">Software Projects</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Real native Android and mobile applications from my GitHub (<strong className="text-slate-200">@tanawaladeep</strong>), demonstrating Kotlin, Android Studio, Gradle, RecyclerView architecture, Intent APIs, and local data persistence.
            </p>
          </div>

          {/* Right Header Status / Refresh */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="text-[11px] font-mono px-3 py-1.5 rounded-lg bg-dark-900 border border-slate-800 text-slate-400 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${dataSource === 'database' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span>{dataSource === 'database' ? 'API: Connected' : 'Catalog: Active'}</span>
            </div>
            <button
              onClick={loadProjects}
              className="p-2 rounded-lg bg-dark-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Refresh projects list"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-dark-950 font-bold shadow-md'
                  : 'bg-dark-900 text-slate-400 hover:text-slate-200 border border-slate-800 hover:bg-slate-800/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="h-96 rounded-2xl bg-dark-900/60 border border-slate-800 animate-pulse p-8 space-y-4"
              >
                <div className="h-4 bg-slate-800 rounded w-1/4" />
                <div className="h-8 bg-slate-800 rounded w-3/4" />
                <div className="h-20 bg-slate-800/50 rounded" />
                <div className="h-10 bg-slate-800 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => {
              return (
                <motion.div
                  key={project.slug || idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className={`relative rounded-2xl bg-dark-900/90 border transition-all duration-300 flex flex-col justify-between overflow-hidden glass-panel group ${
                    project.featured
                      ? 'border-amber-500/40 shadow-xl shadow-amber-500/5 hover:border-amber-400'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Top Featured Ribbon */}
                  {project.featured && (
                    <div className="bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border-b border-amber-500/20 px-6 py-2 flex items-center justify-between text-xs font-mono text-amber-300">
                      <span className="flex items-center gap-1.5 font-semibold">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate__animated animate__pulse animate__infinite animate__slower" />
                        Featured GitHub Project
                      </span>
                      <span className="text-[11px] text-slate-400">@tanawaladeep</span>
                    </div>
                  )}

                  {/* Card Content Area */}
                  <div className="p-6 sm:p-8 space-y-5">
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={project.projectStatus} />
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-dark-850 text-slate-300 border border-slate-700/80">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <div className="space-y-1.5">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-amber-400/90 font-mono">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Problem Solved Box */}
                    <div className="p-3.5 rounded-xl bg-dark-950/70 border border-slate-800/80 space-y-1">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Problem Addressed</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {project.problemSolved}
                      </p>
                    </div>

                    {/* Key Technical Features (Top 3) */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                        Key Capabilities:
                      </div>
                      <div className="space-y-1.5">
                        {project.features.slice(0, 3).map((feat, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-start gap-2 text-xs text-slate-300"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-dark-850 text-slate-300 border border-slate-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-6 pt-4 border-t border-slate-800/80 bg-dark-950/40 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors group/btn"
                    >
                      <span>Deep Dive &amp; Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`GitHub repo for ${project.title}`}
                          className="p-2 rounded-lg bg-dark-850 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                          title="View Source on GitHub"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Live demo for ${project.title}`}
                          className="p-2 rounded-lg bg-amber-400 text-dark-950 font-semibold hover:bg-amber-300 transition-colors shadow-sm"
                          title="View Live Application"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Project Details Modal */}
        <ProjectModal
          project={activeModalProject}
          isOpen={!!activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      </div>
    </section>
  );
};

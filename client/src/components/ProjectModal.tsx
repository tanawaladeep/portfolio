import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, ShieldCheck, Database, Layers, Sparkles } from 'lucide-react';
import type { Project } from '../types';
import { StatusBadge } from './StatusBadge';
import { GithubIcon } from './SocialIcons';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
            className="relative w-full max-w-3xl my-8 overflow-hidden rounded-2xl bg-dark-900 border border-slate-700/80 shadow-2xl z-10 glass-panel"
          >
            {/* Header Accent Band */}
            <div className="h-2 w-full bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-500" />

            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 pb-4 border-b border-slate-800">
              <div className="space-y-2 pr-6">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={project.projectStatus} />
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-amber-400/90 font-medium">{project.tagline}</p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-700"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Problem Solved Highlight Card */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Problem Solved &amp; Engineering Purpose</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {project.problemSolved}
                </p>
              </div>

              {/* Comprehensive Description */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  System Overview &amp; Architecture
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  Key Technical Features &amp; Implementations
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {project.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-dark-850/80 border border-slate-800/80 text-xs sm:text-sm text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used */}
              <div className="space-y-2.5">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-amber-400" />
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-md text-xs font-mono bg-dark-850 text-slate-300 border border-slate-700/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Links */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-t border-slate-800 bg-dark-950/70">
              <div className="text-xs text-slate-400 font-mono">
                Author: <span className="text-slate-200 font-semibold">Deep Tanawala</span>
              </div>
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-dark-950 bg-amber-400 hover:bg-amber-300 font-semibold transition-colors shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

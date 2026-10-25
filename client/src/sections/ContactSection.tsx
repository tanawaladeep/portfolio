import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Mail,
  Send,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { submitContactForm } from '../services/api';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Please enter a name with at least 2 characters')
    .max(80, 'Name must be under 80 characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(120, 'Email must be under 120 characters'),
  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .max(120, 'Subject must be under 120 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters long')
    .max(2000, 'Message cannot exceed 2000 characters'),
});

type FormValues = z.infer<typeof contactFormSchema>;

export const ContactSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmissionStatus({ type: null, message: '' });

    try {
      const result = await submitContactForm(data);
      if (result.success) {
        setSubmissionStatus({
          type: 'success',
          message: result.message || 'Thank you! Your message has been dispatched successfully.',
        });
        reset();
      } else {
        setSubmissionStatus({
          type: 'error',
          message: result.message || 'Failed to submit form. Please try again or reach out directly.',
        });
      }
    } catch {
      setSubmissionStatus({
        type: 'error',
        message: 'Network error communicating with backend. You can also reach Deep directly at deeptanawala2006@gmail.com.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-dark-900/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Build <span className="text-gradient-amber">Something Reliable</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Open for software engineering internships, fresher Java backend developer roles, technical discussions, and academic collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Details & Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-dark-900/90 border border-slate-800 glass-panel space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Direct Contact Information
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Feel free to contact me directly via email, phone, or LinkedIn. I am actively checking notifications and will respond promptly.
                </p>
              </div>

              {/* Contact Information List */}
              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-dark-850/80 border border-slate-800/80 hover:border-amber-500/40 transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono text-slate-400 block">Personal &amp; Professional Email</span>
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-amber-400 transition-colors">
                      {personalInfo.email}
                    </span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-dark-850/80 border border-slate-800/80 hover:border-emerald-500/40 transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono text-slate-400 block">Phone / Mobile</span>
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
                      {personalInfo.phone}
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-dark-850/80 border border-slate-800/80">
                  <div className="p-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono text-slate-400 block">Location</span>
                    <span className="text-sm font-semibold text-slate-200">
                      {personalInfo.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-4 border-t border-slate-800/70 space-y-3">
                <span className="text-xs font-mono text-slate-400 block uppercase tracking-wider font-semibold">
                  Professional Networks
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-850 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-sky-400 hover:border-sky-500/40 transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4 text-sky-400" />
                    <span>LinkedIn Profile</span>
                  </a>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-850 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4 text-slate-300" />
                    <span>GitHub Profile</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form with Zod Validation */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-dark-900/90 border border-slate-800 glass-panel space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Send a Message
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Fill out the form below. Messages are validated on the client and dispatched to the Express REST API.
                </p>
              </div>

              {/* Submission Notification Toast Banner */}
              {submissionStatus.type && (
                <div
                  className={`p-4 rounded-xl border flex items-start gap-3 text-xs sm:text-sm leading-relaxed ${
                    submissionStatus.type === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-red-500/10 border-red-500/30 text-red-300'
                  }`}
                >
                  {submissionStatus.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <span>{submissionStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 block">
                      Your Full Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      {...register('name')}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-dark-850 border text-slate-200 placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.name
                          ? 'border-red-500 focus:border-red-400'
                          : 'border-slate-800 focus:border-amber-400/60'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] font-mono text-red-400">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 block">
                      Email Address <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      {...register('email')}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-dark-850 border text-slate-200 placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-red-500 focus:border-red-400'
                          : 'border-slate-800 focus:border-amber-400/60'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] font-mono text-red-400">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block">
                    Subject / Discussion Topic <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Java Backend Developer Internship Opportunity"
                    {...register('subject')}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-dark-850 border text-slate-200 placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.subject
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-slate-800 focus:border-amber-400/60'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] font-mono text-red-400">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block">
                    Message Details <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about the role, technical challenge, or project you'd like to collaborate on..."
                    {...register('message')}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-dark-850 border text-slate-200 placeholder-slate-500 focus:outline-none transition-colors leading-relaxed ${
                      errors.message
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-slate-800 focus:border-amber-400/60'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] font-mono text-red-400">{errors.message.message}</p>
                  )}
                </div>

                {/* Security Note & Rate Limit Info */}
                <div className="text-[11px] font-mono text-slate-500 flex items-center justify-between pt-1">
                  <span>Protected by Server-Side Rate Limiting (5 msgs/15m)</span>
                  <span>Strict Data Sanitization</span>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-dark-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md hover:shadow-amber-500/25 active:scale-98 flex items-center justify-center gap-2 font-mono disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-dark-950" />
                      <span>Validating &amp; Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message to Deep</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

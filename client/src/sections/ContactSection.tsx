import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import {
  Mail,
  Send,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { submitContactForm } from '../services/api';
import type { ContactFormData } from '../types';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';

// Typo domain detection dictionary to prevent misspelled domains like gamil.com
const TYPO_EMAIL_DOMAINS: Record<string, string> = {
  'gamil.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmaill.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gmeil.com': 'gmail.com',
  'gmaik.com': 'gmail.com',
  'gamil.in': 'gmail.com',
  'gamil.co': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gnail.com': 'gmail.com',
  'yaho.com': 'yahoo.com',
  'yaoo.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
  'yaho.in': 'yahoo.in',
  'hotmial.com': 'hotmail.com',
  'hotmaill.com': 'hotmail.com',
  'hotmali.com': 'hotmail.com',
  'outlok.com': 'outlook.com',
  'outllok.com': 'outlook.com',
  'outluk.com': 'outlook.com',
  'icld.com': 'icloud.com',
  'iclud.com': 'icloud.com',
};

// Common disposable/temporary spam domains
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  'temp-mail.org',
  '10minutemail.com',
  'throwawaymail.com',
  'guerrillamail.com',
  'yopmail.com',
  'sharklasers.com',
  'dispostable.com',
  'getairmail.com',
]);

// Comprehensive Zod schema enforcing valid human names, email formatting with typo detection, and meaningful messages
const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Full Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name must be under 80 characters')
    .regex(/^[a-zA-Z\s.'-]+$/, 'Name must contain only letters and spaces (no numbers or symbols)')
    .refine((val) => /[a-zA-Z]{2,}/.test(val), 'Please enter a valid human name (at least 2 letters)'),
  email: z
    .string()
    .trim()
    .min(1, 'Email address is required')
    .max(120, 'Email must be under 120 characters')
    .regex(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
      'Please enter a valid lowercase email format (e.g. name@example.com)'
    )
    .refine((val: string) => !/[A-Z]/.test(val), 'Email address must be in lowercase only (no capital letters)')
    .refine((val: string) => {
      const parts = val.toLowerCase().split('@');
      if (parts.length !== 2) return false;
      const [user] = parts;
      return user.length >= 2 && /[a-z0-9]/.test(user);
    }, 'Email username must contain valid characters')
    .refine((val: string) => {
      const parts = val.toLowerCase().split('@');
      if (parts.length !== 2) return false;
      const [, domain] = parts;
      return !TYPO_EMAIL_DOMAINS[domain];
    }, (val: string) => {
      const domain = val.toLowerCase().split('@')[1] || '';
      const suggestion = TYPO_EMAIL_DOMAINS[domain];
      return {
        message: `Invalid email domain '${domain}'. Did you mean @${suggestion}?`,
      };
    })
    .refine((val: string) => {
      const parts = val.toLowerCase().split('@');
      if (parts.length !== 2) return false;
      const [, domain] = parts;
      return !DISPOSABLE_EMAIL_DOMAINS.has(domain);
    }, 'Disposable or temporary email addresses are not permitted'),
  subject: z
    .string()
    .trim()
    .min(1, 'Subject is required')
    .min(3, 'Subject must be at least 3 characters')
    .max(120, 'Subject must be under 120 characters')
    .refine((val) => /[a-zA-Z]{2,}/.test(val), 'Subject must contain letters or words (cannot be only numbers)'),
  message: z
    .string()
    .trim()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters long')
    .max(2000, 'Message cannot exceed 2000 characters')
    .refine((val) => /[a-zA-Z]{3,}/.test(val), 'Message must contain meaningful words/text'),
});

type FormValues = ContactFormData;

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormValues>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Direct synchronous validation against Zod schema per field
  const validateField = (field: keyof FormValues, value: string): string | null => {
    const fieldSchema = contactFormSchema.shape[field];
    const parseResult = fieldSchema.safeParse(value);
    if (!parseResult.success) {
      const issue = parseResult.error.issues?.[0];
      return issue?.message || 'Invalid value';
    }
    return null;
  };

  const getFieldError = (field: keyof FormValues): string | null => {
    const isInteracted = touched[field] || formSubmitted;
    if (!isInteracted) return null;
    return validateField(field, formData[field]);
  };

  const getFieldState = (field: keyof FormValues): 'idle' | 'valid' | 'error' => {
    const isInteracted = touched[field] || formSubmitted;
    const value = formData[field];
    if (!isInteracted && !value) return 'idle';
    const error = validateField(field, value);
    if (error) return 'error';
    return 'valid';
  };

  const getInputClasses = (field: keyof FormValues) => {
    const state = getFieldState(field);
    const base =
      'w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-dark-850 border text-slate-200 placeholder-slate-500 focus:outline-none transition-all duration-200 pr-10';
    if (state === 'error') {
      return `${base} border-red-500/80 bg-red-500/10 focus:border-red-400 focus:ring-1 focus:ring-red-500/30`;
    }
    if (state === 'valid') {
      return `${base} border-emerald-500/70 bg-emerald-500/5 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500/30`;
    }
    return `${base} border-slate-800 focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/20`;
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    let sanitizedValue = field === 'email' ? value.toLowerCase() : value;
    if (field === 'message' && sanitizedValue.length > 2000) {
      sanitizedValue = sanitizedValue.slice(0, 2000);
    } else if (field === 'name' && sanitizedValue.length > 80) {
      sanitizedValue = sanitizedValue.slice(0, 80);
    } else if ((field === 'email' || field === 'subject') && sanitizedValue.length > 120) {
      sanitizedValue = sanitizedValue.slice(0, 120);
    }
    setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: keyof FormValues) => {
    if (field === 'email') {
      setFormData((prev) => ({ ...prev, email: prev.email.toLowerCase() }));
    }
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Helper to auto-fix email typo domain
  const getEmailDomainSuggestion = (): string | null => {
    const parts = formData.email.toLowerCase().split('@');
    if (parts.length === 2) {
      const domain = parts[1];
      return TYPO_EMAIL_DOMAINS[domain] || null;
    }
    return null;
  };

  const applyEmailSuggestion = (suggestion: string) => {
    const parts = formData.email.toLowerCase().split('@');
    if (parts.length === 2) {
      const fixed = `${parts[0]}@${suggestion}`.toLowerCase();
      setFormData((prev) => ({ ...prev, email: fixed }));
      setTouched((prev) => ({ ...prev, email: true }));
    }
  };

  // Overall form validity
  const isFormValid =
    validateField('name', formData.name) === null &&
    validateField('email', formData.email) === null &&
    validateField('subject', formData.subject) === null &&
    validateField('message', formData.message) === null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTouched({ name: true, email: true, subject: true, message: true });

    const parseResult = contactFormSchema.safeParse(formData);
    if (!parseResult.success) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus({ type: null, message: '' });

    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setSubmissionStatus({
          type: 'success',
          message: result.message || 'Thank you! Your message has been dispatched successfully.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTouched({ name: false, email: false, subject: false, message: false });
        setFormSubmitted(false);
      } else {
        setSubmissionStatus({
          type: 'error',
          message: result.message || 'Failed to submit form. Please try again or reach out directly.',
        });
      }
    } catch {
      setSubmissionStatus({
        type: 'error',
        message:
          'Network error communicating with backend. You can also reach Deep directly at deeptanawala2006@gmail.com.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const emailSuggestion = getEmailDomainSuggestion();

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
          <div className="lg:col-span-5 space-y-6" data-aos="fade-right">
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

          {/* Right Column: Contact Form with Real-Time Validation */}
          <div className="lg:col-span-7" data-aos="fade-left">
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

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-slate-300 block">
                        Your Full Name <span className="text-amber-400">*</span>
                      </label>
                      {getFieldState('name') === 'valid' && (
                        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Valid
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        placeholder="e.g. Rahul Sharma"
                        maxLength={80}
                        className={getInputClasses('name')}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        {getFieldState('name') === 'error' && (
                          <AlertCircle className="w-4 h-4 text-red-400" />
                        )}
                        {getFieldState('name') === 'valid' && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        )}
                      </div>
                    </div>
                    {getFieldError('name') && (
                      <p className="text-[11px] font-mono text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{getFieldError('name')}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-slate-300 block">
                        Email Address <span className="text-amber-400">*</span>
                      </label>
                      {getFieldState('email') === 'valid' && (
                        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Valid
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        onBlur={() => handleBlur('email')}
                        placeholder="e.g. rahul@example.com"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        maxLength={120}
                        className={getInputClasses('email')}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        {getFieldState('email') === 'error' && (
                          <AlertCircle className="w-4 h-4 text-red-400" />
                        )}
                        {getFieldState('email') === 'valid' && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        )}
                      </div>
                    </div>
                    {getFieldError('email') && (
                      <div className="space-y-1">
                        <p className="text-[11px] font-mono text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{getFieldError('email')}</span>
                        </p>
                        {emailSuggestion && (
                          <button
                            type="button"
                            onClick={() => applyEmailSuggestion(emailSuggestion)}
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30 transition-colors cursor-pointer"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Auto-fix domain to @{emailSuggestion}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-slate-300 block">
                      Subject / Discussion Topic <span className="text-amber-400">*</span>
                    </label>
                    {getFieldState('subject') === 'valid' && (
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Valid
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      onBlur={() => handleBlur('subject')}
                      placeholder="e.g. Java Backend Developer Opportunity"
                      maxLength={120}
                      className={getInputClasses('subject')}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      {getFieldState('subject') === 'error' && (
                        <AlertCircle className="w-4 h-4 text-red-400" />
                      )}
                      {getFieldState('subject') === 'valid' && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                  </div>
                  {getFieldError('subject') && (
                    <p className="text-[11px] font-mono text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{getFieldError('subject')}</span>
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-slate-300 block">
                      Message Details <span className="text-amber-400">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {getFieldState('message') === 'valid' && (
                        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Valid
                        </span>
                      )}
                      <span
                        className={`text-[11px] font-mono transition-colors ${
                          formData.message.length === 2000
                            ? 'text-amber-400 font-bold'
                            : formData.message.length >= 10
                            ? 'text-slate-400'
                            : formData.message.length > 0
                            ? 'text-amber-400'
                            : 'text-slate-500'
                        }`}
                      >
                        {formData.message.length} / 2000 {formData.message.length < 10 && '(min 10)'} {formData.message.length === 2000 && '(max limit)'}
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      placeholder="Tell me about the role, technical challenge, or project you'd like to collaborate on..."
                      maxLength={2000}
                      className={getInputClasses('message')}
                    />
                    <div className="absolute right-3 top-3 pointer-events-none">
                      {getFieldState('message') === 'error' && (
                        <AlertCircle className="w-4 h-4 text-red-400" />
                      )}
                      {getFieldState('message') === 'valid' && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                  </div>
                  {getFieldError('message') && (
                    <p className="text-[11px] font-mono text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{getFieldError('message')}</span>
                    </p>
                  )}
                </div>

                {/* Security Note & Live Validation Indicator */}
                <div className="text-[11px] font-mono text-slate-500 flex items-center justify-between pt-1">
                  <span>Protected by Server-Side Rate Limiting (5 msgs/15m)</span>
                  <span className="flex items-center gap-1.5">
                    {isFormValid ? (
                      <span className="text-emerald-400 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> All fields validated
                      </span>
                    ) : (
                      <span>Real-time Zod Schema Validation</span>
                    )}
                  </span>
                </div>

                {/* Submit CTA */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-dark-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md hover:shadow-amber-500/25 flex items-center justify-center gap-2 font-mono disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
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
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

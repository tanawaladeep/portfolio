export interface Project {
  _id?: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  problemSolved: string;
  technologies: string[];
  features: string[];
  category: 'Android & Mobile' | 'Java & Backend' | 'Full Stack' | 'DSA & Algorithms' | 'Academic System' | string;
  image: string;
  githubUrl: string;
  liveUrl?: string;
  projectStatus: 'Completed' | 'In Progress' | 'Active Development' | 'Production Ready';
  featured: boolean;
  order: number;
}

export type SkillCategory =
  | 'Programming Languages'
  | 'Core Computer Science'
  | 'Backend & Frameworks'
  | 'Databases & Storage'
  | 'Frontend Technologies'
  | 'Tools & DevOps';

export type ProficiencyLevel = 'Core / Proficient' | 'Currently Exploring';

export interface SkillItem {
  name: string;
  category: SkillCategory;
  proficiency: ProficiencyLevel;
  highlight: string;
  iconName?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  status: 'Pursuing' | 'Completed';
  gradePlaceholder?: string;
  description: string;
  coursework: string[];
}

export interface MilestoneItem {
  phase: string;
  title: string;
  period: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  description: string;
  topics: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  source?: string;
  errors?: Array<{ field: string; message: string }>;
}

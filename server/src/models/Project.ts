import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  problemSolved: string;
  technologies: string[];
  features: string[];
  category: string;
  image: string;
  githubUrl: string;
  liveUrl?: string;
  projectStatus: 'Completed' | 'In Progress' | 'Active Development' | 'Production Ready';
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    tagline: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    problemSolved: { type: String, required: true },
    technologies: [{ type: String, required: true }],
    features: [{ type: String, required: true }],
    category: {
      type: String,
      required: true,
      default: 'Android & Mobile',
    },
    image: { type: String, required: true },
    githubUrl: { type: String, required: true },
    liveUrl: { type: String, default: '' },
    projectStatus: {
      type: String,
      required: true,
      enum: ['Completed', 'In Progress', 'Active Development', 'Production Ready'],
      default: 'Completed',
    },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model<IProject>('Project', ProjectSchema);

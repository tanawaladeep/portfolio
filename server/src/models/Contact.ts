import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  processingStatus: 'New' | 'Read' | 'Replied' | 'Archived';
  ipAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema: Schema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    processingStatus: {
      type: String,
      enum: ['New', 'Read', 'Replied', 'Archived'],
      default: 'New',
    },
    ipAddress: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export const Contact = mongoose.model<IContact>('Contact', ContactSchema);

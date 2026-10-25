import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(80, { message: 'Name cannot exceed 80 characters' })
    .trim(),
  email: z
    .string()
    .email({ message: 'Please provide a valid email address' })
    .max(120, { message: 'Email cannot exceed 120 characters' })
    .trim()
    .toLowerCase(),
  subject: z
    .string()
    .min(3, { message: 'Subject must be at least 3 characters long' })
    .max(120, { message: 'Subject cannot exceed 120 characters' })
    .trim(),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters long' })
    .max(2000, { message: 'Message cannot exceed 2000 characters' })
    .trim(),
});

export type ContactInput = z.infer<typeof contactSchema>;

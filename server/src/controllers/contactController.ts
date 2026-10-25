import { Request, Response } from 'express';
import { contactSchema } from '../validators/contactValidator';
import { Contact } from '../models/Contact';
import mongoose from 'mongoose';

// In-memory contact storage fallback when MongoDB is running offline
interface InMemoryContact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  ipAddress?: string;
}

const memoryContacts: InMemoryContact[] = [];

export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Server-side validation with Zod
    const validationResult = contactSchema.safeParse(req.body);

    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      res.status(400).json({
        success: false,
        message: 'Validation failed for submitted contact form.',
        errors: errorMessages,
      });
      return;
    }

    const { name, email, subject, message } = validationResult.data;
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';

    const isDbConnected = mongoose.connection.readyState === 1;

    let savedContactId = '';
    let storageType = 'in_memory';

    if (isDbConnected) {
      const newContact = await Contact.create({
        name,
        email,
        subject,
        message,
        ipAddress: clientIp,
        processingStatus: 'New',
      });
      savedContactId = newContact._id.toString();
      storageType = 'mongodb';
    } else {
      savedContactId = `mem-${Date.now()}`;
      memoryContacts.push({
        id: savedContactId,
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString(),
        ipAddress: clientIp,
      });
    }

    console.log(`\n======================================================`);
    console.log(`📩 NEW CONTACT MESSAGE RECEIVED [${storageType.toUpperCase()}]`);
    console.log(`From:    ${name} <${email}>`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log(`Time:    ${new Date().toLocaleString()}`);
    console.log(`======================================================\n`);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received successfully. Deep will get back to you shortly.',
      data: {
        id: savedContactId,
        name,
        email,
        subject,
        receivedAt: new Date().toISOString(),
        storage: storageType,
      },
    });
  } catch (error: any) {
    console.error('[Contact] Error processing contact submission:', error);
    res.status(500).json({
      success: false,
      message: 'An internal error occurred while processing your message. Please try again or reach out directly via email.',
      error: error.message,
    });
  }
};

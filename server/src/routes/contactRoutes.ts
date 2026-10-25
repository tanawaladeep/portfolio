import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { submitContact } from '../controllers/contactController';

const router = Router();

// Rate limiter for contact submissions: max 5 requests per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many contact requests submitted from this IP. Please wait 15 minutes or send an email directly to deeptanawala2006@gmail.com.',
  },
});

router.post('/', contactLimiter, submitContact);

export default router;

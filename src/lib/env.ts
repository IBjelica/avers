import { z } from 'zod';

const envSchema = z.object({
  RESEND_API_KEY: z.string().optional(),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),
});

// Validate environment variables on startup
export const env = envSchema.parse(process.env);

// Export individual variables with fallbacks for development
export const RESEND_API_KEY = env.RESEND_API_KEY || process.env.RESEND_API_KEY || '';
export const NEXT_PUBLIC_TURNSTILE_SITE_KEY = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';
export const TURNSTILE_SECRET_KEY = env.TURNSTILE_SECRET_KEY || process.env.TURNSTILE_SECRET_KEY || '';

// Helper function to check if required environment variables are set
export const validateEnvironment = () => {
  const missing = [];
  if (!RESEND_API_KEY) missing.push('RESEND_API_KEY');
  if (!NEXT_PUBLIC_TURNSTILE_SITE_KEY) missing.push('NEXT_PUBLIC_TURNSTILE_SITE_KEY');
  if (!TURNSTILE_SECRET_KEY) missing.push('TURNSTILE_SECRET_KEY');
  
  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing.join(', '));
    console.warn('Please set these in your .env.local file');
    return false;
  }
  return true;
};
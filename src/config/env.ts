import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),

  // Linear (optional)
  LINEAR_API_KEY: z.string().optional(),
  LINEAR_WEBHOOK_SECRET: z.string().optional(),
  LINEAR_DEFAULT_TEAM_ID: z.string().optional(),

  // WhatsApp (optional)
  WHATSAPP_TOKEN: z.string().optional(),
  WHATSAPP_PHONE_NUMBER_ID: z.string().optional(),
  WHATSAPP_VERIFY_TOKEN: z.string().default('aimigo-verify-2024'),
  WHATSAPP_BUSINESS_ACCOUNT_ID: z.string().optional(),

  // Stripe (optional)
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_PRICE_ID: z.string().optional(),

  // GitHub (optional)
  GITHUB_TOKEN: z.string().optional(),
  GITHUB_WEBHOOK_SECRET: z.string().optional(),

  // Google (optional)
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GOOGLE_REFRESH_TOKEN: z.string().optional(),
  GOOGLE_REDIRECT_URI: z.string().optional(),

  // Airtable (optional)
  AIRTABLE_API_KEY: z.string().optional(),
  AIRTABLE_BASE_ID: z.string().optional(),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;

// Helper: Check which integrations are configured
export function getConfiguredIntegrations(): Record<string, boolean> {
  return {
    linear: !!env.LINEAR_API_KEY,
    whatsapp: !!env.WHATSAPP_TOKEN && !!env.WHATSAPP_PHONE_NUMBER_ID,
    stripe: !!env.STRIPE_SECRET_KEY,
    github: !!env.GITHUB_TOKEN,
    google: !!env.GOOGLE_CLIENT_ID && !!env.GOOGLE_CLIENT_SECRET && !!env.GOOGLE_REFRESH_TOKEN,
    airtable: !!env.AIRTABLE_API_KEY && !!env.AIRTABLE_BASE_ID,
  };
}

export function isConfigured(service: keyof ReturnType<typeof getConfiguredIntegrations>): boolean {
  return getConfiguredIntegrations()[service] ?? false;
}
